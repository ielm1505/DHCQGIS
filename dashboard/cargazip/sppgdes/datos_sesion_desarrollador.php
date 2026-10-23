<?php
session_start();
header('Content-Type: application/json');

if(!isset($_SESSION['usuario']) || !isset($_SESSION['desarrollador_id'])){
    http_response_code(401);
    echo json_encode(['error'=>'Sesión no activa']);
    exit;
}

echo json_encode([
    'usuario' => $_SESSION['usuario'],
    'tipo_usuario' => $_SESSION['tipo_usuario'] ?? '',
    'desarrollador_id' => $_SESSION['desarrollador_id'],
    'nombre_empresa' => $_SESSION['nombre_empresa'] ?? $_SESSION['usuario']
]);
?>