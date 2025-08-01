<?php
date_default_timezone_set('America/Cancun'); 

include('conexion.php');
session_start();

if (isset($_SESSION["usuario"])) {
    $usuario = $_SESSION["usuario"];
    $fecha_salida = date("Y-m-d H:i:s");

    try {
        $query = '
            WITH ultimo_log AS (
                SELECT id
                FROM "Usuario"."Logs"
                WHERE usuario = :usuario AND estado = :activo
                ORDER BY fecha_ingreso DESC
                LIMIT 1
            )
            UPDATE "Usuario"."Logs"
            SET fecha_salida = :fecha_salida,
                estado = :estado
            WHERE id IN (SELECT id FROM ultimo_log)
        ';
        $stmt = $pdo->prepare($query);
        $stmt->execute([
            'fecha_salida' => $fecha_salida,
            'estado'       => 'inactivo',
            'usuario'      => $usuario,
            'activo'       => 'activo'
        ]);
    } catch (PDOException $e) {
        error_log("Error al registrar fin de sesión: " . $e->getMessage());
    }
}

session_unset();
session_destroy();
header("Location: /dashboard/index.html");
exit;
?>
