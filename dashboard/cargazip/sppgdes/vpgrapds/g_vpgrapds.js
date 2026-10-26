var sourceCroquis = new ol.source.Vector();
var layerCroquis = new ol.layer.Vector({
    source: sourceCroquis,
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({color:'#ff0000',width:3}),
        fill: new ol.style.Fill({color:'rgba(255,0,0,0.1)'})
    })
});
function cargarCroquisGuardado(){
    var geojson = localStorage.getItem('croquisSeleccion');
    if(!geojson){
        console.warn('No hay croquis guardado');
        return;
    }
    var formato = new ol.format.GeoJSON();
    var features = formato.readFeatures(geojson,{dataProjection:'EPSG:4326',featureProjection:mapaUbicacion.getView().getProjection()});
    sourceCroquis.clear();
    sourceCroquis.addFeatures(features);
    mapaUbicacion.updateSize();
    var extent = sourceCroquis.getExtent();
    if(!ol.extent.isEmpty(extent)){
        mapaUbicacion.getView().fit(extent,{padding:[20,20,20,20],maxZoom:19,duration:500});
    }
}
window.addEventListener('load',function(){
    setTimeout(function(){
        mapaUbicacion.setTarget(null);
       
        mapaUbicacion.updateSize();
        cargarCroquisGuardado();
    },500);
});
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

var sourceCroquis = new ol.source.Vector();
var layerCroquis = new ol.layer.Vector({
    source: sourceCroquis,
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({color:'#ff0000',width:3}),
        fill: new ol.style.Fill({color:'rgba(255,0,0,0.1)'})
    })
});
function cargarCroquisGuardado(){
    var geojson = localStorage.getItem('croquisSeleccion');
    if(!geojson){
        console.warn('No hay croquis guardado');
        return;
    }
    var formato = new ol.format.GeoJSON();
    var features = formato.readFeatures(geojson,{dataProjection:'EPSG:4326',featureProjection:mapaUbicacion.getView().getProjection()});
    sourceCroquis.clear();
    sourceCroquis.addFeatures(features);
    mapaUbicacion.updateSize();
    var extent = sourceCroquis.getExtent();
    if(!ol.extent.isEmpty(extent)){
        mapaUbicacion.getView().fit(extent,{padding:[20,20,20,20],maxZoom:19,duration:500});
    }
}
window.addEventListener('load',function(){
    setTimeout(function(){
        mapaUbicacion.setTarget(null);
       
        mapaUbicacion.updateSize();
        cargarCroquisGuardado();
    },500);
});
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


