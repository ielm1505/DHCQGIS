<?php
require '../../conexion.php';
session_start();

header('Content-Type: application/json; charset=utf-8');

/*========================================
VALIDAR SESIÓN (opcional flexible)
========================================*/
if(!isset($_SESSION['usuario']) && !isset($_SESSION['desarrollador_id'])){
    echo json_encode(["type"=>"FeatureCollection","features"=>[]]);
    exit;
}

/*========================================
PARAMETROS
========================================*/
$id = $_GET['id'] ?? 0;
$tablaFiltro = $_GET['tabla'] ?? null;

/*
modo:
- aprobadas → solo aprobadas (default)
- todas → todo
*/
$modo = $_GET['modo'] ?? 'aprobadas';

if(!$id){
    echo json_encode(["type"=>"FeatureCollection","features"=>[]]);
    exit;
}

/*========================================
OBTENER TABLAS RELACIONADAS
========================================*/
$stmt = $pdo->prepare("
    SELECT DISTINCT tabla_afectada
    FROM dexterno_ap.detalle_cargas
    WHERE id_carga = ?
");
$stmt->execute([$id]);
$tablas = $stmt->fetchAll(PDO::FETCH_COLUMN);

if(!$tablas){
    echo json_encode(["type"=>"FeatureCollection","features"=>[]]);
    exit;
}

$features = [];

/*========================================
RECORRER TABLAS
========================================*/
foreach($tablas as $tabla){

    $tabla = trim($tabla);
    if(!$tabla) continue;

    // filtro por tabla (🔥 clave para visor por capas)
    if($tablaFiltro && $tablaFiltro !== $tabla){
        continue;
    }

    $tablaCompleta = "dexterno_ap.".$tabla;

    /*====================================
    BUSCAR CAMPO GEOMETRIA
    ====================================*/
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

    if(!$geom) continue;

    /*====================================
    FILTRO ESTATUS
    ====================================*/
    $where = "id_carga = ?";
    $params = [$id];

    if($modo === 'aprobadas'){
        $where .= " AND estatus_validacion = 'APROBADO'";
    }

    /*====================================
    CONSULTA
    ====================================*/
    $sql = "
        SELECT 
            ST_AsGeoJSON(ST_Transform($geom,4326)) as geojson
        FROM $tablaCompleta
        WHERE $where
    ";

    try{

        $q = $pdo->prepare($sql);
        $q->execute($params);

        while($r = $q->fetch(PDO::FETCH_ASSOC)){

            if(empty($r['geojson'])) continue;

            $geometry = json_decode($r['geojson'], true);
            if(!$geometry) continue;

            $features[] = [
                "type"=>"Feature",
                "geometry"=>$geometry,
                "properties"=>[
                    "tabla"=>$tabla,
                    "id_carga"=>$id
                ]
            ];
        }

    }catch(Exception $e){
        // evita romper JSON
        error_log("Error en $tabla: ".$e->getMessage());
        continue;
    }
}

/*========================================
SALIDA FINAL LIMPIA
========================================*/
echo json_encode([
    "type"=>"FeatureCollection",
    "features"=>$features
], JSON_UNESCAPED_UNICODE);

exit;
?>