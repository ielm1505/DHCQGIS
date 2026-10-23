
 
// ======== CAPA DE RESALTADO ========
const highlightSource = new ol.source.Vector();
const highlightLayer = new ol.layer.Vector({
  source: highlightSource,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({ color: 'yellow', width: 3 }),
    fill: new ol.style.Fill({ color: 'rgba(255,255,0,0.3)' })
  })
});
map.addLayer(highlightLayer);

// ======== FUNCIONES AUXILIARES ========
function crearPestañas(resultados) {
  const tabsDiv = document.getElementById("tabs");
  const contentsDiv = document.getElementById("tabContents");
  tabsDiv.innerHTML = "";
  contentsDiv.innerHTML = "";

  resultados.forEach((res, i) => {
    const tab = document.createElement("div");
    tab.className = "tabBtn" + (i === 0 ? " active" : "");
    tab.innerText = res.titulo;
    tab.onclick = () => activarPestaña(i);
    tabsDiv.appendChild(tab);

    const content = document.createElement("div");
    content.className = "tabContent" + (i === 0 ? " active" : "");
    content.innerHTML = generarTablaAtributos(res.props);
    contentsDiv.appendChild(content);
  });
}

function generarTablaAtributos(props) {
  let html = "<table>";
  for (let k in props) html += `<tr><td>${k}</td><td>${props[k]}</td></tr>`;
  html += "</table>";
  return html;
}

function activarPestaña(indice) {
  document.querySelectorAll(".tabBtn").forEach((t, i) =>t.classList.toggle("active", i === indice));
  document.querySelectorAll(".tabContent").forEach((c, i) =>c.classList.toggle("active", i === indice));
}

document.getElementById("closeBtn").onclick = () => {document.getElementById("infoWindow").style.display = "none";
  highlightSource.clear();
};

// ================= VENTANA FLOTANTE DRAGGABLE =================
(function () {
  const infoWindow = document.getElementById('infoWindow');
  const header = document.getElementById('ventana_header');
  if (!infoWindow || !header) return;

  let dragOffsetX, dragOffsetY;
  let isDragging = false;

  // 🖱️ Eventos para mouse
  header.addEventListener('mousedown', startDragMouse);
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('mousemove', dragMoveMouse);

  // 📱 Eventos para pantallas táctiles
  header.addEventListener('touchstart', startDragTouch);
  document.addEventListener('touchend', stopDrag);
  document.addEventListener('touchmove', dragMoveTouch);

  function startDragMouse(e) {
    e.preventDefault();
    isDragging = true;
    dragOffsetX = e.clientX - infoWindow.offsetLeft;
    dragOffsetY = e.clientY - infoWindow.offsetTop;
  }

  function dragMoveMouse(e) {
    if (!isDragging) return;
    e.preventDefault();
    moveWindow(e.clientX - dragOffsetX, e.clientY - dragOffsetY);
  }

  function startDragTouch(e) {
    const touch = e.touches[0];
    isDragging = true;
    dragOffsetX = touch.clientX - infoWindow.offsetLeft;
    dragOffsetY = touch.clientY - infoWindow.offsetTop;
  }

  function dragMoveTouch(e) {
    if (!isDragging) return;
    const touch = e.touches[0];
    moveWindow(touch.clientX - dragOffsetX, touch.clientY - dragOffsetY);
  }

  function moveWindow(left, top) {
    // Evita que la ventana se salga completamente de la pantalla
    const rect = infoWindow.getBoundingClientRect();
    const maxLeft = window.innerWidth - rect.width;
    const maxTop = window.innerHeight - rect.height;

    infoWindow.style.left = Math.min(Math.max(0, left), maxLeft) + 'px';
    infoWindow.style.top = Math.min(Math.max(0, top), maxTop) + 'px';
  }

  function stopDrag() {
    isDragging = false;
  }
})();



// ======== EVENTO DE CLIC EN EL MAPA ========

const capasPoligonales = [
  lyr_Cobertura_Tanques_31,
  lyr_Coberturas_Lineas_30,
  lyr_Cobertura_PTAR_BJ_0,
  lyr_Horario_Servicio_BJ_32,
  lyr_C_PTAR_2025_5_SOL,
  lyr_C_T_2025_5_SOL_0,
  lyr_C_C_2025_5_SOL_1,
  lyr_Cob_Lin_AP_PC_26,
  lyr_SM_23,
  lyr_afectacion

];

async function handlerEtiqueta(evt) {
    const resultados = [];
    highlightSource.clear();

const wmsLayers = [
  window.lyr_Clientes_BJ_33,
  window.lyr_Clientes_Sol_01,
  window.lyr_Clientes_PM,
  window.lyr_puntos_topograficos,
  window.lyr_Clientes_lv_01,
  window.lyr_Clientes_PM_01
].filter(l => l); // elimina undefined


    // --- detectar features vectoriales ---
    map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
        const props = feature.getProperties();
        delete props.geometry;

        resultados.push({ 
            titulo: 'CAPA: ' + (layer.get('popuplayertitle') || layer.get('title')), 
            props: props 
        });

        highlightSource.addFeature(feature.clone());

        // capa poligonal → consulta espacial postgres
        if (capasPoligonales.includes(layer)) {
            consultarEspacialPostgres(feature.getGeometry().clone());
        }
    });

    // --- consultar WMS ---
    for (const layer of wmsLayers) {
        if (!layer.getVisible()) continue;

        const viewRes = map.getView().getResolution();
        const url = layer.getSource().getFeatureInfoUrl(
            evt.coordinate,
            viewRes,
            map.getView().getProjection(),
            {
                'INFO_FORMAT': 'application/json',
                'QUERY_LAYERS': layer.getSource().getParams().LAYERS
            }
        );

        if (!url) continue;

        try {
            const res = await fetch(url);
            const data = await res.json();

            if (data.features) {
                data.features.forEach((f) => {
                    resultados.push({
                        titulo: layer.get('title'),
                        props: f.properties
                    });

                    const geoF = new ol.format.GeoJSON().readFeature(f, {
                        featureProjection: map.getView().getProjection()
                    });
                    highlightSource.addFeature(geoF);
                });
            }
        } catch (e) {
            console.error("Error WMS:", e);
        }
    }

    // Mostrar ventana
    if (resultados.length > 0) {
        crearPestañas(resultados);
        document.getElementById("infoWindow").style.display = "block";
    }
}

// activar por defecto
map.on('singleclick', handlerEtiqueta);



// Funcionalidad pestañas
document.querySelectorAll('.tabBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tabBtn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tabContent').forEach(tc => tc.classList.remove('active'));
    
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// Funciones de ejemplo para botones
function accion1() { alert("Acción 1 ejecutada"); }
function accion2() { alert("Acción 2 ejecutada"); }
function accion3() { alert("Acción 3 ejecutada"); }

// Cerrar ventana
document.getElementById('closeBtn').addEventListener('click', () => {
  document.getElementById('infoWindow').style.display = 'none';
});
//ieml