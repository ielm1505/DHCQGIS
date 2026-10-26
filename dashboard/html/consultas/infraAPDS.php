<?php
// Incluir auth.php para proteger la página
include '../../authh.php'; // Ajusta la ruta según tu estructura

// Verificar que solo el rol admin pueda acceder
checkRole(['Admin','Editor']);
?>

<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Tanques BJ - Histórico de Caudalímetros</title>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/luxon@3/build/global/luxon.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-luxon@1"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol/ol.css">
<script src="https://cdn.jsdelivr.net/npm/ol@latest/dist/ol.js"></script>

<style>
body {
  margin: 0;
  font-family: Arial;
  overflow-x: hidden; 
}

#map {
  width: 100%;
  height: 100vh;
}

#infoPanel {
  position: fixed;
  top: 0;
  right: 0;
  width: 500px;
  height: 100%;
  background: #f0f0f0;
  box-shadow: -2px 0 5px rgba(0,0,0,0.3);
  padding: 10px;
  transition: transform 0.4s ease;
  overflow-y: auto;
  z-index: 1000;
  resize: horizontal;
  transform: translateX(0); /* Visible */
}


#infoPanel2 {
  position: fixed; 
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  background: #f0f0f0;
  box-shadow: -2px 0 5px rgba(0,0,0,0.3);
  padding: 10px;
  transition: transform 0.4s ease;
  overflow-y: auto;
  z-index: 1000;
  transform: translateX(0); /* Visible */
}
#infoPanel.minimized {
  transform: translateX(100%); 
}

/* --- Pestaña visible al minimizar --- */
#toggleTab {
  position: fixed;
  top: 50%;
  right: 500px;
  transform: translateY(-50%);
  background: #007bff;
  color: white;
  border-radius: 6px 0 0 6px;
  padding: 10px 8px;
  cursor: pointer;
  z-index: 1001;
  transition: right 0.4s;
}

