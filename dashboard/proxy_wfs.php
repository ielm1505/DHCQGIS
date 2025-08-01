<?php
session_start();

if (!isset($_SESSION['usuario'])) {
    http_response_code(403);
    echo "No autorizado";
    exit();
}

$usuario = $_SESSION['usuario'];
$rol = $_SESSION['rol'] ?? '';

if (!in_array(strtoupper($rol), ['EDITOR', 'ADMIN'])) {
    http_response_code(403);
    echo "Sin permisos de edición";
    exit();
}

function obtenerPasswordUsuario($usuario) {
    include('/dashboard/conexion.php'); 
    global $pdo;
    $query = 'SELECT pass FROM "Usuario"."Registro" WHERE usuario = :usuario';
    $stmt = $pdo->prepare($query);
    $stmt->execute(['usuario' => $usuario]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    return $row ? $row['pass'] : null;
}

$password = obtenerPasswordUsuario($usuario);
if (!$password) {
    http_response_code(403);
    echo "Usuario sin contraseña registrada en GeoServer";
    exit();
}

// Leer XML entrante
$xml = file_get_contents("php://input");

// Guardar XML recibido para depuración
file_put_contents("/tmp/request_wfs.xml", $xml);

$ch = curl_init("https://dhcqgis.aguakan.com/geoserver/wfs");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: text/xml"]);
curl_setopt($ch, CURLOPT_USERPWD, "$usuario:$password");
curl_setopt($ch, CURLOPT_POSTFIELDS, $xml);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

// Guardar respuesta de GeoServer para depuración
file_put_contents("/tmp/response_wfs.xml", $response);

if ($response === false) {
    http_response_code(500);
    echo "Error al conectar con GeoServer: " . curl_error($ch);
    curl_close($ch);
    exit();
}

$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($httpcode);
header("Content-Type: application/xml; charset=UTF-8");
echo $response;
