<?php
// Incluir auth.php para proteger la página
include '../../authh.php'; // Ajusta la ruta según tu estructura

// Verificar que solo el rol admin pueda acceder
checkRole(['Admin','comercial']);
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Dashboard Clientes & Reclamos</title>

<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<!-- OpenLayers -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol/ol.css">
<script src="https://cdn.jsdelivr.net/npm/ol@latest/dist/ol.js"></script>

<!-- noUiSlider -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/nouislider@15.7.1/dist/nouislider.min.css">
<script src="https://cdn.jsdelivr.net/npm/nouislider@15.7.1/dist/nouislider.min.js"></script>

<style>
body { font-family: bold; margin: 10px; background: #f4f6f9; }
.dashboard { display: grid; grid-template-columns: repeat(auto-fit, minmax(500px, 1fr)); gap: 20px; }
.card { background: #fff; padding: 15px; border-radius: 12px; box-shadow: 0 2px 6px rgba(0,0,0,0.2); display: flex; flex-direction: column; position: relative; }
h2 { font-size: 1.2rem; margin-bottom: 10px; }
canvas { width: 100% !important; height: 400px; object-fit: contain; }
.card.filtro { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 10px; max-width: 300px; }
.card.filtro h2 { font-size: 1rem; margin: 0; }
.card.filtro select { width: 180px; max-width: 100%; padding: 5px; font-size: 0.9rem; border-radius: 6px; }
#totalClientes, #totalReclamos, #totalReclamosDS, #totalReclamosAP, #totalGeneral, #totalMedidores { font-size: 1.5rem; font-weight: bold; color: #0074D9; }
#map { width: 100%; height: 500px; border-radius: 10px; margin-top:10px; position: relative; }
table { width: 60%; margin: 20px auto; border-collapse: collapse; background: white; }
th, td { padding: 8px; border: 1px solid #ddd; text-align: center; }
th { background: #0073e6; color: white; }

/* Slider flotante sobre el mapa */
#mesSlider { height: 10px !important; margin: 10px 0; flex: none; }
#mesLabel { flex: none; margin-top: 5px; }

/* Botón maximizar */
.card .max-btn { position: absolute; top: 8px; right: 8px; background: #0074D9; color: white; border: none; border-radius: 6px; padding: 4px 8px; cursor: pointer; font-size: 0.8rem; z-index: 1001; }
/* Tarjeta maximizada */
.card.maximized { position: fixed !important; top: 10px; left: 10px; right: 10px; bottom: 10px; width: auto !important; height: auto !important; z-index: 2000; background: white; display: flex; flex-direction: column; }
.card.maximized > div, .card.maximized canvas { flex: 1; height: 100% !important; width: 100% !important; }
</style>

</head>
<body>
<h1>📊 Dashboard Clientes y Reclamos</h1>
<hr>

<button onclick="window.location.href='../index.php'">
  Volver al inicio
</button>

<hr>
<br>
<div class="dashboard">
  <!-- Filtros -->
  <div class="card"> 
    <h2>FILTROS</h2>
    <div class="card filtro">
      <h2>Filtrar por Centro Operativo</h2>
      <select id="filtroCentroOperativo"><option value="Todas">Todas</option></select>
    </div>
    <hr>
    <div class="card filtro">
      <h2>Filtrar por Supermanzana</h2>
      <select id="filtroSM"><option value="Todas">Todas</option></select>
          </div>
    <hr>
    <div class="card filtro">
     <h2>Total de Clientes</h2><p id="totalClientes">0</p>
     </div>
     <hr>
     <div class="card filtro">
    <h2>Total de Reclamos</h2><p id="totalReclamos">0</p>
    </div>
  </div>

  <!-- KPIs -->
  <div class="card">
   
    <h2>Total de Reclamos AP</h2><p id="totalReclamosAP">0</p>
    <h2>Total de Reclamos DS</h2><p id="totalReclamosDS">0</p>
    <h2>Consumo acumulado total:</h2><p id="totalGeneral">0</p>
    <h2>Total Medidores Activos</h2><p id="totalMedidores">0</p>
  </div>

  <!-- Gráficas -->
  <div class="card"><h2>Clientes por Tipo</h2><canvas id="clientesTipo"></canvas></div>
  <div class="card"><button class="max-btn">⛶</button><h2>Saldo por Supermanzana</h2><canvas id="clientesSM"></canvas></div>
  <div class="card"><button class="max-btn">⛶</button><h2>Crecimiento por Año</h2><canvas id="clientesCrec"></canvas></div>
  <div class="card"><button class="max-btn">⛶</button><h2>Reclamos AP por Motivo</h2><canvas id="reclamosMotivo"></canvas></div>
  <div class="card"><button class="max-btn">⛶</button><h2>Reclamos DS por Motivo</h2><canvas id="reclamosDSMotivo"></canvas></div>
  <div class="card"><h2>Reclamos por Mes</h2><canvas id="reclamosMes"></canvas></div>
  <div class="card"><h2>Finalizados por Mes</h2><canvas id="finalizadosMes"></canvas></div>

  <!-- Mapa de calor -->
  <div class="card" id="mapCard" style="grid-column: span 2; position: relative;">
    <button class="max-btn">⛶</button>
    <h2>Mapa de Calor - Reclamos</h2>
    <label><input type="checkbox" id="chkAP" checked> Reclamos AP <input type="checkbox" id="chkDS" checked> Reclamos DS</label>
    <div id="map"></div>
    <div id="mesSlider"></div>
    <p id="mesLabel"></p>
  </div>
</div>

<div class="card"><h2>Consumos m3</h2><canvas id="chartConsumo"></canvas></div>
<table id="tablaConsumo">
    <thead>
        <tr>
            <th>Año</th>
            <th>Mes</th>
            <th>Total Consumo (m³)</th>
        </tr>
    </thead>
    <tbody></tbody>
</table>

<script>
// URLs
const urlTecnica = "cpost/etltecnica.php";
const urlClientes = "cpost/etlclientes.php";
const urlConsumo = "cpost/consumo_mensual.php";
const urlReclamos = "https://dhcqgis.aguakan.com/geoserver/DHC_AGUAKAN/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:reclamos_ap&outputFormat=application/json&srsname=EPSG:4326";
const urlReclamosDS = "https://dhcqgis.aguakan.com/geoserver/DHC_AGUAKAN/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:reclamos_DS&outputFormat=application/json&srsname=EPSG:4326";
  
let clientes=[], reclamosAP=[], reclamosDS=[];
let map, reclamosAPSource, reclamosDSSource, heatmapAP, heatmapDS;
let chartClientesTipo, chartClientesSM, chartClientesCrec;
let chartReclamosMotivo, chartReclamosMes, chartFinalizadosMes, chartReclamosDSMotivo;
let graficaConsumo = null;

// Función para actualizar total de medidores según filtros
async function actualizarTotalMedidores() {
    try {
        const centroSel = document.getElementById("filtroCentroOperativo").value;
        const smSel = document.getElementById("filtroSM").value;
        
        let url = `${urlTecnica}?`;
        let params = [];
        
        if (centroSel !== "Todas") {
            params.push(`centro=${encodeURIComponent(centroSel)}`);
        }
        if (smSel !== "Todas") {
            params.push(`sm=${encodeURIComponent(smSel)}`);
        }
        
        if (params.length > 0) {
            url += params.join('&');
        } else {
            url = urlTecnica;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
            console.error("Error en medidores:", data.error);
            document.getElementById("totalMedidores").innerText = "Error";
        } else if (data.total_medidores !== undefined) {
            document.getElementById("totalMedidores").innerText = Number(data.total_medidores).toLocaleString();
        }
    } catch (error) {
        console.error("Error al cargar medidores:", error);
    }
}

// Función para actualizar consumo según filtros
async function actualizarConsumo() {
    try {
        const centroSel = document.getElementById("filtroCentroOperativo").value;
        const smSel = document.getElementById("filtroSM").value;
        
        let url = `${urlConsumo}?`;
        let params = [];
        
        if (centroSel !== "Todas") {
            params.push(`centro=${encodeURIComponent(centroSel)}`);
        }
        if (smSel !== "Todas") {
            params.push(`sm=${encodeURIComponent(smSel)}`);
        }
        
        if (params.length > 0) {
            url += params.join('&');
        } else {
            url = urlConsumo;
        }
        
        const response = await fetch(url);
        const lista = await response.json();
        
        if (lista.error) {
            console.error("Error en consumo:", lista.error);
            return;
        }
        
        const tbody = document.querySelector("#tablaConsumo tbody");
        tbody.innerHTML = "";
        let totalGeneral = 0;
        const labels = [];
        const valores = [];

        lista.forEach(item => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${item.ano}</td>
                <td>${String(item.mes).padStart(2, "0")}</td>
                <td>${item.total.toLocaleString()} m³</td>
            `;
            tbody.appendChild(tr);
            labels.push(`${item.ano}-${String(item.mes).padStart(2, "0")}`);
            valores.push(item.total);
            totalGeneral += item.total;
        });

        document.getElementById("totalGeneral").innerHTML = `${totalGeneral.toLocaleString()} m³`;
        
        // Actualizar gráfico de consumo
        if (graficaConsumo) {
            graficaConsumo.data.labels = labels;
            graficaConsumo.data.datasets[0].data = valores;
            graficaConsumo.update();
        } else {
            dibujarGrafico(labels, valores);
        }
    } catch (err) {
        console.error("Error al cargar consumo:", err);
    }
}

// Utils
function groupBy(array,key){ return array.reduce((acc,obj)=>{ const val=obj[key]||"Sin dato"; acc[val]=(acc[val]||0)+1; return acc; },{}); }

// --- MAPA ---
function initMap(){
  reclamosAPSource = new ol.source.Vector();
  reclamosDSSource = new ol.source.Vector();
  heatmapAP = new ol.layer.Heatmap({ source: reclamosAPSource, radius: 10, blur: 15 });
  heatmapDS = new ol.layer.Heatmap({ source: reclamosDSSource, radius: 10, blur: 15 });
  map = new ol.Map({
    target: "map",
    layers: [ new ol.layer.Tile({ source: new ol.source.OSM() }), heatmapAP, heatmapDS ],
    view: new ol.View({ center: ol.proj.fromLonLat([-87.07, 21.16]), zoom: 9 })
  });
  document.getElementById("chkAP").addEventListener("change", e=>heatmapAP.setVisible(e.target.checked));
  document.getElementById("chkDS").addEventListener("change", e=>heatmapDS.setVisible(e.target.checked));
}

function actualizarHeatmap(source,data){
  source.clear();
  data.forEach(r=>{
    if(r.longitud && r.latitud){
      const lon=parseFloat(r.longitud), lat=parseFloat(r.latitud);
      if(!isNaN(lon)&&!isNaN(lat)) source.addFeature(new ol.Feature({geometry:new ol.geom.Point(ol.proj.fromLonLat([lon,lat]))}));
    }
  });
}

// --- CARGA DE DATOS ---
async function loadData(){
  // 1. CARGAR CLIENTES PRIMERO
  const clientesRes = await fetch(urlClientes);
  clientes = await clientesRes.json();
  //console.log("Clientes cargados:", clientes.length);
  
  // 2. Cargar medidores
  await actualizarTotalMedidores();
  
  // 3. Cargar consumo
  await actualizarConsumo();
  
  // 4. Cargar reclamos AP
  const reclamosRes = await fetch(urlReclamos);
  const geojsonAP = await reclamosRes.json();
  
  reclamosAP = geojsonAP.features
      .filter(f => f.geometry && Array.isArray(f.geometry.coordinates))
      .map(f => ({
          ...f.properties,
          longitud: f.geometry.coordinates[0],
          latitud: f.geometry.coordinates[1]
      }));
  //console.log("Reclamos AP cargados:", reclamosAP.length);
  
  // 5. Cargar reclamos DS
  const reclamosDSRes = await fetch(urlReclamosDS);
  const geojsonDS = await reclamosDSRes.json();
  
  reclamosDS = geojsonDS.features
      .filter(f => f.geometry && Array.isArray(f.geometry.coordinates))
      .map(f => ({
          ...f.properties,
          longitud: f.geometry.coordinates[0],
          latitud: f.geometry.coordinates[1]
      }));
  //console.log("Reclamos DS cargados:", reclamosDS.length);
  
  // 6. Actualizar KPIs iniciales
  document.getElementById("totalClientes").innerText = clientes.length.toLocaleString();
  const clientesUnicosAP = new Set(reclamosAP.map(r => r.cliente)).size;
  document.getElementById("totalReclamosAP").innerText = clientesUnicosAP.toLocaleString();
  document.getElementById("totalReclamosDS").innerText = reclamosDS.length.toLocaleString();
  document.getElementById("totalReclamos").innerText = (clientesUnicosAP + reclamosDS.length).toLocaleString();

  // 7. Configurar filtros
  const filtroCentro = document.getElementById("filtroCentroOperativo");
  const filtroSM = document.getElementById("filtroSM");
  
  const centros = [...new Set(clientes.map(c=>c.centro_oper_desc))].sort();
  centros.forEach(centro=>{
    const opt=document.createElement("option"); 
    opt.value=centro; 
    opt.text=centro; 
    filtroCentro.appendChild(opt);
  });
  
  actualizarSMOptions("Todas"); 
  actualizarGraficas();

  // 8. Event listeners
  filtroCentro.addEventListener("change",()=>{ 
    actualizarSMOptions(filtroCentro.value); 
    actualizarGraficas(); 
    actualizarTotalMedidores();
    actualizarConsumo();
  });
  
  filtroSM.addEventListener("change",()=>{ 
    actualizarGraficas(); 
    actualizarTotalMedidores();
    actualizarConsumo();
  });

  inicializarSliderMes([...reclamosAP,...reclamosDS]);
}

function actualizarSMOptions(centro){
  const filtroSM=document.getElementById("filtroSM");
  let smFiltradas;
  
  if(centro === "Todas") {
    smFiltradas = [...new Set(clientes.map(c=>c.sm))].sort();
  } else {
    smFiltradas = [...new Set(clientes.filter(c=>c.centro_oper_desc===centro).map(c=>c.sm))].sort();
  }
  
  filtroSM.innerHTML='<option value="Todas">Todas</option>';
  smFiltradas.forEach(sm=>{ 
    if(sm && sm !== "") {
      const opt=document.createElement("option"); 
      opt.value=sm; 
      opt.text=sm; 
      filtroSM.appendChild(opt);
    }
  });
}

function actualizarGraficas(){
  const centroSel=document.getElementById("filtroCentroOperativo").value;
  const smSel=document.getElementById("filtroSM").value;
  let clientesFiltrados=clientes;
  
  if(centroSel!=="Todas") {
    clientesFiltrados=clientesFiltrados.filter(c=>c.centro_oper_desc===centroSel);
  }
  if(smSel!=="Todas") {
    clientesFiltrados=clientesFiltrados.filter(c=>c.sm===smSel);
  }

  const clientesSet = new Set(clientesFiltrados.map(c=>c.cliente));
  const reclamosFiltrados = reclamosAP.filter(r=>clientesSet.has(r.cliente));
  const reclamosDSFiltrados = reclamosDS.filter(r=>clientesSet.has(r.cliente));

  document.getElementById("totalClientes").innerText = clientesFiltrados.length.toLocaleString();
  const clientesUnicosAP = new Set(reclamosFiltrados.map(r => r.cliente)).size;
  document.getElementById("totalReclamosAP").innerText = clientesUnicosAP.toLocaleString();
  document.getElementById("totalReclamosDS").innerText = reclamosDSFiltrados.length.toLocaleString();
  document.getElementById("totalReclamos").innerText = (clientesUnicosAP + reclamosDSFiltrados.length).toLocaleString();

  actualizarHeatmap(reclamosAPSource,reclamosFiltrados);
  actualizarHeatmap(reclamosDSSource,reclamosDSFiltrados);

  // funciones de actualización de gráficos
  actualizarGraficaClientes(clientesFiltrados);
  actualizarGraficaClientesSM(clientesFiltrados);
  actualizarGraficaClientesCrec(clientesFiltrados);
  actualizarGraficaReclamosMotivo(reclamosFiltrados);
  actualizarGraficaReclamosMes(reclamosFiltrados);
  actualizarGraficaFinalizadosMes(reclamosFiltrados);
  actualizarGraficaReclamosDSMotivo(reclamosDSFiltrados);
}

// --- Gráficos Clientes ---
function actualizarGraficaClientes(clienteFiltrados){
  const clientesTipo = groupBy(clienteFiltrados,"uso_desc");
  const labels = Object.keys(clientesTipo);
  const data = Object.values(clientesTipo);
  const colores = labels.map((_,i)=>`hsl(${i*60 % 360},70%,60%)`);

  if(chartClientesTipo){
    chartClientesTipo.data.labels = labels.map((l,i)=>`${l}: ${data[i]}`);
    chartClientesTipo.data.datasets[0].data = data;
    chartClientesTipo.data.datasets[0].backgroundColor = colores;
    chartClientesTipo.update();
  } else {
    chartClientesTipo = new Chart(document.getElementById("clientesTipo"),{
      type:"pie",
      data:{ labels: labels.map((l,i)=>`${l}: ${data[i]}`), datasets:[{data:data, backgroundColor:colores}] },
      options:{ plugins:{ legend:{ position:"right" } } }
    });
  }
}

function actualizarGraficaClientesSM(clienteFiltrados){
  const clientesSaldo = {};

  clienteFiltrados.forEach(c => {
    const sm = c.sm || "Sin dato";
    const saldo = Number(c.saldo) || 0;
    if(!clientesSaldo[sm]){
      clientesSaldo[sm] = {
        saldo: 0,
        count: 0
      };
    }
    clientesSaldo[sm].saldo += saldo;
    clientesSaldo[sm].count++;
  });

  const labels = Object.keys(clientesSaldo);
  const saldos = labels.map(l => clientesSaldo[l].saldo);
  const counts = labels.map(l => clientesSaldo[l].count);

  if(chartClientesSM){
    chartClientesSM.data.labels = labels;
    chartClientesSM.data.datasets[0].data = saldos;
    chartClientesSM.update();
  } else {
    chartClientesSM = new Chart(document.getElementById("clientesSM"),{
      type: "bar",
      data: { labels, datasets:[{ label:"Saldo Total", data:saldos }] },
      options:{
        responsive:true,
        plugins:{
          tooltip:{
            callbacks:{
              label: function(ctx){
                return [
                  `Saldo: $${saldos[ctx.dataIndex].toLocaleString()}`,
                  `Clientes: ${counts[ctx.dataIndex]}`
                ];
              }
            }
          }
        },
        scales:{ y:{ beginAtZero:true } }
      }
    });
  }
}

function actualizarGraficaClientesCrec(clienteFiltrados){ 
  const clientesCrec = groupBy(
    clienteFiltrados.map(c => ({
      ...c,
      suscripcion: new Date(c.suscripcion).getFullYear()
    })), 
    "suscripcion"
  );

  const labels = Object.keys(clientesCrec).sort();
  const data = labels.map(y => clientesCrec[y]);

  const acumulado = [];
  data.reduce((sum, val, i) => {
    acumulado[i] = sum + val;
    return acumulado[i];
  }, 0);

  if (chartClientesCrec) {
    chartClientesCrec.data.labels = labels;
    chartClientesCrec.data.datasets[0].data = data;
    chartClientesCrec.data.datasets[1].data = acumulado;
    chartClientesCrec.update();
  } else {
    chartClientesCrec = new Chart(document.getElementById("clientesCrec"), {
      type: "bar",  
      data: {
        labels,
        datasets: [
          { type: "bar", label: "Nuevos Clientes", data, backgroundColor: "rgba(54, 162, 235, 0.7)", borderColor: "rgba(54, 162, 235, 1)", borderWidth: 2, barPercentage:0.6, categoryPercentge:0.8, yAxisID: 'y' },
          { type: "line", label: "Clientes Acumulados", data: acumulado, borderColor: "rgba(255, 99, 132, 1)", backgroundColor: "rgba(255, 99, 132, 0.2)", borderWidth: 4, tension: 0.3, fill: false, yAxisID: 'y1' }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true, labels: { font: { size: 16 } } } },
        scales: {
          y: { beginAtZero: true, title: { display: true, text: "Nuevos Clientes", font: { size: 16 } }, ticks: { font: { size: 14 } } },
          y1: { beginAtZero: true, position: 'right', grid: { drawOnChartArea: false }, title: { display: true, text: "Clientes Acumulados", font: { size: 16 } }, ticks: { font: { size: 14 } } },
          x: { ticks: { font: { size: 14 } } }
        }
      }
    });
  }
}

function actualizarGraficaReclamosMotivo(reclamosFiltrados) {
  const reclamosMotivo = {};
  reclamosFiltrados.forEach(r => {
    const motivo = r.motivo;
    if (!reclamosMotivo[motivo]) reclamosMotivo[motivo] = new Set();
    reclamosMotivo[motivo].add(r.cliente);
  });

  const labels = Object.keys(reclamosMotivo);
  const data = labels.map(motivo => reclamosMotivo[motivo].size);
  const colores = labels.map((_, i) => `hsl(${i * 50 % 360}, 70%, 50%)`);

  if (chartReclamosMotivo) {
    chartReclamosMotivo.data.labels = labels;
    chartReclamosMotivo.data.datasets[0].data = data;
    chartReclamosMotivo.data.datasets[0].backgroundColor = colores;
    chartReclamosMotivo.update();
  } else {
    chartReclamosMotivo = new Chart(document.getElementById("reclamosMotivo"), {
      type: "bar",
      data: { labels, datasets: [{ label: "Clientes Únicos con Reclamos", data, backgroundColor: colores }] },
      options: {
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx) => `${ctx.formattedValue} cliente${ctx.formattedValue != 1 ? 's' : ''}` } } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }
}

function actualizarGraficaReclamosMes(reclamosFiltrados){
  const reclamosMes = groupBy(reclamosFiltrados.map(r=>({...r, mes:new Date(r.fecha_inicio).toISOString().slice(0,7)})),"mes");
  const labels = Object.keys(reclamosMes);
  const data = Object.values(reclamosMes);
  const colores = labels.map((_,i)=>`rgba(54,162,235,${0.4 + i*0.1})`);

  if(chartReclamosMes){
    chartReclamosMes.data.labels = labels;
    chartReclamosMes.data.datasets[0].data = data;
    chartReclamosMes.data.datasets[0].backgroundColor = colores;
    chartReclamosMes.update();
  } else {
    chartReclamosMes = new Chart(document.getElementById("reclamosMes"),{ type:"bar", data:{ labels, datasets:[{ label:"Reclamos", data, backgroundColor:colores }] } });
  }
}

function actualizarGraficaFinalizadosMes(reclamosFiltrados){
  const finalizadosMes = groupBy(reclamosFiltrados.map(r=>({...r, mes:r.fecha_fin?r.fecha_fin.slice(0,7):null})),"mes");
  const labels = Object.keys(finalizadosMes);
  const data = Object.values(finalizadosMes);
  const colores = labels.map((_,i)=>`rgba(75,192,192,${0.4 + i*0.1})`);

  if(chartFinalizadosMes){
    chartFinalizadosMes.data.labels = labels;
    chartFinalizadosMes.data.datasets[0].data = data;
    chartFinalizadosMes.data.datasets[0].backgroundColor = colores;
    chartFinalizadosMes.update();
  } else {
    chartFinalizadosMes = new Chart(document.getElementById("finalizadosMes"),{ type:"bar", data:{ labels, datasets:[{ label:"Finalizados", data, backgroundColor:colores }] } });
  }
}

function actualizarGraficaReclamosDSMotivo(reclamosFiltrados){
  const reclamosMotivo = groupBy(reclamosFiltrados, "motivo");
  const labels = Object.keys(reclamosMotivo);
  const data = Object.values(reclamosMotivo);
  const colores = labels.map((_,i)=>`hsl(${i*50 % 360},70%,50%)`);

  if(chartReclamosDSMotivo){
    chartReclamosDSMotivo.data.labels = labels;
    chartReclamosDSMotivo.data.datasets[0].data = data;
    chartReclamosDSMotivo.data.datasets[0].backgroundColor = colores;
    chartReclamosDSMotivo.update();
  } else {
    chartReclamosDSMotivo = new Chart(document.getElementById("reclamosDSMotivo"),{
      type:"bar",
      data:{ labels, datasets:[{ label:"Total Reclamos DS", data, backgroundColor:colores }] },
      options:{
        plugins:{ legend:{ display:false }, tooltip:{ callbacks:{ label: ctx => `${ctx.label}: ${ctx.raw.toLocaleString()}` } } },
        scales:{ y:{ beginAtZero:true, ticks:{ callback: value=>value.toLocaleString() } } }
      }
    });
  }
}

// --- Slider por días ---
function soloDia(fecha){ const d=new Date(fecha); return new Date(d.getFullYear(),d.getMonth(),d.getDate()); }

function inicializarSliderMes(reclamos){
  if(reclamos.length === 0) return;
  let fechasDia = reclamos.map(r => new Date(r.fecha_inicio)).filter(d=>d instanceof Date && !isNaN(d)).sort((a,b)=>a-b);
  const min = fechasDia[0].getTime();
  const max = fechasDia[fechasDia.length -1].getTime();
  
  const mesSlider = document.getElementById("mesSlider");
  mesSlider.innerHTML = "";
  noUiSlider.create(mesSlider, {
    start: [min, max],
    connect: true,
    range: { min, max },
    step: 24*3600*1000,
    tooltips: [true, true],
    format: {
      to: v => new Date(+v).toLocaleDateString("es-MX",{day:"2-digit",month:"short",year:"numeric"}),
      from: v => Number(v)
    }
  });

  mesSlider.noUiSlider.on("update", (val, handle, unencoded) => {
    const f1 = new Date(+unencoded[0]), f2 = new Date(+unencoded[1]);
    document.getElementById("mesLabel").textContent = `Entre ${f1.toLocaleDateString("es-MX",{day:"2-digit",month:"long",year:"numeric"})} y ${f2.toLocaleDateString("es-MX",{day:"2-digit",month:"long",year:"numeric"})}`;
    filtrarMapaPorMes(f1,f2);
  });
}

function filtrarMapaPorMes(fechaMin, fechaMax){
  const minTime = soloDia(fechaMin).getTime();
  const maxTime = soloDia(fechaMax).getTime();

  const centroSel = document.getElementById("filtroCentroOperativo").value;
  const smSel = document.getElementById("filtroSM").value;

  let clientesFiltrados = clientes;
  if(centroSel !== "Todas") clientesFiltrados = clientesFiltrados.filter(c => c.centro_oper_desc === centroSel);
  if(smSel !== "Todas") clientesFiltrados = clientesFiltrados.filter(c => c.sm === smSel);

  const clientesSet = new Set(clientesFiltrados.map(c => c.cliente));

  const reclamosAPFiltrados = reclamosAP.filter(r => {
    const f = soloDia(r.fecha_inicio).getTime();
    return clientesSet.has(r.cliente) && f >= minTime && f <= maxTime;
  });

  const reclamosDSFiltrados = reclamosDS.filter(r => {
    const f = soloDia(r.fecha_inicio).getTime();
    return clientesSet.has(r.cliente) && f >= minTime && f <= maxTime;
  });

  actualizarHeatmap(reclamosAPSource, reclamosAPFiltrados);
  actualizarHeatmap(reclamosDSSource, reclamosDSFiltrados);
}

// --- Control maximizar ---
document.querySelectorAll(".card .max-btn").forEach(btn=>{ btn.addEventListener("click",()=>{
  const card=btn.parentElement; card.classList.toggle("maximized");
  if(card.querySelector("#map")) setTimeout(()=>map.updateSize(),300);
  const canvas=card.querySelector("canvas"); if(canvas&&canvas.chart) setTimeout(()=>canvas.chart.update(),300);
})});

// --- Inicialización ---
window.onload = ()=>{ initMap(); loadData(); };

function dibujarGrafico(labels, valores) {
  const ctx = document.getElementById("chartConsumo").getContext("2d");
  if (graficaConsumo) graficaConsumo.destroy();
  graficaConsumo = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Consumo mensual (m³)",
        data: valores,
        fill: false,
        borderColor: "blue",
        backgroundColor: "rgba(0,0,255,0.3)",
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true } },
      scales: { y: { beginAtZero: true, title: { display: true, text: "Consumo (m³)" } } }
    }
  });
}
</script>
</body>
</html>