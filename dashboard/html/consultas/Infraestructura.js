async function cargarSugerenciasNombre() {
  const capas = [
    "DHC_AGUAKAN:Carcamos_BJ",
    "DHC_AGUAKAN:Tanques_BJ",
    "DHC_AGUAKAN:Ptar",
    "DHC_AGUAKAN:Carcamos_SOL",
    "DHC_AGUAKAN:Tanques_SOL",
    "DHC_AGUAKAN:Ptar_SOL",
    "DHC_AGUAKAN:Ptar_IM",
    "DHC_AGUAKAN:Carcamos_IM",
    "DHC_AGUAKAN:Tanques_IM",
    "DHC_AGUAKAN:Ptar_PM",
    "DHC_AGUAKAN:Carcamo_PM",
    "DHC_AGUAKAN:Tanques_PM"

  ];

  const srs = "EPSG:3857";
  const filtro = "Estatus='Existente'";
  const nombres = new Set();

  const peticiones = capas.map(capa => {
    const url = `https://dhcqgis.aguakan.com/geoserver/wfs?` +
      `service=WFS&version=1.0.0&request=GetFeature&typeName=${capa}` +
      `&outputFormat=application/json&srsname=${srs}&CQL_FILTER=${encodeURIComponent(filtro)}`;
    return fetch(url).then(res => res.json());
  });

  try {
    const respuestas = await Promise.all(peticiones);

    respuestas.forEach(data => {
      data.features.forEach(f => {
        const nombre = f.properties.Nombre;
        if (nombre && nombre.trim() !== "") {
          nombres.add(nombre.trim());
        }
      });
    });

    const datalist = document.getElementById("sugerencias-nombre");
    datalist.innerHTML = "";

    Array.from(nombres).sort().forEach(nombre => {
      const option = document.createElement("option");
      option.value = nombre;
      datalist.appendChild(option);
    });

   
  } catch (err) {
    console.error("❌ Error cargando nombres:", err);
  }
}


document.getElementById("Infraestructura").addEventListener("click", () => {
  const formulario = document.getElementById("formulario-infraestructura");
  formulario.style.display = "block";
  formulario.style.left = "100px"; 
  formulario.style.top = "100px";
  cargarSugerenciasNombre();
});



window.capaResultadosInfra = new ol.layer.Vector({
  source: new ol.source.Vector(),
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'red',
      width: 2
    }),
    fill: new ol.style.Fill({
      color: 'rgba(219, 241, 118, 0.2)'
    }),
    image: new ol.style.Circle({
      radius: 6,
      fill: new ol.style.Fill({ color: 'red' }),
      stroke: new ol.style.Stroke({ color: 'white', width: 1 })
    })
  })
});

map.addLayer(capaResultadosInfra);


