<?php

ini_set('display_errors',1);
error_reporting(E_ALL);

session_start();
require '../../../conexion.php';

header("Content-Type: application/json; charset=UTF-8");

try{

$pdo->exec("
UPDATE \"BENITO_JUAREZ\".\"Tipo_de_afectacion\"
SET estatus = 'Finalizado'
WHERE estatus = 'Activo'
AND fecha_fin < now()
");

$sql = "
SELECT
id_afectacion,
tipo,
tipo_afectacion,
nivel,
periodo,
estatus,
fecha_inicio,
fecha_fin,
descripcion,
ST_AsGeoJSON(ST_Transform(geom,3857)) as geometry
FROM \"BENITO_JUAREZ\".\"Tipo_de_afectacion\"
WHERE estatus='Activo'

OR
(
    unaccent(lower(tipo_afectacion)) LIKE '%baja presion%'
    AND estatus='Finalizado'
    AND DATE(fecha_fin)=CURRENT_DATE
)


";

$stmt = $pdo->query($sql);

$features=[];

while($row=$stmt->fetch(PDO::FETCH_ASSOC)){

if(!$row['geometry']) continue;

$geom=json_decode($row['geometry']);
unset($row['geometry']);

$features[]=[
"type"=>"Feature",
"geometry"=>$geom,
"properties"=>$row
];

}

echo json_encode([
"type"=>"FeatureCollection",
"features"=>$features
]);

}catch(Exception $e){

echo json_encode([
"status"=>"error",
"msg"=>$e->getMessage()
]);

}