<?php

require '../../conexion.php';

header('Content-Type: application/json; charset=utf-8');

$id = $_GET['id'] ?? 0;

if(!$id){
    echo json_encode(["type"=>"FeatureCollection","features"=>[]]);
    exit;
}

/*=========================================================
OBTENER TABLAS RELACIONADAS
=========================================================*/
$stmt = $pdo->prepare("
    SELECT tabla_afectada
    FROM dexterno_ap.detalle_cargas
    WHERE id_carga = ?
");
$stmt->execute([$id]);
$tablas = $stmt->fetchAll(PDO::FETCH_COLUMN);

if(!$tablas){
    echo json_encode(["type"=>"FeatureCollection","features"=>[]]);
    exit;
}

$allFeatures = [];

foreach($tablas as $tabla){

    $tabla = trim($tabla);
    if(!$tabla) continue;

    $tablaCompleta = "dexterno_ap.".$tabla;

    /*=====================================================
    BUSCAR COLUMNA GEOM
    =====================================================*/
    $geomQ = $pdo->prepare("
        SELECT column_name
        FROM information_schema.columns
        WHERE table_schema='dexterno_ap'
        AND table_name=?
        AND udt_name='geometry'
        LIMIT 1
    ");
    $geomQ->execute([$tabla]);
    $geom = $geomQ->fetchColumn();

    if(!$geom){
        continue;
    }

    /*=====================================================
    EXTRAER GEOMETRIAS
    =====================================================*/
    $sql = "
        SELECT 
            ST_AsGeoJSON(ST_Transform($geom,4326)) as geojson
        FROM $tablaCompleta
        WHERE id_carga = ?
    ";

    $q = $pdo->prepare($sql);
    $q->execute([$id]);

    while($r = $q->fetch(PDO::FETCH_ASSOC)){

        if(!$r['geojson']) continue;

        $geometry = json_decode($r['geojson'],true);

        if(!$geometry) continue;

        $allFeatures[] = [
            "type"=>"Feature",
            "geometry"=>$geometry,
            "properties"=>[
                "tabla"=>$tabla,
                "id_carga"=>$id
            ]
        ];
    }
}

/*=========================================================
SALIDA FINAL
=========================================================*/
echo json_encode([
    "type"=>"FeatureCollection",
    "features"=>$allFeatures
],JSON_UNESCAPED_UNICODE);
?>