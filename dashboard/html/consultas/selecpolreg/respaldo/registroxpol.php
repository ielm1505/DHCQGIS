<?php  

include '../../../authh.php'; 
checkRole(['Admin','comercial']);
?>

<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Registro_zona de Afectaciones</title>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@7.5.2/ol.css">
<script src="https://cdn.jsdelivr.net/npm/ol@7.5.2/dist/ol.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@turf/turf@6/turf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jsts@2.11.3/dist/jsts.min.js"></script>
<style>
html,body{margin:0;height:100%;font-family:Arial;}
#map{width:100%;height:100%;}
.panel{position:absolute;top:10px;left:10px;background:white;padding:10px;border-radius:6px;box-shadow:0 2px 6px rgba(0,0,0,0.3);font-size:13px;max-height:90%;overflow:auto;width:240px;}
summary{cursor:pointer;font-size:14px;margin-top:6px;}
#ficha{display:none;position:absolute;top:150px;left:10px;background:white;padding:15px;width:260px;border-radius:6px;box-shadow:0 3px 8px rgba(0,0,0,0.4);}
</style>
</head>

<body>

<div id="map"></div>

<div class="panel">

<h3>Capas</h3>

  <label><input type="checkbox" onchange="localidades.setVisible(this.checked)">Localidades</label><br>
    <hr>
<details open>
    
<summary><b>Benito Juárez</b></summary>
<label><input type="checkbox" checked onchange="sm_bj.setVisible(this.checked)">Supermanzana</label><br>
<label><input type="checkbox" onchange="cc_bj.setVisible(this.checked)">Cobertura Cárcamo</label><br>
<label><input type="checkbox" onchange="ct_bj.setVisible(this.checked)">Cobertura Tanques</label><br>
</details>

<hr>

<details>
<summary><b>Playa del Carmen</b></summary>
<label><input type="checkbox" checked onchange="sm_sol.setVisible(this.checked)">Supermanzana</label><br>
<label><input type="checkbox" onchange="cc_sol.setVisible(this.checked)">Cobertura Cárcamo</label><br>
<label><input type="checkbox" onchange="ct_sol.setVisible(this.checked)">Cobertura Tanque</label><br>
</details>

<hr>

<details>
<summary><b>Puerto Morelos</b></summary>
<label><input type="checkbox" checked onchange="sm_pm.setVisible(this.checked)">SM Pto. Morelos</label><br>
<label><input type="checkbox" onchange="sm_lv.setVisible(this.checked)">SM Leona Vicario</label>
</details>

<hr>

<details>
<summary><b>Isla Mujeres</b></summary>
<label><input type="checkbox" checked onchange="sm_im.setVisible(this.checked)">Supermanzana</label>
</details>

<hr><br>

<button onclick="generarAfectacion()">Generar afectación</button><br><br>

<button onclick="window.location.href='../../index.php'">
  Volver al inicio
</button>

</div>


<div id="ficha">

<h3>Afectación</h3>

<input type="hidden" id="id_afectacion">

Tipo<br>
<select id="tipo">
<option value="">Seleccione</option>
<option value="Agua potable">Agua potable</option>
<option value="Drenaje sanitario">Drenaje sanitario</option>
</select><br><br>

Responsable Trabajo<br>
<select id="nivel">
<option value="">Seleccione</option>
<option value="Comercial">Gerencia Comercial</option>
<option value="Desarrollo">Gerencia de Desarrollo</option>
<option value="Técnica">Gerencia Técnica</option>
<option value="Gerencia de Redes y Lí">Gerencia de Redes y Líneas</option>
<option value="Gerencia de Construccion">Gerencia de Construccion</option>
<option value="Gerencia de SIMA">Gerencia de SIMA</option>
<option value="CFE">CFE</option>
</select><br><br>

Periodo (horas)<br>
<input id="periodo" type="number" min="1"><br><br>

Estatus<br>
<select id="estatus">
<option>Activo</option>
<option>Finalizado</option>
</select><br><br>

Fecha inicio<br>
<input type="datetime-local" id="fecha_inicio"><br><br>

Fecha fin<br>
<input type="datetime-local" id="fecha_fin" readonly><br><br>

Motivo<br>
<textarea id="descripcion"></textarea><br><br>

Tipo de afectación<br>
<select id="tipo_afectacion">
<option value="">Seleccione</option>
<option>Falta total de Agua</option>
<option>Baja presión</option>
<option>Mantenimiento</option>
<option>Reparación</option>
<option>Falla eléctrica</option>
<option>Limpieza de red</option>
</select><br><br>

<button onclick="guardarFicha()">Guardar</button>
<button onclick="cancelarFicha()">Cancelar</button>

</div>


<script src="registroxpol.js"></script>


<script>

// tiempo de revisión (cada 60 segundos)
const SESSION_CHECK_INTERVAL = 60000;

function verificarSesion(){

    fetch("../../../authh.php", {
        method: "GET",
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    })
    .then(response => {

        if(response.status === 401){
            
            alert("La sesión ha expirado. Debe iniciar sesión nuevamente.");
            window.location.href = "../../../login.php";

        }

    })
    .catch(error => {
        console.error("Error verificando sesión:", error);
    });

}

// ejecutar cada minuto
setInterval(verificarSesion, SESSION_CHECK_INTERVAL);

</script>
</body>
</html>