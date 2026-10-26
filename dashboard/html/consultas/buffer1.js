
// --- Variables ---
let isMinimized = false;
const infoWindow = document.getElementById("infoWindow");
const atributosDiv = document.getElementById("atributos");
const espacialDiv = document.getElementById("espacial");
const extraDiv = document.getElementById("extra");

// --- Tabs ---
document.querySelectorAll(".tabBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tabBtn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tabContent").forEach(tab => tab.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// --- Cerrar ventana ---
document.getElementById("closeWin").addEventListener("click", () => {
  document.getElementById("infoWindow").style.display = "none";
});
// --- Botón minimizar ---
document.getElementById("minWin").onclick = () => {
  if (!isMinimized) {
    document.querySelectorAll(".tabContent").forEach(tc => tc.style.display = "none");
    isMinimized = true;
  } else {
    let activeTab = document.querySelector(".tabBtn.active").dataset.tab;
    document.querySelectorAll(".tabContent").forEach(tc => tc.style.display = "none");
    document.getElementById(activeTab).style.display = "block";
    isMinimized = false;
  }
};

// --- Arrastrar ventana ---
(function() {
  let pos1=0,pos2=0,pos3=0,pos4=0;
  const header = document.getElementById("ventana_header");
  header.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX; pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX; pos2 = pos4 - e.clientY;
    pos3 = e.clientX; pos4 = e.clientY;
    infoWindow.style.top = (infoWindow.offsetTop - pos2) + "px";
    infoWindow.style.left = (infoWindow.offsetLeft - pos1) + "px";
  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
})();

// Fuente y capa para los buffers

// --------------------
// 1️⃣ Capa de resaltado y buffers
// --------------------
var highlightSource = new ol.source.Vector();
var highlightLayer = new ol.layer.Vector({
  source: highlightSource,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({ color: 'blue', width: 2 }),
    fill: new ol.style.Fill({ color: 'rgba(0,0,255,0.2)' }),
    image: new ol.style.Circle({
      radius: 6,
      fill: new ol.style.Fill({ color: 'blue' }),
      stroke: new ol.style.Stroke({ color: 'white', width: 2 })
    })
  })
});
map.addLayer(highlightLayer);

var bufferSource = new ol.source.Vector();
var bufferLayer = new ol.layer.Vector({
  source: bufferSource,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({ color: 'rgba(255,0,0,0.8)', width: 2 }),
    fill: new ol.style.Fill({ color: 'rgba(255,0,0,0.3)' })
  })
});
map.addLayer(bufferLayer);

// --------------------
// 2️⃣ Función auxiliar para WKT → GML
// --------------------
function wktToGML(geometry) {
    // geometry: OpenLayers WKT string o GeoJSON objeto
    // Convertimos primero a GeoJSON si es WKT
    let geojson;
    if (typeof geometry === "string" && geometry.startsWith("POLYGON")) {
        geojson = new ol.format.GeoJSON().writeGeometryObject(new ol.format.WKT().readGeometry(geometry, {
            dataProjection: 'EPSG:32616',
            featureProjection: 'EPSG:32616'
        }));
    } else {
        geojson = geometry;
    }

    let gml = "";

    function polygonToGML(coordsArray) {
        const ring = coordsArray[0].map(c => `${c[0].toFixed(6)} ${c[1].toFixed(6)}`);
        // cerrar anillo si no está cerrado
        if (ring[0] !== ring[ring.length - 1]) ring.push(ring[0]);
        return `<gml:Polygon srsName="EPSG:32616">
            <gml:outerBoundaryIs>
                <gml:LinearRing>
                    <gml:coordinates>${ring.join(",")}</gml:coordinates>
                </gml:LinearRing>
            </gml:outerBoundaryIs>
        </gml:Polygon>`;
    }

    if (geojson.type === "Polygon") {
        gml += polygonToGML(geojson.coordinates);
    } else if (geojson.type === "MultiPolygon") {
        geojson.coordinates.forEach(poly => {
            gml += polygonToGML(poly);
        });
    }

    return gml;
}


// --------------------
// 3️⃣ Selección de objetos
// --------------------
// Select para WFS
var selectInteraction = new ol.interaction.Select({
    layers: function(layer) { return layer instanceof ol.layer.Vector; }
});
map.addInteraction(selectInteraction);

selectInteraction.on('select', function(e) {
    if (e.selected.length > 0) {
        const feature = e.selected[0];
        actualizarVentana(feature);
    } else {
        highlightSource.clear();
        bufferSource.clear();
        document.getElementById("infoWindow").style.display = "none";
    }
});

// Clic en el mapa para WMSmap.on("singleclick", function(evt) {
  // Si ya hay selección vectorial → NO hacemos GetFeatureInfo





  
