<?php
session_start();
require 'conexion.php'; 

$inactivityTimeout = 30 * 60; // 30 minutos


function esAjax(){
    return !empty($_SERVER['HTTP_X_REQUESTED_WITH']) &&
           strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}


/* ---------- VERIFICAR INACTIVIDAD ---------- */

if (isset($_SESSION['last_activity']) &&
    (time() - $_SESSION['last_activity'] > $inactivityTimeout)) {

    if (isset($_SESSION['session_id'])) {

        $stmt = $pdo->prepare('UPDATE "Usuario"."ldap_sesion"
            SET estado = :estado, fecha_salida = NOW()
            WHERE id = :id');

        $stmt->execute([
            'estado' => 'cerrado',
            'id' => $_SESSION['session_id']
        ]);
    }

    session_unset();
    session_destroy();

    if(esAjax()){
        http_response_code(401);
        echo json_encode(["error"=>true,"mensaje"=>"Sesión expirada"]);
        exit;
    }

    header('Location: ../logout.php');
    exit;
}


/* ---------- ACTUALIZAR ACTIVIDAD ---------- */

$_SESSION['last_activity'] = time();


/* ---------- VALIDAR LOGIN ---------- */

if (!isset($_SESSION['usuario']) || !isset($_SESSION['rol'])) {

    if(esAjax()){
        http_response_code(401);
        echo json_encode(["error"=>true,"mensaje"=>"Sesión no válida"]);
        exit;
    }

    header('Location: ../logout.php');
    exit;
}


/* ---------- VALIDAR ROL ---------- */

function checkRole($allowedRoles = []) {

    if (!in_array($_SESSION['rol'], $allowedRoles)) {

        if(!empty($_SERVER['HTTP_X_REQUESTED_WITH'])){
            http_response_code(403);
            echo json_encode(["error"=>true,"mensaje"=>"Sin permisos"]);
            exit;
        }

        header('Location: sin_permiso.html');
        exit;
    }
}


/* ---------- TIEMPO RESTANTE ---------- */

if (!isset($_SESSION['timeout'])) {
    $_SESSION['timeout'] = $inactivityTimeout;
}