<?php
require '../../../conexion.php';

require 'controllers/cargasController.php';
require 'controllers/pruebasController.php';
require 'controllers/fichaController.php';

$tabActiva = $_GET['tab'] ?? 'tabBusqueda';
?>

<!DOCTYPE html>
<html lang="es">
<head>

<meta charset="UTF-8">

<title>Administrador GIS</title>

<link rel="stylesheet"
href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">

<link rel="stylesheet"
href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

<link rel="stylesheet"
href="https://cdn.jsdelivr.net/npm/ol@7.4.0/ol.css">

<script src="https://cdn.jsdelivr.net/npm/ol@7.4.0/dist/ol.js"></script>

<link rel="stylesheet" href="css/estilos.css">

</head>

<body>

<div class="layout">

    <!-- ========================= -->
    <!-- SIDEBAR -->
    <!-- ========================= -->

    <aside class="sidebar">

        <div class="logo">
            GIS ADMIN Factibilidad
        </div>

     <button class="tab-btn <?= $tabActiva=='tabBusqueda'?'active':'' ?>"
onclick="mostrarTab('tabBusqueda',this)">
            <i class="bi bi-search"></i>
            Buscar Folio
        </button>

       <button class="tab-btn <?= $tabActiva=='tabCargas'?'active':'' ?>"
onclick="mostrarTab('tabCargas',this)">
            <i class="bi bi-folder"></i>
            Cargas GIS desarrollador
        </button>

        <button class="tab-btn"
        onclick="mostrarTab('tabPruebas',this)">
            <i class="bi bi-clipboard-check"></i>
            Pruebas solicitadas
        </button>

        <button class="tab-btn"
        onclick="mostrarTab('tabMapa',this)">
            <i class="bi bi-map"></i>
            Vista Mapa
        </button>

        <button class="tab-btn"
        onclick="mostrarTab('tabAdmin',this)">
            <i class="bi bi-gear"></i>
            Administración
        </button>
 

      <a href="../../../html/index.php"><button class="tab-btn">Volver</button></a>
    </button>
    </aside>

    <!-- ========================= -->
    <!-- CONTENIDO -->
    <!-- ========================= -->

    <main class="contenido">

        <!-- BUSQUEDA -->
        <section id="tabBusqueda"
class="tab-content <?= $tabActiva=='tabBusqueda'?'active':'' ?>">
            <?php include 'views/buscador_folio.php'; ?>
        </section>

        <!-- CARGAS -->
        <section id="tabCargas"
class="tab-content <?= $tabActiva=='tabCargas'?'active':'' ?>">
            <?php include 'views/filtros.php'; ?>
            <?php include 'views/tabla_cargas.php'; ?>
        </section>

        <!-- PRUEBAS -->
        <section id="tabPruebas"
class="tab-content <?= $tabActiva=='tabPruebas'?'active':'' ?>">
            <?php include 'views/tabla_pruebas.php'; ?>
        </section>

        <!-- MAPA -->
        <section id="tabMapa"
class="tab-content <?= $tabActiva=='tabMapa'?'active':'' ?>">

            <div class="card">

                <div class="card-header bg-primary text-white">
                    Vista Cartográfica
                </div>

                <div class="card-body">

                    <div id="map"></div>

                </div>

            </div>

        </section>

        <!-- ADMIN -->
        <section id="tabAdmin" class="tab-content">

            <div class="card">

                <div class="card-header bg-dark text-white">
                    Administración
                </div>

                <div class="card-body">

                 //===========

                </div>

            </div>

        </section>

    </main>

</div>

<script src="js/app.js"></script>

</body>
</html>