function capturarDatosFicha() {

    // =========================
    // FOLIO Y FECHA
    // =========================
    const folio = document.getElementById("inputFolioGenerado")?.value || '';
    let fecha = document.getElementById("inputFechaHoy")?.value || '';

// Convertir dd/mm/yyyy -> yyyy-mm-dd
if (fecha.includes("/")) {

    const partes = fecha.split("/");

    if (partes.length === 3) {
        fecha = `${partes[2]}-${partes[1]}-${partes[0]}`;
    }
}

    // =========================
    // DATOS OBRA
    // =========================
    const datos_obra = {
        fraccionamiento: document.getElementById("nombre_desarrollo")?.value || '',
        desarrollador: document.getElementById("nombre_empresa")?.value || '',
        contratista: document.querySelector('input[placeholder="Ingrese contratista"]')?.value || '',
        localizacion: document.querySelector('input[placeholder="Ingrese localización"]')?.value || '',
        instalacion: document.querySelector('input[placeholder="Ingrese instalación"]')?.value || '',
        entre: document.querySelector('input[placeholder="Ingrese entre calles"]')?.value || '',
        manzana: document.querySelector('input[placeholder="Ingrese manzana"]')?.value || '',
        parcela: document.querySelector('input[placeholder="Ingrese parc"]')?.value || '',
        localidad: document.querySelector('input[placeholder="Ingrese LOCALIDAD"]')?.value || ''
    };

    // =========================
    // TIPO INSTALACION (SOLO LOS SELECCIONADOS)
    // =========================
    const tipos_instalacion = [];
    const instalaciones = [
        { id: "conduccion", nombre: "Línea de Conducción" },
        { id: "emisor", nombre: "Emisor" },
        { id: "aguaPotable", nombre: "Red de Agua Potable" },
        { id: "atarjeas", nombre: "Red de atarjeas" },
        { id: "tomas", nombre: "Tomas Domiciliarias" },
        { id: "descargas", nombre: "Descarga Domiciliarias" },
        { id: "colector", nombre: "Colector" },
        { id: "pozo", nombre: "Pozo de Visita/Registro" }
    ];
    
    instalaciones.forEach(inst => {
        if (document.getElementById(inst.id)?.checked) {
            tipos_instalacion.push({
                tipo: inst.nombre,
                valor: inst.id
            });
        }
    });

    // =========================
    // MATERIALES (SOLO LOS SELECCIONADOS CON SU CÉDULA)
    // =========================
    const materiales = [];
    
    if (document.getElementById("pvc")?.checked) {
        materiales.push({
            material: "PVC",
            cedula: document.getElementById("pvc-cedula")?.value || ''
        });
    }
    if (document.getElementById("asbesto")?.checked) {
        materiales.push({
            material: "Asbesto-Cemento",
            cedula: document.getElementById("asbesto-cedula")?.value || ''
        });
    }
    if (document.getElementById("pead")?.checked) {
        materiales.push({
            material: "PEAD",
            cedula: document.getElementById("pead-cedula")?.value || ''
        });
    }

    // =========================
    // TIPO DE PRUEBA REALIZADA (SOLO UNO)
    // =========================
    let tipo_prueba_realizada = null;
    const pruebasRealizadas = [
        { id: "hidrostatica", nombre: "Hidrostatica" },
        { id: "neumatica", nombre: "Neumatica" },
        { id: "escurrimiento", nombre: "Escurrimiento" },
        { id: "estanquidad", nombre: "Estanquidad" }
    ];
    
    for (const prueba of pruebasRealizadas) {
        if (document.getElementById(prueba.id)?.checked) {
            tipo_prueba_realizada = prueba.nombre;
            break;
        }
    }

    // =========================
    // RESULTADO DE PRUEBA (SOLO UNO)
    // =========================
    let resultado_prueba = null;
    const resultados = [
        { id: "satisfactoria", nombre: "Satisfactoria" },
        { id: "noSatisfactoria", nombre: "No Satisfactoria" },
        { id: "noPresentada", nombre: "No Presentada" }
    ];
    
    for (const resultado of resultados) {
        if (document.getElementById(resultado.id)?.checked) {
            resultado_prueba = resultado.nombre;
            break;
        }
    }

    // =========================
    // TIPO PRUEBA GENERAL (SOLO UNO)
    // =========================
    let tipo_prueba_general = null;
    const tiposPrueba = [
        { id: "parcialAgua", nombre: "PARCIAL AGUA POTABLE" },
        { id: "parcialDrenaje", nombre: "PARCIAL DRENAJE SANITARIO" },
        { id: "generalAgua", nombre: "GENERAL AGUA POTABLE" },
        { id: "generalDrenaje", nombre: "GENERAL DRENAJE SANITARIO" }
    ];
    
    for (const prueba of tiposPrueba) {
        if (document.getElementById(prueba.id)?.checked) {
            tipo_prueba_general = prueba.nombre;
            break;
        }
    }

    // =========================
    // DIAMETROS (SOLO LOS SELECCIONADOS)
    // =========================
    const diametros = [];

    document.querySelectorAll(".material-grid .material-row").forEach(row => {
        const check = row.querySelector('input[type="checkbox"]');
        if (check && check.checked) {
            const inputs = row.querySelectorAll('input[type="text"]');
            diametros.push({
                diametro: check.nextElementSibling?.innerText?.trim() || '',
                longitud: inputs[0]?.value || '',
                descargas: inputs[1]?.value || '',
                tomas: inputs[2]?.value || ''
            });
        }
    });

    // =========================
    // DATOS DE PRUEBA (SOLO LOS CHECKBOX SELECCIONADOS)
    // =========================
    function getDatoPrueba(checkboxId, inputIndex = 0) {
        const checkbox = document.getElementById(checkboxId);
        if (!checkbox || !checkbox.checked) return null;
        const row = checkbox.closest('.material-row');
        if (!row) return null;
        const inputs = row.querySelectorAll('input[type="text"]');
        return {
            valor: inputs[inputIndex]?.value || '',
            unidad: inputs[inputIndex + 1]?.value || ''
        };
    }

    const datos_prueba = [];

    // Presión de trabajo
    const presionTrabajo = getDatoPrueba("presionTrabajo", 0);
    if (presionTrabajo) {
        datos_prueba.push({
            tipo: "presion_trabajo",
            nombre: "Presión de trabajo",
            valor: presionTrabajo.valor,
            unidad: ""
        });
    }

    // Presión de Prueba
    const presionPrueba = getDatoPrueba("presionPrueba", 0);
    if (presionPrueba) {
        datos_prueba.push({
            tipo: "presion_prueba",
            nombre: "Presión de Prueba",
            valor: presionPrueba.valor,
            unidad: "Kg/cm2"
        });
    }

    // Hora de Inicio
    const horaInicio = getDatoPrueba("horaInicio", 0);
    if (horaInicio) {
        datos_prueba.push({
            tipo: "hora_inicio",
            nombre: "Hora de Inicio",
            valor: horaInicio.valor,
            unidad: "hrs"
        });
    }

    // Hora de Término
    const horaTermino = getDatoPrueba("horaTermino", 0);
    if (horaTermino) {
        datos_prueba.push({
            tipo: "hora_termino",
            nombre: "Hora de Término",
            valor: horaTermino.valor,
            unidad: "hrs"
        });
    }

    // =========================
    // POZOS
    // =========================
    const pozos = [];

    document.querySelectorAll("#tablaPozos tbody tr").forEach(row => {
        const inputs = row.querySelectorAll("input");
        if (inputs[0]?.value || inputs[6]?.value) {
            pozos.push({
                no_pozo: inputs[0]?.value || '',
                longitud: inputs[1]?.value || '',
                diametro: inputs[2]?.value || '',
                registros: inputs[3]?.value || '',
                descargas: inputs[4]?.value || '',
                viviendas: inputs[5]?.value || '',
                calle: inputs[6]?.value || ''
            });
        }
    });

    // =========================
    // OBSERVACIONES
    // =========================
    const observaciones = document.querySelector("textarea")?.value || '';

    // =========================
    // CROQUIS
    // =========================
    const croquis = localStorage.getItem("croquisSeleccion");

    // =========================
    // RETURN FINAL
    // =========================
    return {
        folio,
        fecha,
        datos_obra: datos_obra,
        tipos_instalacion,      // arreglo - SOLO seleccionados
        materiales,             // arreglo - SOLO seleccionados
        tipo_prueba_realizada,  // string o null
        resultado_prueba,       // string o null
        tipo_prueba_general,    // string o null
        diametros,              // arreglo
        datos_prueba,           // arreglo - SOLO checkboxes seleccionados
        pozos,                  // arreglo
        observaciones,
        croquis
    };
}

