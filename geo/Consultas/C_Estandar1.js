window.abrirFormulario =async function () {
const capa = "DHC_AGUAKAN:AEP_CANA_AP";
const srs = "EPSG:3857";


 capaSeleccionada = capa;
  srsSeleccionado = srs;

  const urlDescribe = `https://dhcqgis.aguakan.com/geoserver/wfs?service=WFS&version=1.0.0&request=DescribeFeatureType&typeName=${capa}&outputFormat=application/json`;
  const urlValores = `https://dhcqgis.aguakan.com/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=${capa}&outputFormat=application/json&srsname=${srs}`;

const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");

if (modal && overlay) {
  modal.style.display = "block";
  overlay.style.display = "block";
} else {
  console.warn("⚠️ No se encontró el modal o el overlay en el DOM.");
}



 console.log("📡 URL Describe:", urlDescribe);
  console.log("📡 URL Valores:", urlValores);

  try {
    const [resDescribe, resValores] = await Promise.all([
      fetch(urlDescribe),
      fetch(urlValores)
    ]);
 console.log("✅ Ambos fetch terminados");

    const jsonDescribe = await resDescribe.json();
    const jsonValores = await resValores.json();

       console.log("🧩 Describe result:", jsonDescribe);
    console.log("📦 Valores result:", jsonValores);

    const propiedades = jsonDescribe.featureTypes[0].properties.filter(p => p.name !== 'geom');

    // Campos a generar como desplegables
    const campos = ["Tipo_de_Re", "Estatus", "Municipio", "DIAMETRE", "MATERIAU", "TYPCANA"];
    const opciones = {};

    campos.forEach(campo => {
      opciones[campo] = new Set();
    });

    jsonValores.features.forEach(f => {
      const props = f.properties;
      campos.forEach(campo => {
        if (props[campo] != null && props[campo] !== "") {
          opciones[campo].add(props[campo]);
        }
      });
    });

    // Convertir Sets a arrays ordenados
    for (let campo in opciones) {
      opciones[campo] = Array.from(opciones[campo]).sort();
    }

    generarFormularioAvanzado(propiedades, opciones);

    // Mostrar modal y overlay
   //document.getElementById("ventana-formulario").style.display = "block";
   //document.getElementById("ventana-flotante").style.display = "block";
document.getElementById("ventana-formulario").style.display = "block";

  } catch (error) {
    console.error("Error al abrir el formulario:", error);
  }
}


function cerrarFormulario() {
  const ventanaFormulario = document.getElementById("ventana-formulario");
  if (ventanaFormulario) {
    ventanaFormulario.style.display = "none";
  }
}



function generarFormularioAvanzado(properties, opciones = {}) {
  const form = document.getElementById("formulario-dinamico");
  form.innerHTML = "";

  properties.forEach(p => {
    const nombre = p.name;
    const tipo = p.type;
    const grupo = document.createElement("div");
    grupo.style.marginBottom = "10px";

    const label = document.createElement("label");
    label.textContent = nombre;
    grupo.appendChild(label);

    if (opciones[nombre]) {
      const select = document.createElement("select");
      select.name = `${nombre}__like`;

      const opcionVacia = document.createElement("option");
      opcionVacia.value = "";
      opcionVacia.textContent = "-- Seleccione --";
      select.appendChild(opcionVacia);

      opciones[nombre].forEach(val => {
        const option = document.createElement("option");
        option.value = val;
        option.textContent = val;
        select.appendChild(option);
      });

      grupo.appendChild(select);
    } else if (tipo.includes("int") || tipo.includes("double") || tipo.includes("decimal")) {
      const min = document.createElement("input");
      min.type = "number";
      min.name = `${nombre}__min`;
      min.placeholder = "mínimo";

      const max = document.createElement("input");
      max.type = "number";
      max.name = `${nombre}__max`;
      max.placeholder = "máximo";

      grupo.appendChild(min);
      grupo.appendChild(max);
    } else if (tipo.includes("date")) {
      const desde = document.createElement("input");
      desde.type = "date";
      desde.name = `${nombre}__desde`;

      const hasta = document.createElement("input");
      hasta.type = "date";
      hasta.name = `${nombre}__hasta`;

      grupo.appendChild(desde);
      grupo.appendChild(hasta);
    } else {
      const text = document.createElement("input");
      text.type = "text";
      text.name = `${nombre}__like`;
      text.placeholder = "contiene...";
      grupo.appendChild(text);
    }

    form.appendChild(grupo);
  });
  console.log("🧪 Contenido HTML generado:", form.innerHTML);
}



