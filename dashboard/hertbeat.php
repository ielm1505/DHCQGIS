<?php
session_start();
require 'conexion.php';

if (!isset($_SESSION['session_id']) || !isset($_SESSION['session_token'])) {
    echo 'EXPIRED';
    exit;
}

$stmt = $pdo->prepare('
    SELECT estado, session_token 
    FROM "Usuario"."ldap_sesion" 
    WHERE id = :id
');
$stmt->execute(['id' => $_SESSION['session_id']]);
$sesion = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$sesion) {
    echo 'EXPIRED';
    exit;
}

if ($sesion['estado'] !== 'activo') {
    echo 'CLOSED';
    exit;
}

if ($sesion['session_token'] !== $_SESSION['session_token']) {
    echo 'DUPLICATE';
    exit;
}

// Actualizar última actividad
$pdo->prepare('UPDATE "Usuario"."ldap_sesion" 
    SET fecha_actividad = NOW() 
    WHERE id = :id')->execute(['id' => $_SESSION['session_id']]);

echo 'OK';
?>
