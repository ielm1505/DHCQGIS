<?php

require_once 'models/FichaModel.php';

$folio_buscar = $_GET['folio'] ?? '';

$fichaModel = new FichaModel($pdo);

$ficha_encontrada = null;

if($folio_buscar){
    $ficha_encontrada = $fichaModel->buscarPorFolio($folio_buscar);
}