function obtenerValorCampo(props, nombresPosibles) {
  for (let nombre of nombresPosibles) {
    for (let key in props) {
      if (key.toLowerCase() === nombre.toLowerCase()) {
        return props[key];
      }
    }
  }
  return null;
}

function consultarDatos() {
  console.log("🔍 consultando datos...");

  if (!capaSeleccionada || !srsSeleccionado) {
    alert("❌ No hay una capa activa seleccionada.");
    return;
  }

  const capa = capaSeleccionada;
  const srs = srsSeleccionado;
  const form = document.getElementById("formulario-dinamico");
  const inputs = form.querySelectorAll("input, select");
  let filtros = {};

  inputs.forEach(input => {
    let val = input.value.trim();
    if (val === "") return;

    const [campo, oper] = input.name.split("__");

    // 🔁 Normalizar "CANCÚN" solo si el campo es "localidad"
    if (campo === "localidad") {
      val = val.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Elimina tildes
      if (val.startsWith("CANCUN")) {
        val = "CANC";
      }
    }

    if (!filtros[campo]) filtros[campo] = {};
    filtros[campo][oper] = val;
  });

  let cqls = [];

  for (let campo in filtros) {
    const f = filtros[campo];

    if (f.min && f.max) {
      cqls.push(`(${campo} BETWEEN ${f.min} AND ${f.max})`);
    } else if (f.min) {
      cqls.push(`${campo} >= ${f.min}`);
    } else if (f.max) {
      cqls.push(`${campo} <= ${f.max}`);
    }

    if (f.desde && f.hasta) {
      cqls.push(`(${campo} BETWEEN '${f.desde}' AND '${f.hasta}')`);
    } else if (f.desde) {
      cqls.push(`${campo} >= '${f.desde}'`);
    } else if (f.hasta) {
      cqls.push(`${campo} <= '${f.hasta}'`);
    }

    if (f.like) {
      const safe = f.like.replace(/'/g, "''");
      cqls.push(`${campo} ILIKE '%${safe}%'`);
    }
  }

  const cql = cqls.join(" AND ");
  const urlWFS = `https://dhcqgis.aguakan.com/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=${capa}&outputFormat=application/json&srsname=${srs}&CQL_FILTER=${encodeURIComponent(cql)}`;

  console.log("Consulta generada:", urlWFS);

  fetch(urlWFS)
    .then(res => res.json())
    .then(data => {
      const resumen = {};
      const atributos = new Set();

      data.features.forEach(f => {
        const props = f.properties;
        const diametro = obtenerValorCampo(props, ["DIAMETRE", "diametre"]) || "Sin dato";
        const longitud = parseFloat(props.Longitud || 0);
        if (!resumen[diametro]) resumen[diametro] = 0;
        resumen[diametro] += longitud;
        Object.keys(props).forEach(attr => atributos.add(attr));
      });

      let tablaResumen = "<h3>Estadísticas de Longitud por Diámetro</h3><table border='1'><thead><tr><th>DIÁMETRO</th><th>LONGITUD (m)</th></tr></thead><tbody>";
      for (let d in resumen) {
        tablaResumen += `<tr><td>${d}</td><td>${resumen[d].toFixed(2)}</td></tr>`;
      }
      tablaResumen += "</tbody></table><br>";

      let tablaAtributos = "<h3>Todos los Atributos</h3><table border='1'><thead><tr>";
      const atributosArray = Array.from(atributos);
      atributosArray.forEach(attr => tablaAtributos += `<th>${attr}</th>`);
      tablaAtributos += "</tr></thead><tbody>";
      data.features.forEach(f => {
        tablaAtributos += "<tr>";
        atributosArray.forEach(attr => tablaAtributos += `<td>${f.properties[attr] ?? ""}</td>`);
        tablaAtributos += "</tr>";
      });
      tablaAtributos += "</tbody></table>";

      window.ultimaTablaHTML = tablaResumen + tablaAtributos;
      mostrarResultadosEstadisticos(tablaResumen + tablaAtributos);
      cerrarFormulario();
    })
    //.catch(err => console.error("Error en consulta WFS:", err));
}



function mostrarResultadosEstadisticos(htmlContenido) {
  console.log("📦 Mostrando resultados...");
  const ventana = document.getElementById('ventana-resultados');
  const contenido = document.getElementById('contenido-resultados');
  contenido.innerHTML = htmlContenido;
  ventana.style.display = 'block';
}

function cerrarVentanaResultados() {
  document.getElementById('ventana-resultados').style.display = 'none';
}



const ventana = document.getElementById('ventana-resultados');
 const Ventheader = document.getElementById('ventana-header');

function iniciarArrastre() {
  let isDragging = false;
  let offsetX, offsetY;

  Ventheader.addEventListener('mousedown', (e) => {
    isDragging = true;
    const rect = ventana.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.userSelect = 'auto';
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      let left = e.clientX - offsetX;
      let top = e.clientY - offsetY;

      const maxLeft = window.innerWidth - ventana.offsetWidth;
      const maxTop = window.innerHeight - ventana.offsetHeight;
      if (left < 0) left = 0;
      if (top < 0) top = 0;
      if (left > maxLeft) left = maxLeft;
      if (top > maxTop) top = maxTop;

      ventana.style.left = left + 'px';
      ventana.style.top = top + 'px';
    }
  });
}


