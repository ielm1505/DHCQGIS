<?php
require '../conexion.php';
// --- Crear nuevo usuario ---
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['nuevo_usuario'])) {
    $usuario = $_POST['usuario'];
    $rol = $_POST['rol'];
    $html = $_POST['html'];

    $stmt = $conn->prepare("INSERT INTO usuarios_ldap (usuario, rol, html) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $usuario, $rol, $html);
    $stmt->execute();
}

// --- Eliminar usuario ---
if (isset($_GET['eliminar'])) {
    $id = intval($_GET['eliminar']);
    $conn->query("DELETE FROM usuarios_ldap WHERE id = $id");
}

// --- Consultar todos los usuarios ---
$usuarios = $conn->query("SELECT * FROM usuarios_ldap ORDER BY id DESC");
?>