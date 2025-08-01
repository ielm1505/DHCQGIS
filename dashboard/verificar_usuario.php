<?php
session_start();
header("Content-Type: application/json");

// validar sesión
if (!isset($_SESSION["usuario"])) {
    echo json_encode(["valido" => false, "motivo" => "No hay sesión"]);
    exit();
}

$usuario = $_SESSION["usuario"];
$password= $_SESSION["pass"];
$rol = $_SESSION["rol"] ?? "";

// solo Admin y Editor son válidos
if (in_array($rol, ["Admin", "Editor"])) {
    echo json_encode([
        "valido" => true,
        "usuario" => $usuario,
        "rol" => $rol
    ]);
    exit();
} else {
    echo json_encode([
        "valido" => false,
        "motivo" => "Rol no autorizado",
        "usuario" => $usuario,
        "rol" => $rol
    ]);
    exit();
}
