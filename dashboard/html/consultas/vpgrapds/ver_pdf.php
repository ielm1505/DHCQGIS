<?php
require_once "../../../conexion.php"; // ajusta ruta si es necesario

// Forzar respuesta limpia
header_remove();
ini_set('display_errors', 0);

// Validar folio recibido
if (!isset($_GET['folio']) || trim($_GET['folio']) === '') {
    http_response_code(400);
    exit("Folio requerido.");
}

$folio = trim($_GET['folio']);

try {

    // Buscar ruta del PDF en BD
    $sql = '
        SELECT ruta_pdf 
        FROM "FACTIBILIDAD"."pruebas_instalacion"
        WHERE TRIM(folio::text) = :folio
        LIMIT 1
    ';

    $stmt = $pdo->prepare($sql);
    $stmt->execute([':folio' => $folio]);

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$row || !$row['ruta_pdf']) {
        http_response_code(404);
        exit("PDF no encontrado en base de datos.");
    }

    // Extraer nombre del archivo
    $nombreArchivo = basename($row['ruta_pdf']);

    // Ruta física donde guardas los PDFs
    $rutaArchivo = "D:/SISTEMA_AGUAKAN/pdf/" . $nombreArchivo;

    if (!file_exists($rutaArchivo)) {
        http_response_code(404);
        exit("Archivo físico no encontrado.");
    }

    // Mostrar PDF en navegador (NO descargar)
    header('Content-Type: application/pdf');
    header('Content-Disposition: inline; filename="' . $nombreArchivo . '"');
    header('Content-Length: ' . filesize($rutaArchivo));

    readfile($rutaArchivo);
    exit;

} catch (Exception $e) {

    http_response_code(500);
    exit("Error interno del servidor.");

}