<?php  
include '../../../authh.php'; 
checkRole(['Admin','comercial']);
?>

<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Afectaciones activas</title>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@7.5.2/ol.css">
<script src="https://cdn.jsdelivr.net/npm/ol@7.5.2/dist/ol.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<style>
html,body{margin:0;height:100%;}
#map{width:100%;height:100%;}

.panel{
position:absolute;
top:10px;
left:10px;
background:white;
padding:12px;
border-radius:6px;
box-shadow:0 2px 6px rgba(0,0,0,0.3);
font-size:14px;
width:260px;
z-index:1000;
}

.tabBtn{
flex:1;
padding:6px;
cursor:pointer;
border:none;
background:#eee;
font-size:12px;
}

.tabBtn.active{
background:#1976d2;
color:white;
}

.tabContent{display:none;}
.tabContent.active{display:block;}

#ficha{
display:none;
position:absolute;
top:150px;
left:10px;
background:white;
padding:15px;
width:300px;
border-radius:6px;
box-shadow:0 3px 8px rgba(0,0,0,0.4);
max-height:600px;
overflow:auto;
z-index:1000;
}

input,select,textarea{
width:100%;
margin-bottom:8px;
}

#dragFicha{
cursor:move;
background:#f5f5f5;
padding:6px;
border-radius:4px;
}


.itemLeyenda{
display:flex;
align-items:center;
gap:1px;
margin-bottom:1px;
cursor:pointer;
}

.itemLeyenda input[type="checkbox"]{
width:auto;         
margin:0;
}

.itemLeyenda input{
margin:0;
flex-shrink:0;
}

.cuadro{
width:12px;
height:12px;
border-radius:2px;
flex-shrink:0;
}

.texto{
white-space:nowrap;
}

/* colores */
.rojo{background:#c62828;}
.azul{background:#1565c0;}
.verde{background:#2e7d32;}

</style>
</head>

<body>

<div id="map"></div>

<div class="panel">

<div style="display:flex;margin-bottom:10px;">
<button class="tabBtn active" onclick="cambiarTab('tiempo',this)">Tiempo</button>
<button class="tabBtn" onclick="cambiarTab('tipo',this)">Tipo</button>
<button class="tabBtn" onclick="cambiarTab('operativo',this)">Operativo Día</button>
</div>

<div id="tabTiempo" class="tabContent active">
<b>AFECTACIONES POR TIEMPO</b><br><br>
<span style="color:purple">■</span> Programada<br>
<span style="color:red">■</span> ≤2 horas<br>
<span style="color:yellow">■</span> 2–10 horas<br>
<span style="color:green">■</span> 10–24 horas<br>
<span style="color:blue">■</span> >24 horas<br>
</div>

<div id="tabTipo" class="tabContent">
<b>TIPO DE AFECTACIÓN</b><br><br>
<span style="color:#e53935">■</span> Falta total de Agua<br>
<span style="color:#1e88e5">■</span> Baja presión<br>
<span style="color:#212121">■</span> Mantenimiento<br>
<span style="color:#fb8c00">■</span> Falla eléctrica<br>
<span style="color:#d43ab3">■</span> Reparación<br>
<span style="color:#45bfe4">■</span> Limpieza de red<br>
</div>

<div id="tabOperativo" class="tabContent">

<b>ESTADO OPERATIVO</b><br><br>

<label class="itemLeyenda">
  <input type="checkbox" checked onchange="toggleFiltro('falta')">
  <span class="cuadro rojo"></span>
  <span class="texto">Falta total Agua</span>
</label>

<label class="itemLeyenda">
  <input type="checkbox" checked onchange="toggleFiltro('baja')">
  <span class="cuadro azul"></span>
  <span class="texto">Baja presión</span>
</label>



<label class="itemLeyenda">
  <input type="checkbox" checked onchange="toggleFiltro('recuperada')">
  <span class="cuadro verde"></span>
  <span class="texto">Recuperadas [HOY]</span>
</label>



</div>

<br>
<a href="../../index.php"><button>Volver</button></a>

</div>

<div id="ficha">
<h3 id="dragFicha">Editar Zona de Afectación</h3>
<hr>
<input type="hidden" id="id_afectacion">

<b>Tiempo estimado:</b>
<div id="tiempo_recuperacion"></div>

<hr>

Tipo <input id="tipo" readonly>
Responsable <input id="nivel" readonly>

Periodo <input id="periodo" type="number">

Estatus
<select id="estatus">
<option value="Activo">Activo</option>
<option value="Finalizado">Finalizado</option>
</select>

Fecha inicio
<input type="datetime-local" id="fecha_inicio">

Fecha fin
<input type="datetime-local" id="fecha_fin" readonly>

Motivo:
<textarea id="descripcion"></textarea>

Tipo afectación
<input id="tipo_afectacion" readonly>

<button onclick="guardar()">Guardar</button>
<button onclick="cerrar()">Cancelar</button>

<hr>

<b>Contratos afectados</b>
<div id="contratos_afectados"></div>

<canvas id="graficaContratos"></canvas>

</div>

<script src="segregafec.js"></script>

</body>
</html>