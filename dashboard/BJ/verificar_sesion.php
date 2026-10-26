<?php
session_start();
include('../conexion.php');

header('Content-Type: application/json');

//----------------------------------
// VALIDAR VARIABLES DE SESION
//----------------------------------
if (!isset($_SESSION['session_id']) || !isset($_SESSION['usuario']) || !isset($_SESSION['session_token'])) {
    echo json_encode(['activo' => false]);
    exit;
}

$sessionId = $_SESSION['session_id'];
$usuario   = $_SESSION['usuario'];
$token     = $_SESSION['session_token'];

try {

    //----------------------------------
    // CONSULTAR SESION EN BASE DE DATOS
    //----------------------------------
    $stmt = $pdo->prepare('
        SELECT estado, session_token
        FROM "Usuario".ldap_sesion
        WHERE id = :id AND usuario = :usuario
    ');
    $stmt->execute([
        'id' => $sessionId,
        'usuario' => $usuario
    ]);

    $sesion = $stmt->fetch(PDO::FETCH_ASSOC);

    //----------------------------------
    // SI NO EXISTE O YA FUE CERRADA
    //----------------------------------
    if (!$sesion || $sesion['estado'] !== 'activo' || $sesion['session_token'] !== $token) {
        session_unset();
        session_destroy();
        echo json_encode(['activo' => false]);
        exit;
    }

    //----------------------------------
    // CONTROL DE INACTIVIDAD PHP
    //----------------------------------
    if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity']) > $_SESSION['timeout']) {

        $stmt = $pdo->prepare('
            UPDATE "Usuario".ldap_sesion
            SET estado = :cerrado, fecha_salida = NOW()
            WHERE id = :id
        ');
        $stmt->execute([
            'cerrado' => 'cerrado',
            'id' => $sessionId
        ]);

        session_unset();
        session_destroy();

        echo json_encode(['activo' => false]);
        exit;
    }

    //----------------------------------
    // ACTUALIZAR ULTIMA ACTIVIDAD
    //----------------------------------
    $_SESSION['last_activity'] = time();

    echo json_encode([
        'activo' => true,
        'usuario' => $usuario
    ]);

} catch (Exception $e) {

    echo json_encode(['activo' => false]);
}
?>