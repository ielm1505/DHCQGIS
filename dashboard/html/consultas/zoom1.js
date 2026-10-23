// Extensión inicial del mapa
const initialExtent = [-9721006.851803, 2335340.663016, -9631497.001877, 2425218.136975];

// Historial de vistas
let viewHistory = [];
let currentViewIndex = -1;

// Guardar vistas cuando cambia el centro o resolución
map.getView().on('change:center', saveViewState);
map.getView().on('change:resolution', saveViewState);

function saveViewState() {
    const view = map.getView();
    const center = view.getCenter().slice();
    const zoom = view.getZoom();
    if (currentViewIndex === -1 || center.toString() !== viewHistory[currentViewIndex]?.center.toString()) {
        viewHistory = viewHistory.slice(0, currentViewIndex + 1);
        viewHistory.push({ center, zoom });
        currentViewIndex = viewHistory.length - 1;
    }
}

// 🔙 Zoom Anterior
document.getElementById('zoom-prev').addEventListener('click', () => {
    if (currentViewIndex > 0) {
        currentViewIndex--;
        const prev = viewHistory[currentViewIndex];
        map.getView().setCenter(prev.center);
        map.getView().setZoom(prev.zoom);
    }
});

// 🔲 Zoom por Ventana (Zoom Box)
const dragZoom = new ol.interaction.DragZoom({
    condition: ol.events.condition.always
});

dragZoom.on('boxend', () => {
    
    map.removeInteraction(dragZoom);
    zoomBoxActive = false;
   
    document.getElementById('zoom-box').classList.remove('active');
});

let zoomBoxActive = false;

document.getElementById('zoom-box').addEventListener('click', () => {
    zoomBoxActive = !zoomBoxActive;
    if (zoomBoxActive) {
        map.addInteraction(dragZoom);
        document.getElementById('zoom-box').classList.add('active');
    } else {
        map.removeInteraction(dragZoom);
        document.getElementById('zoom-box').classList.remove('active');
    }
});

// 🏠 Zoom Inicial
document.getElementById('zoom-home').addEventListener('click', () => {
    map.getView().fit(initialExtent, { size: map.getSize() });
});



(function () {
    const zoomMenu = document.getElementById('zoom-menu');
    const dragHeader = zoomMenu.querySelector('.drag-header');
    const cerrarBtn = document.getElementById('cerrar-menu');

    let isDragging = false;
    let offsetX, offsetY;

    // Mostrar menú al hacer clic en "Zoom"
    window.zoom = function () {
        zoomMenu.style.display = 'flex';
    };

    // Cerrar menú
    cerrarBtn.addEventListener('click', () => {
        zoomMenu.style.display = 'none';
    });








    // Drag con mouse
    dragHeader.addEventListener('mousedown', (e) => {
        if (e.target.tagName === 'BUTTON') return;
        isDragging = true;
        offsetX = e.clientX - zoomMenu.offsetLeft;
        offsetY = e.clientY - zoomMenu.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            zoomMenu.style.left = `${e.clientX - offsetX}px`;
            zoomMenu.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Touch
    dragHeader.addEventListener('touchstart', (e) => {
        if (e.target.tagName === 'BUTTON') return;
        isDragging = true;
        const touch = e.touches[0];
        offsetX = touch.clientX - zoomMenu.offsetLeft;
        offsetY = touch.clientY - zoomMenu.offsetTop;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            const touch = e.touches[0];
            zoomMenu.style.left = `${touch.clientX - offsetX}px`;
            zoomMenu.style.top = `${touch.clientY - offsetY}px`;
        }
    }, { passive: true });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });
})();


  

// ========= control de GPS =========
// ========= CAPA PARA REGISTRAR PUNTOS =========
const registroSource = new ol.source.Vector();
const registroLayer = new ol.layer.Vector({
  source: registroSource,
  style: new ol.style.Style({
    image: new ol.style.Circle({
      radius: 5,
      fill: new ol.style.Fill({ color: 'red' }),
      stroke: new ol.style.Stroke({ color: 'white', width: 2 })
    })
  })
});
map.addLayer(registroLayer);

// ========= GPS =========
const gpsSource = new ol.source.Vector();
const gpsLayer = new ol.layer.Vector({ source: gpsSource });
map.addLayer(gpsLayer);

const gpsFeature = new ol.Feature();
gpsSource.addFeature(gpsFeature);

// Estilos para el parpadeo del punto GPS
const gpsStyle1 = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 7,
    fill: new ol.style.Fill({ color: 'rgba(0, 150, 255, 0.9)' }),
    stroke: new ol.style.Stroke({ color: '#0055ff', width: 2 })
  })
});

const gpsStyle2 = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 4,
    fill: new ol.style.Fill({ color: 'rgba(0, 150, 255, 0.3)' }),
    stroke: new ol.style.Stroke({ color: '#0055ff', width: 1 })
  })
});

// Panel de coordenadas
const gpsPanel = document.createElement('div');
gpsPanel.id = 'gpsCoords';
gpsPanel.style.position = 'absolute';
gpsPanel.style.bottom = '10px';
gpsPanel.style.left = '10px';
gpsPanel.style.background = 'rgba(255,255,255,0.85)';
gpsPanel.style.padding = '6px 10px';
gpsPanel.style.borderRadius = '5px';
gpsPanel.style.fontFamily = 'sans-serif';
gpsPanel.style.fontSize = '13px';
gpsPanel.style.boxShadow = '0 0 5px rgba(0,0,0,0.3)';
gpsPanel.innerText = 'Sin señal GPS';
// Inicialmente oculto
gpsPanel.style.display = 'none';
document.body.appendChild(gpsPanel);