#infoPanel.minimized + #toggleTab {
  right: 0;
}

  #layerControl {
    width: 220px;
    height: 100vh;
    background: #f7f7f7;
    padding: 10px;
    border-right: 1px solid #ccc;
    overflow-y: auto;
  }
  h3 { margin-top: 10px; border-bottom: 1px solid #aaa; padding-bottom: 4px; }
  label { display: block; margin: 5px 0; cursor: pointer; }




  
</style>



 
</head>


<body>

  <div id="infoPanel2">
    <h2>Capas</h2>

      <h3>Agua Potable</h3>
        <label><input type="checkbox" class="layerToggle" data-layer="Tanques_BJ" checked> <font color="blue"> Tanques BJ</font></label>
        <label><input type="checkbox" class="layerToggle" data-layer="Tanques_IM" ><font color="blue"> Tanques IM</font></label>
        <label><input type="checkbox" class="layerToggle" data-layer="Tanques_PM" ><font color="blue"> Tanques PM</font></label>
        <label><input type="checkbox" class="layerToggle" data-layer="Tanques_SOL" ><font color="blue"> Tanques SOL</font></label>

      <h3>Agua Residual</h3>
        <label><input type="checkbox" class="layerToggle" data-layer="Carcamo_BJ" ><font color="Brown"> Carcamo BJ</font></label>
        <label><input type="checkbox" class="layerToggle" data-layer="Carcamo_IM" ><font color="Brown"> Carcamo IM</font></label>
        <label><input type="checkbox" class="layerToggle" data-layer="Carcamo_PM" ><font color="Brown"> Carcamo PM</font></label>
        <label><input type="checkbox" class="layerToggle" data-layer="Carcamo_SOL" ><font color="Brown"> Carcamo SOL</font></label>

      <h3>Planta de Tratamiento</h3>
        <label><input type="checkbox" class="layerToggle" data-layer="Ptar_BJ" > Ptar BJ</label>
        <label><input type="checkbox" class="layerToggle" data-layer="Ptar_IM" > Ptar IM</label>
        <label><input type="checkbox" class="layerToggle" data-layer="Ptar_PM" > Ptar PM</label>
        <label><input type="checkbox" class="layerToggle" data-layer="Ptar_SOL"> Ptar SOL</label>
        <a href="../index.php">Volver al inicio</a>
  </div>


<div id="map"></div>

<div id="infoPanel">
  <div style="display:flex;justify-content:space-between;align-items:center;">
    <h2 style="margin:0;">Instalación</h2>

  </div>

  <p><b>ID:</b> <span id="instalId"></span></p>
  <p><b>Área:</b> <span id="areaLabel"></span></p>
  <p><b>Nombre:</b> <span id="instalNombre"></span></p>

  <label>Caudalímetro:</label>
  <select id="caudalimetroNombre"><option value="">-- Seleccione --</option></select>
  <br><br>

  <label>Rango de fechas:</label><br>
  <input type="date" id="startDate"> a <input type="date" id="endDate">
  <br><br>

  <button onclick="cargarDatos()">Actualizar Lecturas</button>

  <div style="position: relative;">
  <button id="expandChart" style="
    position: absolute; right: 10px; top: 10px;
    z-index: 10; padding: 5px 10px; cursor: pointer;
  ">🔍</button>

  <div id="chartContainer" style="width:100%; height:400px;">
    <canvas id="chart"></canvas>
  </div>
</div>

  
  
  <div id="ultimaLectura" style="background:#fff;padding:5px;margin-top:10px;border-radius:5px;"></div>
</div>

<!-- Pestaña para minimizar/restaurar -->
<div id="toggleTab">⮜</div>

<script>
const panel = document.getElementById("infoPanel");
const toggleTab = document.getElementById("toggleTab");


let minimized = false;

// Minimizar / restaurar
toggleTab.addEventListener("click", () => {
  minimized = !minimized;
  panel.classList.toggle("minimized", minimized);
  toggleTab.textContent = minimized ? "⮞" : "⮜";
});



// Reabrir el panel desde otra acción (por ejemplo al seleccionar un objeto)
function abrirPanel() {
  panel.style.display = "block";
  toggleTab.style.display = "block";
  panel.classList.remove("minimized");
  minimized = false;
  toggleTab.textContent = "⮜";
}



const wfsCaudal = "https://dhcqgis.aguakan.com/geoserver/DHC_AGUAKAN/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Caudalimetros&outputFormat=application/json";
const wfsLectura = "https://dhcqgis.aguakan.com/geoserver/DHC_AGUAKAN/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Lectura_Caudalimetro&outputFormat=application/json";
const wfsArea = "https://dhcqgis.aguakan.com/geoserver/DHC_AGUAKAN/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:areas_atvise&outputFormat=application/json";



function estiloConEtiqueta(color) {
  return function(feature) {
    const nombre = feature.get('Nombre') || feature.get('NOMBRE') || '';
    return new ol.style.Style({
      image: new ol.style.Circle({
        radius: 6,
        fill: new ol.style.Fill({ color }),
        stroke: new ol.style.Stroke({ color: '#fff', width: 2 })
      }),
      text: new ol.style.Text({
        text: nombre,
        font: 'bold 12px Arial',
        offsetY: -12,
        fill: new ol.style.Fill({ color: '#000' }),
        stroke: new ol.style.Stroke({ color: '#fff', width: 3 })
      })
    });
  };
}

// ---- CAPAS ----
function crearCapa(nombre, color, typeName, visible=true) {
  return new ol.layer.Vector({
    source: new ol.source.Vector({
      url: `https://dhcqgis.aguakan.com/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=${typeName}&outputFormat=application/json&srsname=EPSG:3857&CQL_FILTER=Estatus='Existente'`,
      format: new ol.format.GeoJSON()
    }),
    
     style: estiloConEtiqueta(color),
    name: nombre,
    visible
  });
}

//---Tanques---
const capaTanquesBJ  = crearCapa('Tanques_BJ', 'blue',   'DHC_AGUAKAN:Tanques_BJ',true);
const capaTanquesSOL = crearCapa('Tanques_SOL', 'blue',   'DHC_AGUAKAN:Tanques_SOL',false);
const capaTanquesPM  = crearCapa('Tanques_PM', 'blue', 'DHC_AGUAKAN:Tanques_PM',false);
const capaTanquesIM  = crearCapa('Tanques_IM', 'blue', 'DHC_AGUAKAN:Tanques_IM',false);

//---carcamos---
const capaCarcamoBJ  = crearCapa('Carcamo_BJ', 'Brown',  'DHC_AGUAKAN:Carcamos_BJ',false);
const capaCarcamoIM  = crearCapa('Carcamo_IM', 'Brown', 'DHC_AGUAKAN:Carcamos_IM',false);
const capaCarcamoPM  = crearCapa('Carcamo_PM', 'Brown', 'DHC_AGUAKAN:Carcamo_PM',false);
const capaCarcamoSOL  = crearCapa('Carcamo_SOL', 'Brown', 'DHC_AGUAKAN:Carcamos_SOL',false);


//---Ptar---
const capaPtarBJ = crearCapa('Ptar_BJ', 'black', 'DHC_AGUAKAN:Ptar',false);
const capaPtarIM = crearCapa('Ptar_IM','black', 'DHC_AGUAKAN:Ptar_IM',false);
const capaPtarPM = crearCapa('Ptar_PM','black', 'DHC_AGUAKAN:Ptar_PM',false);
const capaPtarSOL = crearCapa('Ptar_SOL','black', 'DHC_AGUAKAN:Ptar_SOL',false);
// --- Mapa ---
const map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({ source: new ol.source.OSM() }),
    
    capaTanquesBJ,
    capaTanquesSOL,
    capaTanquesPM,
    capaTanquesIM,
    capaCarcamoBJ,
    capaCarcamoIM,
    capaCarcamoPM,
    capaCarcamoSOL,
    capaPtarBJ,
    capaPtarIM,
    capaPtarPM,
    capaPtarSOL
   

  ],
  view: new ol.View({ center: ol.proj.fromLonLat([-86.85,21.1]), zoom: 11.5 })
});


