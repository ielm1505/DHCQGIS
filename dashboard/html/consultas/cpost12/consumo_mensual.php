<?php

header("Content-Type: application/json");

require_once "../../../conexion.php";

try {

    $sql = '
        SELECT
            ano,
            mes,
            SUM(total_cns) AS total
        FROM "BENITO_JUAREZ".consumo_mensual_ap
        GROUP BY ano, mes
        ORDER BY ano, mes
    ';

    $stmt = $pdo->prepare($sql);

    $stmt->execute();

    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $data = [];

    foreach ($rows as $row) {

        $data[] = [
            "ano"   => (int)$row["ano"],
            "mes"   => (int)$row["mes"],
            "total" => (float)$row["total"]
        ];
    }

    echo json_encode($data);

} catch (Exception $e) {

    echo json_encode([
        "error" => $e->getMessage()
    ]);
}
?>