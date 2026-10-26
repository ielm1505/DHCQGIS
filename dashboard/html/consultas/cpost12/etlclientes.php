<?php

header("Content-Type: application/json");

require_once "../../../conexion.php";

try {

    $sql = '
        SELECT
            idtsqcgnr,
            cliente,
            centro_oper_desc,
            sm,
            uso_desc,
            saldo,
            suscripcion
        FROM "BENITO_JUAREZ"."ETL_x7_dbase"
    ';

    $stmt = $pdo->prepare($sql);

    $stmt->execute();

    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($rows);

} catch (Exception $e) {

    echo json_encode([
        "error" => $e->getMessage()
    ]);
}
?>