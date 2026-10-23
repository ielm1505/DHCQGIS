<?php
session_start();
require 'conexion.php'; 

// Configuración de timeout (inactividad en segundos)
$inactivityTimeout = 30*60; // 30 minutos

// Verificar última actividad
if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > $inactivityTimeout)) {
    if (isset($_SESSION['session_id'])) {
        $stmt = $pdo->prepare('UPDATE "Usuario"."ldap_sesion" 
            SET estado = :estado, fecha_salida = NOW() 
            WHERE id = :id');
        $stmt->execute(['estado' => 'cerrado', 'id' => $_SESSION['session_id']]);
    }
    session_unset();
    session_destroy();
    header('Location: logout.php');
    exit;
}

$_SESSION['last_activity'] = time();

if (!isset($_SESSION['usuario']) || !isset($_SESSION['rol'])) {
    header('Location: logout.php');
    exit;
}

/**
 * Verifica si el usuario tiene permisos para la página actual
 * usando la tabla "roles_permisos" de la base de datos.
 */
function checkRole($pdo) {
    if (!isset($_SESSION['rol'])) {
        die('No tienes sesión iniciada.');
    }

    $rol = $_SESSION['rol'];
    $archivo_actual = basename($_SERVER['PHP_SELF']); // nombre de la página PHP actual

    try {
        $stmt = $pdo->prepare('
            SELECT COUNT(*) AS permitido
            FROM "Usuario"."roles_permisosphp"
            WHERE rol = :rol AND archivo_php = :archivo
        ');
        $stmt->execute(['rol' => $rol, 'archivo' => $archivo_actual]);
        $resultado = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($resultado['permitido'] == 0) {
            die('Acceso denegado: no tienes permiso para esta página.');
        }
    } catch (PDOException $e) {
        die('Error al verificar permisos: ' . $e->getMessage());
    }
}

// Llamar a la función pasando $pdo
checkRole($pdo);

if (!isset($_SESSION['timeout'])) {
    $_SESSION['timeout'] = $inactivityTimeout;
}
?>








<?php
include '../../authh.php';

// Nombre del archivo actual
$archivo_actual = basename(__FILE__); // Ejemplo: "consulta_tuberias.php"

// Verificar permisos según la base de datos
checkRole($archivo_actual);
?>

