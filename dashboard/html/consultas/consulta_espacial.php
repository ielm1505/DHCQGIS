<?php 
header('Content-Type: application/json; charset=utf-8');

try {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!isset($input['wkt'])) {
        echo json_encode([
            'geojsonAP' => ['type' => 'FeatureCollection', 'features' => []],
            'geojsonAS' => ['type' => 'FeatureCollection', 'features' => []],
            'conteo_puntos' => 0,
            'longitudes' => [],
            'error' => 'No se recibió geometría WKT'
        ]);
        exit;
    }

    $wkt = $input['wkt']; // EPSG:3857

    require_once('../../conexion.php'); 

    // --- Tuberías AP ---
    $sqlAEP = "
        SELECT jsonb_agg(
            jsonb_build_object(
                'type', 'Feature',
                'geometry', ST_AsGeoJSON(geom)::jsonb,
                'properties', to_jsonb(t) - 'geom' || jsonb_build_object(
                    'Longitud', ST_Length(ST_Transform(geom, 32616)),
                    'Tipo_de_Re', 'Agua Potable'
                )
            )
        ) AS features,
        SUM(ST_Length(ST_Transform(geom, 32616))) AS total_longitud
        FROM \"BENITO_JUAREZ\".\"AEP_CANA_AP\" t
        WHERE ST_Intersects(
            geom,
            ST_Transform(ST_GeomFromText(:wkt, 3857), 32616)
        );
    ";

    $stmt = $pdo->prepare($sqlAEP);
    $stmt->execute(['wkt' => $wkt]);
    $resultAEP = $stmt->fetch(PDO::FETCH_ASSOC);
    $geojsonAP = $resultAEP && $resultAEP['features'] ? json_decode($resultAEP['features'], true) : [];
    $longAP = $resultAEP && $resultAEP['total_longitud'] ? floatval($resultAEP['total_longitud']) : 0;

    // --- Tuberías AS ---
    $sqlASS = "
        SELECT jsonb_agg(
            jsonb_build_object(
                'type', 'Feature',
                'geometry', ST_AsGeoJSON(geom)::jsonb,
                'properties', to_jsonb(t) - 'geom' || jsonb_build_object(
                    'Longitud', ST_Length(ST_Transform(geom, 32616)),
                    'type_res', 'Drenaje Sanitario'
                )
            )
        ) AS features,
        SUM(ST_Length(ST_Transform(geom, 32616))) AS total_longitud
        FROM \"BENITO_JUAREZ\".\"Ass_cana\" t
        WHERE ST_Intersects(
            geom,
            ST_Transform(ST_GeomFromText(:wkt, 3857), 32616)
        );
    ";

    $stmt = $pdo->prepare($sqlASS);
    $stmt->execute(['wkt' => $wkt]);
    $resultASS = $stmt->fetch(PDO::FETCH_ASSOC);
    $geojsonAS = $resultASS && $resultASS['features'] ? json_decode($resultASS['features'], true) : [];
    $longAS = $resultASS && $resultASS['total_longitud'] ? floatval($resultASS['total_longitud']) : 0;

      // --- PUNTOS POR USO_DESC ---
    $sqlPuntos = "
        SELECT uso_desc, COUNT(*) AS total
        FROM \"BENITO_JUAREZ\".\"vista_x7_aep\" p
        WHERE ST_Intersects(
            geom,
            ST_Transform(ST_GeomFromText(:wkt, 3857), 32616)
        )
        GROUP BY uso_desc
        ORDER BY total DESC;
    ";
    $stmt = $pdo->prepare($sqlPuntos);
    $stmt->execute(['wkt' => $wkt]);
    $resultPuntos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // --- Procesar resultados ---
    $labels = [];
    $values = [];
    foreach ($resultPuntos as $row) {
        $labels[] = $row['uso_desc'] ?: 'Desconocido';
        $values[] = (int)$row['total'];
    }
    $conteoPuntos = array_sum($values);

    // --- Longitudes totales (ya definidas antes en tu código) ---
    $longitudes = [
        'Agua Potable' => round($longAP, 2),
        'Drenaje Sanitario' => round($longAS, 2)
        
    ];

    // --- Respuesta final ---
    echo json_encode([
        'geojsonAP' => ['type'=>'FeatureCollection','features'=>$geojsonAP],
        'geojsonAS' => ['type'=>'FeatureCollection','features'=>$geojsonAS],
        'conteo_puntos' => $conteoPuntos,
        'longitudes' => $longitudes,
        'grafica_puntos' => [
            'labels' => $labels,
            'values' => $values
        ]
    ], JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    echo json_encode([
        'geojsonAP' => ['type'=>'FeatureCollection','features'=>[]],
        'geojsonAS' => ['type'=>'FeatureCollection','features'=>[]],
        'conteo_puntos' => 0,
        'longitudes' => [],
        'grafica_puntos' => ['labels'=>[], 'values'=>[]],
        'error' => 'Error en Postgres: '.$e->getMessage()
    ]);
} catch (Exception $e) {
    echo json_encode([
        'geojsonAP' => ['type'=>'FeatureCollection','features'=>[]],
        'geojsonAS' => ['type'=>'FeatureCollection','features'=>[]],
        'conteo_puntos' => 0,
        'longitudes' => [],
        'grafica_puntos' => ['labels'=>[], 'values'=>[]],
        'error' => $e->getMessage()
    ]);
}
?>