<?php
require '../../../conexion.php';
header('Content-Type: application/json');

if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    echo json_encode(['ok'=>false,'msg'=>'Método no permitido']);
    exit;
}

$codigo = $_POST['codigo'] ?? null;

if(!$codigo){
    echo json_encode(['ok'=>false,'msg'=>'Código vacío']);
    exit;
}

$sql = "
    SELECT codigo_seguimiento, cliente, contrato,
           fecha, estatus,
           ST_X(ST_Transform(geom,4326)) as x,
           ST_Y(ST_Transform(geom,4326)) as y
    FROM \"BENITO_JUAREZ\".\"Registro_de_afectacion\"
    WHERE codigo_seguimiento = :codigo
    LIMIT 1
";

$stmt = $pdo->prepare($sql);
$stmt->execute([':codigo'=>$codigo]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if(!$row){
    echo json_encode(['ok'=>false,'msg'=>'Código no encontrado']);
    exit;
}

echo json_encode([
    'ok'=>true,
    'cliente'=>$row['cliente'],
    'contrato'=>$row['contrato'],
    'fecha'=>$row['fecha'],
    'estatus'=>$row['estatus'],
    'x'=>$row['x'],
    'y'=>$row['y']
]);
