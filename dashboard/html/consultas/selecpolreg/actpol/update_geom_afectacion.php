<?php

ini_set('display_errors',1);
error_reporting(E_ALL);

header('Content-Type: application/json');

require_once "../../../../conexion.php";

try {

    $data = json_decode(file_get_contents("php://input"), true);

    $id = intval($data["id"] ?? 0);

    if(!$id){
        throw new Exception("ID inválido");
    }

    $geom = $data["geom"] ?? "";

    $agregar = $data["agregar"] ?? [];
    $eliminar = $data["eliminar"] ?? [];

    $sql = '
        UPDATE "BENITO_JUAREZ"."Tipo_de_afectacion"
        SET geom = ST_SetSRID(ST_GeomFromGeoJSON(:geom),32616)
        WHERE id_afectacion = :id
    ';

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":geom" => $geom,
        ":id" => $id
    ]);

    $sql2 = '
        SELECT elementos_afectados
        FROM "BENITO_JUAREZ"."Tipo_de_afectacion"
        WHERE id_afectacion = :id
    ';

    $stmt2 = $pdo->prepare($sql2);
    $stmt2->execute([":id" => $id]);

    $row = $stmt2->fetch(PDO::FETCH_ASSOC);

    $actuales = json_decode($row["elementos_afectados"] ?? "[]", true) ?? [];

    $mapa = [];

    foreach($actuales as $e){
        $mapa[$e["tipo"]."_".$e["valor"]] = $e;
    }
 
    foreach($agregar as $e){
        $mapa[$e["tipo"]."_".$e["valor"]] = $e;
    }

     foreach($eliminar as $e){
        unset($mapa[$e["tipo"]."_".$e["valor"]]);
    }

    $resultado = array_values($mapa);

    $sql3 = '
        UPDATE "BENITO_JUAREZ"."Tipo_de_afectacion"
        SET elementos_afectados = :json::jsonb
        WHERE id_afectacion = :id
    ';

    $stmt3 = $pdo->prepare($sql3);

    $stmt3->execute([
        ":json" => json_encode($resultado, JSON_UNESCAPED_UNICODE),
        ":id" => $id
    ]);

    echo json_encode([
        "status" => "ok",
        "total" => count($resultado)
    ]);

}catch(Throwable $e){

    http_response_code(500);

    echo json_encode([
        "status" => "error",
        "detalle" => $e->getMessage()
    ]);
}
?>