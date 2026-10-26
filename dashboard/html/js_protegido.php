<?php
session_start();
require '../conexion.php'; 


if (!isset($_SESSION['usuario']) || !isset($_SESSION['rol'])) {
    http_response_code(403);
    exit("// Acceso denegado: sesión no válida\n");
}


if (!isset($_GET['file'])) {
    http_response_code(400);
    exit("// Error: parámetro 'file' faltante\n");
}

$archivo = $_GET['file'];

// Seguridad básica: evitar rutas fuera del directorio
if (str_contains($archivo, '..')) {
    http_response_code(400);
    exit("// Ruta no permitida\n");
}


$baseDir = __DIR__;
$ruta = realpath($baseDir . DIRECTORY_SEPARATOR . $archivo);

if (!$ruta || !file_exists($ruta) || strpos($ruta, realpath($baseDir)) !== 0) {
    http_response_code(404);
    exit("// Archivo no encontrado o acceso no autorizado\n");
}


$rol = $_SESSION['rol'];
$nombreArchivo = basename($archivo);

try {
    $stmt = $pdo->prepare("
        SELECT COUNT(*) AS permitido
        FROM \"Usuario\".\"roles_permisos\"
        WHERE LOWER(rol) = LOWER(:rol)
          AND LOWER(archivo_js) = LOWER(:archivo)
    ");

    $stmt->execute([
        'rol' => $rol,
        'archivo' => $nombreArchivo
    ]);

    $resultado = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$resultado || $resultado['permitido'] == 0) {
        http_response_code(403);
        exit("// Acceso denegado: su rol ($rol) no tiene permiso para $nombreArchivo\n");
    }

} catch (Exception $e) {
    http_response_code(500);
    exit("// Error al verificar permisos: " . $e->getMessage() . "\n");
}


// ------------------------------------------------------------
header('Content-Type: application/javascript; charset=UTF-8');
header('Cache-Control: no-store, no-cache, must-revalidate');
readfile($ruta);
exit;
?>
