<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

require_once "../../../../conexion.php";

try{

    // =====================================
    // PARAMETROS
    // =====================================

    $id =
        isset($_GET['id'])
        ? intval($_GET['id'])
        : null;

    $fecha_inicio =
        isset($_GET['fecha_inicio']) &&
        $_GET['fecha_inicio'] != ''
        ? $_GET['fecha_inicio']
        : null;

    $fecha_fin =
        isset($_GET['fecha_fin']) &&
        $_GET['fecha_fin'] != ''
        ? $_GET['fecha_fin']
        : null;

    // =====================================
    // VALIDAR
    // =====================================

    if(
        !$id &&
        !$fecha_inicio &&
        !$fecha_fin
    ){

        echo json_encode([]);
        exit;

    }

    // =====================================
    // WHERE DINAMICO
    // =====================================

    $where = [];

    $params = [];

    // =====================================
    // FILTRO ID
    // =====================================

    if($id){

        $where[] =
            "a.id_afectacion = :id";

        $params[':id'] = $id;

    }

    // =====================================
    // FILTRO FECHA INICIO
    // =====================================

    if($fecha_inicio){

        $where[] =
            "DATE(a.fecha_inicio) >= :fecha_inicio";

        $params[':fecha_inicio'] =
            $fecha_inicio;

    }

    // =====================================
    // FILTRO FECHA FIN
    // =====================================

    if($fecha_fin){

        $where[] =
            "DATE(a.fecha_fin) <= :fecha_fin";

        $params[':fecha_fin'] =
            $fecha_fin;

    }

    // =====================================
    // SQL WHERE
    // =====================================

    $whereSQL = '';

    if(count($where) > 0){

        $whereSQL =
            'WHERE ' .
            implode(' AND ', $where);

    }

    // =====================================
    // CONSULTA
    // =====================================

    $sql = "

    SELECT

        a.id_afectacion,

        a.tipo,

        a.nivel,

        a.periodo,

        a.estatus,

        a.fecha_inicio,

        a.fecha_fin,

        a.tipo_afectacion,

        a.descripcion,

        a.usuario,

        a.usuario_edito,

        a.fecha_creo,

        a.fecha_edito,

        a.id_fta,

        a.elementos_afectados,

        ST_AsGeoJSON(a.geom) AS geom

    FROM
    \"BENITO_JUAREZ\".\"Tipo_de_afectacion\" a

    $whereSQL

    ORDER BY
        a.fecha_inicio DESC

    ";

    // =====================================
    // PREPARE
    // =====================================

    $stmt = $pdo->prepare($sql);

    // =====================================
    // BIND PARAMS
    // =====================================

    foreach($params as $key => $value){

        $stmt->bindValue(
            $key,
            $value
        );

    }

    // =====================================
    // EXECUTE
    // =====================================

    $stmt->execute();

    $resultado =
        $stmt->fetchAll(PDO::FETCH_ASSOC);

    // =====================================
    // FORMATEAR RESULTADOS
    // =====================================

    foreach($resultado as &$row){

        // =================================
        // JSONB ELEMENTOS AFECTADOS
        // =================================

        if(

            isset($row['elementos_afectados']) &&

            $row['elementos_afectados']

        ){

            if(
                is_string(
                    $row['elementos_afectados']
                )
            ){

                $decoded = json_decode(

                    $row['elementos_afectados'],

                    true

                );

                $row['elementos_afectados'] =

                    $decoded ?: [];

            }

        }else{

            $row['elementos_afectados'] = [];

        }

        // =================================
        // FECHAS
        // =================================

        $row['fecha_inicio'] =

            $row['fecha_inicio']
                ? date(
                    'Y-m-d H:i',
                    strtotime($row['fecha_inicio'])
                )
                : null;

        $row['fecha_fin'] =

            $row['fecha_fin']
                ? date(
                    'Y-m-d H:i',
                    strtotime($row['fecha_fin'])
                )
                : null;

        $row['fecha_creo'] =

            $row['fecha_creo']
                ? date(
                    'Y-m-d H:i',
                    strtotime($row['fecha_creo'])
                )
                : null;

        $row['fecha_edito'] =

            $row['fecha_edito']
                ? date(
                    'Y-m-d H:i',
                    strtotime($row['fecha_edito'])
                )
                : null;

    }

    // =====================================
    // RESPUESTA
    // =====================================

    echo json_encode(

        $resultado,

        JSON_UNESCAPED_UNICODE |
        JSON_UNESCAPED_SLASHES

    );

}catch(Exception $e){

    echo json_encode([

        "status"=>"error",

        "error"=>$e->getMessage()

    ]);

}
?>