function crearBufferLinea() {
  const distancia = parseFloat(document.getElementById("bufferDist").value);
  const feature = window.featureSeleccionada;

  if (!feature || distancia <= 0) {
    alert("Seleccione una línea y una distancia válida");
    return;
  }

  const format = new ol.format.GeoJSON();

  // Convertir línea a GeoJSON en EPSG:4326
  const geojson = format.writeFeatureObject(feature, {
    featureProjection: "EPSG:3857",
    dataProjection: "EPSG:4326"
  });

  // Crear buffer con Turf.js
  const buffered = turf.buffer(geojson, distancia, { units: "meters" });

  // Convertir buffer a Feature OL en EPSG:3857
  const bufferFeatureOL = format.readFeature(buffered, {
    dataProjection: "EPSG:4326",
    featureProjection: "EPSG:3857"
  });

  // Dibujar buffer en el mapa
  bufferSource.clear(); // quita esta línea si quieres mantener buffers anteriores
  bufferSource.addFeature(bufferFeatureOL);

  // Ajustar vista al buffer
  map.getView().fit(bufferFeatureOL.getGeometry().getExtent(), { duration: 800 });

  // --- Transformar buffer para la consulta espacial ---
  const bufferGeomConsulta = bufferFeatureOL.getGeometry().clone().transform('EPSG:3857', 'EPSG:32616');

  // Llamar a tu función de consulta espacial
  consultarEspacial(bufferGeomConsulta);
}
