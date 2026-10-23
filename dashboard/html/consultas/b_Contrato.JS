// Capa y fuente para mostrar los resultados
const sourceResultado = new ol.source.Vector();
const layerResultado = new ol.layer.Vector({
    source: sourceResultado,
    style: new ol.style.Style({
        image: new ol.style.Circle({
            radius: 10,
            fill: new ol.style.Fill({ color: 'rgba(94, 191, 236, 0.4)' }),
            stroke: new ol.style.Stroke({ color: 'red', width: 2 })
        })
    })
});
map.addLayer(layerResultado);
hacerVentanaArrastrable();
// Consulta todos los clientes
function consultaClientes() {
    const url = 'https://dhcqgis.aguakan.com/geoserver/wfs?' +
        'service=WFS&version=1.0.0&request=GetFeature&' +
        'typeName=DHC_AGUAKAN:vista_pm_basex7_local&' +
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
    
   closeFloatingBox();
   sourceResultado.clear();
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
/*
// Ocultar el menú contextual al hacer clic en otro lugar
document.addEventListener('click', function () {
    document.getElementById('contextMenu').style.display = 'none';
     
closeFloatingBox();
sourceResultado.clear();

});*/
function showResult(id, contrato, cliente, coord, x, y) {

    const content = document.getElementById('searchContent');
    const box = document.getElementById('searchResult');

    content.innerHTML = `
        <div class="ventana-contenido">

            <!-- SECCIÓN 1 -->
            <div class="seccion punto-medicion">
                <table>
                    <tr><td>Saldo:</td><td><strong>$${id.toLocaleString()}</strong></td></tr>
                    <tr><td>Contrato:</td><td>${contrato}</td></tr>
                    <tr><td>Cliente:</td><td>${cliente}</td></tr>
                    <tr><td>X:</td><td>${x.toLocaleString()}</td></tr>
                    <tr><td>Y:</td><td>${y.toLocaleString()}</td></tr>
                </table>
            </div>

            <!-- SECCIÓN 2 -->
            <div class="seccion tabla-historial" id="tablaHistorial">
                Cargando historial...
            </div>

            <!-- SECCIÓN 3 -->
            <div class="seccion grafica">
                <canvas id="graficaConsumo"></canvas>
            </div>

        </div>
    `;

    const pixel = map.getPixelFromCoordinate(coord);
    box.style.left = (pixel[0] + 10) + 'px';
    box.style.top = (pixel[1] - 10) + 'px';
    box.style.display = 'block';
}

// Función para cerrar la ventana
function closeFloatingBox() {
    const box = document.getElementById('searchResult');
    box.style.display = 'none';
}

// Buscar por campo "cliente"
function buscarPorCliente(cliente) {
    const urlCliente = 'https://dhcqgis.aguakan.com/geoserver/wfs?' +
        'service=WFS&version=1.0.0&request=GetFeature&' +
        'typeName=DHC_AGUAKAN:vista_pm_basex7_local&' +
        'outputFormat=application/json&srsname=EPSG:3857' +
        `&CQL_FILTER=cliente='${cliente}'`;

    fetch(urlCliente)
        .then(response => response.json())
        .then(data => {
            const format = new ol.format.GeoJSON();
            const features = format.readFeatures(data, {
                featureProjection: 'EPSG:3857'
            });
           
       if (features.length > 0) {
    const feature = features[0];
    const id = feature.get('saldo');
    const contrato = feature.get('contrato');
    const clienteNum = feature.get('cliente');
    const geom = feature.getGeometry().getCoordinates();
    const coord = geom;
    const utmCoord = ol.proj.transform(coord, 'EPSG:3857', 'EPSG:32616');
    const X = utmCoord[0];
    const Y = utmCoord[1];

    sourceResultado.clear();
    sourceResultado.addFeature(feature);

    // Mueve el mapa primero
    map.getView().setCenter(coord);
    map.getView().setZoom(18);

    // Espera a que termine el movimiento antes de mostrar el cuadro
    map.once('moveend', () => {
        showResult(id, contrato, clienteNum, coord, X, Y);
    });

    // Luego consulta el historial
    consultaHistorial(clienteNum);
}

        })
        .catch(error => console.error("Error en buscarPorCliente:", error));
}

// Consulta historial de consumo
function consultaHistorial(clienteNum) {
    const urlHistorial = 'https://dhcqgis.aguakan.com/geoserver/wfs?' +
        'service=WFS&version=1.0.0&request=GetFeature&' +
        'typeName=DHC_AGUAKAN:ETL_consumo_historico_X7&' +
        'outputFormat=application/json' +
        `&CQL_FILTER=idtclt='${clienteNum}'`;

 fetch(urlHistorial) 
    .then(response => response.json())
    .then(data => {
        let features = data.features;
        if (features.length === 0) return;

        features.sort((a, b) => {
            const fechaA = new Date(a.properties.datclc);
            const fechaB = new Date(b.properties.datclc);
            return fechaA - fechaB; // ascendente
        });

        // Extraer fechas y consumos
        const labels = [];
const consumos = [];
let tablaHTML = `
    <table border="1" style="margin-top:5px;width:50%;text-align:center;font-size:12px">
        <tr><th style="width:50px">Fecha</th><th>Consumo (m³)</th></tr>`;

features.forEach(f => {
    const fechaOriginal = f.properties.datclc || "N/A";
    const fechaFormateada = (fechaOriginal !== "N/A") ? fechaOriginal.slice(0, 7) : "N/A"; // YYYY-MM
    const consumo = f.properties.cns || 0;

    labels.push(fechaFormateada);
    consumos.push(consumo);

    tablaHTML += `<tr><td>${fechaFormateada}</td><td style="width:50px">${consumo}</td></tr>`;
});

    tablaHTML += `</table>`;

    document.getElementById("tablaHistorial").innerHTML = tablaHTML;

    
    new Chart(document.getElementById("graficaConsumo"), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: "Consumo (m³)",
                data: consumos,
                borderColor: "#2b5876",
                backgroundColor: "rgba(43,88,118,0.2)",
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true }
            },
            scales: {
                x: { title: { display: true, text: "Mes Facturado" }},
                y: { title: { display: true, text: "m³" }}
            }
        }
    });

})
.catch(error => console.error("Error en consultaHistorial:", error));
}
//ventana arrastrable
function hacerVentanaArrastrable() {
    const box = document.getElementById("searchResult");
    const header = document.getElementById("dragHeader");

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    header.addEventListener("mousedown", function(e) {
        isDragging = true;
        offsetX = e.clientX - box.offsetLeft;
        offsetY = e.clientY - box.offsetTop;
        document.addEventListener("mousemove", mover);
        document.addEventListener("mouseup", detener);
    });

    function mover(e) {
        if (!isDragging) return;
        box.style.left = (e.clientX - offsetX) + "px";
        box.style.top = (e.clientY - offsetY) + "px";
    }

    function detener() {
        isDragging = false;
        document.removeEventListener("mousemove", mover);
        document.removeEventListener("mouseup", detener);
    }
}
header.addEventListener("mousedown", function(e) {
    e.stopPropagation(); // evita que el mapa capture el evento
});

