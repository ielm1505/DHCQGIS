<?php
require 'conexion.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);
    $ip = $_SERVER['REMOTE_ADDR'];

    // Configuración LDAP
    $ldapServer = "ldap://192.168.223.19";
    $ldapPort   = 389; // 636 si es LDAPS
    $ldapDomain = "aguakan.mx";

    $ldapConn = ldap_connect($ldapServer, $ldapPort);
    ldap_set_option($ldapConn, LDAP_OPT_PROTOCOL_VERSION, 3);
    ldap_set_option($ldapConn, LDAP_OPT_REFERRALS, 0);

    $ldapUser = $username . "@" . $ldapDomain;

    if (@ldap_bind($ldapConn, $ldapUser, $password)) {

       
        $pdo->exec('SET search_path TO "Usuario"');

   
        $stmt = $pdo->prepare('SELECT rol, html FROM ldap_registro WHERE usuario = :usuario');
        $stmt->execute(['usuario' => $username]);
        $userData = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($userData) {
            $rol = $userData['rol'];
            $html = $userData['html'];

            
            $stmtUpdate = $pdo->prepare('
                UPDATE ldap_sesion 
                SET fecha_salida = NOW(), estado = :cerrado 
                WHERE usuario = :usuario AND estado = :activo
            ');
            $stmtUpdate->execute([
                'cerrado' => 'cerrado',
                'usuario' => $username,
                'activo' => 'activo'
            ]);

            
            $sessionToken = bin2hex(random_bytes(16));

            
            $stmtInsert = $pdo->prepare('
                INSERT INTO ldap_sesion (usuario, fecha_ingreso, ip, estado, session_token)
                VALUES (:usuario, NOW(), :ip, :estado, :token)
                RETURNING id
            ');
            $stmtInsert->execute([
                'usuario' => $username,
                'ip' => $ip,
                'estado' => 'activo',
                'token' => $sessionToken
            ]);

            $sessionId = $stmtInsert->fetchColumn();

            
            $_SESSION['usuario'] = $username;
            $_SESSION['rol'] = $rol;
            $_SESSION['session_id'] = $sessionId;
            $_SESSION['session_token'] = $sessionToken;
            $_SESSION['last_activity'] = time();
            $_SESSION['timeout'] = 1800; // 30 min

            header("Location: $html");
            exit;

        } else {
            $error = "Usuario no registrado en la base de datos";
            header("Location: index.html?error=" . urlencode($error));
            exit;
        }

    } else {
        $error = "Usuario no Identificado";
        header("Location: index.html?error=" . urlencode($error));
        exit;
    }
} else {
    header("Location: index.html");
    exit;
}
?>
