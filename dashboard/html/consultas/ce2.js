async function consultarEspacialPostgres(geometry) {
    const wkt = new ol.format.WKT().writeGeometry(geometry);

    try {
        const res = await fetch('./consultas/consulta_espacial.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ wkt })
        });

        if (!res.ok) throw new Error(`Error en PHP: ${res.statusText}`);
        const data = await res.json();

        const format = new ol.format.GeoJSON();

        

        // Mostrar resultados en popup independiente
   mostrarResultadosEspacial(
  data.geojsonAP,
  data.geojsonAS,
  data.conteo_puntos,
  data.grafica_puntos 
);


    } catch (err) {
        console.error("Error en consulta espacial Postgres:", err);
        alert("Error al consultar en Postgres: " + err.message);
    }
}


function mostrarResultadosEspacial(geojsonAP, geojsonAS, totalPuntos, graficaPuntos) {
    const div = document.getElementById('contenidoPopupResultadosEspacial');
    if (!div) return;

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

        let section = `<h4>${label}</h4>
            <table border="1" style="width:100%; border-collapse:collapse;">
                <tr><th>Tipo \\ Diámetro</th>${diametros.map(d => `<th>${d}</th>`).join('')}</tr>`;

   //     tipos.forEach(t => {
        //    section += `<tr><td>${t}</td>`;
          //  diametros.forEach(d => {
        //        section += `<td>${(matriz[t][d] || 0).toFixed(2)}</td>`;
          //  });
       //     section += `</tr>`;
     //   });

        section += `<tr><td><strong>Total</strong></td>${
            diametros.map(d => `<td><strong>${(totalesPorDiametro[d] || 0).toFixed(2)}</strong></td>`).join('')
        }</tr></table>`;

        return section;
    }

    
    if (geojsonAP && geojsonAP.features.length > 0)
        html += procesarTuberias("Tuberías AP", geojsonAP, "DIAMETRE", "Longitud", "Tipo_de_Re");

    if (geojsonAS && geojsonAS.features.length > 0)
        html += procesarTuberias("Tuberías AS", geojsonAS, "diametre", "Longitud", "type_res");

 
    if (totalPuntos > 0)
        html += `<h4>Total de Clientes: ${totalPuntos}</h4>`;

    // 
    if (graficaPuntos && graficaPuntos.labels.length > 0) {
      html += `
    <div style="margin-bottom:8px;">
        <label>Tipo de gráfica: </label>
        <select id="tipoGrafica">
            <option value="bar">Barras</option>
            <option value="pie">Pastel</option>
        </select>
    </div>
    <canvas id="graficaUsoDesc" height="180"></canvas>
`;

    }

    if (!html) html = "<p>No se encontraron resultados en ninguna capa.</p>";

    div.innerHTML = html;
    document.getElementById('popupResultadosEspacial').style.display = 'block';

    // --- Inicializar gráfica ---
 document.getElementById('popupResultadosEspacial').style.display = 'block';

// --- Inicializar gráfica ---
let chartInstance = null; 

function crearGrafica(tipo) {
    const ctx = document.getElementById('graficaUsoDesc').getContext('2d');
    const colores = graficaPuntos.labels.map((_, i) => `hsl(${i * 50},70%,50%)`);

    if (chartInstance) chartInstance.destroy();  

    chartInstance = new Chart(ctx, {
        type: tipo,
        data: {
            labels: graficaPuntos.labels,
            datasets: [{
                label: 'Puntos por uso_desc',
                data: graficaPuntos.values,
                backgroundColor: colores,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: tipo === 'pie' }, 
                title: { display: true, text: 'Distribución por tipo de cliente' }
            },
            scales: tipo === 'bar'
                ? { y: { beginAtZero: true } }
                : {} 
        }
    });
}


if (graficaPuntos && graficaPuntos.labels.length > 0) {
    crearGrafica("bar");
}


document.getElementById("tipoGrafica").addEventListener("change", e => {
    crearGrafica(e.target.value);
});

}



document.getElementById('cerrarPopupResultadosEspacial').addEventListener('click', () => {
    document.getElementById('popupResultadosEspacial').style.display = 'none';
});

function makePopupDraggable(popupId, headerId) {
  const popup = document.getElementById(popupId);
  const header = document.getElementById(headerId);
  if (!popup || !header) return;

  let startX = 0, startY = 0, offsetX = 0, offsetY = 0;

  // 🔹 MOUSE EVENTS
  header.onmousedown = dragStartMouse;
  // 🔹 TOUCH EVENTS (para móviles)
  header.ontouchstart = dragStartTouch;

  function dragStartMouse(e) {
    e.preventDefault();
    startX = e.clientX;
    startY = e.clientY;
    document.onmouseup = stopDrag;
    document.onmousemove = dragMoveMouse;
  }

  function dragMoveMouse(e) {
    e.preventDefault();
    offsetX = e.clientX - startX;
    offsetY = e.clientY - startY;
    startX = e.clientX;
    startY = e.clientY;
    movePopup(offsetX, offsetY);
  }

  function dragStartTouch(e) {
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    document.ontouchend = stopDrag;
    document.ontouchmove = dragMoveTouch;
  }

  function dragMoveTouch(e) {
    const touch = e.touches[0];
    offsetX = touch.clientX - startX;
    offsetY = touch.clientY - startY;
    startX = touch.clientX;
    startY = touch.clientY;
    movePopup(offsetX, offsetY);
  }

  function movePopup(dx, dy) {
  
    const rect = popup.getBoundingClientRect();
    let newTop = popup.offsetTop + dy;
    let newLeft = popup.offsetLeft + dx;

    const maxLeft = window.innerWidth - rect.width;
    const maxTop = window.innerHeight - rect.height;

    popup.style.top = Math.min(Math.max(0, newTop), maxTop) + "px";
    popup.style.left = Math.min(Math.max(0, newLeft), maxLeft) + "px";
  }

  function stopDrag() {
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchmove = null;
  }
}


// Activar el drag para la ventana
makePopupDraggable('popupResultadosEspacial', 'headerPopupResultadosEspacial');
