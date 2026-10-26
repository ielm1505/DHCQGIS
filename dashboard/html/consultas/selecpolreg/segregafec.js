//========================
// MAPA BASE
//========================

const osm=new ol.layer.Tile({
source:new ol.source.OSM()
});

let animacion=0;
let modoMapa="tiempo";

let filtros = {
falta:true,
baja:true,
recuperada:true
};

function fechaHoraActual(){

const ahora=new Date();

let yyyy=ahora.getFullYear();
let mm=(ahora.getMonth()+1).toString().padStart(2,"0");
let dd=ahora.getDate().toString().padStart(2,"0");
let hh=ahora.getHours().toString().padStart(2,"0");
let mi=ahora.getMinutes().toString().padStart(2,"0");

return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
}
//========================

function formatearFechaInput(fecha){

if(!fecha) return "";

// 🔥 Normalizar formato MySQL "YYYY-MM-DD HH:MM:SS"
if(typeof fecha === "string"){
fecha = fecha.replace(" ", "T");
}

const d = new Date(fecha);

if(isNaN(d)) return "";

const yyyy = d.getFullYear();
const mm = String(d.getMonth()+1).padStart(2,"0");
const dd = String(d.getDate()).padStart(2,"0");
const hh = String(d.getHours()).padStart(2,"0");
const mi = String(d.getMinutes()).padStart(2,"0");

return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
}

function estiloOperativo(feature){

const tipo = normalizar(feature.get("tipo_afectacion") || "");
const estatus = normalizar(feature.get("estatus") || "");
const fechaFin = feature.get("fecha_fin");

capa.getSource().on("change", function(){

if(capa.getSource().getState()==="ready"){

const feats = capa.getSource().getFeatures();

}
});

let color="";
let borde="";

// 🔴 FALTA TOTAL
if(
tipo.includes("falta total de agua") &&
estatus==="activo"
){
if(!filtros.falta) return null;

color="#c62828";
borde="#8e0000";
}

// 🔵 BAJA PRESION ACTIVA

else if(
tipo.includes("baja presion") &&
estatus==="activo"
){
if(!filtros.baja) return null;

color="#1565c0";
borde="#003c8f";
}

// 🟢 RECUPERADAS

else if(
tipo.includes("baja presion") &&
estatus.includes("finalizado") &&
fechaFin &&
esReciente(fechaFin)
){
if(!filtros.recuperada) return null;

color="#2e7d32";
borde="#1b5e20";
}

// ❌ ocultar resto

else{
return null;
}

return new ol.style.Style({
stroke:new ol.style.Stroke({color:borde,width:4}),
fill:new ol.style.Fill({color:color+"55"})
});
}

//========================

function estilo(feature){

const estatus = normalizar(feature.get("estatus") || "");

// SOLO MOSTRAR ACTIVOS EN MAPA DE TIEMPO

if(estatus !== "activo"){
return new ol.style.Style(null);
}

const inicio = new Date(feature.get("fecha_inicio"));
const fin = new Date(feature.get("fecha_fin"));
const ahora = new Date();

let color="blue";
let width=3;
let opacity=0.2;

const horasRestantes=(fin-ahora)/3600000;

if(inicio>ahora){

color="purple";

}
else if(horasRestantes<=2){

color="red";

const pulso=(Math.sin(animacion)+1)/2;

width=3+pulso*8;
opacity=0.15+pulso*0.35;

}
else if(horasRestantes<=10){

color="yellow";

}
else if(horasRestantes<=24){

color="green";

}

let rgb="0,128,0";

if(color==="red") rgb="255,0,0";
if(color==="yellow") rgb="255,255,0";
if(color==="blue") rgb="0,0,255";
if(color==="purple") rgb="170,0,200";

return new ol.style.Style({
stroke:new ol.style.Stroke({
color:color,
width:width
}),
fill:new ol.style.Fill({
color:`rgba(${rgb},${opacity})`
})
});
}

