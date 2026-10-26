


let tipoActivo = null; // Tipo de geometría actualmente activa

const sourceDibujo = new ol.source.Vector({ wrapX: false });

const layerDibujo = new ol.layer.Vector({
  source: sourceDibujo,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#ffcc33',
      width: 2
    }),
    fill: new ol.style.Fill({
      color: 'rgba(255, 204, 51, 0.2)'
    }),
    image: new ol.style.Circle({
      radius: 5,
      fill: new ol.style.Fill({ color: '#ffcc33' })
    })
  })
});

map.addLayer(layerDibujo);

window.activarDibujo = function (tipo) {
  // Si ya está activo el mismo tipo, desactiva
  if (draw && tipoActivo === tipo) {
    map.removeInteraction(draw);
    draw = null;
    tipoActivo = null;
    return;
  }

  // Si hay otra interacción activa, la elimina
  if (draw) {
    map.removeInteraction(draw);
  }


  draw = new ol.interaction.Draw({
    source: sourceDibujo,
    type: tipo
  });

  map.addInteraction(draw);
  tipoActivo = tipo;

  //Evento Dibujo
 
draw.on('drawend', function (evt) {
  map.removeInteraction(draw);

  const feature = evt.feature;
  const geometry = feature.getGeometry();
  const nombre = prompt("Ingrese un nombre para el elemento:");

  if (nombre) {
    feature.set('nombre', nombre);

    // Calcular punto de referencia para el texto (centroide)
    let puntoTexto;
    if (geometry.getType() === 'Point') {
      puntoTexto = geometry.getCoordinates();
    } else if (geometry.getType() === 'Polygon') {
      puntoTexto = geometry.getInteriorPoint().getCoordinates();
    } else if (geometry.getType() === 'LineString') {
      const coords = geometry.getCoordinates();
      const mitad = Math.floor(coords.length / 2);
      puntoTexto = coords[mitad];
    }

    const estiloConTexto = new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#ffcc33',
        width: 2
      }),
      fill: new ol.style.Fill({
        color: 'rgba(255, 204, 51, 0.2)'
      }),
      image: new ol.style.Circle({
        radius: 5,
        fill: new ol.style.Fill({ color: '#ffcc33' })
      }),
      text: new ol.style.Text({
        text: nombre,
        font: '12px Calibri,sans-serif',
        fill: new ol.style.Fill({ color: '#000' }),
        stroke: new ol.style.Stroke({ color: '#fff', width: 2 }),
        offsetY: -15,
        placement: 'point'
      })
    });

    feature.setStyle(estiloConTexto);
  }

  mostrarInformacion(geometry, feature);
});






};

window.limpiarDibujo = function () {
  sourceDibujo.clear(); // Borra todos los dibujos
};


// muestra infoirmacion geometrica del dibujo
function mostrarInformacion(geom) {
  const formato = new ol.format.GeoJSON();
  const geojson = formato.writeGeometryObject(geom);

  let resultado = '';

  if (geom instanceof ol.geom.Circle) {
    const radius = geom.getRadius(); // en metros
    const area = Math.PI * Math.pow(radius, 2); // en m²
    resultado = `
      <b>Círculo:</b><br>
      Radio: ${(radius / 1000).toFixed(2)} km<br>
      Área: ${(area / 10000).toFixed(2)} ha
    `;
  } else if (geojson.type === 'LineString') {
    const longitud = ol.sphere.getLength(geom);
    resultado = `Distancia: ${(longitud / 1000).toFixed(2)} km`;
  } else if (geojson.type === 'Polygon') {
    const area = ol.sphere.getArea(geom);
    resultado = `Área: ${(area / 10000).toFixed(2)} ha`;
  } else if (geojson.type === 'Point') {
    const coord = ol.proj.toLonLat(geom.getCoordinates()); // transformación a EPSG:4326
    resultado = `
      <b>Coordenadas:</b><br>
      Lat: ${coord[1].toFixed(5)}<br>
      Lon: ${coord[0].toFixed(5)}
    `;
  }

  document.getElementById('infoContenido').innerHTML = resultado;
  document.getElementById('infoDibujo').style.display = 'block';
}



