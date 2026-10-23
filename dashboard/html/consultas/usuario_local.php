<?php
require '../../conexion.php';
session_start();

// Solo permitir a usuarios con rol admin (si tu sesión usa roles)
if (!isset($_SESSION['rol']) || $_SESSION['rol'] !== 'Admin') {
    http_response_code(403);
    exit("Acceso denegado.");
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = trim($_POST['usuario']);
    $password = trim($_POST['password']);
    $rol = trim($_POST['rol']);
    $html = trim($_POST['html']);

    if (empty($usuario) || empty($password) || empty($rol) || empty($html)) {
        exit("Todos los campos son obligatorios.");
    }

    try {
        $pdo->exec('SET search_path TO "Usuario"');

        // Verificar si ya existe
        $check = $pdo->prepare("SELECT COUNT(*) FROM \"Usuario\".\"usuario_externo\" WHERE usuario = :usuario");
        $check->execute(['usuario' => $usuario]);
        if ($check->fetchColumn() > 0) {
            exit("⚠️ El usuario ya existe.");
        }

       
        $hashed = password_hash($password, PASSWORD_BCRYPT);

        $stmt = $pdo->prepare("
            INSERT INTO \"Usuario\".\"usuario_externo\" (usuario, contrasena, rol, html, activo)
            VALUES (:usuario, :contrasena, :rol, :html, TRUE)
        ");

        $stmt->execute([
            'usuario' => $usuario,
            'contrasena' => $hashed,
            'rol' => $rol,
            'html' => $html
        ]);

        echo "<script>alert('✅ Usuario creado correctamente'); window.location.href='usuario_nuevo.php';</script>";

    } catch (Exception $e) {
        echo "❌ Error: " . $e->getMessage();
    }
} else {
    echo "Método no permitido.";
}
?>
