<?php

header("Content-Type: application/json");

require_once "../../../conexion.php";

try {

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

    $sql = '

        SELECT
            date_trunc(\'month\', c.datclc)::date AS periodo,
            COUNT(*) AS total_registros,
            SUM(c.cns) AS total

        FROM "BENITO_JUAREZ"."ETL_consumo_historico_X7" c

        INNER JOIN "BENITO_JUAREZ"."ETL_x7_dbase" x
            ON c.idtctr = x.contrato
           AND c.idtclt = x.cliente

        WHERE c.cns IS NOT NULL

    ';

    $params = [];

    if ($centro !== null) {

        $sql .= ' AND x.centro_oper_desc = :centro ';
        $params[":centro"] = $centro;

    }

    if ($sm !== null) {

        $sql .= ' AND x.sm = :sm ';
        $params[":sm"] = $sm;

    }

    $sql .= '

        GROUP BY periodo
        ORDER BY periodo

    ';

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $data = [];

    foreach ($rows as $row) {

        $fecha = new DateTime($row["periodo"]);

        $data[] = [

            "ano" => (int)$fecha->format("Y"),
            "mes" => (int)$fecha->format("m"),
            "total_registros" => (int)$row["total_registros"],
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