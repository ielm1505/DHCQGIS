<?php
session_start();

// Cabeceras CORS
header("Access-Control-Allow-Origin: https://dhcqgis.aguakan.com");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-CSRF-TOKEN");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Validar CSRF
$headers = getallheaders();
$token = $headers['X-CSRF-TOKEN'] ?? '';

if (!$token || $token !== ($_SESSION['csrf_token'] ?? '')) {
    http_response_code(403);
    die("❌ Token CSRF inválido");
}

// Obtener XML
$xml_data = file_get_contents("php://input");
if (empty($xml_data)) {
    http_response_code(400);
    die("❌ No se recibió XML en el cuerpo");
}


$geoserver_url = "https://dhcqgis.aguakan.com/geoserver/wfs";
$username = "tu_usuario";
$password = "tu_password";

$ch = curl_init($geoserver_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $xml_data);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: text/xml",
    "Expect:"
]);
curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

// ✅ Verificación SSL con cacert.pem
curl_setopt($ch, CURLOPT_CAINFO, 'C:/xampp/apache/bin/curl-ca-bundle.crt');
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);


$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo "❌ Error cURL: " . curl_error($ch);
} else {
    echo $response;
}
curl_close($ch);
