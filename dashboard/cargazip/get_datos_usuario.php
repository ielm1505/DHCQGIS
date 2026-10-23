<?php
session_start();
require '../conexion.php';

$id = $_SESSION['desarrollador_id'];

$stmt = $pdo->prepare("
    SELECT nombre_empresa 
    FROM dexterno_ap.desarrolladores
    WHERE id = :id
");
$stmt->execute([':id'=>$id]);
$empresa = $stmt->fetchColumn();

$stmt = $pdo->prepare("
    SELECT id, nombre_desarrollo 
    FROM dexterno_ap.desarrollos
    WHERE desarrollador_id = :id
");
$stmt->execute([':id'=>$id]);

echo json_encode([
    'empresa'=>$empresa,
    'desarrollos'=>$stmt->fetchAll(PDO::FETCH_ASSOC)
]);