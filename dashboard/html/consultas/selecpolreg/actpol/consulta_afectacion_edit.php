
<?php

ini_set('display_errors',1);
error_reporting(E_ALL);

header("Content-Type: application/json");

require_once "../../../../conexion.php";

try{

    if(
        !isset($_GET['id']) ||
        $_GET['id']===''
    ){
        echo json_encode([]);
        exit;
    }
    $id =
        intval($_GET['id']);
    $sql = "
    SELECT

        a.id_afectacion,
        a.tipo,
        a.estatus,
        a.descripcion,
       a.usuario,
        a.fecha_inicio,
        a.fecha_fin,
        a.elementos_afectados,
        ST_AsGeoJSON(
            a.geom
        ) AS geom
    FROM
    \"BENITO_JUAREZ\".\"Tipo_de_afectacion\" a

    WHERE
        a.id_afectacion = :id
    LIMIT 1
    ";
    $stmt =
        $pdo->prepare($sql);
    $stmt->bindValue(
        ':id',
        $id,
        PDO::PARAM_INT
    );
    $stmt->execute();
    $row =
        $stmt->fetch(
            PDO::FETCH_ASSOC
        );
    if(!$row){
        echo json_encode([]);
        exit;
    }
    if(
        isset(
            $row['elementos_afectados']
        ) &&
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
    if($row['fecha_inicio']){
        $row['fecha_inicio'] =
            date(
                'Y-m-d H:i',
                strtotime(
                    $row['fecha_inicio']
                )
            );
    }

    if($row['fecha_fin']){
        $row['fecha_fin'] =
            date(
                'Y-m-d H:i',
                strtotime(
                    $row['fecha_fin']
                )
            );
    }
       echo json_encode(
        [$row],
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
