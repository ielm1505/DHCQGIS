<?php 

session_start();

require '../../../conexion.php';

header('Content-Type: application/json');

$data = json_decode(
    file_get_contents("php://input"),
    true
);

if(!$data){echo json_encode(["status"=>"error","msg"=>"Sin datos"]);

    exit;
}

// ===============================
// GEOMETRIA
// ===============================

$geom = json_encode($data["geom"]);

// ===============================
// ELEMENTOS SELECCIONADOS
// ===============================

$elementos = isset($data["elementos"])
    ? json_encode($data["elementos"])
    : json_encode([]);

// ===============================
// USUARIO
// ===============================

$usuario =
    $_SESSION['usuario']
    ?? 'desconocido';

$fecha_actual =
    date('Y-m-d H:i:s');

try{

    $pdo->beginTransaction();

    // ==================================
    // INSERT AFECTACION
    // ==================================

    $sql='

    INSERT INTO
    "BENITO_JUAREZ"."Tipo_de_afectacion"
    (

        geom,

        usuario,

        fecha_creo,

        elementos_afectados

    )

    VALUES(

        ST_Transform(

            ST_SetSRID(

                ST_GeomFromGeoJSON(:geom),

                3857

            ),

            32616

        ),

        :usuario,

        :fecha_creo,

        :elementos::jsonb

    )

    RETURNING id_afectacion

    ';

    $stmt=$pdo->prepare($sql);

    $stmt->execute([

        ":geom"=>$geom,

        ":usuario"=>$usuario,

        ":fecha_creo"=>$fecha_actual,

        ":elementos"=>$elementos

    ]);

    $id=$stmt->fetchColumn();

    // ==================================
    // HISTORIAL
    // ==================================

    $sql_hist='

    INSERT INTO
    "BENITO_JUAREZ"."Historial_Afectaciones"

    (

        id_afectacion,

        usuario,

        accion,

        datos_json

    )

    VALUES(

        :id_afectacion,

        :usuario,

        :accion,

        :datos_json

    )

    ';

    $stmt_hist=$pdo->prepare($sql_hist);

    $stmt_hist->execute([

        ":id_afectacion"=>$id,

        ":usuario"=>$usuario,

        ":accion"=>"CREACION",

        ":datos_json"=>json_encode([

            "geom"=>$data["geom"],

            "elementos"=>$data["elementos"]

        ])

    ]);

    $pdo->commit();

    echo json_encode([

        "status"=>"ok",

        "id"=>$id,

        "elementos"=>$data["elementos"]

    ]);

}catch(Exception $e){

    $pdo->rollBack();

    echo json_encode([

        "status"=>"error",

        "msg"=>$e->getMessage()

    ]);

}
?>