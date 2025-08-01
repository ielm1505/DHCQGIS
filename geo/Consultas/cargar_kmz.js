let vectorLayer; // Declaración global

document.addEventListener('DOMContentLoaded', function () {
  const fileInput = document.getElementById('fileInput');
  const toggleCheckbox = document.getElementById('toggleKmlLayer');

  if (!fileInput || !toggleCheckbox) {
    console.error('No se encontró el input de archivo o el checkbox');
    return;
  }

  // Listener para cambiar visibilidad de la capa
  toggleCheckbox.addEventListener('change', function () {
    if (vectorLayer) {
      vectorLayer.setVisible(toggleCheckbox.checked);
    }
  });

  fileInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const extension = file.name.split('.').pop().toLowerCase();

    if (vectorLayer) {
      map.removeLayer(vectorLayer); // Quitar capa anterior si ya existe
      vectorLayer = null;
    }

    if (extension === 'kml') {
      const reader = new FileReader();
      reader.onload = function (e) {
        loadKmlToMap(e.target.result);
      };
      reader.readAsText(file);
    } else if (extension === 'kmz') {
      const reader = new FileReader();
      reader.onload = function (e) {
        JSZip.loadAsync(e.target.result).then(zip => {
          const kmlFileName = Object.keys(zip.files).find(name => name.endsWith('.kml'));
          if (!kmlFileName) {
            alert('No se encontró ningún archivo .kml dentro del .kmz');
            return;
          }
          zip.files[kmlFileName].async('string').then(kmlText => {
            loadKmlToMap(kmlText);
          });
        });
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Solo se permiten archivos .kml o .kmz');
    }
  });

  function loadKmlToMap(kmlText) {
    const format = new ol.format.KML();
    const features = format.readFeatures(kmlText, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857'
    });

    const source = new ol.source.Vector({
      features: features
    });

    vectorLayer = new ol.layer.Vector({
      source: source,
      visible: toggleCheckbox.checked // Visibilidad inicial según el checkbox
    });

    map.addLayer(vectorLayer);

    const extent = source.getExtent();
    if (extent) {
      map.getView().fit(extent, { padding: [50, 50, 50, 50] });
    }
  }
});