iniciarArrastre();


function iniciarArrastreFormulario() {
  const formularioVentana = document.getElementById('ventana-formulario');
  const header = document.getElementById('ventana-formulario-header');

  let isDragging = false;
  let offsetX, offsetY;

  header.addEventListener('mousedown', (e) => {
    isDragging = true;
    const rect = formularioVentana.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.userSelect = 'auto';
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      let left = e.clientX - offsetX;
      let top = e.clientY - offsetY;

      const maxLeft = window.innerWidth - formularioVentana.offsetWidth;
      const maxTop = window.innerHeight - formularioVentana.offsetHeight;
      if (left < 0) left = 0;
      if (top < 0) top = 0;
      if (left > maxLeft) left = maxLeft;
      if (top > maxTop) top = maxTop;

      formularioVentana.style.left = left + 'px';
      formularioVentana.style.top = top + 'px';
    }
  });
}

iniciarArrastreFormulario();


let ventanaMinimizada = false;

function minimizarVentanaResultados() {
  const contenido = document.getElementById("contenido-resultados");
  ventanaMinimizada = !ventanaMinimizada;
  contenido.style.display = ventanaMinimizada ? "none" : "block";
}

document.addEventListener("click", function (event) {
  const ventanaFormulario = document.getElementById("ventana-formulario");
  if (!ventanaFormulario) return;

  const isClickInside = ventanaFormulario.contains(event.target);
  const isVisible = ventanaFormulario.style.display !== "none";

  if (!isClickInside && isVisible) {
    cerrarFormulario();
  }
});

function descargarXLS() {
  if (!window.ultimaTablaHTML) {
    alert("❌ No hay resultados para exportar.");
    return;
  }

  // Obtener fecha en formato YYYY-MM-DD
  const hoy = new Date();
  const fechaStr = hoy.toISOString().split('T')[0]; // "2025-06-05"

  // Obtener nombre de la capa o usar 'resultado' como respaldo
  const capa = window.capaSeleccionada || 'resultado';

  // Nombre del archivo: ejemplo: AEP_CANA_AP_2025-06-05.xls
  const nombreArchivo = `${capa.replace(/:/g, "_")}_${fechaStr}.xls`;

  const blob = new Blob([`
    <html xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head>
        <meta charset="UTF-8">
        <style>td { mso-number-format:"\\@"; }</style>
      </head>
      <body>${window.ultimaTablaHTML}</body>
    </html>
  `], {
    type: "application/vnd.ms-excel"
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nombreArchivo;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