// ---- CONTROL DE VISIBILIDAD ----
const capas = {
  'Tanques_BJ': capaTanquesBJ,
  'Tanques_SOL': capaTanquesSOL,
  'Tanques_PM': capaTanquesPM,
  'Tanques_IM': capaTanquesIM,
  'Carcamo_BJ': capaCarcamoBJ,
  'Carcamo_IM': capaCarcamoIM,
  'Carcamo_PM':capaCarcamoPM,
  'Carcamo_SOL':capaCarcamoSOL,
  'Ptar_BJ':capaPtarBJ,
  'Ptar_IM':capaPtarIM,
  'Ptar_PM':capaPtarPM,
  'Ptar_SOL':capaPtarSOL  
};

document.querySelectorAll('.layerToggle').forEach(chk => {
  chk.addEventListener('change', e => {
    const nombre = e.target.dataset.layer;
    capas[nombre].setVisible(e.target.checked);
  });
});



const infoPanel = document.getElementById("infoPanel");

let chart;

document.querySelectorAll('.layerToggle').forEach(chk => {
  chk.addEventListener('change', e => {
    const nombre = e.target.dataset.layer;
    capas[nombre].setVisible(e.target.checked);
  });
});

// --- Selección de tanque ---
const select = new ol.interaction.Select();
map.addInteraction(select);
select.on('select', async function(e){
  const feature = e.selected[0];
  if(!feature) return;

  const props = feature.getProperties();
  const idInstal = props.id_instalacion;
  const nombreInstal = props.Nombre;
  const idArea=props.id_area;

  document.getElementById("instalId").innerText = idInstal;
  document.getElementById("instalNombre").innerText = nombreInstal;
  

  // Cargar área
  const urlArea = wfsArea + "&CQL_FILTER=" + encodeURIComponent(`id=${idArea}`);
  const respArea = await fetch(urlArea);
  const dataArea = await respArea.json();
  let valorArea = dataArea.features && dataArea.features.length > 0 ? dataArea.features[0].properties.nombre : "";
 
 
  let areaInstalacion = "";
if (valorArea === 1 || valorArea === "AP") {
  areaInstalacion = "Agua Potable";
} else if (valorArea === 2 || valorArea === "AR") {
  areaInstalacion = "Drenaje Sanitario";
} else {
  areaInstalacion = valorArea; // Si es otro valor, mostrar tal cual
}
 
  document.getElementById("areaLabel").innerText = areaInstalacion;




  // Cargar caudalímetros
  const respCaudal = await fetch(wfsCaudal + "&CQL_FILTER=" + encodeURIComponent(`id_instalacion=${idInstal}`));
  const dataCaudal = await respCaudal.json();

  const selectCaudal = document.getElementById("caudalimetroNombre");
  selectCaudal.innerHTML = '<option value="">-- Seleccione --</option>';
  if(dataCaudal.features){
    dataCaudal.features.forEach(f=>{
      const opt = document.createElement("option");
      opt.value = f.properties.id;
      opt.text = f.properties.nombre;
      selectCaudal.add(opt);
    });
  }

  // Abrir panel lateral
  infoPanel.classList.add("open");
  abrirPanel();
});

