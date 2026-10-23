
<?php
require_once "../conexion.php";
require_once "../vendor/autoload.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

session_start();

if (!isset($_SESSION['tipo_usuario']) || $_SESSION['tipo_usuario'] !== 'desarrollador') die("❌ Acceso no autorizado");
if (!isset($_SESSION['desarrollador_id'])) die("❌ Sesión inválida");

$desarrollador_id = $_SESSION['desarrollador_id'];
$desarrollo_id = $_POST['desarrollo'] ?? null;
if(!$desarrollo_id) die("❌ Desarrollo no seleccionado");

$stmt = $pdo->prepare("SELECT d.nombre_desarrollo,d.ruta_archivos,d.num_viviendas,d.municipio,d.localidad,dev.nombre_empresa
FROM dexterno_ap.desarrollos d
JOIN dexterno_ap.desarrolladores dev ON dev.id=d.desarrollador_id
WHERE d.id=:id AND d.desarrollador_id=:dev");
$stmt->execute([':id'=>$desarrollo_id,':dev'=>$desarrollador_id]);
$data = $stmt->fetch(PDO::FETCH_ASSOC);
if(!$data) die("❌ Desarrollo no válido");

$empresa    = $data['nombre_empresa'];
$desarrollo = $data['nombre_desarrollo'];
$rutaBD     = $data['ruta_archivos'];
$viviendas  = $data['num_viviendas'];
$municipio  = $data['municipio'];
$localidad  = $data['localidad'];

$baseUploads = "D:/SISTEMA_AGUAKAN/";
$rutaFisica = $baseUploads.$rutaBD;
if(!file_exists($rutaFisica)) mkdir($rutaFisica,0777,true);

$schema="dexterno_ap";
$ogr='"D:\\Programas\\qgis3.32.0\\bin\\ogr2ogr.exe"';
$ogrinfo='"D:\\Programas\\qgis3.32.0\\bin\\ogrinfo.exe"';
global $host,$dbname,$user,$pass;
$cadExtensions=['dwg','dxf','dgn'];

function obtenerTabla($nombre){
    $nombre = strtolower($nombre);
    $mapeo =
     
    [
        'cana_val'=>['cana_val','valle'],
        'cana_cv'=>['cana_cv','colector'],
        'cana_nodo'=>['nodo'],
        'cana_ap'=>['cana_ap','ap'],
        'vialidad'=>['vialidad','road','street'],
        'desarrollo'=>['desarrollo'],
        'manzana'=>['manzana','block'],
        'lote'=>['lote','plot'],
        'ass_cana'=>['ass_cana','acometida_cana','acometida_canal'],
        'ass_cv'=>['ass_cv','acometida_cv','acometida_colector'],
        'ass_nodo'=>['ass_nodo','acometida_nodo'],
        'ass_pv'=>['ass_pv','acometida_pv','pozo_visita_ass'],
        'ass_val'=>['ass_val','acometida_val','valvula_ass']
    ];

    foreach($mapeo as $tabla=>$patrones){
        foreach($patrones as $p){
            if(strpos($nombre,$p)!==false) return $tabla;
        }
    }
    return null;
}

function buscarSHP($dir){
    $files=[];
    $it=new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir));
    foreach($it as $f){
        if(strtolower($f->getExtension())==='shp') $files[]=$f->getPathname();
    }
    return $files;
}

function eliminarDirectorio($dir){
    if(!file_exists($dir)) return;
    foreach(scandir($dir) as $item){
        if($item=='.'||$item=='..') continue;
        $ruta=$dir.DIRECTORY_SEPARATOR.$item;
        if(is_dir($ruta)) eliminarDirectorio($ruta); else unlink($ruta);
    }
    rmdir($dir);
}

