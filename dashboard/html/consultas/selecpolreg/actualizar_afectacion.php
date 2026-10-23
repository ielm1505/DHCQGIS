<?php 

ini_set('display_errors', 0);
error_reporting(0);

session_start();

require '../../../conexion.php';

header('Content-Type: application/json');

// ======================================
// USUARIO
// ======================================

$usuario =
    $_SESSION['usuario']
    ?? 'desconocido';

$fecha_actual =
    date('Y-m-d H:i:s');

// ======================================
// DATOS
// ======================================

$data = json_decode(
    file_get_contents("php://input"),
    true
);

if(!$data){

    echo json_encode([

        "status"=>"error",

        "msg"=>"No se recibieron datos"

    ]);

    exit;

}

// ======================================
// VALIDAR ID
// ======================================

$id = $data['id'] ?? null;

if(!$id){

    echo json_encode([

        "status"=>"error",

        "msg"=>"ID inválido"

    ]);

    exit;

}

// ======================================
// VALIDAR FECHAS
// ======================================

if(

    !isset($data['fecha_inicio']) ||

    !isset($data['fecha_fin'])

){

    echo json_encode([

        "status"=>"error",

        "msg"=>"Faltan fechas"

    ]);

    exit;

}

// ======================================
// ELEMENTOS AFECTADOS
// ======================================

$elementos = isset($data["elementos"])

    ? json_encode($data["elementos"])

    : json_encode([]);

// ======================================
// TRANSACCION
// ======================================

try{

    $pdo->beginTransaction();

    // ==================================
    // ACTUALIZAR AFECTACION
    // ==================================

    $sql = '

    UPDATE
    "BENITO_JUAREZ"."Tipo_de_afectacion"

    SET 

        tipo = :tipo,

        tipo_afectacion = :tipo_afectacion,

        nivel = :nivel,

        periodo = :periodo,

        estatus = :estatus,

        fecha_inicio = :fecha_inicio,

        fecha_fin = :fecha_fin,

        descripcion = :descripcion,

        elementos_afectados = :elementos::jsonb,

        usuario_edito = :usuario,

        fecha_edito = :fecha

    WHERE id_afectacion = :id

    ';

    $stmt = $pdo->prepare($sql);

    $stmt->execute([

        ':tipo' =>
            $data['tipo'] ?? null,

        ':tipo_afectacion' =>
            $data['tipo_afectacion'] ?? null,

        ':nivel' =>
            $data['nivel'] ?? null,

        ':periodo' =>
            (int)($data['periodo'] ?? 0),

        ':estatus' =>
            $data['estatus'] ?? null,

        ':fecha_inicio' =>
            $data['fecha_inicio'] ?? null,

        ':fecha_fin' =>
            $data['fecha_fin'] ?? null,

        ':descripcion' =>
            $data['descripcion'] ?? null,

        ':elementos' =>
            $elementos,

        ':usuario' =>
            $usuario,

        ':fecha' =>
            $fecha_actual,

        ':id' =>
            $id

    ]);

    // ==================================
    // HISTORIAL
    // ==================================

    $sql_hist = '

    INSERT INTO
    "BENITO_JUAREZ"."Historial_Afectaciones"

    (

        id_afectacion,

        usuario,

        accion,

        datos_json

    )

    VALUES (

        :id_afectacion,

        :usuario,

        :accion,

        :datos_json

    )

    ';

    $stmt_hist = $pdo->prepare($sql_hist);

    $stmt_hist->execute([

        ':id_afectacion' =>
            $id,

        ':usuario' =>
            $usuario,

        ':accion' =>
            'EDICION',

        ':datos_json' =>
            json_encode([

                "datos"=>$data,

                "elementos"=>$data["elementos"] ?? [],

                "fecha"=>$fecha_actual

            ])

    ]);

    // ==================================
    // COMMIT
    // ==================================

    $pdo->commit();

    echo json_encode([

        "status"=>"ok",

        "id"=>$id,

        "usuario"=>$usuario,

        "fecha"=>$fecha_actual

    ]);

}catch(Exception $e){

    $pdo->rollBack();

    echo json_encode([

        "status"=>"error",

        "msg"=>$e->getMessage()

    ]);

}
?>