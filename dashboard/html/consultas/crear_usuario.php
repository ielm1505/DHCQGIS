<?php 
require '../../conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = trim($_POST['usuario']);
    $rol = trim($_POST['rol']);
    $html = trim($_POST['html']);

    // Verificar existencia
    $stmtCheck = $pdo->prepare('SELECT id FROM "Usuario"."ldap_registro" WHERE usuario = :usuario');
    $stmtCheck->execute(['usuario' => $usuario]);
    if ($stmtCheck->fetch()) {
        die("<script>alert('❌ El usuario ya existe');window.history.back();</script>");
    }

    // Insertar
    $stmtInsert = $pdo->prepare('INSERT INTO "Usuario"."ldap_registro" (usuario, rol, html) VALUES (:usuario, :rol, :html)');
    $stmtInsert->execute(['usuario' => $usuario, 'rol' => $rol, 'html' => $html]);

    echo "<script>alert('✅ Usuario creado correctamente');window.location='usuario_nuevo.php';</script>";
}
?>
