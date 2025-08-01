<?php
session_start();

// si no hay sesión => redirigir a login
if (!isset($_SESSION["usuario"])) {
    header("Location: /geo/index.html");
    exit();
}

$usuario = $_SESSION["usuario"];
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Editor de Capas</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@7.5.0/ol.css" />
  <script src="https://cdn.jsdelivr.net/npm/ol@7.5.0/dist/ol.js"></script>
  <style>
    html, body { margin:0; padding:0; height:100%; }
    #map { width:100%; height:100%; }
    #editor input { width:100%; margin-bottom:5px; }
  </style>
</head>
<body>
  <div id="map"></div>

  <div id="editor" style="position:absolute; top:10px; right:10px; background:white; padding:10px; border:1px solid gray; z-index:1000; display:none;"></div>

  <div style="position:absolute; top:10px; left:10px; background:white; padding:10px; border:1px solid gray; z-index:1000; max-height:90%; overflow:auto;">
    <h4>Capas</h4>
    <label><input type="checkbox" class="chkLayer" value="Fact_Desarrollo" checked> Fact_Desarrollo</label><br>
    <label><input type="checkbox" class="chkLayer" value="Red_AP"> Red_AP</label><br>
    <label><input type="checkbox" class="chkLayer" value="Red_DS"> Red_DS</label><br>
    <label><input type="checkbox" class="chkLayer" value="Pozos_Visita"> Pozos_Visita</label><br>
    <label><input type="checkbox" class="chkLayer" value="Valvula"> Valvula</label><br>
    <label><input type="checkbox" class="chkLayer" value="Caja_Val_AP"> Caja_Val_AP</label><br><br>
    
    <label><b>Editar capa:</b></label>
    <select id="layerEditor">
      <option value="Fact_Desarrollo">Fact_Desarrollo</option>
      <option value="Red_AP">Red_AP</option>
      <option value="Red_DS">Red_DS</option>
      <option value="Pozos_Visita">Pozos_Visita</option>
      <option value="Valvula">Valvula</option>
      <option value="Caja_Val_AP">Caja_Val_AP</option>
    </select><br><br>

    <button id="btn_nuevo">➕ Nuevo</button>
    <button id="btn_guardar_nuevos">💾 Guardar Nuevos</button>
    <button id="btn_gps">📍 Centrar en GPS</button>
  </div>

  <script src="editor_capas.js"></script>
</body>
</html>
