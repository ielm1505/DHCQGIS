<?php
require '../../../conexion.php';
header('Content-Type: application/json');

try {

    $sql = "
        SELECT code, motivo
        FROM \"BENITO_JUAREZ\".\"motivo_ap_ds\"
        ORDER BY motivo ASC
    ";

    $stmt = $pdo->query($sql);
    $motivos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'ok' => true,
        'data' => $motivos
    ]);

} catch (PDOException $e) {

    echo json_encode([
        'ok' => false,
        'msg' => 'Error al cargar motivos',
        'detalle' => $e->getMessage()
    ]);
}
