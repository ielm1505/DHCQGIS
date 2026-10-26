```html
<?php 
include '../../authh.php';
checkRole(['Admin','Editor','comercial']);
?>

<!DOCTYPE html>
<html lang="es">

<head>

<meta charset="UTF-8">
<title>Registro de Afectación</title>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@7.5.2/ol.css">
<script src="https://cdn.jsdelivr.net/npm/ol@7.5.2/dist/ol.js"></script>

<link rel="stylesheet" href="afectacion/afectacion.css">

<style>

html,body{
margin:0;
height:100%;
}

#map{
width:100%;
height:100%;
}

#coordenadaMapa{
font-size:13px;
background:#f1f3f5;
padding:6px;
border-radius:6px;
margin-top:4px;
margin-bottom:10px;
border:1px solid #ccc;
}

</style>

</head>

<body>

<div id="map"></div>


<!-- VENTANA REGISTRO -->
<div id="ventanaRegistro" class="ventana">

<div class="barra">

<span>Registro</span>

<div class="botones">
<button class="minimizar">—</button>
<button class="cerrar">✕</button>
</div>

</div>

<div class="contenido">

<form id="formAfectacion">

<label>Nombre
<input type="text" name="nombre">
</label>

<label>Cliente
<input type="text" name="cliente" id="cliente" required>
</label>

<label>Contrato
<input type="text" name="contrato" id="contrato" required>
</label>

<div id="coordenadaMapa">
📍 Coordenada: No definida
</div>

<label>Fecha
<input type="date" name="fecha" id="fecha" required>
</label>

<label>Motivo de afectación
<select name="tipo_de_afectacion" id="tipo_de_afectacion" required>
<option value="">Cargando motivos...</option>
</select>
</label>

<input type="hidden" name="x" id="x">
<input type="hidden" name="y" id="y">

<button type="button" onclick="guardar()">Registrar</button>

<button type="button"
onclick="abrirConsultaSeguimiento()"
style="background:#343a40;margin-top:10px;">
🔎 Consultar Seguimiento
</button>

</form>

</div>
</div>



<!-- VENTANA CONSULTA -->
<div id="consultaContainer" class="ventana" style="display:none;">

<div class="barra">
<span>Consulta Seguimiento</span>

<div class="botones">
<button class="minimizar">—</button>
<button class="cerrar">✕</button>
</div>

</div>

<div class="contenido">

<input type="text"
id="codigoBuscar"
placeholder="Ej: AF-20260216-0001"
style="width:100%;padding:10px;border-radius:8px;border:1px solid #ccc;">

<button onclick="consultarSeguimiento()"
style="margin-top:10px;width:100%;padding:12px;border:none;border-radius:8px;background:#5c9ce0;color:#fff;font-weight:bold;">
Buscar
</button>

<div id="resultadoConsulta" style="margin-top:15px;font-size:14px;"></div>

</div>

</div>



<script>

///////////////////////////////
//// MAPA OPENLAYERS
///////////////////////////////

const capaCliente = new ol.layer.Vector({
source:new ol.source.Vector()
});

const map = new ol.Map({

target:'map',

layers:[
new ol.layer.Tile({
source:new ol.source.OSM()
}),
capaCliente
],

view:new ol.View({
center:ol.proj.fromLonLat([-86.8475,21.1619]),
zoom:12
})

});


///////////////////////////////
//// BUSCAR CONTRATO
///////////////////////////////

document.getElementById("contrato").addEventListener("change",buscarContrato);


async function buscarContrato(){

let contrato=document.getElementById("contrato").value;

if(!contrato) return;

const res = await fetch('./consultas/buscar_contrato.php',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({contrato})
});

const data = await res.json();

if(data.status=="ok"){

let geojson = JSON.parse(data.geom);

let feature = new ol.format.GeoJSON().readFeature({
type:"Feature",
geometry:geojson
},{
featureProjection:'EPSG:3857'
});

capaCliente.getSource().clear();
capaCliente.getSource().addFeature(feature);

let coord = feature.getGeometry().getCoordinates();

document.getElementById("x").value = coord[0];
document.getElementById("y").value = coord[1];

let lonlat = ol.proj.toLonLat(coord);

document.getElementById("coordenadaMapa").innerHTML =
"📍 Coordenada: "+lonlat[0].toFixed(6)+" , "+lonlat[1].toFixed(6);

map.getView().animate({
center:coord,
zoom:18,
duration:1000
});

}else{

document.getElementById("coordenadaMapa").innerHTML =
"⚠ Contrato no encontrado. Seleccione ubicación en el mapa.";

activarSeleccionMapa();

}

}



///////////////////////////////
//// UBICACIÓN MANUAL
///////////////////////////////

function activarSeleccionMapa(){

map.once("click",function(evt){

let coord = evt.coordinate;

capaCliente.getSource().clear();

let punto = new ol.Feature(
new ol.geom.Point(coord)
);

capaCliente.getSource().addFeature(punto);

document.getElementById("x").value = coord[0];
document.getElementById("y").value = coord[1];

let lonlat = ol.proj.toLonLat(coord);

document.getElementById("coordenadaMapa").innerHTML =
"📍 Coordenada: "+lonlat[0].toFixed(6)+" , "+lonlat[1].toFixed(6);

});

}

</script>

</body>

</html>
```
