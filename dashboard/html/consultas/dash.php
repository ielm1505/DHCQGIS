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

<!-- Conexiones tempranas a los orígenes externos (CDN + GeoServer) -->
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="preconnect" href="https://dhcqgis.aguakan.com" crossorigin>
<link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
<link rel="dns-prefetch" href="https://dhcqgis.aguakan.com">

<!-- Chart.js (versión fija: evita @latest, que rompe el cache del navegador y puede traer breaking changes) -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js" defer></script>

<!-- OpenLayers -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@9.2.4/ol.css">
<script src="https://cdn.jsdelivr.net/npm/ol@9.2.4/dist/ol.js" defer></script>

<!-- noUiSlider -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/nouislider@15.7.1/dist/nouislider.min.css">
<script src="https://cdn.jsdelivr.net/npm/nouislider@15.7.1/dist/nouislider.min.js" defer></script>

<style>
:root {
  --bg-page: #f5f7fa;
  --surface: #ffffff;
  --surface-muted: #f1f4f9;
  --border: #e4e8f0;
  --text-primary: #1a2233;
  --text-secondary: #62708a;
  --accent: #2563eb;
  --accent-dark: #1d4ed8;
  --accent-soft: #eaf1ff;
  --radius: 14px;
  --shadow: 0 1px 2px rgba(16,24,40,0.04), 0 4px 14px rgba(16,24,40,0.06);
}
* { box-sizing: border-box; }
body { font-family: system-ui, -apple-system, "Segoe UI", Arial, sans-serif; font-weight: 400; margin: 0; padding: 24px; background: var(--bg-page); color: var(--text-primary); }

