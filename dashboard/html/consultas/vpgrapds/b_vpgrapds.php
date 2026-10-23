<?php
require_once "../../../conexion.php";
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['folio'])) {
    echo json_encode(["success"=>false,"error"=>"Folio requerido"]);
    exit;
}

$sql = "
    SELECT ruta_pdf 
    FROM \"FACTIBILIDAD\".\"pruebas_instalacion\" 
    WHERE folio = :folio
";

$stmt = $pdo->prepare($sql);
$stmt->execute([':folio' => $data['folio']]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if ($row && $row['ruta_pdf']) {
    echo json_encode([
        "success" => true,
        "ruta" => $row['ruta_pdf']
    ]);
} else {
    echo json_encode([
        "success" => false,
        "error" => "No se encontró PDF para ese folio"
    ]);
}