<?php

ini_set('display_errors',1);

session_start();
require_once '../../../conexion.php';

header('Content-Type: application/json');

try{

$geom=$_POST['geom'] ?? null;

if(!$geom){
throw new Exception("Geometria no enviada");
}

$sql="

SELECT
uso_desc,
COUNT(*) as cantidad

FROM \"BENITO_JUAREZ\".\"vista_x7_aep\"

WHERE ST_Intersects(

geom,

ST_Transform(
ST_SetSRID(
ST_GeomFromGeoJSON(:geom),
3857
),
32616
)

)

GROUP BY uso_desc
ORDER BY cantidad DESC

";

$stmt=$pdo->prepare($sql);
$stmt->execute(['geom'=>$geom]);

$rows=$stmt->fetchAll(PDO::FETCH_ASSOC);

$total=0;

foreach($rows as $r){$total+=$r['cantidad'];}

echo json_encode([
"success"=>true,
"total"=>$total,
"data"=>$rows
]);

}catch(Exception $e){echo json_encode(["success"=>false,"error"=>$e->getMessage()]);

}