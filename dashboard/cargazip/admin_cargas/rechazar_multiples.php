<?php

require '../../conexion.php';
require '../../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$ids = $_POST['carga'] ?? [];
$observacion = trim($_POST['observacion_rechazo'] ?? 'Sin observaciones técnicas especificadas.');
if(!$ids){
    die("No se seleccionaron cargas");
}

foreach($ids as $id){

    /*=========================================================
    DATOS PRINCIPALES DE LA CARGA
    =========================================================*/
    $stmt = $pdo->prepare("
        SELECT empresa, desarrollo, archivo
        FROM dexterno_ap.control_cargas
        WHERE id = ?
    ");
    $stmt->execute([$id]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if(!$row){
        continue;
    }

    $empresa    = trim($row['empresa']);
    $desarrollo = trim($row['desarrollo']);
    $archivo    = trim($row['archivo']);

    /*=========================================================
    OBTENER TODAS LAS TABLAS AFECTADAS EN detalle_cargas
    =========================================================*/
    $stmtDet = $pdo->prepare("
        SELECT tabla_afectada
        FROM dexterno_ap.detalle_cargas
        WHERE id_carga = ?
    ");
    $stmtDet->execute([$id]);
    $tablas = $stmtDet->fetchAll(PDO::FETCH_COLUMN);

    /*=========================================================
    ELIMINAR TODAS LAS GEOMETRIAS ASOCIADAS
    =========================================================*/
    foreach($tablas as $tabla){

        $tabla = trim($tabla);

        if(!$tabla) continue;

        $tablaCompleta = "dexterno_ap.".$tabla;

        $sqlDelete = "DELETE FROM {$tablaCompleta} WHERE id_carga = ?";
        $del = $pdo->prepare($sqlDelete);
        $del->execute([$id]);
    }

    /*=========================================================
    ACTUALIZAR ESTADO DE CONTROL
    =========================================================*/
$upd = $pdo->prepare("
    UPDATE dexterno_ap.control_cargas
    SET estado_aprobacion='RECHAZADO',
        estado='ELIMINADO',
        observacion_rechazo=?
    WHERE id=?
");
$upd->execute([$observacion,$id]);

    /*=========================================================
    BUSCAR CORREO DEL REPRESENTANTE LEGAL
    =========================================================*/
    $stmt2 = $pdo->prepare("
        SELECT representante_legal, correo_electronico
        FROM dexterno_ap.desarrolladores
        WHERE TRIM(nombre_empresa)=TRIM(?)
        LIMIT 1
    ");
    $stmt2->execute([$empresa]);
    $dev = $stmt2->fetch(PDO::FETCH_ASSOC);

    if(!$dev){
        continue;
    }

    $repLegal = $dev['representante_legal'];
    $correo   = $dev['correo_electronico'];

    /*=========================================================
    ENVIAR CORREO DE RECHAZO
    =========================================================*/
    try{

        $mail = new PHPMailer(true);

        $mail->isSMTP();
        $mail->Host       = 'zmbagk01.aguakan.com.mx';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'notificaciongis@aguakan.com.mx';
        $mail->Password   = 'Agu4k4n.#2026';
        $mail->Port       = 587;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->CharSet    = 'UTF-8';

        $mail->SMTPOptions = [
            'ssl'=>[
                'verify_peer'=>false,
                'verify_peer_name'=>false,
                'allow_self_signed'=>true
            ]
        ];

        $mail->setFrom('notificaciongis@aguakan.com.mx','Sistema GIS Aguakan');
        $mail->addAddress($correo,$repLegal);

        $mail->Subject = "Rechazo de información GIS - {$desarrollo}";

        $mail->Body = "
Estimado {$repLegal}:

Por medio del presente se le informa que la información geoespacial correspondiente al desarrollo:

{$desarrollo}

perteneciente a la empresa:

{$empresa}

ha sido revisada por el área técnica GIS de Aguakan y ha sido RECHAZADA por inconsistencias detectadas durante el proceso de validación.

Archivo revisado: {$archivo}

Favor de realizar las correcciones correspondientes y efectuar nuevamente la carga de información en la plataforma.

Atentamente
Sistema Corporativo GIS Aguakan
";

        $mail->send();

    }catch(Exception $e){
        error_log($mail->ErrorInfo);
    }

}

header("Location: admin_cargas.php");
exit;
?>