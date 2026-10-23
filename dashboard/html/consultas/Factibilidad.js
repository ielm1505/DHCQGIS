// URL base GeoServer WFS
const geoserverUrl = "https://dhcqgis.aguakan.com/geoserver/wfs";

// Obtener capas visibles que cumplen filtro
function obtenerCapasVisibles(layers, filtro) { 
  var visibles = [];
  layers.forEach(function(layer) {
    if (layer instanceof ol.layer.Group) {
      visibles = visibles.concat(obtenerCapasVisibles(layer.getLayers(), filtro));
    } else {
      if (layer.getVisible() && filtro(layer)) {
        visibles.push(layer);
      }
    }
  });
  return visibles;
}

// Cerrar ventana de factibilidad
function cerrarVentana() {
  document.getElementById("ventanaFactibilidad").style.display = "none";

  if (window.selectFactibilidad) {
    window.selectFactibilidad.getFeatures().clear();
    map.removeInteraction(window.selectFactibilidad);
    window.selectFactibilidad = null;
  }
  if (window.modifyFactibilidad) {
    map.removeInteraction(window.modifyFactibilidad);
    window.modifyFactibilidad = null;
  }

  document.getElementById("formFactibilidad").innerHTML = "";
}

// Mostrar ventana Factibilidad con selector de capa
function Factibilidad() {
  document.getElementById("ventanaFactibilidad").style.display = "block";

  // Obtener capas activas que inician con 'Fact_'
  var capasActivas = obtenerCapasVisibles(map.getLayers(), function(layer) {
    return layer.get('popuplayertitle') && layer.get('popuplayertitle').startsWith('Fact_');
  });

  if (capasActivas.length === 0) {
    alert("No hay capas de Factibilidad activas.");
    return;
  }

  // Crear selector de capas
  let selectorHTML = '<label for="selectorCapaFact"><b>Seleccione capa a editar:</b></label><br><select id="selectorCapaFact">';
  capasActivas.forEach(capa => {
    selectorHTML += `<option value="${capa.get('name')}">${capa.get('popuplayertitle')}</option>`;
  });
  //selectorHTML += '</select><br><br><p>Seleccione un elemento en la capa y edite sus atributos.</p><div id="formFactibilidad"></div><br><button onclick="guardarCambios()">Guardar Cambios</button> <button onclick="cerrarVentana()">Cerrar</button>';

  document.getElementById("formFactibilidad").innerHTML = selectorHTML;

  // Eliminar interacciones previas
  if (window.selectFactibilidad) {
    map.removeInteraction(window.selectFactibilidad);
  }
  if (window.modifyFactibilidad) {
    map.removeInteraction(window.modifyFactibilidad);
  }

  // Crear nueva interacción select solo para la capa seleccionada
  var nombreCapaSeleccionada = document.getElementById("selectorCapaFact").value;
  var capaSeleccionada = capasActivas.find(c => c.get('name') === nombreCapaSeleccionada);

  if (!capaSeleccionada) {
    alert("No se encontró la capa seleccionada.");
    return;
  }

  window.selectFactibilidad = new ol.interaction.Select({
    layers: [capaSeleccionada]
  });
  map.addInteraction(window.selectFactibilidad);

  // Activar edición geométrica al seleccionar feature
  window.selectFactibilidad.on('select', function(e) {
    if (e.selected.length > 0) {
      var feature = e.selected[0];
      cargarAtributos(feature);

      habilitarEdicionGeometria();
    } else {
      document.getElementById("formFactibilidad").innerHTML = selectorHTML; // Reset formulario si se deselecciona todo
    }
  });

  // Cambiar la capa seleccionada en selector actualiza la interacción select
  document.getElementById("selectorCapaFact").addEventListener("change", function() {
    var nuevaCapaName = this.value;
    var nuevaCapa = capasActivas.find(c => c.get('name') === nuevaCapaName);

    if (window.selectFactibilidad) {
      map.removeInteraction(window.selectFactibilidad);
      window.selectFactibilidad = null;
    }
    if (window.modifyFactibilidad) {
      map.removeInteraction(window.modifyFactibilidad);
      window.modifyFactibilidad = null;
    }
    document.getElementById("formFactibilidad").innerHTML = selectorHTML;

    if (!nuevaCapa) return;

    window.selectFactibilidad = new ol.interaction.Select({
      layers: [nuevaCapa]
    });
    map.addInteraction(window.selectFactibilidad);

    window.selectFactibilidad.on('select', function(e) {
      if (e.selected.length > 0) {
        cargarAtributos(e.selected[0]);
        habilitarEdicionGeometria();
      } else {
        document.getElementById("formFactibilidad").innerHTML = selectorHTML;
      }
    });
  });
}