function estiloTipo(feature){

const estatus = normalizar(feature.get("estatus") || "");

// SOLO MOSTRAR ACTIVOS EN TEMATICA TIPO

if(estatus !== "activo"){
return new ol.style.Style(null);
}

const tipoRaw = feature.get("tipo_afectacion") || "";
const tipo = normalizar(tipoRaw);

let color="#999";

if(tipo.includes("falta total de agua")) color="#e53935";
else if(tipo.includes("baja presion")) color="#1e88e5";
else if(tipo.includes("mantenimiento")) color="#212121";
else if(tipo.includes("falla electrica")) color="#fb8c00";
else if(tipo.includes("reparacion")) color="#d43ab3";
else if(tipo.includes("limpieza de red")) color="#45bfe4";

return new ol.style.Style({
stroke:new ol.style.Stroke({
color:color,
width:3
}),
fill:new ol.style.Fill({
color:color+"55"
})
});
}

//========================

function normalizar(texto){
return texto
.toLowerCase()
.trim()
.normalize("NFD")
.replace(/[\u0300-\u036f]/g, "");
}


function parseFechaSQL(fechaTexto){

if(!fechaTexto) return null;

// limpiar espacios raros

fechaTexto = fechaTexto.trim();

// separar fecha y hora

const partes = fechaTexto.split(" ");
if(partes.length < 2) return null;

const fecha = partes[0];
const hora = partes[1];

const f = fecha.split("-");
const h = hora.split(":");

if(f.length < 3 || h.length < 2) return null;

const y = parseInt(f[0]);
const m = parseInt(f[1]) - 1;
const d = parseInt(f[2]);

const hh = parseInt(h[0]);
const mm = parseInt(h[1]);
const ss = h[2] ? parseInt(h[2]) : 0;

return new Date(y, m, d, hh, mm, ss);
}

//========================
// CAPA
//========================

const capa=new ol.layer.Vector({

source:new ol.source.Vector({

url:"afectaciones.php",

format:new ol.format.GeoJSON({

dataProjection:'EPSG:32616',
featureProjection:'EPSG:3857'
})
}),

style:function(feature){

if(modoMapa==="tipo"){
return estiloTipo(feature);
}
else if(modoMapa==="operativo"){
return estiloOperativo(feature);
}
else{
return estilo(feature);
}
}
});


capa.getSource().on("change",function(){

if(capa.getSource().getState()==="ready"){
generarTablaTiempo();
}
});

//========================
// MAPA
//========================

const map=new ol.Map({

target:"map",

layers:[
osm,
capa
],
view:new ol.View({
center:ol.proj.fromLonLat([-86.85,21.1]),
zoom:11
})
});

setInterval(function(){

animacion+=0.15;
capa.changed();

},60);


setInterval(function(){
capa.getSource().refresh();
setTimeout(generarTablaTiempo,1500);
},300000);

//========================
// REFRESCO
//========================

setInterval(function(){
capa.getSource().refresh();
setTimeout(generarTablaTiempo,1500);
},300000);

//========================
// SELECCION
//========================

const select=new ol.interaction.Select({
layers:[capa]
});

map.addInteraction(select);

//========================
// CONSULTA ESPACIAL
//========================

async function consultarContratos(feature){

document.getElementById("contratos_afectados").innerHTML="Consultando...";

const geojson=new ol.format.GeoJSON().writeGeometryObject(
feature.getGeometry(),
{
featureProjection:'EPSG:3857',
dataProjection:'EPSG:3857'
}
);

const formData=new FormData();
formData.append("geom",JSON.stringify(geojson));

const res=await fetch("obtener_clientes.php",{
method:"POST",
body:formData
});

const data=await res.json();

if(!data.success){

document.getElementById("contratos_afectados").innerHTML="Error en consulta";
return;
}

let html="<b>Total contratos: "+data.total+"</b><br><br>";

data.data.forEach(r=>{
html+=r.uso_desc+" : "+r.cantidad+"<br>";
});

document.getElementById("contratos_afectados").innerHTML=html;
crearGrafica(data.data);
}

