// Ventana flotante de resultados
function getResultadosDiv() {
  let div = document.getElementById("resultadosConsulta");
  if (!div) {
    div = document.createElement("div");
    div.id = "resultadosConsulta";
    div.style.position = "absolute";
    div.style.bottom = "10px";
    div.style.right = "10px";
    div.style.padding = "10px";
    div.style.background = "white";
    div.style.border = "1px solid #ccc";
    div.style.maxHeight = "300px";
    div.style.overflowY = "auto";
    div.style.width = "320px";
    div.style.fontSize = "13px";
    div.innerHTML = "<b>Resultados de la consulta:</b><br/>";
    document.body.appendChild(div);
  }
  return div;
}

// Obtener capas activas de un grupo
function getCapasActivas(group) {
  let layers = [];
  group.getLayers().forEach(layer => {
    if (layer.getVisible()) {
      layers.push(layer);
    }
  });
  return layers;
}

// Formatear área en m², ha, km²
function formatArea(m2) {
  if (m2 > 1e6) {
    return (m2 / 1e6).toFixed(2) + " km²";
  } else if (m2 > 10000) {
    return (m2 / 10000).toFixed(2) + " ha";
  }
  return m2.toFixed(2) + " m²";
}

// Evento al seleccionar un polígono de la capa Coberturas_Lineas
selectInteraction.on('select', function (e) {
  var selectedFeature = e.selected[0];
  if (!selectedFeature) return;

  var geom = selectedFeature.getGeometry().clone().transform('EPSG:3857', 'EPSG:4326');
  var geojson = new ol.format.GeoJSON().writeGeometry(geom);

  var campoGeom = "geom"; // ajusta según tu GeoServer
  var activas = getCapasActivas(group_BJ); // capas visibles del grupo principal

  // Generar las promesas de consulta
  let promesas = activas.map(layer => {
    let typeName = layer.get("typeName");
    let geometryType = layer.get("geometryType");
    if (!typeName || !geometryType) return Promise.resolve("");

    var url = "https://dhcqgis.aguakan.com/geoserver/wfs?" +
      "service=WFS&version=1.0.0&request=GetFeature" +
      "&typeName=" + typeName +
      "&outputFormat=application/json&srsname=EPSG:4326" +
      "&CQL_FILTER=INTERSECTS(" + campoGeom + "," + geojson + ")";

    return fetch(url)
      .then(res => res.json())
      .then(data => {
        let nombre = layer.get("popuplayertitle") || layer.get("title") || typeName;

        if (geometryType === "Point") {
          return `📍 ${nombre} → ${data.features.length} puntos<br/>`;

        } else if (geometryType === "LineString") {
          let total = 0;
          data.features.forEach(f => {
            let g = new ol.format.GeoJSON().readFeature(f).getGeometry();
            g.transform('EPSG:4326', 'EPSG:3857');
            total += ol.sphere.getLength(g);
          });
          return `📏 ${nombre} → ${total.toFixed(2)} m de líneas<br/>`;

        } else if (geometryType === "Polygon") {
          let total = 0;
          data.features.forEach(f => {
            let g = new ol.format.GeoJSON().readFeature(f).getGeometry();
            g.transform('EPSG:4326', 'EPSG:3857');
            total += ol.sphere.getArea(g);
          });
          return `🟦 ${nombre} → ${formatArea(total)} de polígonos<br/>`;
        }
        return "";
      })
      .catch(err => {
        console.error("Error en consulta espacial:", err);
        return "";
      });
  });

  // Esperar todas las consultas y mostrar resultados juntos
  Promise.all(promesas).then(resultados => {
    let div = getResultadosDiv();
    div.innerHTML = "<b>Resultados de la consulta:</b><br/>" + resultados.join("");
  });
});
