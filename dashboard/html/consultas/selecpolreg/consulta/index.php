<?php  
include '../../../../authh.php'; 
checkRole(['Admin','comercial']);
?>


<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Consulta Histórica de Afectación</title>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@latest/ol.css">

<style>

body{margin:0;font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;background:#f4f4f4;}

.contenedor{ width:95%; margin:auto; margin-top:10px; background:white; padding:15px; border-radius:10px; box-shadow:0 2px 10px rgba(0,0,0,0.2);}
.barra{display:flex; gap:10px; flex-wrap:wrap; margin-bottom:10px;}
input{padding:10px;font-size:16px;}
button{padding:10px 20px;background:#0078A8;color:white;border:none;cursor:pointer;border-radius:5px;}
button:hover{ background:#005f84; }
#map{width:100%;height:550px;border:1px solid #ccc;}

/* PANEL */
#panelResultados{position:absolute;top:120px;left:50px;width:520px;max-height:500px;background:white;border:1px solid #ccc;border-radius:8px;box-shadow:0 5px 15px rgba(0,0,0,0.3);overflow:hidden;display:none;z-index:9999;}
#panelHeader{background:#0078A8;color:white;padding:8px;cursor:move;font-weight:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;}
.tabs{display:flex;border-bottom:1px solid #ccc;}
.tab{flex:1;text-align:center;padding:8px;cursor:pointer;background:#eee;}
.tab.active{background:white;font-weight:bold;}
#contenidoLista, #contenidoDetalle{padding:10px;max-height:400px;overflow:auto;}
.listaAfectacion{background:white;border:1px solid #ccc;border-left:5px solid #0078A8;padding:10px;margin-bottom:10px;border-radius:6px;cursor:pointer;}
.listaAfectacion:hover{background:#f0f8ff;}
.tipoBadge{display:inline-block;padding:4px 8px;border-radius:4px;color:white;font-size:12px;font-weight:bold;}
table{width:100%;border-collapse:collapse;}
th{background:#0078A8;color:white;padding:6px;}
td{border:1px solid #ccc;padding:6px;}

#panelResultados{
    position:absolute;
    top:120px;
    left:50px;
    width:420px;
    max-height:500px;
    background:white;
    border:1px solid #ccc;
    border-radius:8px;
    box-shadow:0 5px 15px rgba(0,0,0,0.3);
    overflow:hidden;
    display:none;
    z-index:9999;
}

#panelHeader{
    background:#1976d2;
    color:white;
    padding:10px;
    cursor:move;
    display:flex;
    justify-content:space-between;
    align-items:center;
    font-weight:bold;
}

#btnCerrarPanel{
    background:transparent;
    border:none;
    color:white;
    font-size:18px;
    cursor:pointer;
    padding:0 5px;
}

#btnCerrarPanel:hover{
    color:#ffcccc;
}
</style>
</head>

<body>

<div class="contenedor">

    <h2>Consulta Histórica de Afectación</h2>

<br>
<a href="../../../index.php"><button>Volver</button></a>

<hr>

    <div class="barra">
        <input type="number" id="idAfectacion" placeholder="Ingrese ID">
        <input type="date" id="fechaInicio">
        <input type="date" id="fechaFin">
        <button onclick="consultarAfectacion()">Consultar</button>
    </div>

    <div id="map"></div>

</div>

<div id="panelResultados">
    
    <div id="panelHeader">
        <span>Resultados</span>
        <button id="btnCerrarPanel">✖</button>
    </div>

    <div class="tabs">
        <div class="tab active" onclick="cambiarTab('lista')">Lista</div>
        <div class="tab" onclick="cambiarTab('detalle')">Detalle</div>
    </div>

    <div id="contenidoLista"></div>
    <div id="contenidoDetalle" style="display:none;"></div>

</div>

<script src="https://cdn.jsdelivr.net/npm/ol@latest/dist/ol.js"></script>

<script>

// ================= MAPA =================
const fuente = new ol.source.Vector();
const fuenteSM = new ol.source.Vector();

const capaVector = new ol.layer.Vector({
    source: fuente
});

const capaSM = new ol.layer.Vector({
    source: fuenteSM,
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({ color: '#ff9800', width: 3 }),
        fill: new ol.style.Fill({color: 'rgba(255,152,0,0.2)'})
    })
});

const map = new ol.Map({
    target:'map',
    layers:[
        new ol.layer.Tile({ source:new ol.source.OSM() }),
        capaVector,
        capaSM
    ],
    view:new ol.View({
        center: ol.proj.fromLonLat([-86.8475,21.1619]),
        zoom:11
    })
});

// ================= GLOBAL =================
let ultimaLista = [];

// ================= EXTRAER SM =================
function extraerSMs(elementos){

    if(!Array.isArray(elementos)) return [];

    const tiposSM = [
        "SM_BJ",
        "SM_SOL",
        "SM_PM",
        "SM_IM"
    ];

    return elementos
        .filter(el =>
            tiposSM.includes(el.tipo)
        )
        .map(el => el.valor)
        .filter(v => v);
}

// ================= DRAG =================


const panel = document.getElementById("panelResultados");
const header = document.getElementById("panelHeader");




document.addEventListener("DOMContentLoaded", () => {

    const panel = document.getElementById("panelResultados");
    const header = document.getElementById("panelHeader");
    const btnCerrar = document.getElementById("btnCerrarPanel");

    let drag = false,
        offsetX = 0,
        offsetY = 0;

    header.onmousedown = e => {

        if(e.target.id === "btnCerrarPanel") return;

        drag = true;

        offsetX = e.clientX - panel.offsetLeft;
        offsetY = e.clientY - panel.offsetTop;
    };

    document.onmousemove = e => {

        if(drag){

            panel.style.left = (e.clientX - offsetX) + "px";
            panel.style.top  = (e.clientY - offsetY) + "px";
        }
    };

    document.onmouseup = () => drag = false;

    btnCerrar.onclick = () => {

        panel.style.display = "none";
    };

});



// ================= TABS =================
function cambiarTab(tab){

    document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));

    if(tab==="lista"){
        document.querySelectorAll(".tab")[0].classList.add("active");
        document.getElementById("contenidoLista").style.display="block";
        document.getElementById("contenidoDetalle").style.display="none";
    }else{
        document.querySelectorAll(".tab")[1].classList.add("active");
        document.getElementById("contenidoLista").style.display="none";
        document.getElementById("contenidoDetalle").style.display="block";
    }
}

// ================= COLOR =================
function colorTipo(tipo){
    const mapColor = {
        "SM_BJ":"#9419db",
        "SM_SOL":"#1565c0",
        "SM_PM":"#0d47a1",
        "SM_IM":"#42a5f5",
        "CC_BJ":"#d32f2f",
        "CC_SOL":"#c62828",
        "CT_BJ":"#388e3c",
        "CT_SOL":"#2e7d32",
        "LOCALIDAD":"#6a1b9a"
    };
    return mapColor[tipo] || "#555";
}

// ================= CONSULTA =================
async function consultarAfectacion(){

    const id = document.getElementById("idAfectacion").value;
    const fi = document.getElementById("fechaInicio").value;
    const ff = document.getElementById("fechaFin").value;

    if(!id && !fi && !ff){
        alert("Ingrese ID o rango de fechas");
        return;
    }

    fuente.clear();
    fuenteSM.clear();

    panel.style.display="block";

    document.getElementById("contenidoLista").innerHTML="Cargando...";
    document.getElementById("contenidoDetalle").innerHTML="";

    const params = new URLSearchParams();
    if(id) params.append("id",id);
    if(fi) params.append("fecha_inicio",fi);
    if(ff) params.append("fecha_fin",ff);

    try{

        const res = await fetch(`consulta_afectacion.php?${params}`);
        const data = await res.json();

        if(!data.length){
            document.getElementById("contenidoLista").innerHTML="Sin resultados";
            return;
        }

        ultimaLista = data;

        // ================= LISTA =================
        let listaHTML = "";

        ultimaLista.forEach(row=>{
            listaHTML += `
                <div class="listaAfectacion"
                    onclick="seleccionarAfectacion(${row.id_afectacion})">

                    <b>ID:</b> ${row.id_afectacion}<br>
                    <b>Responsable:</b> ${row.tipo || ''}<br>
                    <b>Inicio:</b> ${row.fecha_inicio || ''}<br>
                    <b>Fin:</b> ${row.fecha_fin || ''}

                </div>
            `;
        });

        document.getElementById("contenidoLista").innerHTML = listaHTML;

        // ================= GEOMETRÍA PRINCIPAL =================
        ultimaLista.forEach(row => {

            if(!row.geom) return;

            try{

                const geo = JSON.parse(row.geom);

                const feature = new ol.format.GeoJSON().readFeature(geo, {
                    dataProjection: 'EPSG:32616',
                    featureProjection: 'EPSG:3857'
                });

                fuente.addFeature(feature);

            }catch(e){
                console.warn("Geom inválida:", e);
            }

        });

        // ================= FIT SEGURO =================
        const extent = fuente.getExtent();

        if(
            extent &&
            extent[0] !== Infinity &&
            fuente.getFeatures().length > 0
        ){
            map.getView().fit(extent,{
                padding:[50,50,50,50],
                maxZoom:17,
                duration:800
            });
        }

        // ================= DETALLE =================
        let row = data[0];

        let detalleHTML = `
            <h4>Detalle</h4>
             <table>
                <tr>
                    <th>ID</th><th>Tipo</th><th>Motivo</th><th>Responsable</th><th>Periodo</th><th>Estatus</th>
                </tr>
                <tr>
                    <td>${row.id_afectacion}</td>
                    
                    <td>${row.tipo}</td><td>${row.descripcion}</td>
                    <td>${row.nivel}</td><td>${row.periodo}</td>
                    <td>${row.estatus}</td>
                </tr>
            </table>

            
        `;

        if(row.elementos_afectados){

            detalleHTML += `
            <div style="margin-top:10px;">
                <b>Elementos:</b>
                <div style="margin-top:5px;display:flex;flex-wrap:wrap;gap:5px;">
                    ${row.elementos_afectados.map(el=>`
                        <span class="tipoBadge"
                            style="background:${colorTipo(el.tipo)}">
                            ${el.tipo}: ${el.valor}
                        </span>
                    `).join('')}
                </div>
            </div>`;
        }

        document.getElementById("contenidoDetalle").innerHTML = detalleHTML;

    }catch(e){
        console.error(e);
    }
}

// ================= SELECCIÓN =================
async function seleccionarAfectacion(id){

    const row = ultimaLista.find(r=>r.id_afectacion == id);
    if(!row) return;

    cargarDetalle(row.id_afectacion);

    fuenteSM.clear();

    const smList = extraerSMs(row.elementos_afectados);

    if(smList.length > 0){
        await cargarMultipleSM(smList);
    }
}

// ================= MULTI SM =================

async function cargarMultipleSM(smList){

    fuenteSM.clear();

    const format = new ol.format.GeoJSON();

    for(const sm of smList){

        try{

            const res = await fetch(`consulta_sm.php?sm=${sm}`);
            const data = await res.json();

            data.forEach(row => {

                if(!row.geom) return;

                try{

                    let geo = row.geom;

                    // convertir string JSON
                    if(typeof geo === "string"){
                        geo = JSON.parse(geo);
                    }

                   

                    // 🔥 LEER FEATURE
                    const feature = format.readFeature({
                        type: "Feature",
                        geometry: geo,
                        properties: {
                            sm: row.sm
                        }
                    },{

                        dataProjection:'EPSG:32616',
                        featureProjection:'EPSG:3857'

                    });

                    // 🔥 ESTILO
                  feature.setStyle(

    new ol.style.Style({

        stroke:new ol.style.Stroke({
            color:'#ff9800',
            width:3
        }),

        fill:new ol.style.Fill({
            color:'rgba(255,152,0,0.25)'
        }),

        text:new ol.style.Text({

            text: row.sm,

            font:'bold 14px Arial',

            fill:new ol.style.Fill({
                color:'#000'
            }),

            stroke:new ol.style.Stroke({
                color:'#fff',
                width:3
            }),

            overflow:true

        })

    })

);

                    fuenteSM.addFeature(feature);

                    

                }catch(err){

                    console.error(
                        "ERROR FEATURE:",
                        err
                    );

                }

            });

        }catch(e){

            console.error( "ERROR CONSULTA SM:", sm, e
            );

        }

    }

  
    setTimeout(()=>{

        const features =
            fuenteSM.getFeatures();

        

        if(features.length > 0){

            const extent =
                fuenteSM.getExtent();

            if(
                extent &&
                extent[0] !== Infinity
            ){

                map.getView().fit(extent,{
                    padding:[50,50,50,50],maxZoom:17,duration:800
                });

            }

        }

    },300);

}


// ================= DETALLE =================
function cargarDetalle(id){

    const row = ultimaLista.find(r=>r.id_afectacion==id);
    if(!row) return;

    let detalleHTML = `
        <h4>Detalle</h4>
            <table>
                <tr>
                    <th>ID</th><th>Tipo</th><th>Motivo</th><th>Responsable</th><th>Periodo</th><th>Estatus</th>
                </tr>
                <tr>
                    <td>${row.id_afectacion}</td>
                    
                    <td>${row.tipo}</td><td>${row.descripcion}</td>
                    <td>${row.nivel}</td><td>${row.periodo}</td>
                    <td>${row.estatus}</td>
                </tr>
            </table>
          
    <div
        style="
            margin-top:10px;
        "
    >

        <b>
            Elementos:
        </b>

        <div
            style=" margin-top:5px; display:flex; flex-wrap:wrap; gap:5px; "
        >

            ${row.elementos_afectados.map(el => `

                <span

                    class="tipoBadge"

                    style="
                        background:
                        ${colorTipo(el.tipo)}
                    "

                >

                    ${el.tipo}:
                    ${el.valor}

                </span>

            `).join('')}

        </div>

    </div>
    `;

    document.getElementById("contenidoDetalle").innerHTML = detalleHTML;
    cambiarTab('detalle');
}


//""""""""""""""



</script>

</body>
</html>