function procesarCapa($pdo,$cmd,$tabla,$schema,$id_carga,$capaOrigen){
    global $host,$dbname,$user,$pass;

    $tablaCompleta = "$schema.$tabla";

    $antes = $pdo->query("SELECT COUNT(*) FROM $tablaCompleta")->fetchColumn();
    exec($cmd." 2>&1",$out,$code);

    sleep(1);
    $despues = $pdo->query("SELECT COUNT(*) FROM $tablaCompleta")->fetchColumn();
    $insertados = max(0,$despues-$antes);

    $pdo->exec("
    UPDATE $tablaCompleta
    SET id_carga=$id_carga,
        estatus_validacion='PENDIENTE',
        fecha_validacion=NOW()
    WHERE id_carga IS NULL
    ");

    $stmt=$pdo->prepare("INSERT INTO $schema.detalle_cargas(id_carga,tabla_afectada,capa_origen,registros_insertados) VALUES (?,?,?,?)");
    $stmt->execute([$id_carga,$tabla,$capaOrigen,$insertados]);

    $pdo->prepare("UPDATE $schema.control_cargas SET registros_afectados=COALESCE(registros_afectados,0)+? WHERE id=?")
        ->execute([$insertados,$id_carga]);

    return $insertados;
}

if(!isset($_FILES['archivo'])) die("❌ No se recibió archivo");
$file=$_FILES['archivo'];
$filename=basename($file['name']);
$ext=strtolower(pathinfo($filename,PATHINFO_EXTENSION));
$nombreUnico=date('Ymd_His')."_".uniqid()."_".$filename;
$filepath=$rutaFisica."/".$nombreUnico;
if(!move_uploaded_file($file['tmp_name'],$filepath)) die("❌ Error al guardar archivo");

$tipoArchivo='otro';
if(in_array($ext,$cadExtensions)) $tipoArchivo='cad';
elseif($ext=='zip') $tipoArchivo='shp';
elseif($ext=='gpkg') $tipoArchivo='gpkg';

$stmt=$pdo->prepare("INSERT INTO $schema.control_cargas(empresa,desarrollo,municipio,localidad,viviendas,archivo,tipo_archivo,ruta_archivo,estado,estado_aprobacion,fecha_carga,registros_afectados)
VALUES (?,?,?,?,?,?,?,?,?,?,NOW(),0) RETURNING id");
$stmt->execute([$empresa,$desarrollo,$municipio,$localidad,$viviendas,$filename,$tipoArchivo,$filepath,'PROCESANDO','PENDIENTE']);
$id_carga=$stmt->fetchColumn();

$procesados=0;
$errores=0;

if($tipoArchivo=='cad'){
    $stmt=$pdo->prepare("INSERT INTO $schema.detalle_cargas(id_carga,tabla_afectada,capa_origen,registros_insertados) VALUES (?,?,?,?)");
    $stmt->execute([$id_carga,'CAD',$filename,0]);
    $procesados=1;
}

if($tipoArchivo=='shp'){
    $tmp=$rutaFisica."/tmp_".uniqid();
    mkdir($tmp);
    $zip=new ZipArchive;
    if($zip->open($filepath)===TRUE){
        $zip->extractTo($tmp);
        $zip->close();
        foreach(buscarSHP($tmp) as $shp){
            $tabla=obtenerTabla(basename($shp));
            if(!$tabla){$errores++; continue;}
            $cmd="$ogr -f \"PostgreSQL\" PG:\"host=$host dbname=$dbname user=$user password=$pass\" ".escapeshellarg($shp)." -nln $schema.$tabla -append -update -nlt PROMOTE_TO_MULTI -a_srs EPSG:32616";
            procesarCapa($pdo,$cmd,$tabla,$schema,$id_carga,basename($shp));
            $procesados++;
        }
    }
    eliminarDirectorio($tmp);
}

if($tipoArchivo=='gpkg'){
    exec($ogrinfo." -ro ".escapeshellarg($filepath),$out);
    foreach($out as $line){
        if(preg_match('/^\\d+:\\s([^\\(]+)/',$line,$m)){
            $layer=trim($m[1]);
            $tabla=obtenerTabla($layer);
            if(!$tabla){$errores++; continue;}
            $cmd="$ogr -f \"PostgreSQL\" PG:\"host=$host dbname=$dbname user=$user password=$pass\" ".escapeshellarg($filepath)." ".escapeshellarg($layer)." -nln $schema.$tabla -append -update -nlt PROMOTE_TO_MULTI -a_srs EPSG:32616";
            procesarCapa($pdo,$cmd,$tabla,$schema,$id_carga,$layer);
            $procesados++;
        }
    }
}

$token = bin2hex(random_bytes(32));
$pdo->prepare("UPDATE $schema.control_cargas SET token_aprobacion=?,estado='CARGADO' WHERE id=?")->execute([$token,$id_carga]);

try{
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host='zmbagk01.aguakan.com.mx';
    $mail->SMTPAuth=true;
    $mail->Username='notificaciongis@aguakan.com.mx';
    $mail->Password='Agu4k4n.#2026';
    $mail->SMTPSecure=PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port=587;
    $mail->CharSet='UTF-8';
    $mail->SMTPOptions=['ssl'=>['verify_peer'=>false,'verify_peer_name'=>false,'allow_self_signed'=>true]];
    $mail->setFrom('notificaciongis@aguakan.com.mx','Sistema GIS Aguakan');
    $mail->addAddress('imontalvo@aguakan.com','Administrador GIS');
    $mail->Subject='Nueva carga GIS pendiente de revisión';
    $mail->Body="Empresa: $empresa\nDesarrollo: $desarrollo\nArchivo: $filename\nID Carga: $id_carga\n";
    $mail->send();
}catch(Exception $e){ }

echo "<div style='padding:20px;background:#f0fff4;border-radius:10px'><strong>✅ Carga completada correctamente</strong><br><br>Empresa: $empresa<br>Desarrollo: $desarrollo<br>Archivo: $filename<br>ID Carga: $id_carga<br>Procesados: $procesados<br>Errores: $errores</div>";
?>
```