select.on("select",function(e){

const f=e.selected[0];
if(!f) return;

document.getElementById("ficha").style.display="block";

document.getElementById("id_afectacion").value=f.get("id_afectacion");
document.getElementById("tipo").value=f.get("tipo")||"";
document.getElementById("nivel").value=f.get("nivel")||"";
document.getElementById("periodo").value=f.get("periodo")||"";
document.getElementById("estatus").value=f.get("estatus")||"";
document.getElementById("tipo_afectacion").value=f.get("tipo_afectacion")||"";

let inicio = f.get("fecha_inicio");
let fin = f.get("fecha_fin");

// Si no hay fecha inicio
if(!inicio){
inicio = fechaHoraActual();
}

const inicioFormateado = formatearFechaInput(inicio);
const finFormateado = formatearFechaInput(fin);

// Asignar al formulario
document.getElementById("fecha_inicio").value = inicioFormateado;
document.getElementById("fecha_fin").value = finFormateado;

//========================

iniciarCuentaRegresiva(inicioFormateado, finFormateado);
document.getElementById("descripcion").value=f.get("descripcion")||"";
consultarContratos(f);
});


function recalcularFechaFin(){

let inicio=document.getElementById("fecha_inicio").value;
let horas=parseInt(document.getElementById("periodo").value);

if(!inicio || !horas) return;

let fecha=new Date(inicio);

fecha.setHours(fecha.getHours()+horas);

let yyyy=fecha.getFullYear();
let mm=(fecha.getMonth()+1).toString().padStart(2,"0");
let dd=fecha.getDate().toString().padStart(2,"0");
let hh=fecha.getHours().toString().padStart(2,"0");
let mi=fecha.getMinutes().toString().padStart(2,"0");

document.getElementById("fecha_fin").value=
`${yyyy}-${mm}-${dd}T${hh}:${mi}`;
}

document.getElementById("periodo").addEventListener("input",recalcularFechaFin);
document.getElementById("fecha_inicio").addEventListener("change",recalcularFechaFin);

//========================
// GUARDAR
//========================

function guardar(){

recalcularFechaFin();

const datos={

id:document.getElementById("id_afectacion").value,
tipo:document.getElementById("tipo").value,
tipo_afectacion:document.getElementById("tipo_afectacion").value,
nivel:document.getElementById("nivel").value,
periodo:document.getElementById("periodo").value,
estatus:document.getElementById("estatus").value,
fecha_inicio:document.getElementById("fecha_inicio").value,
fecha_fin:document.getElementById("fecha_fin").value,
descripcion:document.getElementById("descripcion").value
};

fetch("actualizar_afectacion.php",{

method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(datos)
})
.then(r=>r.json())
.then(d=>{

if(d.status==="ok"){

alert("Actualizado");

cerrar();

capa.getSource().refresh();

}else{
alert(d.msg);
}
});
}

function cerrar(){

document.getElementById("ficha").style.display="none";
select.getFeatures().clear();
}

//========================
// VENTANA ARRASTRABLE
//=======================

const ficha = document.getElementById("ficha");
const drag = document.getElementById("dragFicha");

let moviendo=false;
let offsetX=0;
let offsetY=0;

drag.addEventListener("mousedown",function(e){

moviendo=true;

offsetX = e.clientX - ficha.offsetLeft;
offsetY = e.clientY - ficha.offsetTop;

document.body.style.userSelect="none";
});

document.addEventListener("mousemove",function(e){

if(!moviendo) return;

ficha.style.left = (e.clientX - offsetX) + "px";
ficha.style.top = (e.clientY - offsetY) + "px";
});

document.addEventListener("mouseup",function(){

moviendo=false;
document.body.style.userSelect="auto";
});

let grafica = null;

function crearGrafica(data){

const labels = data.map(r => r.uso_desc);
const valores = data.map(r => r.cantidad);

const ctx = document.getElementById("graficaContratos").getContext("2d");

if(grafica){
grafica.destroy();
}

grafica = new Chart(ctx,{

type:'bar',

data:{
labels:labels,
datasets:[{
label:'Contratos',
data:valores,
borderWidth:1
}]
},

options:{
responsive:true,
plugins:{
legend:{
display:false
}
},
scales:{
y:{
beginAtZero:true
}
}
}
});

}
let timerRecuperacion=null;