// Botón para registrar punto
const btnRegistrar = document.createElement('button');
btnRegistrar.innerText = 'Registrar Punto';
btnRegistrar.style.position = 'absolute';
btnRegistrar.style.bottom = '50px';
btnRegistrar.style.left = '10px';
btnRegistrar.style.padding = '6px 10px';
btnRegistrar.style.border = 'none';
btnRegistrar.style.borderRadius = '5px';
btnRegistrar.style.background = '#ff6666';
btnRegistrar.style.color = 'white';
btnRegistrar.style.cursor = 'pointer';
btnRegistrar.disabled = true; // Hasta que haya GPS
// Inicialmente oculto
btnRegistrar.style.display = 'none';
document.body.appendChild(btnRegistrar);

// Botón para exportar GeoJSON
const btnExportar = document.createElement('button');
btnExportar.innerText = 'Exportar GeoJSON';
btnExportar.style.position = 'absolute';
btnExportar.style.bottom = '90px';
btnExportar.style.left = '10px';
btnExportar.style.padding = '6px 10px';
btnExportar.style.border = 'none';
btnExportar.style.borderRadius = '5px';
btnExportar.style.background = '#3399ff';
btnExportar.style.color = 'white';
btnExportar.style.cursor = 'pointer';
// Inicialmente oculto
btnExportar.style.display = 'none';
document.body.appendChild(btnExportar);

// Registrar EPSG:32616
proj4.defs("EPSG:32616", "+proj=utm +zone=16 +datum=WGS84 +units=m +no_defs");
ol.proj.proj4.register(proj4);

let ultimaCoord32616 = null;

// Intervalo para el parpadeo del punto GPS
let toggle = true;
setInterval(() => {
  if (gpsFeature.getGeometry()) {
    gpsFeature.setStyle(toggle ? gpsStyle1 : gpsStyle2);
    toggle = !toggle;
  }
}, 600);

const geolocation = new ol.Geolocation({
  tracking: false,
  projection: 'EPSG:4326',
  trackingOptions: {
    enableHighAccuracy: true,
    maximumAge: 1000,
    timeout: 60000
  }
});

geolocation.on('change:position', () => {
  const coords4326 = geolocation.getPosition();
  const altitude = geolocation.getAltitude();

  if (coords4326) {
    ultimaCoord32616 = ol.proj.transform(coords4326, 'EPSG:4326', 'EPSG:32616');

    gpsFeature.setGeometry(new ol.geom.Point(ol.proj.transform(coords4326, 'EPSG:4326', map.getView().getProjection())));

    gpsPanel.innerText =
      `X: ${ultimaCoord32616[0].toFixed(2)} | Y: ${ultimaCoord32616[1].toFixed(2)} | Z: ${altitude !== undefined ? altitude.toFixed(2) : 'N/A'}`;

    btnRegistrar.disabled = false;
  } else {
    gpsPanel.innerText = 'Sin señal GPS';
    btnRegistrar.disabled = true;
  }
});

btnRegistrar.onclick = () => {
  if (!ultimaCoord32616) return;

  const nombre = prompt("Nombre del punto:", "");
  if (nombre === null) return; // Cancelado

  const fecha = new Date().toISOString();

  
  const punto = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform(ultimaCoord32616, 'EPSG:32616', map.getView().getProjection())),
    Nombre: nombre,
    fecha: fecha,
    sistema_coordenadas: 'EPSG:32616'
  });

  registroSource.addFeature(punto);
  console.log("Punto registrado:", {nombre, fecha, coords: ultimaCoord32616});
};

btnExportar.onclick = () => {
  const features = registroSource.getFeatures();

  if (features.length === 0) {
    alert("No hay puntos para exportar.");
    return;
  }

  // Convertir geometrías a EPSG:32616 y preparar propiedades
  const geojsonFeatures = features.map(f => {
    // Clonar la geometría transformándola a EPSG:32616
    const geom32616 = f.getGeometry().clone().transform(map.getView().getProjection(), 'EPSG:32616');

    return {
      type: "Feature",
      geometry: new ol.format.GeoJSON().writeGeometryObject(geom32616),
      properties: {
        Nombre: f.get('Nombre'),
        fecha: f.get('fecha'),
        sistema_coordenadas: 'EPSG:32616'
      }
    };
  });

  const geojson = {
    type: "FeatureCollection",
    features: geojsonFeatures
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(geojson, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", "puntos_registrados.geojson");
  document.body.appendChild(dlAnchor);
  dlAnchor.click();
  dlAnchor.remove();
};

let gpsActivo = false;
document.getElementById('btnGPS').onclick = () => {
  gpsActivo = !gpsActivo;
  if (gpsActivo) {
    geolocation.setTracking(true);
    const coords = geolocation.getPosition();
    if (coords) {
      const center = ol.proj.transform(coords, 'EPSG:4326', map.getView().getProjection());
      map.getView().animate({ center: center, zoom: 17, duration: 1000 });
    }
    // Mostrar controles al activar GPS
    gpsPanel.style.display = 'block';
    btnRegistrar.style.display = 'inline-block';
    btnExportar.style.display = 'inline-block';

    document.getElementById('btnGPS').style.backgroundColor = '#d0f0ff';
  } else {
    geolocation.setTracking(false);
    gpsFeature.setGeometry(null);
    gpsPanel.innerText = 'Sin señal GPS';
    ultimaCoord32616 = null;
    btnRegistrar.disabled = true;

    // Limpiar puntos registrados al desactivar GPS
    registroSource.clear();

    // Ocultar controles al desactivar GPS
    gpsPanel.style.display = 'none';
    btnRegistrar.style.display = 'none';
    btnExportar.style.display = 'none';

    document.getElementById('btnGPS').style.backgroundColor = '';
  }
};

