<?php

include '../../../authh.php';
checkRole(['Admin','Editor','comercial']);


require '../../../conexion.php';
header('Content-Type: application/json');

try {

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        echo json_encode(['ok'=>false,'msg'=>'Método incorrecto']);
        exit;
    }

    $x        = $_POST['x'] ?? null;
    $y        = $_POST['y'] ?? null;
    $cliente  = $_POST['cliente'] ?? null;
    $contrato = $_POST['contrato'] ?? null;
    $nombre   = $_POST['nombre'] ?? null;
    $tipo_de_afectacion = $_POST['tipo_de_afectacion'] ?? null;
    $fecha    = $_POST['fecha'] ?? date('Y-m-d');

$fechaHoy = date('Y-m-d');

if ($fecha > $fechaHoy) {
    echo json_encode([
        'ok' => false,
        'msg' => 'La fecha no puede ser mayor al día de hoy'
    ]);
    exit;
}

    if (!$x || !$y) {
        echo json_encode(['ok'=>false,'msg'=>'Coordenadas no válidas']);
        exit;
    }

    $sqlRadio = "
        SELECT 1
        FROM \"BENITO_JUAREZ\".\"Registro_de_afectacion\"
        WHERE ST_DWithin(
            geom,
            ST_Transform(ST_SetSRID(ST_Point(:x,:y),4326),32616),
            50
        )
        LIMIT 1
    ";

    $stmt = $pdo->prepare($sqlRadio);
    $stmt->execute([':x'=>$x, ':y'=>$y]);
    $existeEnRadio = $stmt->fetch();




$sqlAfect = "
    SELECT id_afectacion, tipo, nivel, periodo,
           estatus, fecha_inicio, fecha_fin, \"desc\",
           ST_AsGeoJSON(ST_Transform(geom,4326)) as geom_json
    FROM \"BENITO_JUAREZ\".\"Tipo_de_afectacion\"
    WHERE 
        ST_Intersects(
            geom,
            ST_Transform(ST_SetSRID(ST_Point(:x,:y),4326),32616)
        )
        AND estatus = 'Activo'
    LIMIT 1
";





//------------VALIDAR ORDEN DE TRABAJO EN reclamos_DS y reclamos_ap

$sqlOrdenTrabajo = "
    SELECT origen
    FROM (
        SELECT 'reclamos_DS' as origen, geom
        FROM \"BENITO_JUAREZ\".\"reclamos_DS\"

        UNION ALL

        SELECT 'reclamos_ap' as origen, geom
        FROM \"BENITO_JUAREZ\".\"reclamos_ap\"
    ) t
    WHERE ST_DWithin(
        t.geom,
        ST_Transform(ST_SetSRID(ST_Point(:x,:y),4326),32616),
        50
    )
    LIMIT 1
";

$stmt = $pdo->prepare($sqlOrdenTrabajo);
$stmt->execute([
    ':x'=>$x,
    ':y'=>$y
]);

$ordenTrabajo = $stmt->fetch(PDO::FETCH_ASSOC);
$existeOrdenTrabajo = $ordenTrabajo ? true : false;

//____________________

    $stmt = $pdo->prepare($sqlAfect);
    $stmt->execute([':x'=>$x, ':y'=>$y]);
    $afectacion = $stmt->fetch(PDO::FETCH_ASSOC);

    $sqlX7 = "
        SELECT 1
        FROM \"BENITO_JUAREZ\".\"vista_x7_aep\"
        WHERE cliente = :cliente
          AND contrato = :contrato
        LIMIT 1
    ";

    $stmt = $pdo->prepare($sqlX7);
    $stmt->execute([
        ':cliente'=>$cliente,
        ':contrato'=>$contrato
    ]);
    $x7Existe = $stmt->fetch();

   //________________

if ($existeOrdenTrabajo) {

    $estatusFinal = 'PENDIENTE';

} elseif ($existeEnRadio) {

    $estatusFinal = 'REVISIÓN';

} else {

    $estatusFinal = $x7Existe ? 'REVISION' : 'PENDIENTE';
}

   //-------------------

        $sqlCount = "
        SELECT COUNT(*) as total
        FROM \"BENITO_JUAREZ\".\"Registro_de_afectacion\"
        WHERE DATE(fecha) = CURRENT_DATE
    ";
    $stmt = $pdo->query($sqlCount);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $consecutivo = str_pad($row['total'] + 1, 4, "0", STR_PAD_LEFT);
    $codigoSeguimiento = "AF-" . date("Ymd") . "-" . $consecutivo;

       $sqlInsert = "
        INSERT INTO \"BENITO_JUAREZ\".\"Registro_de_afectacion\"
        (codigo_seguimiento, cliente, contrato, fecha, estatus, nombre,
         tipo_de_afectacion, geom)
        VALUES
        (
            :codigo,
            :cliente,
            :contrato,
            :fecha,
            :estatus,
            :nombre,
            :tipo_de_afectacion,
            ST_Transform(ST_SetSRID(ST_Point(:x,:y),4326),32616)
        )
    ";

    $stmt = $pdo->prepare($sqlInsert);
    $stmt->execute([
        ':codigo'=>$codigoSeguimiento,
        ':cliente'=>$cliente,
        ':contrato'=>$contrato,
        ':fecha'=>$fecha,
        ':estatus'=>$estatusFinal,
        ':nombre'=>$nombre,
        ':tipo_de_afectacion'=>$tipo_de_afectacion,
        ':x'=>$x,
        ':y'=>$y
    ]);

    //------------

$msgFinal = '';

if ($existeOrdenTrabajo) {

    $msgFinal = '🔴 Ya se tiene Orden de trabajo asignado en la zona';

} elseif ($existeEnRadio) {

    $msgFinal = '⚠️ Evento ya registrado (existe otro dentro de 50m)';

} elseif ($afectacion) {

    $msgFinal = '✅ Evento registrado dentro de zona de afectación';

} else {

    $msgFinal = '⚠️ Evento registrado fuera de zonas de afectación';
}

    //------------
    echo json_encode([
        'ok'          => true,
        'msg'         => $msgFinal,
        'estatus'     => $estatusFinal,
        'seguimiento' => $codigoSeguimiento,
        'existe50m'   => $existeEnRadio,
        'afectacion'  => $afectacion,
        'poligono'    => $afectacion ? json_decode($afectacion['geom_json']) : null,
        'x'=>$x,
        'y'=>$y
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'ok'=>false,
        'msg'=>'Error en base de datos',
        'detalle'=>$e->getMessage()
    ]);
}
