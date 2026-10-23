<?php
session_start();
include('conexion.php');

if (isset($_SESSION['session_id'])) {
    $ahora = date('Y-m-d H:i:s');
    $stmt = $pdo->prepare('UPDATE "Usuario"."ldap_sesion" 
        SET estado = :estado, fecha_salida = :salida 
        WHERE id = :id');
    $stmt->execute([
        'estado' => 'cerrado',
        'salida' => $ahora,
        'id' => $_SESSION['session_id']
    ]);
}

session_unset();
session_destroy();

// Evitar caché
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

header('Location: index.html');
exit;
?>