//=======================

function iniciarCuentaRegresiva(fechaInicio, fechaFin){

if(timerRecuperacion){
clearInterval(timerRecuperacion);
}

//=======================

function actualizar(){

const ahora = new Date();
const inicio = new Date(fechaInicio);
const fin = new Date(fechaFin);

if(isNaN(inicio) || isNaN(fin)){
document.getElementById("tiempo_recuperacion").innerHTML="Sin fecha";
return;
}

let diff;
let texto="";

if(ahora < inicio){

diff = inicio - ahora;
texto = "Inicia en: ";
}
else if(ahora >= inicio && ahora < fin){

diff = fin - ahora;
texto = "Termina en: ";
}
else{

document.getElementById("tiempo_recuperacion").innerHTML =
"<span style='color:green'>RECUPERADO</span>";

clearInterval(timerRecuperacion);
return;
}

let horas = Math.floor(diff / 3600000);
let minutos = Math.floor((diff % 3600000) / 60000);
let segundos = Math.floor((diff % 60000) / 1000);

document.getElementById("tiempo_recuperacion").innerHTML =
texto + horas+"h "+minutos+"m "+segundos+"s";
}

actualizar();
timerRecuperacion=setInterval(actualizar,1000);
}

/* ======================================
   CONTROL GLOBAL DE SESION
====================================== */

function fetchSeguro(url, opciones={}){

return fetch(url,opciones)
.then(res=>{

if(res.status===401){

alert("Sesión expirada");
window.location.href="../../logout.php";
throw new Error("Sesion expirada");
}

return res;
});
}

/* ======================================
   VERIFICAR SESION CADA 60s
====================================== */

setInterval(function(){

fetch("../../../check_session.php")
.then(r=>{

if(r.status===401){

alert("Sesión expirada");
window.location.href="../../../logout.php";
}
});
},60000);

window.addEventListener("focus",function(){

fetch("../../../check_session.php")
.then(r=>{

if(r.status===401){

alert("Sesión expirada");
window.location.href="../../../logout.php";
}
});
});

document.getElementById("fecha_inicio").addEventListener("change",function(){

iniciarCuentaRegresiva(
document.getElementById("fecha_inicio").value,
document.getElementById("fecha_fin").value
);
});

document.getElementById("fecha_fin").addEventListener("change",function(){

iniciarCuentaRegresiva(
document.getElementById("fecha_inicio").value,
document.getElementById("fecha_fin").value
);
});


function cambiarTab(tab,btn){

document.querySelectorAll(".tabBtn").forEach(b=>b.classList.remove("active"));
document.querySelectorAll(".tabContent").forEach(c=>c.classList.remove("active"));

btn.classList.add("active");

// CAMBIO DE MODO
if(tab==="tipo"){
document.getElementById("tabTipo").classList.add("active");
modoMapa="tipo";
}
else if(tab==="operativo"){
document.getElementById("tabOperativo").classList.add("active");
modoMapa="operativo";
}
else{
document.getElementById("tabTiempo").classList.add("active");
modoMapa="tiempo";
}

if(modoMapa==="tiempo"){
generarTablaTiempo();
}else{
document.getElementById("tablaTiempo").style.display="none";
}

// ========================

capa.changed();
map.render();
}


function esReciente(fechaTexto){

const f = parseFechaSQL(fechaTexto);
if(!f) return false;

const ahora = new Date();

const diffHoras = (ahora - f) / 3600000;

return diffHoras >= 0 && diffHoras <= 24;
}

function toggleFiltro(tipo){
filtros[tipo] = !filtros[tipo];
capa.changed();
}

/* ======================================
   tabla de Afectaciones
====================================== */

