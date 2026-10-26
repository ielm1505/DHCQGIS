var sourceCroquis = new ol.source.Vector();

var layerCroquis = new ol.layer.Vector({
    source: sourceCroquis,
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#ff0000',
            width: 3
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,0,0,0.1)'
        })
    })
});

var mapaUbicacion = new ol.Map({
    target: 'mapa-ubicacion',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
        layerCroquis
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([-86.85,21.16]),
        zoom: 12
    })
});

// cargar croquis guardado
function cargarCroquisGuardado(){

    var geojson = localStorage.getItem("croquisSeleccion");

    if (!geojson){
        console.warn("No hay croquis en localStorage");
        return;
    }

    var formato = new ol.format.GeoJSON();

    var features = formato.readFeatures(geojson, {
        dataProjection: 'EPSG:4326',
        featureProjection: mapaUbicacion.getView().getProjection()
    });

    sourceCroquis.clear();
    sourceCroquis.addFeatures(features);

    mapaUbicacion.updateSize();

    var extent = sourceCroquis.getExtent();

    if (!ol.extent.isEmpty(extent)) {

        mapaUbicacion.getView().fit(extent, {
            padding:[20,20,20,20],
            maxZoom:19,
            duration:500
        });

    }

}

function vpruebas(){
    document.getElementById("ventanaVPruebas").style.display = "block";
}


// ejecutar al cargar
window.addEventListener("load", function(){

    setTimeout(function(){

        mapaUbicacion.setTarget(null);
        mapaUbicacion.setTarget("mapa-ubicacion");

        mapaUbicacion.updateSize();

        cargarCroquisGuardado();

    }, 500);

});

function activarSelecciong_vpgrapds() {

if (window.selectFactibilidad) {
  map.removeInteraction(window.selectFactibilidad);
  window.selectFactibilidad = null;
}

if (window.modifyFactibilidad) {
  map.removeInteraction(window.modifyFactibilidad);
  window.modifyFactibilidad = null;
}
  // Obtener capas activas Fact_
  var capasActivas = obtenerCapasVisibles(map.getLayers(), function(layer) {
    return layer.get('popuplayertitle') && layer.get('popuplayertitle').startsWith('Fact_');
  });

  if (capasActivas.length === 0) {
    alert("No hay capas Factibilidad activas.");
    return;
  }

  // Limpiar croquis anterior
  layerCroquis.getSource().clear();

  // Remover draw previo
  if (window.drawSeleccion) {
    map.removeInteraction(window.drawSeleccion);
  }

  window.drawSeleccion = new ol.interaction.Draw({
    source: new ol.source.Vector(),
    type: 'Polygon'
  });

  map.addInteraction(window.drawSeleccion);

window.drawSeleccion.on('drawend', function(e) {

  var poligono = e.feature.getGeometry();

  var featuresSeleccionadas = [];

  capasActivas.forEach(function(capa) {

    capa.getSource().getFeatures().forEach(function(f) {

      if (poligono.intersectsExtent(f.getGeometry().getExtent())) {

        featuresSeleccionadas.push(f);

      }

    });

  });

  if (featuresSeleccionadas.length === 0) {

    alert("No se encontraron elementos.");
    return;

  }

  // Convertir a GeoJSON
  var formato = new ol.format.GeoJSON();

  var geojson = formato.writeFeatures(featuresSeleccionadas, {
    dataProjection: 'EPSG:4326',
    featureProjection: map.getView().getProjection()
  });

  // Guardar en localStorage
  localStorage.setItem("croquisSeleccion", geojson);
  alert("✅ " + featuresSeleccionadas.length + " elementos seleccionados.");

  map.removeInteraction(window.drawSeleccion);

  // Abrir automáticamente verificación
  abrirVerificacion();

});

}

//-----Fecha sin cam bio

