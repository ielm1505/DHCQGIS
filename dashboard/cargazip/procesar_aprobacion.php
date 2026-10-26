<?php
require 'conexion.php';
session_start();

$id = $_POST['id'];
$accion = $_POST['accion'];
$usuario = $_SESSION['usuario'] ?? 'sistema';

$estado = $accion === 'aprobar' ? 'APROBADO' : 'RECHAZADO';

$stmt = $pdo->prepare("
    UPDATE dexterno_ap.control_cargas 
    SET estado_aprobacion = ?, 
        fecha_aprobacion = NOW(),
        aprobado_por = ?
    WHERE id = ?
");

$stmt->execute([$estado, $usuario, $id]);

echo "✅ Proceso completado: $estado";