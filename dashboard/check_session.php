<?php
session_start();

header('Content-Type: application/json');

// si no existe sesión válida
if (!isset($_SESSION['usuario'])) {
    http_response_code(401);
    echo json_encode([
        "status"=>"expired"
    ]);
    exit;
}

// sesión válida
echo json_encode([
    "status"=>"ok",
    "usuario"=>$_SESSION['usuario']
]);