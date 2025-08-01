// Capa y fuente para mostrar los resultados
const sourceResultado = new ol.source.Vector();
const layerResultado = new ol.layer.Vector({
    source: sourceResultado,
    style: new ol.style.Style({
        image: new ol.style.Circle({
            radius: 10,
            fill: new ol.style.Fill({ color: 'rgba(255, 0, 0, 0.4)' }),
            stroke: new ol.style.Stroke({ color: 'red', width: 2 })
        })
    })
});
map.addLayer(layerResultado);

// Consulta todos los clientes
function consultaClientes() {
    const url = 'https://dhcqgis.aguakan.com/geoserver/wfs?' +
        'service=WFS&version=1.0.0&request=GetFeature&' +
        'typeName=DHC_AGUAKAN:vista_x7_aep&' +
        'outputFormat=application/json&srsname=EPSG:3857';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const format = new ol.format.GeoJSON();
            const features = format.readFeatures(data, {
                featureProjection: 'EPSG:3857'
            });

            sourceResultado.clear();
            sourceResultado.addFeatures(features); // Agregar los puntos al mapa

            contarPuntos(features);
        })
        .catch(error => console.error("Error en consultaClientes:", error));
}

// Contar puntos con el campo 'cliente'
function contarPuntos(features) {
    let contador = 0;
    features.forEach(f => {
        if (f.get('cliente')) contador++;
    });
    const divConteo = document.getElementById('conteo');
    if (divConteo) divConteo.innerHTML = `Cantidad de clientes: ${contador}`;
}

// Menú contextual clic derecho
map.on('contextmenu', function (event) {
    event.preventDefault();
    const contextMenu = document.getElementById('contextMenu');
    contextMenu.style.left = event.originalEvent.pageX + 'px';
    contextMenu.style.top = event.originalEvent.pageY + 'px';
    contextMenu.style.display = 'block';

    document.getElementById('searchById').onclick = function () {
        const cliente = prompt("Introduce el número del Cliente:");
        if (cliente) {
            buscarPorCliente(cliente);
        }
        contextMenu.style.display = 'none';
    };
});

// Ocultar el menú contextual al hacer clic en otro lugar
document.addEventListener('click', function () {
    document.getElementById('contextMenu').style.display = 'none';
});

// Mostrar resultado flotante
function showResult(id, contrato, cliente, coord, x, y) {
    const content = document.getElementById('searchContent');
    const box = document.getElementById('searchResult');

    if (id && contrato && cliente) {
        content.innerHTML = `
        <table border="1">
            <tr><th colspan="2">Punto de Medición</th></tr>
            <tr><td>ID:</td><td>${id}</td></tr>
            <tr><td>Contrato:</td><td>${contrato}</td></tr>
            <tr><td>Cliente:</td><td>${cliente}</td></tr>
            <tr><td>X:</td><td>${x.toLocaleString()}</td></tr>
            <tr><td>Y:</td><td>${y.toLocaleString()}</td></tr>
        </table>`;
    } else {
        content.innerHTML = 'No se encontraron resultados.';
    }

    const pixel = map.getPixelFromCoordinate(coord);
    const mapElement = map.getTargetElement();
    const mapRect = mapElement.getBoundingClientRect();
    const absoluteLeft = mapRect.left + pixel[0] + window.scrollX;
    const absoluteTop = mapRect.top + pixel[1] + window.scrollY;

    box.style.left = absoluteLeft + 'px';
    box.style.top = (absoluteTop - 10) + 'px';
    box.style.position = 'absolute';
    box.style.display = 'block';
}

// Cierra el cuadro flotante
function closeFloatingBox() {
    document.getElementById('searchResult').style.display = 'none';
}

// Buscar por campo "cliente"
function buscarPorCliente(cliente) {
    const url = 'https://dhcqgis.aguakan.com/geoserver/wfs?' +
        'service=WFS&version=1.0.0&request=GetFeature&' +
        'typeName=DHC_AGUAKAN:vista_x7_aep&' +
        'outputFormat=application/json&srsname=EPSG:3857' +
        `&CQL_FILTER=cliente='${cliente}'`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const format = new ol.format.GeoJSON();
            const features = format.readFeatures(data, {
               // dataProjection: 'EPSG:3857',
                featureProjection: 'EPSG:3857'
            });

            if (features.length > 0) {
                const feature = features[0];
                
                const id = feature.get('cliente');
                const contrato = feature.get('contrato');
                const cliente = feature.get('cliente');
                const geom = feature.getGeometry().getCoordinates();
                const coord = geom; // EPSG:3857
                const utmCoord = ol.proj.transform(coord, 'EPSG:3857', 'EPSG:32616');
                const X = utmCoord[0];
                const Y = utmCoord[1];



                sourceResultado.clear();
                sourceResultado.addFeature(feature);

                map.getView().setCenter(coord);
                map.getView().setZoom(18);

                showResult(id, contrato, cliente, coord, X, Y);
            }
        })
        .catch(error => console.error("Error en buscarPorCliente:", error));
}

// Ocultar resultado al hacer clic en el mapa
map.on('click', function () {
    sourceResultado.clear();
    closeFloatingBox();
});


