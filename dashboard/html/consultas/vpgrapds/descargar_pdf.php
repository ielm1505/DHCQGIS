<?php

$nombreArchivo = basename($_GET['file']);

$rutaArchivo = "D:/SISTEMA_AGUAKAN/pdf/" . $nombreArchivo;

if (file_exists($rutaArchivo)) {

    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="' . $nombreArchivo . '"');
    header('Content-Length: ' . filesize($rutaArchivo));
    readfile($rutaArchivo);
    exit;

} else {
    echo "Archivo no encontrado.";
}