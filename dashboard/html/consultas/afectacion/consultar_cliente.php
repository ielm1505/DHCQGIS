<?php

ini_set('display_errors',1);
error_reporting(E_ALL);

require '../../../conexion.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if(!$data){
echo json_encode([
"status"=>"error",
"msg"=>"No se recibieron datos"
]);
exit;
}

$contrato = trim($data['contrato'] ?? '');
$cliente  = trim($data['cliente'] ?? '');

if($contrato=='' || $cliente==''){
echo json_encode([
"status"=>"error",
"msg"=>"Contrato o cliente vacío"
]);
exit;
}

try{

$sql = "
SELECT
contrato,
cliente,
ST_X(ST_Transform(geom,4326)) AS lon,
ST_Y(ST_Transform(geom,4326)) AS lat
FROM \"BENITO_JUAREZ\".\"vista_x7_aep\"
WHERE contrato = :contrato
AND TRIM(UPPER(cliente)) = TRIM(UPPER(:cliente))
LIMIT 1
";

$stmt = $pdo->prepare($sql);

$stmt->execute([
':contrato'=>$contrato,
':cliente'=>$cliente
]);

$row = $stmt->fetch(PDO::FETCH_ASSOC);

if($row){

echo json_encode([
"status"=>"ok",
"contrato"=>$row['contrato'],
"cliente"=>$row['cliente'],
"lon"=>floatval($row['lon']),
"lat"=>floatval($row['lat'])
]);

}else{

echo json_encode([
"status"=>"no",
"msg"=>"Contrato y cliente no coinciden"
]);

}

}catch(PDOException $e){

echo json_encode([
"status"=>"error",
"msg"=>$e->getMessage()
]);

}