async function guardar(event) {

    const boton = event?.target || document.getElementById("btnGuardarPDF");

    boton.disabled = true;
    boton.innerText = "⏳ Guardando...";

    try {

        // =========================
        // 1. OBTENER FOLIO MANUAL
        // =========================
        const folio = document.getElementById("inputFolioGenerado").value.trim();

        if(!folio){
            throw new Error("Debes ingresar un folio");
        }

        // =========================
        // 2. CAPTURAR DATOS
        // =========================
        const datos = capturarDatosFicha();
        datos.folio = folio;
        datos.estado = "BORRADOR";
        datos.desarrollador_id = document.getElementById("desarrollador_id").value;
        datos.desarrollo_id = document.getElementById("desarrollo_id").value;

        // =========================
        // 3. GUARDAR
        // =========================
        console.log("DESARROLLADOR ID:",
    document.getElementById("desarrollador_id")?.value);

console.log("DESARROLLO ID:",
    document.getElementById("desarrollo_id")?.value);

console.log(datos);
        const resp = await fetch("guardar_ficha.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        const r = await resp.json();

        if(!r.success){
            throw new Error(r.error || "Error al guardar");
        }

        // =========================
        // OK
        // =========================
        boton.innerText = "✅ Guardado";
        boton.style.backgroundColor = "#28a745";

        alert("✅ Ficha guardada correctamente\nFolio: " + folio);

    } catch (error) {

        console.error(error);
        alert("❌ " + error.message);

        boton.disabled = false;
        boton.innerText = "Guardar";

    }
}


//-------------------------------------------
async function guardarpdf() {

    const boton = document.querySelector('button[onclick="guardarpdf()"]') || document.getElementById("btnGuardarPDF2");
    const textoOriginal = boton.innerText;
    
    boton.disabled = true;
    boton.innerText = "⏳ Generando PDF...";

    const hoja1 = document.getElementById("pdf-content");
    const hoja2 = document.getElementById("segunda-hoja");

    // Ocultar botones de firmas temporalmente
    const accionesFirma = document.querySelectorAll('.firma-actions');
    accionesFirma.forEach(a => a.style.display = 'none');

    let resultado = null;

    try {
        // Ocultar placeholders vacíos
        if (typeof ocultarPlaceholders === 'function') {
            ocultarPlaceholders();
        }
        
        // Obtener o generar folio
        let folio = document.getElementById("inputFolioGenerado")?.value.trim();
        
        if (!folio) {
            // Si no hay folio, solicitar uno nuevo al servidor
            const respFolio = await fetch("g_vpgrapds.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ solicitar_folio: true })
            });

            const dataFolio = await respFolio.json();

            if (!dataFolio.success) {
                throw new Error("No se pudo generar el folio: " + (dataFolio.error || "Error desconocido"));
            }

            folio = dataFolio.folio;
            document.getElementById("inputFolioGenerado").value = folio;
        }

        // Esperar que el DOM se actualice
        await new Promise(r => setTimeout(r, 150));

        const { jsPDF } = window.jspdf;
        
        // =========================
        // HOJA 1 (Vertical - Carta)
        // =========================
        const canvas1 = await html2canvas(hoja1, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
            logging: false
        });

        const imgData1 = canvas1.toDataURL("image/jpeg", 0.95);
        
        // Crear PDF en formato carta (216 x 279 mm)
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "letter"
        });
        
        pdf.addImage(imgData1, "JPEG", 0, 0, 216, 279);

        // =========================
        // HOJA 2 (Horizontal - Carta)
        // =========================
        const canvas2 = await html2canvas(hoja2, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
            logging: false
        });

        const imgData2 = canvas2.toDataURL("image/jpeg", 0.95);
        
        pdf.addPage("letter", "landscape");
        pdf.addImage(imgData2, "JPEG", 0, 0, 279, 216);
    
        // Obtener PDF en base64 completo (con header)
        const pdfBase64Completo = pdf.output('datauristring');

        // Guardar PDF en el servidor
        const respuesta = await fetch("g_vpgrapds.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                guardar_pdf: true,
                folio: folio,
                pdf_base64: pdfBase64Completo
            })
        });

        resultado = await respuesta.json();

        if (!resultado.success) {
            throw new Error(resultado.error || "Error guardando PDF");
        }

        // Descargar el PDF usando tu descargar_pdf.php
        const link = document.createElement("a");
        link.href = "descargar_pdf.php?file=" + encodeURIComponent(folio + ".pdf");
        link.download = "Prueba_Hidraulica_" + folio + ".pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        alert("✅ PDF generado correctamente\nFolio: " + folio);
        
        // Cambiar estado del botón a éxito
        boton.innerText = "✅ PDF Generado";
        boton.style.backgroundColor = "#28a745";
        
        // Restaurar botón después de 3 segundos
        setTimeout(() => {
            boton.innerText = textoOriginal;
            boton.style.backgroundColor = "";
        }, 3000);

    } catch (error) {
        console.error("Error al generar PDF:", error);
        alert("❌ Error al generar PDF: " + error.message);
        
        // Restaurar botón
        boton.disabled = false;
        boton.innerText = textoOriginal;
        boton.style.backgroundColor = "";
        
    } finally {
        // Restaurar botones de firmas
        accionesFirma.forEach(a => a.style.display = 'flex');
    }
}

