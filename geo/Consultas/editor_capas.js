// Guardamos el tipo de geometría real de cada capa
    const geometriaReal = {};

    // Función que obtiene el tipo de geometría desde GeoServer DescribeFeatureType
    async function obtenerTipoGeometria(nombreCapa) {
      if (geometriaReal[nombreCapa]) return geometriaReal[nombreCapa];
      try {
        const url = `https://dhcqgis.aguakan.com/geoserver/wfs?service=WFS&version=1.1.0&request=DescribeFeatureType&typeName=DHC_AGUAKAN:${nombreCapa}`;
        const response = await fetch(url);
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");
        const geomElement = Array.from(xml.getElementsByTagName("xsd:element"))
          .find(el => el.getAttribute("type")?.includes("gml"));
        if (geomElement) {
          geometriaReal[nombreCapa] = geomElement.getAttribute("type").split(":").pop();
          return geometriaReal[nombreCapa];
        }
      } catch (err) {
        console.error("Error obteniendo DescribeFeatureType:", err);
      }
      return "Polygon"; // valor por defecto
    }

    // ========= CREAR CAPAS =========
    function crearCapa(nombre) {
      return new ol.layer.Vector({
        source: new ol.source.Vector({
          format: new ol.format.GeoJSON(),
          url: `https://dhcqgis.aguakan.com/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:${nombre}&outputFormat=application/json&srsname=EPSG:3857`
        }),
        style: new ol.style.Style({
          stroke: new ol.style.Stroke({ color: 'blue', width: 2 }),
          fill: new ol.style.Fill({ color: 'rgba(0, 0, 255, 0.1)' }),
          image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({ color: 'rgba(0, 0, 255, 0.6)' }),
            stroke: new ol.style.Stroke({ color: 'blue', width: 2 })
          })
        })
      });
    }

    const capasEditables = {
      'Fact_Desarrollo': crearCapa('Fact_Desarrollo'),
      'Red_AP': crearCapa('Red_AP'),
      'Red_DS': crearCapa('Red_DS'),
      'Pozos_Visita': crearCapa('Pozos_Visita'),
      'Valvula': crearCapa('Valvula'),
      'Caja_Val_AP': crearCapa('Caja_Val_AP')
    };

    const map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({ source: new ol.source.OSM() }),
        capasEditables['Fact_Desarrollo']
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([-86.848, 20.98]), // Cancún aprox
        zoom: 12
      })
    });

    let capaActiva = capasEditables['Fact_Desarrollo'];
    let draw;

    // ========= GPS =========
    const gpsSource = new ol.source.Vector();
    const gpsLayer = new ol.layer.Vector({ source: gpsSource });
    map.addLayer(gpsLayer);

    const gpsFeature = new ol.Feature();
    gpsSource.addFeature(gpsFeature);

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

    let toggle = true;
    setInterval(() => {
      gpsFeature.setStyle(toggle ? gpsStyle1 : gpsStyle2);
      toggle = !toggle;
    }, 600);

    const geolocation = new ol.Geolocation({
      tracking: true,
      projection: map.getView().getProjection()
    });

    geolocation.on('change:position', () => {
      const coords = geolocation.getPosition();
      if (coords) gpsFeature.setGeometry(new ol.geom.Point(coords));
    });

    document.getElementById('btn_gps').onclick = () => {
      const coords = geolocation.getPosition();
      if (coords) map.getView().animate({ center: coords, zoom: 17, duration: 1000 });
    };

    // ========= INTERACCIONES =========
    const select = new ol.interaction.Select();
    const modify = new ol.interaction.Modify({ features: select.getFeatures() });
    map.addInteraction(select);
    map.addInteraction(modify);

    async function actualizarInteraccionDibujo(nombreCapa) {
      if (draw) map.removeInteraction(draw);
      const tipo = await obtenerTipoGeometria(nombreCapa);
      let tipoDraw = "Polygon";
      if (tipo.includes("Line")) tipoDraw = "LineString";
      if (tipo.includes("Point")) tipoDraw = "Point";

      draw = new ol.interaction.Draw({ source: capaActiva.getSource(), type: tipoDraw });
      draw.setActive(false);
      map.addInteraction(draw);

      draw.on('drawend', (ev) => {
        const newFeature = ev.feature;
        newFeature.set('Nombre', prompt("Nombre del nuevo elemento:") || '');
        if (tipoDraw === 'Point' && geolocation.getPosition()) {
          const [x, y] = ol.proj.transform(geolocation.getPosition(), 'EPSG:3857', 'EPSG:4326');
          newFeature.set('Lat', y);
          newFeature.set('Lon', x);
        }
        draw.setActive(false);
      });
    }

    // Inicializar con la primera capa
    actualizarInteraccionDibujo('Fact_Desarrollo');

    // ========= VISIBILIDAD DE CAPAS =========
    document.querySelectorAll('.chkLayer').forEach(chk => {
      chk.addEventListener('change', () => {
        const capa = capasEditables[chk.value];
        if (chk.checked) {
          if (!map.getLayers().getArray().includes(capa)) {
            map.addLayer(capa);
          }
        } else {
          map.removeLayer(capa);
        }
      });
    });

    // ========= CAMBIO DE CAPA ACTIVA =========
    document.getElementById('layerEditor').onchange = async (e) => {
      const nombre = e.target.value;
      capaActiva = capasEditables[nombre];
      await actualizarInteraccionDibujo(nombre);
    };

    // ========= FORMULARIO =========
    function mostrarFormularioDeAtributos(feature) {
      const props = feature.getProperties();
      const editor = document.getElementById('editor');
      editor.innerHTML = `<h4>Editar atributos</h4>`;
      Object.keys(props).forEach(key => {
        if (key === 'geometry' || key === 'geom') return;
        editor.innerHTML += `<label>${key}:<br><input id="input_${key}" value="${props[key] || ''}"></label><br>`;
      });
      editor.innerHTML += `
        <br>
        <button id="btn_guardar">Guardar</button>
        <button id="btn_cancelar">Cancelar</button>
        <button id="btn_eliminar">Eliminar</button>
      `;
      editor.style.display = 'block';

      document.getElementById('btn_guardar').onclick = () => {
        Object.keys(props).forEach(key => {
          if (key !== 'geometry' && key !== 'geom') {
            const input = document.getElementById(`input_${key}`);
            if (input) feature.set(key, input.value);
          }
        });
        enviarWFST([], [feature], []);
        editor.style.display = 'none';
        select.getFeatures().clear();
      };

      document.getElementById('btn_cancelar').onclick = () => {
        editor.style.display = 'none';
        select.getFeatures().clear();
      };

      document.getElementById('btn_eliminar').onclick = () => {
        capaActiva.getSource().removeFeature(feature);
        enviarWFST([], [], [feature]);
        editor.style.display = 'none';
      };
    }

    select.on('select', (e) => {
      const feature = e.selected[0];
      if (feature) mostrarFormularioDeAtributos(feature);
      else document.getElementById('editor').style.display = 'none';
    });

    document.getElementById('btn_nuevo').onclick = () => draw.setActive(true);

    document.getElementById('btn_guardar_nuevos').onclick = () => {
      const nuevas = capaActiva.getSource().getFeatures().filter(f => !f.getId());
      if (nuevas.length === 0) return alert('No hay nuevas geometrías por guardar.');
      enviarWFST(nuevas, [], []);
    };

    // ========= CONVERSIÓN AUTOMÁTICA =========
    async function normalizarGeometria(feature, nombreCapa) {
      const tipo = await obtenerTipoGeometria(nombreCapa);
      const geom = feature.getGeometry();

      if (tipo === "MultiPolygon" && geom instanceof ol.geom.Polygon) {
        feature.setGeometry(new ol.geom.MultiPolygon([geom.getCoordinates()]));
      }
      if (tipo === "MultiLineString" && geom instanceof ol.geom.LineString) {
        feature.setGeometry(new ol.geom.MultiLineString([geom.getCoordinates()]));
      }
      if (tipo === "MultiPoint" && geom instanceof ol.geom.Point) {
        feature.setGeometry(new ol.geom.MultiPoint([geom.getCoordinates()]));
      }
    }

    // ========= WFS-T =========
    async function enviarWFST(inserts = [], updates = [], deletes = []) {
      const layerName = document.getElementById('layerEditor').value;
      for (const f of [...inserts, ...updates]) {
        f.setGeometryName('geom');
        await normalizarGeometria(f, layerName);
      }

      const formatWFS = new ol.format.WFS();
      const node = formatWFS.writeTransaction(inserts, updates, deletes, {
        featureNS: 'AGK_DHC',
        featurePrefix: 'DHC_AGUAKAN',
        featureType: layerName,
        srsName: 'EPSG:3857',
        geometryName: 'geom'
      });

      const xml = new XMLSerializer().serializeToString(node);
      console.log(xml);
fetch('/geo/Consultas/proxy_wfs.php', {  // usa aquí la ruta correcta a tu proxy
  method: 'POST',
  headers: {
    'Content-Type': 'text/xml'
    // no envíes Authorization, porque tu proxy ya lo añade en PHP
  },
  body: xml
})
.then(response => {
  if (!response.ok) throw new Error('Error WFS-T: ' + response.statusText);
  return response.text();
})
.then(() => {
  alert('✅ Cambios guardados en ' + layerName);
  capaActiva.getSource().clear();
  capaActiva.getSource().refresh();
})
.catch(error => {
  console.error('❌ Error al guardar:', error);
  alert('Error en la transacción WFS-T');
});


    }