// Habilitar edición de geometría para el feature seleccionado
function habilitarEdicionGeometria() {
  if (window.modifyFactibilidad) {
    map.removeInteraction(window.modifyFactibilidad);
  }
  if (!window.selectFactibilidad) return;

  window.modifyFactibilidad = new ol.interaction.Modify({
    features: window.selectFactibilidad.getFeatures()
  });
  map.addInteraction(window.modifyFactibilidad);
}

// Carga dinámica de atributos en formulario para editar
function cargarAtributos(feature) {
  var form = document.getElementById("formFactibilidad");
  var selectorHTML = form.querySelector("#selectorCapaFact").outerHTML;
  form.innerHTML = selectorHTML + "<br>";

  var capaOrigen = buscarCapaDeFeature(map.getLayers(), feature);
  var typeName = capaOrigen.get('name');

  // Recargar feature completa desde GeoServer para asegurar todos los campos
  var fid = feature.getId();
  var url = `${geoserverUrl}?service=WFS&version=1.0.0&request=GetFeature&typeName=${typeName}&featureID=${fid}&outputFormat=application/json&srsname=EPSG:3857`;

  fetch(url)
    .then(resp => resp.json())
    .then(data => {
      var format = new ol.format.GeoJSON();
      var fullFeature = format.readFeature(data.features[0], {
        featureProjection: 'EPSG:3857'
      });

      // Ahora sí, usar todos los atributos
      fullFeature.getKeys().forEach(function(key) {
        if (key !== fullFeature.getGeometryName()) {
          var valor = fullFeature.get(key) || "";
          form.innerHTML += `
            <label><b>${key}</b></label><br>
            <input type="text" id="attr_${key}" value="${valor}" /><br><br>
          `;
        }
      });

      // Guardar el feature completo para que guardarCambios lo use
      window.featureFactibilidadActual = fullFeature;
    });
}


// Función para recargar capa desde GeoServer (refrescar datos)
function recargarCapa(capa) {
  const source = capa.getSource();
  if (!source) return;

  source.clear();

  const typeName = capa.get('name');
  if (!typeName) return;

  const url = `${geoserverUrl}?service=WFS&version=1.0.0&request=GetFeature&typeName=${typeName}&outputFormat=application/json&srsname=EPSG:3857`;

  fetch(url)
    .then(resp => resp.json())
    .then(data => {
      const format = new ol.format.GeoJSON();
      const features = format.readFeatures(data, {
        featureProjection: 'EPSG:3857'
      });
      source.addFeatures(features);
    })
    .catch(err => console.error("Error recargando capa:", err));
}


