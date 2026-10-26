<?php  

include '../../../../authh.php'; 
checkRole(['Admin','comercial']);
?>


<!DOCTYPE html>
<html lang="es">

<head>

<meta charset="UTF-8">

<meta    name="viewport"    content="width=device-width, initial-scale=1.0">

<title>
    Edición de Afectaciones
</title>
<link    rel="stylesheet"    href="https://cdn.jsdelivr.net/npm/ol@7.5.2/ol.css">
<script src="https://cdn.jsdelivr.net/npm/ol@7.5.2/dist/ol.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.9.0/proj4.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@turf/turf@6/turf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jsts@2.11.3/dist/jsts.min.js"></script>

<style>

html,body{    margin:0;    width:100%;    height:100%;    font-family:bold;}
#map{    width:100%;    height:100%;}

/* ========================= PANEL ========================= */

.panel{    position:absolute;    top:10px;    left:10px;    width:280px;    background:white;    padding:12px;    border-radius:8px;    box-shadow:0 2px 10px rgba(0,0,0,0.3);    z-index:1000;    max-height:90%;    overflow:auto;}
summary{    cursor:pointer;}
hr{    margin:10px 0;}

/* ========================= BOTONES ========================= */

.barra{    display:flex;    flex-direction:column;    gap:8px;    margin-top:10px;}
input{    padding:8px;    font-size:18px;}
button{    padding:10px;    border:none;    border-radius:5px;    background:#0078A8;    color:white;    cursor:pointer;}

/* ========================= RESULTADOS ========================= */

#panelResultados{    position:absolute;    top:120px;    left:50px;    width:520px;    background:white;    border-radius:8px;    overflow:hidden;    box-shadow:0 5px 15px rgba(0,0,0,0.3);    z-index:9999;    display:none;}
#panelHeader{    background:#0078A8;    color:white;    padding:10px;    cursor:move;    display:flex;    justify-content:space-between;    align-items:center;    font-weight:bold;}
#btnCerrarPanel{    background:transparent;    border:none;    color:white;    font-size:18px;    cursor:pointer;    padding:0 5px;}
#btnCerrarPanel:hover{    color:#0078A8;}
.tabs{  display:flex;}
.tab{    flex:1;    text-align:center;    padding:10px;    background:#eee;    cursor:pointer;}
.tab.active{    background:white;    font-weight:bold;}
#contenidoLista,
#contenidoDetalle{    padding:10px;    max-height:400px;    overflow:auto;}
.listaAfectacion{    border:1px solid #ccc;    border-left:5px solid #0078A8;    padding:10px;    margin-bottom:10px;    border-radius:5px;    cursor:pointer;}
.listaAfectacion:hover{    background:#f0f8ff;}
table{    width:100%;    border-collapse:collapse;}
th{    background:#0078A8;    color:white;    padding:6px;}
td{    border:1px solid #ccc;    padding:6px;}

</style>

</head>

<body>

<div id="map"></div>

<!-- ========================= PANEL RESULTADOS ========================= -->

<div id="panelResultados">

    <div id="panelHeader">
<span>Resultados</span>
        <button id="btnCerrarPanel">✖</button>
         </div>

    <div class="tabs">

        <div
            class="tab active"
            onclick="cambiarTab('lista')"
        >

            Lista

        </div>

        <div
            class="tab"
            onclick="cambiarTab('detalle')"
        >

            Detalle

        </div>

    </div>

    <div id="contenidoLista"></div>

    <div
        id="contenidoDetalle"
        style="display:none;"
    ></div>

</div>

<!-- ========================= PANEL LATERAL ========================= -->

<div class="panel">

<h3>Capas</h3>

<details open>
<summary>
<b>Benito Juárez</b>
</summary>
<label><input    type="checkbox"    checked    onchange="sm_bj.setVisible(this.checked)">Supermanzana</label>
</details>
<hr>

<details>
<summary>
<b>Playa del Carmen</b>
</summary>
<label><input    type="checkbox"    checked    onchange="sm_sol.setVisible(this.checked)">Supermanzana</label>
</details>
<hr>

<details>
<summary>
<b>Puerto Morelos</b>
</summary>
<label><input    type="checkbox"    checked    onchange="sm_pm.setVisible(this.checked)">SM Puerto Morelos</label>
<br><br>
<label><input    type="checkbox"    onchange="sm_lv.setVisible(this.checked)">SM Leona Vicario</label>
</details>

<hr>

<details>

<summary><b>Isla Mujeres</b></summary>

<label><input    type="checkbox"    checked    onchange="sm_im.setVisible(this.checked)">Supermanzana</label>

</details>

<hr>

<div class="barra">

<input    type="number"    id="idAfectacion"    placeholder="Ingrese ID">

<button onclick="consultarAfectacion()">    Consultar</button>
<button onclick="activarSeleccion()">    Seleccionar Polígonos</button>
<button onclick="unirGeometrias()">    Integrar Polígonos</button>
<button onclick="eliminarGeometrias()">    Eliminar Polígonos</button>
<button onclick="guardarEdicionGeom()">    Guardar Geometría</button>
<button onclick="window.location.href='../../../index.php'">    Volver</button>

</div>

</div>

<script src="registroxpol_edit.js"></script>

<script src="actpol.js"></script>

</body>

</html>
