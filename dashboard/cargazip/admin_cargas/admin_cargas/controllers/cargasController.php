<?php

require_once 'models/CargaModel.php';

$empresa = $_GET['empresa'] ?? '';
$desarrollo = $_GET['desarrollo'] ?? '';

$cargaModel = new CargaModel($pdo);

$empresas = $cargaModel->obtenerEmpresas();

$desarrollos = $cargaModel->obtenerDesarrollos($empresa);

$cargas = $cargaModel->obtenerCargas($empresa, $desarrollo);