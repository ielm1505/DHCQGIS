<?php
session_start();
require '../conexion.php';

header('Content-Type: application/json');

// 🔒 Validar sesión
if (!isset($_SESSION['desarrollador_id'])) {
    echo json_encode(['error' => 'Sesión no válida']);
    exit;
}

$id = $_GET['id'] ?? null;
$dev = $_SESSION['desarrollador_id'];

if (!$id) {
    echo json_encode(['error' => 'ID vacío']);
    exit;
}

try {

    $stmt = $pdo->prepare("
        SELECT num_viviendas, municipio, localidad
        FROM dexterno_ap.desarrollos
        WHERE id = :id AND desarrollador_id = :dev
    ");

    $stmt->execute([
        ':id'=>$id,
        ':dev'=>$dev
    ]);

    $data = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode($data ?: []);

} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}