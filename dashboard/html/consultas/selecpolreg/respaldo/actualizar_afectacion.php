<?php


ini_set('display_errors', 0);
error_reporting(0);
session_start();

$usuario = $_SESSION['usuario'] ?? 'desconocido';
$fecha_actual = date('Y-m-d H:i:s');

require '../../../conexion.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "msg" => "No se recibieron datos"]);
    exit;
}

$id = $data['id'] ?? null;
if (!$id) {
    echo json_encode(["status" => "error", "msg" => "ID inválido"]);
    exit;
}

// Validación opcional de fechas
if (!isset($data['fecha_inicio'], $data['fecha_fin'])) {
    echo json_encode(["status" => "error", "msg" => "Faltan fechas"]);
    exit;
}

try {
    $sql = '
    UPDATE "BENITO_JUAREZ"."Tipo_de_afectacion"
    SET 
        tipo = :tipo,
        tipo_afectacion = :tipo_afectacion,
        nivel = :nivel,
        periodo = :periodo,
        estatus = :estatus,
        fecha_inicio = :fecha_inicio,
        fecha_fin = :fecha_fin,
        descripcion = :descripcion,
        usuario_edito = :usuario,
        fecha_edito = :fecha
    WHERE id_afectacion = :id
    ';

    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':tipo' => $data['tipo'],
         ':tipo_afectacion' => $data['tipo_afectacion'],
        ':nivel' => $data['nivel'],
        ':periodo' => (int)$data['periodo'],
        ':estatus' => $data['estatus'],
        ':fecha_inicio' => $data['fecha_inicio'],
        ':fecha_fin' => $data['fecha_fin'],
        ':descripcion' => $data['descripcion'],
        ':usuario'=>$usuario,
        ':fecha' => $fecha_actual,
        ':id' => $id
    ]);
    $sql_hist = '
INSERT INTO "BENITO_JUAREZ"."Historial_Afectaciones"
(id_afectacion, usuario, accion, datos_json)
VALUES (:id_afectacion, :usuario, :accion, :datos_json)
';

$stmt_hist = $pdo->prepare($sql_hist);
$stmt_hist->execute([
    ':id_afectacion' => $id,
    ':usuario' => $usuario,
    ':accion' => 'EDICION',
    ':datos_json' => json_encode($data)  
]);
    
    echo json_encode(["status" => "ok"]);
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "msg" => $e->getMessage()
    ]);
}
?>