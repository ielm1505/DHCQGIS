<?php
require '../../conexion.php';

$id = $_GET['id'];

$stmt = $pdo->prepare("
    SELECT ruta_archivo, archivo 
    FROM dexterno_ap.control_cargas 
    WHERE id = ?
");
$stmt->execute([$id]);

$file = $stmt->fetch();

$path = $file['ruta_archivo'];

if (!file_exists($path)) {
    die("Archivo no encontrado");
}

header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename="'.$file['archivo'].'"');
readfile($path);
exit;