// --- Función para cargar datos de caudalímetro ---



async function cargarDatos() { 
  const select = document.getElementById("caudalimetroNombre");
  const idCaudal = select.value;
  const nombreCaudal = select.options[select.selectedIndex].text;

  if (!idCaudal) { 
    alert("Seleccione un caudalímetro"); 
    return; 
  }

  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;

  //  Convertir datetime-local a formato SQL (YYYY-MM-DD HH:MM:SS)
  if (startDate) startDate = startDate.replace("T", " ");
  if (endDate) endDate = endDate.replace("T", " ");

  //  Restar 1 día al inicio del rango
  let startDateObj = new Date(startDate);
  startDateObj.setDate(startDateObj.getDate() );
  const startDateMinus1 = startDateObj.toISOString().slice(0, 19).replace("T", " ");

  let cql = `id_caudalimetro=${idCaudal}`;
  if (startDate && endDate) 
    cql += ` AND fecha_insercion BETWEEN '${startDateMinus1}' AND '${endDate}'`;

  //  Consulta al WFS
  const respLect = await fetch(wfsLectura + "&CQL_FILTER=" + encodeURIComponent(cql) + "&maxFeatures=100000");
  const dataLect = await respLect.json();

  if (!dataLect.features || dataLect.features.length === 0) { 
    alert("No hay datos"); 
    return; 
  }

  const features = dataLect.features.sort((a, b) => 
    new Date(a.properties.fecha_insercion) - new Date(b.properties.fecha_insercion)
  );

  const labels = features.map(f => f.properties.fecha_insercion);
  const flow = features.map(f => f.properties.historic_flow);
  const pressure = features.map(f => f.properties.historic_pressure);

  const hourlyProductions = features.filter(f => f.properties.historic_hourly_production != null);
  const ultimaProduccion = hourlyProductions.length > 0 ? hourlyProductions[hourlyProductions.length - 1].properties : null;

  //  Crear o actualizar gráfico
  if (chart) chart.destroy();
  chart = new Chart(document.getElementById("chart"), {
    type: "line",
    data: {
      labels,
      datasets: [
        { label: "Flujo", data: flow, borderColor: "blue", fill: false, yAxisID: 'y' },
        { label: "Presión", data: pressure, borderColor: "red", fill: false, yAxisID: 'y1' }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'time',
          time: { 
            unit: 'hour',
            tooltipFormat: 'dd LLL yyyy HH:mm'
          },
          adapters: {
            date: { zone: 'utc' } 
          },
          title: { display: true, text: 'Fecha y hora' }
        },
        y: { 
          type: 'linear', 
          position: 'left', 
          title: { display: true, text: 'Flujo' } 
        },
        y1: { 
          type: 'linear', 
          position: 'right', 
          title: { display: true, text: 'Presión' }, 
          grid: { drawOnChartArea: false } 
        }
      }
    }
  });

  //  Mostrar última lectura
  const ultima = features[features.length - 1].properties;
  document.getElementById("ultimaLectura").innerHTML = `
    <h3>Última lectura</h3>
    <b>Caudalímetro:</b> ${nombreCaudal}<br>
    <b>Fecha:</b> ${ultima.fecha_insercion}<br>
    <b>Flujo:</b> ${ultima.historic_flow.toLocaleString()}<br>
    <b>Presión:</b> ${ultima.historic_pressure.toLocaleString()}<br>
    <b>Producción Hora:</b> ${ultimaProduccion 
      ? `${ultimaProduccion.historic_hourly_production} (registrada el ${ultimaProduccion.fecha_insercion})` 
      : 'No disponible'}
  `;
}
document.getElementById("expandChart").addEventListener("click", () => {
  const cont = document.getElementById("chartContainer");
  if (!document.fullscreenElement) {
    cont.requestFullscreen(); 
  } else {
    document.exitFullscreen(); 
  }
});

</script>




</body>
</html>
