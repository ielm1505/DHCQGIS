<?php

header("Content-Type: application/json");

require_once "../../../conexion.php";

try {

    // =========================
    // FILTROS
    // =========================
    $centro = isset($_GET["centro"]) &&
               trim($_GET["centro"]) !== "" &&
               $_GET["centro"] !== "Todas"
        ? $_GET["centro"]
        : null;

    $sm = isset($_GET["sm"]) &&
          trim($_GET["sm"]) !== "" &&
          $_GET["sm"] !== "Todas"
        ? $_GET["sm"]
        : null;

    // =========================
    // SQL BASE
    // =========================
    $sql = '
        SELECT
            t.fabricante,
            COUNT(*) AS total

        FROM "BENITO_JUAREZ"."ETL_x7_tecnica" t

        INNER JOIN "BENITO_JUAREZ"."ETL_x7_dbase" cl
            ON t.idtsqcgnr = cl.idtsqcgnr::bigint

        WHERE
            TRIM(t.estatus_medidor) = :estatus
            AND t.fecha_retiro IS NULL
    ';

    $params = [
        ":estatus" => "ALMACT"
    ];

    // =========================
    // FILTRO CENTRO
    // =========================
    if ($centro !== null) {

        $sql .= '
            AND TRIM(cl.centro_oper_desc) = TRIM(:centro)
        ';

        $params[":centro"] = $centro;
    }

    // =========================
    // FILTRO SM
    // =========================
    if ($sm !== null) {

        $sql .= '
            AND TRIM(cl.sm::text) = TRIM(:sm)
        ';

        $params[":sm"] = $sm;
    }

    // =========================
    // GROUP
    // =========================
    $sql .= '
        GROUP BY t.fabricante
        ORDER BY total DESC
    ';

    $stmt = $pdo->prepare($sql);

    $stmt->execute($params);

    $fabricantes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // =========================
    // TOTAL
    // =========================
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