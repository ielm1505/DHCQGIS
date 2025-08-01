<?php

date_default_timezone_set('America/Cancun'); 

include('conexion.php'); 
session_start(); // Iniciar sesión

// Verificar si los datos están presentes
if (!isset($_POST["txtusuario"], $_POST["txtpassword"])) {
    die("Faltan datos en la solicitud.");
}

$usu  = trim($_POST["txtusuario"]);
$pass = trim($_POST["txtpassword"]);

if (empty($usu) || empty($pass)) {
    die("Todos los campos son obligatorios.");
}

try {
    // Consulta para obtener el usuario y su rol
    $query = 'SELECT pass, rol FROM "Usuario"."Registro" WHERE usuario = :usuario';
    $stmt = $pdo->prepare($query);
    $stmt->execute(['usuario' => $usu]);

    // Verificar si el usuario existe
    if ($stmt->rowCount() == 0) {
        die("El usuario no existe en la base de datos.");
    }

    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $pass_db = $row["pass"]; // Contraseña guardada (en texto plano)
    $rol = $row["rol"];

    // Comparar contraseñas directamente (sin hash)
    if ($pass !== $pass_db) {
        die("Contraseña incorrecta.");
    }

    // Guardar en sesión
    $_SESSION["usuario"] = $usu;
    $_SESSION["password"] = $pass;
    $_SESSION["rol"] = $rol;

    // Registrar log de ingreso
    $ahora = date("Y-m-d H:i:s");
    $ip = $_SERVER['REMOTE_ADDR'];
    $logQuery = 'INSERT INTO "Usuario"."Logs" (usuario, fecha_ingreso, ip) VALUES (:usuario, :fecha, :ip)';
    $logStmt = $pdo->prepare($logQuery);
    $logStmt->execute(['usuario' => $usu, 'fecha' => $ahora, 'ip' => $ip]);

    // Redirigir según el rol
    if ($rol == "Admin") {
        header("Location: http://dhcqgis.aguakan.com/GIS");
    } else {
        header("Location: http://dhcqgis.aguakan.com/geo");
    }
    exit;

} catch (PDOException $e) {
    echo "Error en la consulta: " . $e->getMessage();
}
?>
