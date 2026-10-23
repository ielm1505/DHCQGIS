<?php
// Incluir auth.php para proteger la página
include '../../authh.php'; // Ajusta la ruta según tu estructura

// Verificar que solo el rol admin pueda acceder
checkRole(['Admin']);
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Infraestructura Tuberías AP/DS</title>

<!-- OpenLayers y Chart.js -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@7.5.0/ol.css">
<script src="https://cdn.jsdelivr.net/npm/ol@7.5.0/dist/ol.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<style>
body { margin:0; display:flex; font-family:Arial,sans-serif; height:100vh; }
.sidebar { width:250px; background:#2b8d64; color:#ecf0f1; display:flex; flex-direction:column; align-items:center; padding-top:20px; }
.sidebar h2 { text-align:center; margin-bottom:20px; }
.sidebar a { color:#ecf0f1; text-decoration:none; padding:15px; width:100%; text-align:center; display:block; transition:background 0.3s; }
.sidebar a:hover { background:#58cadf; }
img.logo { width:180px; margin-bottom:20px; }
.content { flex:1; padding:10px; overflow-y:auto; }
#map { width:100%; height:600px; margin-bottom:10px; border:1px solid #ccc; }
select, button { padding:5px; margin:5px; }
table { border-collapse:collapse; margin-top:10px; width:40%; }
th, td { border:1px solid #ccc; padding:6px; text-align:center; width: 250px; }
th { background:#f0f0f0; }
</style>
</head>
<body>

<div class="sidebar">
    <img src="../../Imagen/logo-aguakan.png" alt="Logo" class="logo">
    <h2>Tuberías</h2>
    <a href="#" onclick="cambiarRed('AP')">Red Agua Potable</a>
    <a href="#" onclick="cambiarRed('DS')">Red Descarga Sanitaria</a>
</div>

<div class="content">
    <h2 id="tituloRed">Red de Agua Potable</h2>
    <div id="map"></div>

    <div id="filtros" style="padding:10px;background:#f8f8f8;border:1px solid #ccc;">
        <h3>Filtros</h3>
        <label>Municipio:</label>
        <select id="Municipio"><option value="">--Todos--</option></select>
        <label>Estatus:</label>
        <select id="Estatus"><option value="">--Todos--</option></select>
        <label>Tipo:</label>
        <select id="Tipo_de_Re"><option value="">--Todos--</option></select>
        <label>Diámetro:</label>
        <select id="DIAMETRE" multiple size="3"><option value="">--Todos--</option></select>
        <label>Material:</label>
        <select id="MATERIAU" multiple size="3"><option value="">--Todos--</option></select>

        <br>
        <button onclick="aplicarFiltros()">Aplicar Filtros</button>
        <button onclick="resetearFiltros()">Mostrar Todo</button>
    </div>

    <div id="estadisticas" style="background:#e8f5e9;border:1px solid #ccc;padding:10px;margin-top:10px;">
        <h4>Estadísticas</h4>
        <div id="contenido_estadisticas">No hay datos cargados.</div>
        <canvas id="graficaTipos" style="margin-top:20px;max-width:600px;"></canvas>
    </div>
</div>

<script>
let capaActual = 'AP';
let jsonSource = new ol.source.Vector();
let vectorLayer = new ol.layer.Vector({ source: jsonSource });

let map = new ol.Map({
    target: 'map',
    layers: [ new ol.layer.Tile({ source: new ol.source.OSM() }), vectorLayer ],
    view: new ol.View({ center: ol.proj.fromLonLat([-86.8475, 20.885]), zoom:10.7 })
});

// Mapeo de campos para unificar AP/DS
const fieldMap = {
    Tipo_de_Re: 'tipo_red', type_res: 'tipo_red',
    MATERIAU: 'material', materiau: 'material',
    DIAMETRE: 'diametro', diametre: 'diametro'
};

function normalizarAtributos(props) {
    const normalizados = {};
    for (const key in props) {
        normalizados[fieldMap[key] || key] = props[key];
    }
    return normalizados;
}

function cambiarRed(red) {
    capaActual = red;
    document.getElementById('tituloRed').textContent = red==='AP' ? 'Red de Agua Potable' : 'Red de Drenaje Sanitaria';
    cargarDatosIniciales();
}

function cargarDatosIniciales() {
    const capa = capaActual==='AP' ? 'DHC_AGUAKAN:AEP_CANA_AP' : 'DHC_AGUAKAN:Ass_cana';
    const url = `https://dhcqgis.aguakan.com/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=${capa}&outputFormat=application/json&srsname=EPSG:3857`;

    fetch(url)
    .then(r=>r.json())
    .then(data=>{
        const format = new ol.format.GeoJSON();
        const features = format.readFeatures(data, { featureProjection:'EPSG:3857' });
        // normalizar atributos
        features.forEach(f=>{
            f.values_ = normalizarAtributos(f.values_);
        });
        jsonSource.clear();
        jsonSource.addFeatures(features);
        llenarSelects(features);
        calcularEstadisticas(features);
    });
}

function limpiarSelect(select) { while(select.options.length>1) select.remove(1); }

function llenarSelects(features) {
    const campos = ['Municipio','Estatus','tipo_red','diametro','material'];
    const sets = {};
    campos.forEach(c=>sets[c]=new Set());

    features.forEach(f=>{
        const props = f.values_;
        sets['Municipio'].add(props['Municipio'] || '');
        sets['Estatus'].add(props['Estatus'] || '');
        sets['tipo_red'].add(props['tipo_red'] || '');
        sets['diametro'].add(props['diametro'] || '');
        sets['material'].add(props['material'] || '');
    });

    const mapping = {tipo_red:'Tipo_de_Re', diametro:'DIAMETRE', material:'MATERIAU'};
    ['Municipio','Estatus','tipo_red','diametro','material'].forEach(c=>{
        const selectId = mapping[c] || c;
        const select = document.getElementById(selectId);
        limpiarSelect(select);
        sets[c].forEach(v=>{ if(v) select.append(new Option(v,v)); });
    });
}

function aplicarFiltros() {
    const valores = {
        Municipio: document.getElementById('Municipio').value,
        Estatus: document.getElementById('Estatus').value,
        tipo_red: document.getElementById('Tipo_de_Re').value,
        diametro: Array.from(document.getElementById('DIAMETRE').selectedOptions).map(o=>o.value).filter(v=>v),
        material: Array.from(document.getElementById('MATERIAU').selectedOptions).map(o=>o.value).filter(v=>v)
    };

    const filtros = [];
    if(valores.Municipio) filtros.push(`Municipio='${valores.Municipio}'`);
    if(valores.Estatus) filtros.push(`Estatus='${valores.Estatus}'`);
    if(valores.tipo_red) filtros.push(capaActual==='AP' ? `Tipo_de_Re='${valores.tipo_red}'` : `type_res='${valores.tipo_red}'`);
    if(valores.diametro.length>0) filtros.push('(' + valores.diametro.map(d=>capaActual==='AP'?`DIAMETRE='${d}'`:`diametre='${d}'`).join(' OR ')+')');
    if(valores.material.length>0) filtros.push('(' + valores.material.map(m=>capaActual==='AP'?`MATERIAU='${m}'`:`materiau='${m}'`).join(' OR ')+')');

    const cql = filtros.join(' AND ');
    consultarWFSporAtributo(cql);
}

function consultarWFSporAtributo(cql) {
    const capa = capaActual==='AP' ? 'DHC_AGUAKAN:AEP_CANA_AP' : 'DHC_AGUAKAN:Ass_cana';
    let url = `https://dhcqgis.aguakan.com/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=${capa}&outputFormat=application/json&srsname=EPSG:3857`;
    if(cql) url += "&CQL_FILTER="+encodeURIComponent(cql);

    fetch(url)
    .then(r=>r.json())
    .then(data=>{
        const format = new ol.format.GeoJSON();
        const features = format.readFeatures(data, { featureProjection:'EPSG:3857' });
        features.forEach(f=>{ f.values_ = normalizarAtributos(f.values_); });
        jsonSource.clear();
        jsonSource.addFeatures(features);
        calcularEstadisticas(features);
    });
}

function resetearFiltros() {
    ['Municipio','Estatus','Tipo_de_Re','DIAMETRE','MATERIAU'].forEach(id=>{
        const el=document.getElementById(id); el.value=''; if(el.multiple){ for(let i=0;i<el.options.length;i++) el.options[i].selected=false; }
    });
    cargarDatosIniciales();
}






function calcularEstadisticas(features){
    let total=features.length;
    let matriz={}, diametrosSet=new Set(), materialesSet=new Set();
    let longitudConduccion=0,longitudDistribucion=0, sumaLongitud=0;

    features.forEach(f=>{
        const props=f.values_;
        const longitud=parseFloat(props['Longitud']||0);
        sumaLongitud += longitud;

        const diam=props['diametro']||props['DIAMETRE']||'N/D';
        const mat=props['material']||props['MATERIAU']||'N/D';

        // Matriz diámetro × material
        if(!matriz[diam]) matriz[diam]={};
        matriz[diam][mat]=(matriz[diam][mat]||0)+longitud;
        diametrosSet.add(diam); materialesSet.add(mat);

        // Solo para AP
        if(capaActual==='AP'){
            const tipo=props['tipo_red']||props['Tipo_de_Re'];
            if(tipo==='Conduccion') longitudConduccion += longitud;
            else if(tipo==='Distribucion') longitudDistribucion += longitud;
        }
    });

    // Tabla de estadísticas
    let html=`<table>
        <tr><th>Total registros</th><td>${total}</td></tr>
        <tr><th>Longitud total de la red (m)</th><td>${sumaLongitud.toLocaleString()}</td></tr>`;

    if(capaActual==='AP'){
        html += `<tr><th>Longitud Conducción (m)</th><td>${longitudConduccion.toLocaleString()}</td></tr>
                 <tr><th>Longitud Distribución (m)</th><td>${longitudDistribucion.toLocaleString()}</td></tr>`;
    } else 
    
if(capaActual==='DS'){
    // Sumar longitud por type_res
    const typeResLongitudes = {};

    features.forEach(f=>{
        const props = f.values_;
        const t = props['type_res'] || props['tipo_red'];
        const longitud = parseFloat(props['Longitud'] || 0);

        if(!typeResLongitudes[t]) typeResLongitudes[t] = 0;
        typeResLongitudes[t] += longitud;
    });

    // Mostrar cada type_res con su longitud total
    for(const t in typeResLongitudes){
        html += `<tr><th>${t}</th><td>${typeResLongitudes[t].toLocaleString()}</td></tr>`;
    }

    // Opcional: suma total de toda la red DS
    const sumaTotalDS = Object.values(typeResLongitudes).reduce((a,b)=>a+b,0);
    html = `<tr><th>Total registros: </th><td>${total}</td></tr>
            <tr><th>Longitud total de la red (m)</th><td>${sumaTotalDS.toLocaleString()}</td></tr>` + html;
}



    html += `</table>`;

    // Matriz diámetro × material
    html += `<h4>Matriz Longitud (Diámetro × Material)</h4>
    <table>
        <tr><th>Diámetro\\Material</th>${[...materialesSet].map(m=>`<th>${m}</th>`).join('')}</tr>
        ${[...diametrosSet].map(d=>`<tr><td>${d}</td>${[...materialesSet].map(m=>`<td>${(matriz[d][m]||0).toLocaleString()}</td>`).join('')}</tr>`).join('')}
    </table>`;

    document.getElementById('contenido_estadisticas').innerHTML = html;

    // Gráfica solo para AP
    const canvas = document.getElementById('graficaTipos');
    if(capaActual==='AP'){
        if(window.chartTipos) window.chartTipos.destroy();
        const ctx = canvas.getContext('2d');
        window.chartTipos = new Chart(ctx,{
            type:'bar',
            data:{
                labels:['Conducción','Distribución'],
                datasets:[{label:'Longitud (m)',data:[longitudConduccion,longitudDistribucion],backgroundColor:['#42a5f5','#66bb6a']}]
            },
            options:{responsive:true, plugins:{legend:{display:false}}}
        });
        canvas.style.display = 'block';
    } else {
        if(window.chartTipos) window.chartTipos.destroy();
        canvas.style.display = 'none';
    }
}




// Cargar al inicio
cargarDatosIniciales();
</script>
</body>
</html>