/* Overlay de carga: feedback inmediato mientras llegan los datos */
#loadingOverlay { position: fixed; inset: 0; background: rgba(245,247,250,0.94); z-index: 5000; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; transition: opacity .25s ease; }
#loadingOverlay.hidden { opacity: 0; pointer-events: none; }
#loadingOverlay p { color: var(--text-secondary); font-size: 0.95rem; }
.spinner { width: 40px; height: 40px; border: 4px solid var(--border); border-top-color: var(--accent); border-radius: 50%; animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Skeleton para tarjetas mientras se dibujan las gráficas */
.card.skeleton canvas { visibility: hidden; }
.card.skeleton { position: relative; }
.card.skeleton::after { content: ""; position: absolute; inset: 15px; border-radius: 8px; background: linear-gradient(90deg,var(--surface-muted) 25%,#fafbfd 37%,var(--surface-muted) 63%); background-size: 400% 100%; animation: shimmer 1.4s ease infinite; }
@keyframes shimmer { 0% { background-position: 100% 0; } 100% { background-position: 0 0; } }

.topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
.topbar h1 { font-size: 1.4rem; font-weight: 600; margin: 0; display: flex; align-items: center; gap: 10px; }
.btn-back { background: var(--surface); border: 1px solid var(--border); color: var(--text-primary); padding: 8px 16px; border-radius: 10px; cursor: pointer; font-size: 0.9rem; font-weight: 500; box-shadow: var(--shadow); }
.btn-back:hover { background: var(--surface-muted); }

.filtros-bar { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; }
.filtro-item { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 10px 14px; display: flex; align-items: center; gap: 10px; box-shadow: var(--shadow); }
.filtro-item label { font-size: 0.8rem; color: var(--text-secondary); font-weight: 500; white-space: nowrap; }
.filtro-item select { border: 1px solid var(--border); border-radius: 8px; padding: 6px 8px; font-size: 0.85rem; min-width: 160px; background: var(--surface-muted); color: var(--text-primary); }

.kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 14px; margin-bottom: 24px; }
.kpi-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px 18px; box-shadow: var(--shadow); }
.kpi-card .kpi-label { font-size: 0.78rem; color: var(--text-secondary); font-weight: 500; margin: 0 0 6px; }
#totalClientes, #totalReclamos, #totalReclamosDS, #totalReclamosAP, #totalGeneral, #totalMedidores { font-size: 1.6rem; font-weight: 600; color: var(--text-primary); margin: 0; }

.dashboard { display: grid; grid-template-columns: repeat(auto-fit, minmax(420px, 1fr)); gap: 18px; }
.card { background: var(--surface); border: 1px solid var(--border); padding: 18px; border-radius: var(--radius); box-shadow: var(--shadow); display: flex; flex-direction: column; position: relative; }
.card h2 { font-size: 0.95rem; font-weight: 600; margin: 0 0 14px; color: var(--text-primary); }
canvas { width: 100% !important; height: 320px; object-fit: contain; }

#map { width: 100%; height: 460px; border-radius: 10px; margin-top: 10px; position: relative; border: 1px solid var(--border); }
table { width: 70%; margin: 24px auto 0; border-collapse: collapse; background: var(--surface); border-radius: 10px; overflow: hidden; box-shadow: var(--shadow); }
th, td { padding: 10px 12px; border-bottom: 1px solid var(--border); text-align: center; font-size: 0.88rem; }
th { background: var(--accent); color: #fff; font-weight: 500; }
tr:last-child td { border-bottom: none; }

.map-toggles { display: flex; gap: 14px; font-size: 0.85rem; color: var(--text-secondary); align-items: center; margin-bottom: 4px; }
.map-toggles label { display: flex; align-items: center; gap: 6px; }

/* Slider flotante sobre el mapa */
#mesSlider { height: 8px !important; margin: 14px 0 6px; flex: none; }
#mesLabel { flex: none; font-size: 0.85rem; color: var(--text-secondary); margin: 0; }

/* Botón maximizar */
.card .max-btn { position: absolute; top: 14px; right: 14px; background: var(--accent-soft); color: var(--accent-dark); border: none; border-radius: 8px; width: 30px; height: 30px; cursor: pointer; font-size: 0.9rem; z-index: 1001; }
.card .max-btn:hover { background: var(--accent); color: #fff; }
/* Tarjeta maximizada */
.card.maximized { position: fixed !important; top: 16px; left: 16px; right: 16px; bottom: 16px; width: auto !important; height: auto !important; z-index: 2000; background: var(--surface); display: flex; flex-direction: column; }
.card.maximized > div, .card.maximized canvas { flex: 1; height: 100% !important; width: 100% !important; }
</style>

</head>
<body>
<div id="loadingOverlay"><div class="spinner"></div><p>Cargando datos del dashboard…</p></div>

<div class="topbar">
  <h1>📊 Dashboard Clientes y Reclamos</h1>
  <button class="btn-back" onclick="window.location.href='../index.php'">← Volver al inicio</button>
</div>

<div class="filtros-bar">
  <div class="filtro-item">
    <label for="filtroCentroOperativo">Centro operativo</label>
    <select id="filtroCentroOperativo"><option value="Todas">Todas</option></select>
  </div>
  <div class="filtro-item">
    <label for="filtroSM">Supermanzana</label>
    <select id="filtroSM"><option value="Todas">Todas</option></select>
  </div>
</div>

<div class="kpi-grid">
  <div class="kpi-card"><p class="kpi-label">Total de clientes</p><p id="totalClientes">0</p></div>
  <div class="kpi-card"><p class="kpi-label">Total de reclamos</p><p id="totalReclamos">0</p></div>
  <div class="kpi-card"><p class="kpi-label">Reclamos AP</p><p id="totalReclamosAP">0</p></div>
  <div class="kpi-card"><p class="kpi-label">Reclamos DS</p><p id="totalReclamosDS">0</p></div>
  <div class="kpi-card"><p class="kpi-label">Consumo acumulado</p><p id="totalGeneral">0</p></div>
  <div class="kpi-card"><p class="kpi-label">Medidores activos</p><p id="totalMedidores">0</p></div>
</div>

<div class="dashboard">
  <!-- Gráficas -->
  <div class="card"><h2>Clientes por tipo</h2><canvas id="clientesTipo"></canvas></div>
  <div class="card"><button class="max-btn">⛶</button><h2>Saldo por supermanzana</h2><canvas id="clientesSM"></canvas></div>
  <div class="card"><button class="max-btn">⛶</button><h2>Crecimiento por año</h2><canvas id="clientesCrec"></canvas></div>
  <div class="card"><button class="max-btn">⛶</button><h2>Reclamos AP por motivo</h2><canvas id="reclamosMotivo"></canvas></div>
  <div class="card"><button class="max-btn">⛶</button><h2>Reclamos DS por motivo</h2><canvas id="reclamosDSMotivo"></canvas></div>
  <div class="card"><h2>Reclamos por mes</h2><canvas id="reclamosMes"></canvas></div>
  <div class="card"><h2>Finalizados por mes</h2><canvas id="finalizadosMes"></canvas></div>

  <!-- Mapa de calor -->
  <div class="card" id="mapCard" style="grid-column: span 2;">
    <button class="max-btn">⛶</button>
    <h2>Mapa de calor - reclamos</h2>
    <div class="map-toggles">
      <label><input type="checkbox" id="chkAP" checked> Reclamos AP</label>
      <label><input type="checkbox" id="chkDS" checked> Reclamos DS</label>
    </div>
    <div id="map"></div>
    <div id="mesSlider"></div>
    <p id="mesLabel"></p>
  </div>
</div>

<div class="card" style="margin-top: 18px;"><h2>Consumos m³</h2><canvas id="chartConsumo"></canvas></div>
<table id="tablaConsumo">
    <thead>
        <tr>
            <th>Año</th>
            <th>Mes</th>
            <th>Total consumo (m³)</th>
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

function debounce(fn, wait){
  let t;
  return (...args)=>{ clearTimeout(t); t=setTimeout(()=>fn(...args), wait); };
}

// Cache corta en sessionStorage para las respuestas GeoJSON externas (pesadas y de un servidor de terceros).
// Evita volver a descargar ~MBs de datos si el usuario recarga la página en la misma sesión.
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutos
async function fetchConCache(url, cacheKey){
  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      const { ts, data } = JSON.parse(cached);
      if (Date.now() - ts < CACHE_TTL_MS) return data;
    }
  } catch(e) { /* sessionStorage lleno o no disponible: seguimos sin cache */ }

  const res = await fetch(url);
  const data = await res.json();
  try { sessionStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data })); } catch(e) { /* payload muy grande para sessionStorage, se ignora */ }
  return data;
}

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
  try {
    // Todas las peticiones son independientes entre sí: se lanzan en paralelo
    // en vez de esperarlas una por una. Con 5 llamadas secuenciales de ~300-800ms
    // cada una, esto puede reducir el tiempo de carga inicial de ~2-3s a ~0.5-1s
    // (el tiempo total pasa a ser el de la petición más lenta, no la suma de todas).
    const [clientesData, geojsonAP, geojsonDS] = await Promise.all([
      fetch(urlClientes).then(r => r.json()),
      fetchConCache(urlReclamos, "cache_reclamosAP"),
      fetchConCache(urlReclamosDS, "cache_reclamosDS"),
      actualizarTotalMedidores(),
      actualizarConsumo()
    ]);

    clientes = clientesData;
    //console.log("Clientes cargados:", clientes.length);

    reclamosAP = geojsonAP.features
        .filter(f => f.geometry && Array.isArray(f.geometry.coordinates))
        .map(f => ({
            ...f.properties,
            longitud: f.geometry.coordinates[0],
            latitud: f.geometry.coordinates[1]
        }));
    //console.log("Reclamos AP cargados:", reclamosAP.length);

    reclamosDS = geojsonDS.features
        .filter(f => f.geometry && Array.isArray(f.geometry.coordinates))
        .map(f => ({
            ...f.properties,
            longitud: f.geometry.coordinates[0],
            latitud: f.geometry.coordinates[1]
        }));
    //console.log("Reclamos DS cargados:", reclamosDS.length);
  } catch (err) {
    console.error("Error cargando datos del dashboard:", err);
    document.getElementById("loadingOverlay").innerHTML = "<p>⚠️ Ocurrió un error cargando el dashboard. Intenta recargar la página.</p>";
    return;
  }

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

  document.getElementById("loadingOverlay").classList.add("hidden");
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

  const filtrarMapaDebounced = debounce(filtrarMapaPorMes, 120);
  mesSlider.noUiSlider.on("update", (val, handle, unencoded) => {
    const f1 = new Date(+unencoded[0]), f2 = new Date(+unencoded[1]);
    document.getElementById("mesLabel").textContent = `Entre ${f1.toLocaleDateString("es-MX",{day:"2-digit",month:"long",year:"numeric"})} y ${f2.toLocaleDateString("es-MX",{day:"2-digit",month:"long",year:"numeric"})}`;
    filtrarMapaDebounced(f1,f2);
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
