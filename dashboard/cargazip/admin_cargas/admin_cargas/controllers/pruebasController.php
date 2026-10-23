<?php

require_once 'models/PruebaModel.php';

$pruebaModel = new PruebaModel($pdo);

$pruebas = $pruebaModel->obtenerPruebas(
    $empresa,
    $desarrollo
);