document.addEventListener("DOMContentLoaded", function () {

    const inputFecha = document.getElementById("inputFechaHoy");

    const hoy = new Date();

    const dia = String(hoy.getDate()).padStart(2, '0');
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const anio = hoy.getFullYear();

    const fechaFormateada = dia + "/" + mes + "/" + anio;

    inputFecha.value = fechaFormateada;

});
//-----
//-----
document.addEventListener("DOMContentLoaded", function () {

    const firmas = document.querySelectorAll('.firma');

    firmas.forEach(firma => {

        const canvas = firma.querySelector('.firma-canvas');
        const limpiarBtn = firma.querySelector('.limpiar-firma');

        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        /* =====================================
           AJUSTAR RESOLUCIÓN REAL DEL CANVAS
        ===================================== */
        function ajustarCanvas() {

            const rect = canvas.getBoundingClientRect();

            canvas.width = rect.width;
            canvas.height = rect.height;

            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.strokeStyle = '#000';

        }

        ajustarCanvas();

        window.addEventListener('resize', ajustarCanvas);

        /* =====================================
           VARIABLES DIBUJO
        ===================================== */

        let dibujando = false;

        function obtenerCoordenadas(e) {

            const rect = canvas.getBoundingClientRect();

            let clientX, clientY;

            if (e.touches && e.touches.length > 0) {

                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;

            } else {

                clientX = e.clientX;
                clientY = e.clientY;

            }

            return {
                x: clientX - rect.left,
                y: clientY - rect.top
            };

        }

        function iniciarDibujo(e) {

            e.preventDefault();

            dibujando = true;

            const pos = obtenerCoordenadas(e);

            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);

        }

        function dibujar(e) {

            if (!dibujando) return;

            e.preventDefault();

            const pos = obtenerCoordenadas(e);

            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();

        }

        function detenerDibujo() {

            dibujando = false;
            ctx.closePath();

        }

        /* =====================================
           EVENTOS PC
        ===================================== */

        canvas.addEventListener('mousedown', iniciarDibujo);
        canvas.addEventListener('mousemove', dibujar);
        canvas.addEventListener('mouseup', detenerDibujo);
        canvas.addEventListener('mouseleave', detenerDibujo);

        /* =====================================
           EVENTOS TOUCH CELULAR
        ===================================== */

        canvas.addEventListener('touchstart', iniciarDibujo, { passive:false });
        canvas.addEventListener('touchmove', dibujar, { passive:false });
        canvas.addEventListener('touchend', detenerDibujo);
        canvas.addEventListener('touchcancel', detenerDibujo);

        /* =====================================
           LIMPIAR FIRMA
        ===================================== */

        if (limpiarBtn) {

            limpiarBtn.addEventListener('click', function(){

                ctx.clearRect(0,0,canvas.width,canvas.height);

            });

        }

    });

});
function ajustarCanvas(canvas){

    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

}

async function guardar() {

    const boton = document.querySelector('button[onclick="guardar()"]');
    boton.disabled = true;
    boton.innerText = "⏳ Generando PDF...";

    const hoja1 = document.getElementById("pdf-content");
    const hoja2 = document.getElementById("segunda-hoja");

    const accionesFirma = document.querySelectorAll('.firma-actions');
    accionesFirma.forEach(a => a.style.display = 'none');

    try {

ocultarPlaceholders();
 
        const respFolio = await fetch("g_vpgrapds.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ solicitar_folio: true })
        });

        const dataFolio = await respFolio.json();

        if (!dataFolio.success) {
            throw new Error("No se pudo generar el folio");
        }

        const folio = dataFolio.folio;

        // Colocar folio en pantalla
        document.getElementById("inputFolioGenerado").value = folio;

        // Esperar que DOM actualice
        await new Promise(r => setTimeout(r, 150));

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "letter"
        });

        /* =========================
           HOJA 1
        ========================== */
        const canvas1 = await html2canvas(hoja1, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff"
        });

        const imgData1 = canvas1.toDataURL("image/jpeg", 0.95);
        pdf.addImage(imgData1, "JPEG", 0, 0, 216, 279);

        /* =========================
            HOJA 2
        ========================== */
        const canvas2 = await html2canvas(hoja2, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff"
        });

        pdf.addPage("letter", "landscape");

        const imgData2 = canvas2.toDataURL("image/jpeg", 0.95);
        pdf.addImage(imgData2, "JPEG", 0, 0, 279, 216);
    
        const pdfBase64 = pdf.output('datauristring').split(',')[1];

        const respuesta = await fetch("g_vpgrapds.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                guardar_pdf: true,
                folio: folio,
                pdf_base64: pdfBase64
            })
        });

        const resultado = await respuesta.json();

        if (!resultado.success) {
            throw new Error(resultado.error || "Error guardando PDF");
        }

        const link = document.createElement("a");
        link.href = "descargar_pdf.php?file=" + resultado.ruta;
        link.download = "Prueba_" + folio + ".pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        alert("✅ Guardado correctamente\nFolio: " + folio);

    } catch (error) {

        console.error(error);
        alert("❌ " + error.message);

    } 
    finally {

    accionesFirma.forEach(a => a.style.display = 'flex');

    // SOLO reactivar si hubo error
    if (!resultado || !resultado.success) {
        const botonGuardar = document.getElementById("btnGuardarPDF");
        botonGuardar.disabled = false;
        botonGuardar.innerText = "Guardar y Generar PDF";
    }

}
}

const link = document.createElement("a");
link.href = "descargar_pdf.php?file=" + resultado.ruta;
link.download = "Prueba_" + folio + ".pdf";
document.body.appendChild(link);
link.click();
document.body.removeChild(link);

const botonGuardar = document.getElementById("btnGuardarPDF");

botonGuardar.disabled = true;
botonGuardar.innerText = "PDF generado ✅";
botonGuardar.style.backgroundColor = "#6c757d";
botonGuardar.style.cursor = "not-allowed";

alert("✅ Guardado correctamente\nFolio: " + folio);

//oculta las sugerencias
function ocultarPlaceholders() {

    document.querySelectorAll("input, textarea").forEach(el => {

        if (el.value === "") {

            el.dataset.placeholderOriginal = el.placeholder;
            el.placeholder = "";

        }

    });

}

// Mostrar / ocultar caja de captura
document.getElementById("btnMostrarFolio")
    .addEventListener("click", function () {

        let contenedor = document.getElementById("contenedorFolio");

        if (contenedor.style.display === "none" || contenedor.style.display === "") {
            contenedor.style.display = "block";
        } else {
            contenedor.style.display = "none";
        }

    });

