
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
border:1px solid #ddd;
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

<div id="formContent">

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
<hr>
<button type="button" onclick="guardar()">Registrar</button>
<button type="button"
onclick="abrirConsultaSeguimiento()" 
style="background:#343a40;margin-top:10px;">
🔎 Consultar Seguimiento
</button>

<hr>
<button type="button" onclick="window.location.href='../index.php'">
  Volver al inicio
</button>

</form>

</div>

</div>



</div>


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

<div id="resultadoConsulta"
style="margin-top:15px;font-size:14px;"></div>

</div>

</div>

<script src="afectacion/afectacion.js"></script>

</body>
</html>
```
