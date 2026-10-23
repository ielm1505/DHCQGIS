<?php
require '../../conexion.php';
session_start();

if(!isset($_SESSION['desarrollador_id'])){
    exit("No autorizado");
}

$dev_id = $_SESSION['desarrollador_id'];
$desarrollo = $_GET['desarrollo'] ?? '';

if(!$desarrollo){
    exit;
}

/*=========================================================
VALIDAR QUE EL DESARROLLO PERTENECE AL DESARROLLADOR
=========================================================*/
$val = $pdo->prepare("
    SELECT id
    FROM dexterno_ap.desarrollos
    WHERE desarrollador_id=?
    AND nombre_desarrollo=?
    LIMIT 1
");
$val->execute([$dev_id,$desarrollo]);

if(!$val->fetchColumn()){
    exit("<div style='padding:10px;background:#f8d7da'>Desarrollo no autorizado</div>");
}

/*=========================================================
OBTENER CARGAS APROBADAS
=========================================================*/
$stmt = $pdo->prepare("
    SELECT 
        id,
        archivo,
        TO_CHAR(fecha_carga, 'YYYY-MM-DD') AS fecha_carga,
        tipo_archivo
    FROM dexterno_ap.control_cargas
    WHERE desarrollo=?
    AND estado_aprobacion='APROBADO'
    ORDER BY fecha_carga DESC
");

$stmt->execute([$desarrollo]);
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

if(!$rows){
    echo "<div style='padding:15px;background:#fff3cd;border-radius:6px;margin-top:15px'>
    No existen cargas GIS aprobadas para este desarrollo.
    </div>";
    exit;
}

echo "<h3 style='margin-top:20px'>Cargas GIS aprobadas del desarrollo</h3>";
echo "<table width='100%' border='1' cellpadding='8' cellspacing='0' style='background:#fff'>";
echo "<tr style='background:#0b3d91;color:white'>

<th>Archivo</th>
<th>Tipo</th>
<th>Fecha</th>
<th>Mapa</th>
</tr>";

foreach($rows as $r){

    echo "<tr>
        
        <td>{$r['archivo']}</td>
        <td>{$r['tipo_archivo']}</td>
        <td>{$r['fecha_carga']}</td>
        <td><button onclick='abrirVisor({$r['id']})'>VER MAPA</button></td>
    </tr>";
}
echo "</table>";
?>