// --------------------
// 4️⃣ Actualizar ventana flotante
// --------------------
function actualizarVentana(feature) {
  if (!feature) return;
  highlightSource.clear();
  bufferSource.clear();

  highlightSource.addFeature(feature.clone());
  document.getElementById("infoWindow").style.display = "block";

  // Atributos
  let props = feature.getProperties();
  delete props.geometry;
  let html = "<table border='1' width='100%'>";
  for (let k in props) html += `<tr><td><b>${k}</b></td><td>${props[k]}</td></tr>`;
  html += "</table>";
  document.getElementById("atributos").innerHTML = html;

  // Consulta espacial según tipo
  const geomType = feature.getGeometry().getType();
  if (geomType.includes("Polygon")) {
    document.getElementById("espacial").innerHTML = "En desarrollo";
  }
  
  
  
  else if (geomType.includes("LineString")) {
    document.getElementById("espacial").innerHTML = `
      <label>Distancia del buffer (m):</label>
      <input type="number" id="bufferDist" value="50" min="1" style="width:80px; margin-left:5px;">
      <button onclick="crearBufferLinea()">Generar</button>
    `;
    window.featureSeleccionada = feature;
  } else if (geomType.includes("Point")) {
    document.getElementById("espacial").innerHTML = `
      <label>Radio del buffer (m):</label>
      <input type="number" id="radioBuffer" value="500" style="width:80px;">
      <button onclick="crearBufferDesdeInput()">Crear</button>
    `;
    window.featureSeleccionada = feature;
  } else {
    document.getElementById("espacial").innerHTML = "N/A";
  }

  document.getElementById("extra").innerHTML = "Contenido adicional aquí...";
}


//crear buffe circular para objetos base puntos

function crearBufferCircular(feature, radio = 500) {
  if (!feature || feature.getGeometry().getType() !== 'Point') {
    console.warn("La geometría seleccionada no es un punto");
    return;
  }

  // Obtener coordenadas del punto en EPSG:3857
  const coords = feature.getGeometry().getCoordinates();

  // Convertir a EPSG:4326 (lon,lat) para Turf
  const puntoTurf = turf.point(ol.proj.toLonLat(coords));

  // Crear buffer con Turf (radio en metros)
  const bufferTurf = turf.buffer(puntoTurf, radio, { units: 'meters' });

  // Convertir buffer (GeoJSON EPSG:4326 → feature EPSG:3857)
  const bufferOL = new ol.format.GeoJSON().readFeature(bufferTurf, {
    dataProjection: 'EPSG:4326',
    featureProjection: map.getView().getProjection() // normalmente EPSG:3857
  });

  // Agregar al mapa

  bufferSource.addFeature(bufferOL);

  console.log("✅ Buffer generado", bufferOL);
}


function crearBufferDesdeInput() {
  const radio = parseFloat(document.getElementById("radioBuffer").value);
  if (isNaN(radio) || radio <= 0) {
    alert("Ingrese un radio válido");
    return;
  }
  if (!window.featureSeleccionada) {
    alert("Primero seleccione un punto.");
    return;
  }
  crearBufferCircular(window.featureSeleccionada, radio);
}





// --------------------
// Buffer lineal con Turf.js para objetos base linea
// --------------------
function crearBufferLinea() {
  const distancia = parseFloat(document.getElementById("bufferDist").value);
  if (!window.featureSeleccionada || distancia <= 0) {
    alert("Seleccione una línea y una distancia válida");
    return;
  }

  const feature = window.featureSeleccionada;
  const format = new ol.format.GeoJSON();

  // 1. Convertir la línea a GeoJSON en EPSG:4326 (para Turf)
  const geojson = format.writeFeatureObject(feature, {
    featureProjection: "EPSG:3857",
    dataProjection: "EPSG:4326"
  });

  // 2. Crear buffer con Turf en metros
  const buffered = turf.buffer(geojson, distancia, { units: "meters" });

  // 3. Convertir de regreso el buffer a Feature en EPSG:32616
  const bufferFeature = format.readFeature(buffered, {
    dataProjection: "EPSG:4326",
    featureProjection: "EPSG:3857"
  });

  // 4. Dibujar el buffer en la capa
  bufferSource.clear(); // ❌ quita esta línea si quieres acumular buffers
  bufferSource.addFeature(bufferFeature);

  // 5. Ajustar vista al buffer
  map.getView().fit(bufferFeature.getGeometry().getExtent(), { duration: 800 });

  const geometry = event.feature.getGeometry().clone().transform('EPSG:3857', 'EPSG:32616');
  // 6. Llamar a la consulta espacial
   console.log("poligono generado:", geometry);
  consultarEspacial(geometry);
}




    