function consultarInfraestructura() {
  const nombre = document.getElementById("busqueda-nombre").value.trim();
  if (!nombre) return alert("Seleccione un nombre válido");

  const capas = [
    "DHC_AGUAKAN:Carcamos_BJ",
    "DHC_AGUAKAN:Tanques_BJ",
    "DHC_AGUAKAN:Ptar",
    "DHC_AGUAKAN:Carcamos_SOL",
    "DHC_AGUAKAN:Tanques_SOL",
    "DHC_AGUAKAN:Ptar_SOL",
    "DHC_AGUAKAN:Carcamos_IM",
    "DHC_AGUAKAN:Tanques_IM",
    "DHC_AGUAKAN:Ptar_IM",
    "DHC_AGUAKAN:Carcamo_PM",
    "DHC_AGUAKAN:Tanques_PM",
    "DHC_AGUAKAN:Ptar_PM"
  ];

  const promesas = capas.map(capa => {
    const filtro = `Nombre ILIKE '%${nombre}%'`;
const url = `https://dhcqgis.aguakan.com/geoserver/wfs?` +
    `service=WFS&version=1.0.0&request=GetFeature&typeName=${capa}` +
    `&outputFormat=application/json&CQL_FILTER=${encodeURIComponent(filtro)}`;


return fetch(url).then(async res => {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("❌ Respuesta no es JSON:", text);
    throw new Error("Respuesta no válida del servidor WFS");
  }
});


    
  });

  Promise.all(promesas).then(respuestas => {
    const todasFeatures = respuestas.flatMap(resp => resp.features);

    if (todasFeatures.length === 0) {
      alert("No se encontraron resultados");
      return;
    }

    // Limpiar capa anterior
    capaResultadosInfra.getSource().clear();

    // Leer features con proyección correcta
    const formato = new ol.format.GeoJSON({
      dataProjection: 'EPSG:32616',
      featureProjection: 'EPSG:3857'
    });

    const features = formato.readFeatures({
      type: "FeatureCollection",
      features: todasFeatures
    });

    // Crear estilo con nombre como etiqueta
const estiloConNombre = (feature) => {
  return new ol.style.Style({
    stroke: new ol.style.Stroke({ color: 'red', width: 2 }),
    fill: new ol.style.Fill({ color: 'rgba(255, 0, 0, 0.2)' }),
    image: new ol.style.Circle({
      radius: 6,
      fill: new ol.style.Fill({ color: 'red' }),
      stroke: new ol.style.Stroke({ color: 'white', width: 1 })
    }),
    text: new ol.style.Text({
      text: feature.get("Nombre") || "", 
      font: "14px Calibri,sans-serif",
      fill: new ol.style.Fill({ color: "#000" }),
      stroke: new ol.style.Stroke({ color: "#fff", width: 3 }),
      overflow: true,
      offsetY: -15 
    })
  });
};

// Asignar estilo individual con nombre
features.forEach(f => f.setStyle(estiloConNombre(f)));

// Añadir al mapa
capaResultadosInfra.getSource().addFeatures(features);


    // Zoom al resultado
    const featuresEncontradas = capaResultadosInfra.getSource().getFeatures();

if (featuresEncontradas.length === 1) {
  const geometry = featuresEncontradas[0].getGeometry();
  const centro = geometry.getType() === "Point"
    ? geometry.getCoordinates()
    : ol.extent.getCenter(geometry.getExtent());

  map.getView().animate({
    center: centro,
    zoom: 18,         
    duration: 1000
  });

} else if (featuresEncontradas.length > 1) {
  
  const extent = capaResultadosInfra.getSource().getExtent();
  if (extent && !ol.extent.isEmpty(extent)) {
    map.getView().fit(extent, { duration: 1000, padding: [50, 50, 50, 50] });
  }
}


    
  }).catch(error => {
    console.error("❌ Error al consultar infraestructura:", error);
  });
}


(function () {
  const Infventana = document.getElementById("formulario-infraestructura");
  const InfventanaHeader = Infventana.querySelector(".ventana-header");

  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  InfventanaHeader.style.cursor = "move";

  InfventanaHeader.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - Infventana.offsetLeft;
    offsetY = e.clientY - Infventana.offsetTop;
    document.addEventListener("mousemove", moverInfventana);
    document.addEventListener("mouseup", detenerMovimientoInfventana);
  });

  function moverInfventana(e) {
    if (isDragging) {
      Infventana.style.left = (e.clientX - offsetX) + "px";
      Infventana.style.top = (e.clientY - offsetY) + "px";
    }
  }

  function detenerMovimientoInfventana() {
    isDragging = false;
    document.removeEventListener("mousemove", moverInfventana);
    document.removeEventListener("mouseup", detenerMovimientoInfventana);
  }
})();

  function cerrarVentanaInfra() {
    const ventana = document.getElementById("formulario-infraestructura");
    const input = document.getElementById("busqueda-nombre");
    const datalist = document.getElementById("sugerencias-nombre");

    ventana.style.display = "none";    
    input.value = "";                  
    datalist.innerHTML = "";          

    
    limpiarResultadosMapa();          
    limpiarTablaResultados();         
  }

 function limpiarResultadosMapa() {
 
  if (window.capaResultadosInfra) {
    
    map.removeLayer(window.capaResultadosInfra);
  
    window.capaResultadosInfra = new ol.layer.Vector({
      source: new ol.source.Vector(),
      style: new ol.style.Style({
        stroke: new ol.style.Stroke({ color: 'red', width: 2 }),
        fill: new ol.style.Fill({ color: 'rgba(255, 0, 0, 0.2)' }),
        image: new ol.style.Circle({
          radius: 6,
          fill: new ol.style.Fill({ color: 'red' }),
          stroke: new ol.style.Stroke({ color: 'white', width: 1 })
        })
      })
    });

    map.addLayer(window.capaResultadosInfra);
  } else {
    console.warn("⚠️ capaResultadosInfra no está definida");
  }
}

 function limpiarTablaResultados() {
    const tabla = document.getElementById("tabla-resultados");
    if (tabla) tabla.innerHTML = ""; 
  }