function generarTablaTiempo(){

if(modoMapa!=="tiempo"){
document.getElementById("tablaTiempo").style.display="none";
return;
}

const feats = capa.getSource().getFeatures();
const ahora = new Date();

let html = `
<table style="width:100%;border-collapse:collapse;font-size:14px;">
<tr style="background:#1976d2;color:white;">
<th>ID</th>
<th>Motivo</th>
<th>Afectación</th>
<th>Inicio</th>
<th>Fin</th>
<th>Periodo [Hrs]</th>
<th>Rango</th>
</tr>
`;

feats.forEach(f=>{

const estatus = normalizar(f.get("estatus") || "");
if(estatus!=="activo") return;

const inicio = new Date(f.get("fecha_inicio"));
const fin = new Date(f.get("fecha_fin"));

let clasificacion = "";
let colorFila = "";

const horasRestantes = (fin-ahora)/3600000;

if(inicio>ahora){
clasificacion="Programada";
colorFila="#f3e5f5";
}
else if(horasRestantes<=2){
clasificacion="≤2 horas";
colorFila="#ffebee";
}
else if(horasRestantes<=10){
clasificacion="2-10 horas";
colorFila="#fffde7";
}
else if(horasRestantes<=24){
clasificacion="10-24 horas";
colorFila="#e8f5e9";
}
else{
clasificacion=">24 horas";
colorFila="#e3f2fd";
}

html += `
<tr style="background:${colorFila};cursor:pointer;"
onclick="zoomAfectacion(${f.get('id_afectacion')})">
<td>${f.get("id_afectacion")}</td>
<td>${f.get("descripcion")}</td>
<td>${f.get("tipo_afectacion")||""}</td>
<td>${f.get("fecha_inicio")||""}</td>
<td>${f.get("fecha_fin")||""}</td>
<td>${f.get("periodo")||""}</td>
<td>${clasificacion}</td>
</tr>
`;

});



html += "</table>";

document.getElementById("contenidoTablaTiempo").innerHTML = html;
document.getElementById("tablaTiempo").style.display="block";

}

/* ======================================
   tabla de Afectaciones///zoom
====================================== */

function zoomAfectacion(id){

const feats = capa.getSource().getFeatures();

for(let i=0;i<feats.length;i++){

if(feats[i].get("id_afectacion")==id){

const geom = feats[i].getGeometry();

map.getView().fit(geom,{
duration:800,
padding:[80,80,80,80],
maxZoom:15
});

select.getFeatures().clear();
select.getFeatures().push(feats[i]);

// disparar manualmente ficha
document.getElementById("ficha").style.display="block";

const f = feats[i];

document.getElementById("id_afectacion").value=f.get("id_afectacion");
document.getElementById("tipo").value=f.get("tipo")||"";
document.getElementById("nivel").value=f.get("nivel")||"";
document.getElementById("periodo").value=f.get("periodo")||"";
document.getElementById("estatus").value=f.get("estatus")||"";
document.getElementById("tipo_afectacion").value=f.get("tipo_afectacion")||"";
document.getElementById("descripcion").value=f.get("descripcion")||"";

let inicio = f.get("fecha_inicio");
let fin = f.get("fecha_fin");

document.getElementById("fecha_inicio").value = formatearFechaInput(inicio);
document.getElementById("fecha_fin").value = formatearFechaInput(fin);

iniciarCuentaRegresiva(
formatearFechaInput(inicio),
formatearFechaInput(fin)
);

consultarContratos(f);

break;
}
}
}



const tabla = document.getElementById("tablaTiempo");
const dragTabla = document.getElementById("dragTabla");

let moviendoTabla=false;
let offsetXTabla=0;
let offsetYTabla=0;

dragTabla.addEventListener("mousedown",function(e){

moviendoTabla=true;
//tabla.style.right = "auto";
offsetXTabla = e.clientX - tabla.offsetLeft;
offsetYTabla = e.clientY - tabla.offsetTop;

document.body.style.userSelect="none";
});

document.addEventListener("mousemove",function(e){

if(!moviendoTabla) return;

tabla.style.left = (e.clientX - offsetXTabla) + "px";
tabla.style.top = (e.clientY - offsetYTabla) + "px";
});

document.addEventListener("mouseup",function(){

moviendoTabla=false;
document.body.style.userSelect="auto";
});