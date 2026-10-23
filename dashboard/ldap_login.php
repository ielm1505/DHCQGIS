<?php
require 'conexion.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $username = trim($_POST['username']);
    $password = trim($_POST['password']);
    $ip = $_SERVER['REMOTE_ADDR'];

    $authenticated = false;
    $rol = null;
    $html = null;
    $dev = null; // 👈 importante

    // =========================
    // 🔹 1. USUARIO INTERNO
    // =========================
    $stmt = $pdo->prepare('
        SELECT id, contrasena, rol, html, activo 
        FROM "Usuario"."usuario_externo" 
        WHERE usuario = :usuario
    ');
    $stmt->execute(['usuario' => $username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && $user['activo'] && password_verify($password, $user['contrasena'])) {
        $authenticated = true;
        $rol = $user['rol'];
        $html = $user['html'];
    }

    // =========================
    // 🔹 2. DESARROLLADORES
    // =========================
    if (!$authenticated) {
        $stmt = $pdo->prepare('
            SELECT id, contrasena, html, nombre_empresa 
            FROM dexterno_ap.desarrolladores 
            WHERE usuario = :usuario
        ');
        $stmt->execute(['usuario' => $username]);
        $dev = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($dev && password_verify($password, $dev['contrasena'])) {
            $authenticated = true;
            $rol = 'Desarrollador';
            $html = $dev['html'] ?: 'cargazip/index.php';
        }
    }

    // =========================
    // 🔹 3. LDAP
    // =========================
    if (!$authenticated) {

        $ldapServer = "ldap://192.168.223.19";
        $ldapDomain = "aguakan.mx";

        $ldapConn = @ldap_connect($ldapServer, 389);

        if ($ldapConn) {
            ldap_set_option($ldapConn, LDAP_OPT_PROTOCOL_VERSION, 3);
            ldap_set_option($ldapConn, LDAP_OPT_REFERRALS, 0);

            $ldapUser = $username . "@" . $ldapDomain;

            if (@ldap_bind($ldapConn, $ldapUser, $password)) {

                $stmt = $pdo->prepare('
                    SELECT rol, html 
                    FROM "Usuario".ldap_registro 
                    WHERE usuario = :usuario
                ');
                $stmt->execute(['usuario' => $username]);
                $data = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($data) {
                    $authenticated = true;
                    $rol = $data['rol'];
                    $html = $data['html'];
                }
            }
        }
    }

    // =========================
    // 🔐 SESIÓN FINAL
    // =========================
    if ($authenticated) {

        // 🔹 Tipo de usuario
        if ($rol === 'Desarrollador' && $dev) {

            $_SESSION['desarrollador_id'] = $dev['id'];
            $_SESSION['empresa'] = $dev['nombre_empresa'];
            $_SESSION['tipo_usuario'] = 'desarrollador';

        } else {

            $_SESSION['tipo_usuario'] = 'interno';
        }

        // 🔐 Cerrar sesiones previas
        $stmt = $pdo->prepare('
            UPDATE "Usuario".ldap_sesion 
            SET estado = :cerrado, fecha_salida = NOW() 
            WHERE usuario = :usuario AND estado = :activo
        ');
        $stmt->execute([
            'cerrado' => 'cerrado',
            'usuario' => $username,
            'activo' => 'activo'
        ]);

        // 🔐 Nueva sesión
        $token = bin2hex(random_bytes(16));

        $stmt = $pdo->prepare('
            INSERT INTO "Usuario".ldap_sesion 
            (usuario, fecha_ingreso, ip, estado, session_token)
            VALUES (:usuario, NOW(), :ip, :estado, :token)
            RETURNING id
        ');
        $stmt->execute([
            'usuario' => $username,
            'ip' => $ip,
            'estado' => 'activo',
            'token' => $token
        ]);

        $sessionId = $stmt->fetchColumn();

        // 🧠 Variables de sesión
        $_SESSION['usuario'] = $username;
        $_SESSION['rol'] = $rol;
        $_SESSION['session_id'] = $sessionId;
        $_SESSION['session_token'] = $token;
        $_SESSION['last_activity'] = time();
        $_SESSION['timeout'] = 1800;

        header("Location: $html");
        exit;
    }

    header("Location: index.html?error=Usuario o contraseña incorrectos");
    exit;
}