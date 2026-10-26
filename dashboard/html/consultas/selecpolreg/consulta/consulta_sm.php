<?php

ini_set('display_errors',1);
error_reporting(E_ALL);

header("Content-Type: application/json");

require_once "../../../../conexion.php";

try{

    // ============================
    // VALIDAR
    // ============================

    if(
        !isset($_GET['sm'])
    ){

        echo json_encode([]);
        exit;

    }

    $sm = trim($_GET['sm']);

    // ============================
    // CONSULTA
    // ============================

    $sql = "

    SELECT

        id_sm,

        sm,

        ST_AsGeoJSON(geom) AS geom

    FROM
    \"BENITO_JUAREZ\".\"SM\"

    WHERE

        UPPER(sm) = UPPER(:sm)

    ";

    $stmt =
        $pdo->prepare($sql);

    $stmt->bindParam(
        ':sm',
        $sm
    );

    $stmt->execute();

    $resultado =
        $stmt->fetchAll(
            PDO::FETCH_ASSOC
        );

    echo json_encode(

        $resultado,

        JSON_UNESCAPED_UNICODE |
        JSON_UNESCAPED_SLASHES

    );

}catch(Exception $e){

    echo json_encode([

        "error"=>$e->getMessage()

    ]);

}
?>