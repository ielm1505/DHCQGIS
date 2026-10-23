<?php

ini_set('display_errors',1);
error_reporting(E_ALL);

require '../../conexion.php';

try{

    // ==========================================
    // FOLIO
    // ==========================================

    $folio = trim($_GET['folio'] ?? '');

    if($folio==''){
        die('Folio vacío');
    }

    // ==========================================
    // BUSCAR FICHA
    // ==========================================

    $sql = "
    SELECT
        folio
    FROM dexterno_ap.fac_ficha_prueba
    WHERE folio = ?
    ";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([$folio]);

    $ficha = $stmt->fetch(PDO::FETCH_ASSOC);

    if(!$ficha){
        die('Ficha no encontrada');
    }

    // ==========================================
    // NOMBRE PDF
    // ==========================================

    // Ejemplo:
    // FOL-1051.pdf

    $nombreArchivo = $ficha['folio'] . '.pdf';

    // ==========================================
    // RUTA
    // ==========================================

    $rutaArchivo =
    "D:/SISTEMA_AGUAKAN/pdf/" .
    $nombreArchivo;

    // ==========================================
    // EXISTE
    // ==========================================

    if(!file_exists($rutaArchivo)){

        die(
            'No existe el PDF asociado al folio: '
            . htmlspecialchars($folio)
        );
    }

    // ==========================================
    // HEADERS
    // ==========================================

    header('Content-Type: application/pdf');

    header(
        'Content-Disposition: attachment; filename="' .
        $nombreArchivo .
        '"'
    );

    header(
        'Content-Length: ' .
        filesize($rutaArchivo)
    );

    // ==========================================
    // DESCARGAR
    // ==========================================

    readfile($rutaArchivo);

    exit;

}catch(Exception $e){

    echo 'Error: ' . $e->getMessage();
}