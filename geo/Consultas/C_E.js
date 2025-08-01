
    const jsonSource = new ol.source.Vector();
    const capaConduccion = new ol.layer.Vector({
        source: jsonSource,
        style: new ol.style.Style({ 
            stroke: new ol.style.Stroke({ color: 'blue', width: 2 }) })
    });



    const puntosSource = new ol.source.Vector();
    const capaPuntos = new ol.layer.Vector({
        source: puntosSource,
        style: new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({ color: 'red' }),
                stroke: new ol.style.Stroke({ color: 'white', width: 1 })
            })
        })
    });



    const tuberiasASSource = new ol.source.Vector();
    const capaTuberiasAS = new ol.layer.Vector({
        source: tuberiasASSource,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({ color: 'green', width: 2 })
        })
    });

// Agregar la capa al mapa

map.addLayer(capaPuntos);



  let drawInteraction = null;
    const drawSource = new ol.source.Vector();
    const drawLayer = new ol.layer.Vector({ source: drawSource });
    map.addLayer(drawLayer);

    

    function activarConsultaEspacial() {
        if (drawInteraction) {
            map.removeInteraction(drawInteraction);
            drawInteraction = null;
            alert("Modo dibujo desactivado.");
            return;
        }

        drawInteraction = new ol.interaction.Draw({ source: drawSource, type: 'Polygon' });
        map.addInteraction(drawInteraction);
        alert("Dibuja un polígono. Haz clic derecho para cerrar y consultar.");

        drawInteraction.on('drawstart', () => drawSource.clear());

        drawInteraction.on('drawend', (event) => {
            const geometry = event.feature.getGeometry().clone().transform('EPSG:3857', 'EPSG:32616');
            consultarEspacial(geometry);

            map.getView().fit(event.feature.getGeometry().getExtent(), { duration: 1000, padding: [20, 20, 20, 20] });

        });

     
   
    }


    // capas de consultas
    
function consultarEspacial(geometry) {
    const wkt = new ol.format.WKT().writeGeometry(geometry);
    const cql = `INTERSECTS(geom, ${wkt})`;

    const peticiones = [];

    if (capaConduccion.getVisible()) {
        const urlTuberias = "https://dhcqgis.aguakan.com/geoserver/wfs?" +
            "service=WFS&version=1.0.0&request=GetFeature" +
            "&typeName=DHC_AGUAKAN:AEP_CANA_AP" +
            "&outputFormat=application/json" +
            "&srsname=EPSG:32616" +
            "&CQL_FILTER=" + encodeURIComponent(cql);
        peticiones.push(fetch(urlTuberias).then(res => res.json()));
    } else {
        peticiones.push(Promise.resolve(null));
    }

    if (capaPuntos.getVisible()) {
        const urlPuntos = "https://dhcqgis.aguakan.com/geoserver/wfs?" +
            "service=WFS&version=1.0.0&request=GetFeature" +
            "&typeName=DHC_AGUAKAN:Puntos_de_medicion" +
            "&outputFormat=application/json" +
            "&srsname=EPSG:3857" +
            "&CQL_FILTER=" + encodeURIComponent(cql);
        peticiones.push(fetch(urlPuntos).then(res => res.json()));
    } else {
        peticiones.push(Promise.resolve(null));
    }

    if (capaTuberiasAS.getVisible()) {
        const urlTuberiasAS = "https://dhcqgis.aguakan.com/geoserver/wfs?" +
            "service=WFS&version=1.0.0&request=GetFeature" +
            "&typeName=	DHC_AGUAKAN:Ass_cana" +
            "&outputFormat=application/json" +
            "&srsname=EPSG:32616" +
            "&CQL_FILTER=" + encodeURIComponent(cql);
        peticiones.push(fetch(urlTuberiasAS).then(res => res.json()));
    } else {
        peticiones.push(Promise.resolve(null));
    }

    Promise.all(peticiones).then(([geojsonTuberias, geojsonPuntos, geojsonTuberiasAS]) => {
        const format = new ol.format.GeoJSON();

        if (geojsonPuntos) {
            const puntoFeatures = format.readFeatures(geojsonPuntos, { featureProjection: 'EPSG:3857' });
            puntosSource.clear();
            puntosSource.addFeatures(puntoFeatures);
        }

        if (geojsonTuberiasAS) {
            const asFeatures = format.readFeatures(geojsonTuberiasAS, {
                dataProjection: 'EPSG:32616',
                featureProjection: 'EPSG:3857'
            });
            tuberiasASSource.clear();
            tuberiasASSource.addFeatures(asFeatures);
        }

        mostrarResultados(geojsonTuberias, geojsonTuberiasAS, geojsonPuntos ? geojsonPuntos.features.length : 0);
    }).catch(err => {
        console.error("Error en consulta espacial:", err);
        alert("Error al consultar:\n" + err.message);
    });
}


 // Mostrar datos de la consulta