//==========


async function enviarValidacion(){

    const folio = document.getElementById("inputFolioGenerado").value;

    if(!folio){
        alert("Primero debes guardar la ficha");
        return;
    }

    if(!confirm("¿Enviar a validación? Ya no podrás editar.")){
        return;
    }

    const resp = await fetch("enviar_validacion.php", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({folio})
    });

    const r = await resp.json();

    if(r.success){

        alert("📤 Enviado a validación");

        bloquearFormulario();

    }else{
        alert("❌ " + r.error);
    }
}



function bloquearFormulario(){

    document.querySelectorAll("input, textarea").forEach(el=>{
        el.disabled = true;
    });

}



function ocultarPlaceholders() {

    document.querySelectorAll("input, textarea").forEach(el => {

        if (el.value === "") {

            el.dataset.placeholderOriginal = el.placeholder;
            el.placeholder = "";

        }

    });

}





async function enviarValidacion(){

    const folio = document.getElementById("inputFolioGenerado").value;

    if(!folio){
        alert("Primero debes guardar la ficha");
        return;
    }

    if(!confirm("¿Enviar a validación? Ya no podrás editar.")){
        return;
    }

    const resp = await fetch("enviar_validacion.php", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({folio})
    });

    const r = await resp.json();

    if(r.success){

        alert("📤 Enviado a validación");

        bloquearFormulario();

    }else{
        alert("❌ " + r.error);
    }
}



function bloquearFormulario(){

    document.querySelectorAll("input, textarea").forEach(el=>{
        el.disabled = true;
    });

}



function ocultarPlaceholders() {

    document.querySelectorAll("input, textarea").forEach(el => {

        if (el.value === "") {

            el.dataset.placeholderOriginal = el.placeholder;
            el.placeholder = "";

        }

    });

}