// Función para guardar cambios en GeoServer usando WFS-T
function guardarCambios() {
  var feature = window.selectFactibilidad.getFeatures().item(0);
  if (!feature) {
    alert("No hay ningún elemento seleccionado.");
    return;
  }

  var capaOrigen = buscarCapaDeFeature(map.getLayers(), feature);
  if (!capaOrigen) {
    alert("No se pudo identificar la capa de origen.");
    return;
  }

  var typeName = capaOrigen.get('name');  
  if (!typeName) {
    alert("La capa no tiene definido 'name'.");
    return;
  }

  

  fetch(`https://dhcqgis.aguakan.com/geoserver/wfs?service=WFS&version=1.1.0&request=DescribeFeatureType&typeName=${typeName}`)
    .then(r => r.text())
    .then(text => {
      var parser = new DOMParser();
      var xml = parser.parseFromString(text, "text/xml");

      // Namespace oficial de la capa en GeoServer
      var targetNS = xml.documentElement.getAttribute("targetNamespace");
      

      // Buscar el nombre real de la geometría
      var geomElement = xml.querySelector("xsd\\:element[name], element[name]");
      var geometryName = "geom";
      if (geomElement && geomElement.getAttribute("type").includes("gml")) {
        geometryName = geomElement.getAttribute("name");
      }
      

      feature.setGeometryName(geometryName);

      // Actualizar atributos desde el formulario
      feature.getKeys().forEach(function(key) {
        if (key !== geometryName) {
          var input = document.getElementById("attr_" + key);
          if (input) {
            feature.set(key, input.value);
          }
        }
      });

      var [featurePrefix, featureType] = typeName.split(":");

      var formatWFS = new ol.format.WFS();
      var formatGML = new ol.format.GML({
        featureNS: targetNS,
        featurePrefix: featurePrefix,
        featureType: featureType,
        srsName: 'EPSG:3857',
        geometryName: geometryName
      });

      var transaction = formatWFS.writeTransaction(null, [feature], null, formatGML);
      var xmlString = new XMLSerializer().serializeToString(transaction);

      fetch('https://dhcqgis.aguakan.com/geoserver/wfs', {
        method: 'POST',
        body: xmlString,
        headers: {
          'Content-Type': 'text/xml',
          'Authorization': 'Basic ' + btoa('iluna:1896')
        }
      })
      .then(response => response.text())
      .then(text => {
       
        if (text.includes("Exception")) {
          alert("Error en la transacción WFS-T:\n" + text);
        } else {
          alert("✅ Cambios guardados en " + typeName);
          recargarCapa(capaOrigen);
          cerrarVentana();
        }
      })
      .catch(err => alert("Error al guardar: " + err));
    })
    .catch(err => alert("Error al obtener DescribeFeatureType: " + err));
}





// arrastrar ventana
(function hacerVentanaMovible() {
  const ventana = document.getElementById("ventanaFactibilidad");
  const header = ventana.querySelector(".ventana-header");
  let offsetX = 0, offsetY = 0, moviendo = false;

  if (!header) return; // Si no hay header no hace nada

  header.style.cursor = "move";

  header.addEventListener("mousedown", function(e) {
    moviendo = true;
    offsetX = e.clientX - ventana.offsetLeft;
    offsetY = e.clientY - ventana.offsetTop;
    document.addEventListener("mousemove", moverVentana);
    document.addEventListener("mouseup", detenerMovimiento);
  });

  function moverVentana(e) {
    if (!moviendo) return;
    ventana.style.left = (e.clientX - offsetX) + "px";
    ventana.style.top = (e.clientY - offsetY) + "px";
  }

  function detenerMovimiento() {
    moviendo = false;
    document.removeEventListener("mousemove", moverVentana);
    document.removeEventListener("mouseup", detenerMovimiento);
  }
})();

function minimizarVentana() {
  const ventana = document.getElementById("ventanaFactibilidad");
  ventana.classList.toggle("minimizada");
}



function buscarCapaDeFeature(layers, feature) {
  let capaEncontrada = null;
  layers.forEach(layer => {
    if (layer instanceof ol.layer.Group) {
      const encontradaEnGrupo = buscarCapaDeFeature(layer.getLayers().getArray(), feature);
      if (encontradaEnGrupo) {
        capaEncontrada = encontradaEnGrupo;
      }
    } else if (layer.getSource && layer.getSource().hasFeature && layer.getSource().hasFeature(feature)) {
      capaEncontrada = layer;
    } else if (layer.getSource && layer.getSource().getFeatures) {
      const features = layer.getSource().getFeatures();
      for (let f of features) {
        if (f === feature) {
          capaEncontrada = layer;
          break;
        }
      }
    }
  });
  return capaEncontrada;
}


// Botón buscar
document.getElementById("btnBuscarFolio")
    .addEventListener("click", function () {

        let folio = document.getElementById("inputFolio").value.trim();

fetch("consultas/vpgrapds/b_vpgrapds.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ folio: folio })
})
.then(res => res.json())
.then(data => {

    if (data.success) {

        let archivo = data.ruta.replace("pdf/", "");

     document.getElementById("visorPDF").src =
    "consultas/vpgrapds/ver_pdf.php?folio=" + encodeURIComponent(folio);

        document.getElementById("modalPDF").style.display = "block";

    } else {
        alert(data.error);
    }

})
.catch(err => console.error(err));

    });


// Cerrar modal
function cerrarModalPDF() {
    document.getElementById("modalPDF").style.display = "none";
    document.getElementById("visorPDF").src = "";
}