function mostrarResultados(geojson, geojsonAS, totalPuntos) {
    let html = '';

    function procesarTuberias(label, data, campoDiam, campoLong, campoTipo) {
        if (!data || data.features.length === 0) return '';

        const features = data.features;
        let matriz = {}, diametrosSet = new Set(), tiposSet = new Set(), totalesPorDiametro = {};

        features.forEach(f => {
            let props = f.properties;
            let d = String(props[campoDiam] || 'Desconocido');
            let t = String(props[campoTipo] || 'Desconocido');
            let l = parseFloat(props[campoLong]) || 0;

            if (!matriz[t]) matriz[t] = {};
            if (!matriz[t][d]) matriz[t][d] = 0;
            matriz[t][d] += l;

            if (!totalesPorDiametro[d]) totalesPorDiametro[d] = 0;
            totalesPorDiametro[d] += l;

            diametrosSet.add(d);
            tiposSet.add(t);
        });

        const diametros = Array.from(diametrosSet).sort();
        const tipos = Array.from(tiposSet).sort();

        let section = `<h4>${label} - Longitud por Tipo y Diámetro</h4><table border="1"><tr><th>Tipo \\ Diámetro</th>${diametros.map(d => `<th>${d}</th>`).join('')}</tr>`;
        tipos.forEach(t => {
            section += `<tr><td>${t}</td>`;
            diametros.forEach(d => {
                section += `<td>${(matriz[t][d] || 0).toFixed(2)}</td>`;
            });
            section += `</tr>`;
        });
        section += `<tr><td><strong>Total</strong></td>${diametros.map(d => `<td><strong>${(totalesPorDiametro[d] || 0).toFixed(2)}</strong></td>`).join('')}</tr></table>`;

        return section;
    }

    if (geojson && geojson.features.length > 0) {
        html += procesarTuberias("Tuberías AP", geojson, "DIAMETRE", "Longitud", "Tipo_de_Re");
    }

    if (geojsonAS && geojsonAS.features.length > 0) {
        html += procesarTuberias("Tuberías AS", geojsonAS, "diametre", "Longitud", "type_res");
    }

    if (totalPuntos > 0) {
        html += `<h4>Total de puntos de medición encontrados: ${totalPuntos}</h4>`;
    }

    if (!html) {
        html = "<p>No se encontraron resultados en ninguna capa.</p>";
    }

    document.getElementById('contenido_estadisticas').innerHTML = html;
    document.getElementById('estadisticas_popup').style.display = 'block';

    drawSource.clear();
    if (drawInteraction) {
        map.removeInteraction(drawInteraction);
        drawInteraction = null;
    }

    // Limpieza si aplica
   // puntosSource.clear();
  // jsonSource.clear();
  //  tuberiasASSource.clear();
}


document.getElementById('btnCerrarEstadisticas').addEventListener('click', function () {
    // Ocultar ventana
    document.getElementById('estadisticas_popup').style.display = 'none';

    // Limpiar polígono de selección
    drawSource.clear();

   
    if (drawInteraction) {
        map.removeInteraction(drawInteraction);
        drawInteraction = null;
    }

    // Limpiar puntos y tuberías mostradas
    puntosSource.clear();
    jsonSource.clear();
    tuberiasASSource.clear();

    // Restablecer la vista del mapa
    map.getView().setCenter(centroInicial);
    map.getView().setZoom(zoomInicial);
});

    let estadisticasMinimizadas = false;

document.getElementById('btnMinimizarEstadisticas').addEventListener('click', function () {
    const popup = document.getElementById('estadisticas_popup');
    const contenido = document.getElementById('contenido_estadisticas');

    estadisticasMinimizadas = !estadisticasMinimizadas;

    if (estadisticasMinimizadas) {
        popup.classList.add('minimizado');
    } else {
        popup.classList.remove('minimizado');
    }
});

const popup = document.getElementById("estadisticas_popup");
const header = document.getElementById("popup_header");

let isDragging = false, offsetX, offsetY;

header.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - popup.offsetLeft;
    offsetY = e.clientY - popup.offsetTop;
    document.body.style.userSelect = "none";
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        popup.style.left = (e.clientX - offsetX) + "px";
        popup.style.top = (e.clientY - offsetY) + "px";
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    document.body.style.userSelect = "auto";
});



//descarga

document.getElementById('btnDescargarPuntos').addEventListener('click', () => {
    const format = new ol.format.GeoJSON();
    const features = puntosSource.getFeatures();

    if (features.length === 0) {
        alert("No hay puntos para descargar.");
        return;
    }

    const geojson = format.writeFeatures(features, {
        dataProjection: 'EPSG:4326',
        featureProjection: map.getView().getProjection()
    });

    const blob = new Blob([geojson], { type: 'application/vnd.geo+json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'puntos_consulta.geojson';
    a.click();

    URL.revokeObjectURL(url);
});


   window.activarConsultaEspacial = activarConsultaEspacial;