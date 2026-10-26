<?php

header("Content-Type: application/json");

require_once "../../../conexion.php";

try {

    $sql = '
        SELECT
           
            fabricante,
            COUNT(*) AS total
        FROM "BENITO_JUAREZ"."ETL_x7_tecnica"
        WHERE TRIM(estatus_medidor) = :estatus
        AND fecha_retiro IS NULL
        GROUP BY fabricante
        ORDER BY total DESC
    ';

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":estatus" => "ALMACT"
    ]);

    $fabricantes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // total general
    $total = array_sum(
        array_column($fabricantes, "total")
    );

    echo json_encode([
        "total_medidores" => $total,
        "fabricantes" => $fabricantes
    ]);

} catch (Throwable $e) {

    echo json_encode([
        "error" => $e->getMessage()
    ]);
}
?>