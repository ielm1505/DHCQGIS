//------------------------------------------------------------
// PROYECCIÓN
//------------------------------------------------------------
proj4.defs("EPSG:32616", "+proj=utm +zone=16 +datum=WGS84 +units=m +no_defs");
ol.proj.proj4.register(proj4);

//------------------------------------------------------------
// CAPA DE RESULTADOS
//------------------------------------------------------------
const condoPoligonoSource = new ol.source.Vector();

const capacondoPoligono = new ol.layer.Vector({
    source: condoPoligonoSource,

    style: function (feature) {

        return new ol.style.Style({

            stroke: new ol.style.Stroke({
                color: "orange",
                width: 2
            }),

            fill: new ol.style.Fill({
                color: "rgba(255,165,0,0.30)"
            }),

            text: new ol.style.Text({

                text: "Condominio: " + feature.get("condominio"),

                font: "bold 14px Arial",

                fill: new ol.style.Fill({
                    color: "#000"
                }),

                stroke: new ol.style.Stroke({
                    color: "#FFF",
                    width: 3
                }),

                overflow: true

            })

        });

    }

});

map.addLayer(capacondoPoligono);

//------------------------------------------------------------
// LIMPIAR CAPA AL HACER CLICK
//------------------------------------------------------------
map.on("singleclick", function () {

    condoPoligonoSource.clear();

});

//------------------------------------------------------------
// ABRIR VENTANA
//------------------------------------------------------------
function abrirVentanaCondominio() {

    document.getElementById("ventanaCondominio").style.display = "block";

    document.getElementById("txtCondominio").value = "";

    document.getElementById("listaCondominios").innerHTML = "";

    setTimeout(function () {

        document.getElementById("txtCondominio").focus();

    }, 100);

}

//------------------------------------------------------------
// CERRAR VENTANA
//------------------------------------------------------------
function cerrarVentanaCondominio() {

    document.getElementById("ventanaCondominio").style.display = "none";

}

//------------------------------------------------------------
// ABRIR DESDE EL MENÚ CONTEXTUAL
//------------------------------------------------------------
document.getElementById("menuBuscarCondominio").onclick = function () {

    contextMenu.style.display = "none";

    abrirVentanaCondominio();

};

//------------------------------------------------------------
// AUTOCOMPLETAR
//------------------------------------------------------------
const txtCondominio = document.getElementById("txtCondominio");
const listaCondominios = document.getElementById("listaCondominios");

txtCondominio.addEventListener("input", function () {

    const texto = this.value.trim();

    if (texto.length < 2) {

        listaCondominios.innerHTML = "";

        return;

    }

    const cql = `condominio ILIKE '${texto}%'`;

    const url =
        "https://dhcqgis.aguakan.com/geoserver/wfs?" +
        "service=WFS" +
        "&version=1.0.0" +
        "&request=GetFeature" +
        "&typeName=DHC_AGUAKAN:condominios" +
        "&propertyName=condominio" +
        "&outputFormat=application/json" +
        "&CQL_FILTER=" + encodeURIComponent(cql);

    fetch(url)

        .then(r => r.json())

        .then(data => {

            listaCondominios.innerHTML = "";

            const nombres = new Set();

            data.features.forEach(f => {

                const nombre = f.properties.condominio;

                if (!nombres.has(nombre)) {

                    nombres.add(nombre);

                    const option = document.createElement("option");

                    option.value = nombre;

                    listaCondominios.appendChild(option);

                }

            });

        })

        .catch(err => console.error(err));

});

//------------------------------------------------------------
// BUSCAR CONDOMINIO
//------------------------------------------------------------
function ubicarcondominio(condominio) {

    const cql = `condominio='${condominio.replace(/'/g, "''")}'`;

    const url =
        "https://dhcqgis.aguakan.com/geoserver/wfs?" +
        "service=WFS" +
        "&version=1.0.0" +
        "&request=GetFeature" +
        "&typeName=DHC_AGUAKAN:condominios" +
        "&outputFormat=application/json" +
        "&srsname=EPSG:32616" +
        "&CQL_FILTER=" + encodeURIComponent(cql);

    fetch(url)

        .then(res => res.json())

        .then(geojson => {

            condoPoligonoSource.clear();

            const format = new ol.format.GeoJSON();

            const features = format.readFeatures(geojson, {

                dataProjection: "EPSG:32616",

                featureProjection: "EPSG:3857"

            });

            if (features.length === 0) {

                alert("No se encontró el condominio.");

                return;

            }

            condoPoligonoSource.addFeatures(features);

            map.getView().fit(

                features[0].getGeometry().getExtent(),

                {

                    duration: 800,

                    padding: [40, 40, 40, 40]

                }

            );

            cerrarVentanaCondominio();

        })

        .catch(err => {

            console.error(err);

            alert("Error al consultar el condominio.");

        });

}

//------------------------------------------------------------
// BOTÓN BUSCAR
//------------------------------------------------------------
document.getElementById("btnBuscarCondominioAceptar").onclick = function () {

    const nombre = txtCondominio.value.trim();

    if (nombre === "") {

        alert("Escriba un condominio.");

        return;

    }

    ubicarcondominio(nombre);

};

//------------------------------------------------------------
// ENTER
//------------------------------------------------------------
txtCondominio.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        e.preventDefault();

        document.getElementById("btnBuscarCondominioAceptar").click();

    }

});

//------------------------------------------------------------
// BOTÓN CANCELAR
//------------------------------------------------------------
document.getElementById("btnCancelarCondominio").onclick = cerrarVentanaCondominio;

//------------------------------------------------------------
// BOTÓN X
//------------------------------------------------------------
document.querySelector("#ventanaCondominio .cerrarVentana").onclick = cerrarVentanaCondominio;

const ventana=document.getElementById("ventanaCondominio");
const titulo=document.getElementById("tituloCondominio");

let moviendo=false;
let offsetX=0;
let offsetY=0;

titulo.addEventListener("mousedown",function(e){

    moviendo=true;

    offsetX=e.clientX-ventana.offsetLeft;
    offsetY=e.clientY-ventana.offsetTop;

});

document.addEventListener("mousemove",function(e){

    if(!moviendo) return;

    ventana.style.left=(e.clientX-offsetX)+"px";
    ventana.style.top=(e.clientY-offsetY)+"px";

});

document.addEventListener("mouseup",function(){

    moviendo=false;

});

function abrirVentanaCondominio(){

    const v=document.getElementById("ventanaCondominio");

    v.style.display="block";

    document.getElementById("txtCondominio").focus();

}

function cerrarVentanaCondominio(){

    document.getElementById("ventanaCondominio").style.display="none";

}

document.getElementById("menuBuscarCondominio").onclick=function(){

    contextMenu.style.display="none";

    abrirVentanaCondominio();

};