
document.addEventListener('DOMContentLoaded', function(){

  const hoy = new Date().toISOString().split('T')[0];
  document.getElementById('fecha').setAttribute('max', hoy);

});

let watchId = null;
let ultimaPosicion = null;

// es un dispositivo Movil celular--------------------

function esMovil(){
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

function usarGPS(){

  if(!navigator.geolocation){
    alert("GPS no soportado por el navegador");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    function(position){

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const coord3857 = ol.proj.fromLonLat([lon, lat]);

      puntoSource.clear();

      const feature = new ol.Feature({
        geometry: new ol.geom.Point(coord3857)
      });

      puntoSource.addFeature(feature);

      map.getView().animate({
        center: coord3857,
        zoom: 18,
        duration: 800
      });

      document.getElementById('x').value = lon;
      document.getElementById('y').value = lat;

    },
    function(error){
      console.log("Error GPS:", error.message);
      alert("No se pudo obtener ubicación");
    },
    {
      enableHighAccuracy:true,
      timeout:10000,
      maximumAge:0
    }
  );

}

//-------------------

function activarSeguimientoGPS(){

  if(!navigator.geolocation){
    alert("GPS no soportado");
    return;
  }

  watchId = navigator.geolocation.watchPosition(
    function(position){

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const precision = position.coords.accuracy;

      const coord3857 = ol.proj.fromLonLat([lon, lat]);

      // Detectar si se movió
      if(ultimaPosicion){
        const distancia = calcularDistancia(
          ultimaPosicion.lat,
          ultimaPosicion.lon,
          lat,
          lon
        );

        if(distancia < 1){ // menos de 1 metro → ignorar
          return;
        }

        console.log("Se movió:", distancia.toFixed(2), "metros");
      }

      ultimaPosicion = {lat, lon};

      puntoSource.clear();

      const feature = new ol.Feature({
        geometry: new ol.geom.Point(coord3857)
      });

      puntoSource.addFeature(feature);

      map.getView().animate({
        center: coord3857,
        zoom: 18,
        duration: 500
      });

      document.getElementById('x').value = lon;
      document.getElementById('y').value = lat;

      console.log("Precisión:", precision, "metros");

    },
    function(error){
      console.log("Error GPS:", error.message);
    },
    {
      enableHighAccuracy:true,
      maximumAge:0,
      timeout:10000
    }
  );

}

function calcularDistancia(lat1, lon1, lat2, lon2){

  const R = 6371000; // radio tierra en metros
  const toRad = x => x * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon/2) *
    Math.sin(dLon/2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}
  //mover ventanas----------
document.addEventListener("DOMContentLoaded", function(){

    let zIndexActual = 1000;

    function hacerVentanaPro(idVentana) {

        const ventana = document.getElementById(idVentana);
        if (!ventana) return;

        const barra = ventana.querySelector(".barra");
        const btnCerrar = ventana.querySelector(".cerrar");
        const btnMin = ventana.querySelector(".minimizar");

        let moviendo = false;
        let offsetX = 0;
        let offsetY = 0;

        // Restaurar posición guardada
        const guardado = JSON.parse(localStorage.getItem(idVentana));
        if (guardado) {
            ventana.style.left = guardado.left;
            ventana.style.top = guardado.top;
            if (guardado.minimizada) {
                ventana.classList.add("minimizada");
            }
        } else {
            ventana.style.top = "120px";
            ventana.style.left = "120px";
        }

        // Activar al frente
        ventana.addEventListener("mousedown", () => {
            zIndexActual++;
            ventana.style.zIndex = zIndexActual;
        });

        // DRAG
        barra.addEventListener("mousedown", function(e){
            moviendo = true;
            offsetX = e.clientX - ventana.offsetLeft;
            offsetY = e.clientY - ventana.offsetTop;
        });

        document.addEventListener("mousemove", function(e){
            if (!moviendo) return;

            let nuevaX = e.clientX - offsetX;
            let nuevaY = e.clientY - offsetY;

            // Limitar dentro de pantalla
            nuevaX = Math.max(0, Math.min(window.innerWidth - ventana.offsetWidth, nuevaX));
            nuevaY = Math.max(0, Math.min(window.innerHeight - 40, nuevaY));

            ventana.style.left = nuevaX + "px";
            ventana.style.top = nuevaY + "px";
        });

        document.addEventListener("mouseup", function(){
            if (moviendo) {
                moviendo = false;

                // Guardar posición
                localStorage.setItem(idVentana, JSON.stringify({
                    left: ventana.style.left,
                    top: ventana.style.top,
                    minimizada: ventana.classList.contains("minimizada")
                }));
            }
        });

        // CERRAR
        btnCerrar.addEventListener("click", function(){
            ventana.style.display = "none";
        });

        // MINIMIZAR
        btnMin.addEventListener("click", function(){
            ventana.classList.toggle("minimizada");

            localStorage.setItem(idVentana, JSON.stringify({
                left: ventana.style.left,
                top: ventana.style.top,
                minimizada: ventana.classList.contains("minimizada")
            }));
        });
    }

    // Inicializar ventanas
    hacerVentanaPro("ventanaRegistro");
    hacerVentanaPro("consultaContainer");

});

//  Capas-------------------

const poligonoSource = new ol.source.Vector();
const poligonoLayer = new ol.layer.Vector({
  source: poligonoSource,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'blue',
      width: 3
    }),
    fill: new ol.style.Fill({
      color: 'rgba(0,0,255,0.2)'
    })
  })
});

const puntoSource = new ol.source.Vector();

const puntoLayer = new ol.layer.Vector({
  source:puntoSource,
  style:new ol.style.Style({
    image:new ol.style.Circle({
      radius:15,
      fill:new ol.style.Fill({color:'red'}),
      stroke:new ol.style.Stroke({color:'#fff',width:2})
    })
  })
});

//--------------------
const capaCliente = new ol.layer.Vector({
source:new ol.source.Vector(),
style:new ol.style.Style({
image:new ol.style.Circle({
radius:12,
fill:new ol.style.Fill({color:'#00c853'}),
stroke:new ol.style.Stroke({color:'#fff',width:2})
})
})
});

//capa de afectacion

const tipoAfectacionSource = new ol.source.Vector({
  format: new ol.format.GeoJSON(),
  url: function(extent) {
    return 'https://dhcqgis.aguakan.com/geoserver/DHC_AGUAKAN/ows?' +
      'service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Tipo_de_afectacion' +
      '&outputFormat=application/json&srsname=EPSG:3857';
  },
  strategy: ol.loadingstrategy.bbox
});

const tipoAfectacionLayer = new ol.layer.Vector({
  source: tipoAfectacionSource,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#0044cc',
      width: 2
    }),
    fill: new ol.style.Fill({
      color: 'rgba(0,68,204,0.15)'
    })
  })
});

//-------------------

const map = new ol.Map({
  target:'map',
  layers:[
    new ol.layer.Tile({ source:new ol.source.OSM() }),

    // tipoAfectacionLayer,

    poligonoLayer,
    puntoLayer,
    capaCliente
  ],
  view:new ol.View({
    center:ol.proj.fromLonLat([-86.85,21.16]),
    zoom:12
  })
});

//---------------
if(esMovil()){
  usarGPS();
}

//----------------

function ajustarMapa(){
  setTimeout(() => {
    map.updateSize();
  }, 200);
}

window.addEventListener('resize', ajustarMapa);

map.on('click', function(evt){

  //---------

 //if(esMovil()) return; 

  //---------

  puntoSource.clear();

  const coord4326 = ol.proj.toLonLat(evt.coordinate);

  document.getElementById('x').value = coord4326[0];
  document.getElementById('y').value = coord4326[1];

  const feature = new ol.Feature({
    geometry:new ol.geom.Point(evt.coordinate)
  });

  puntoSource.addFeature(feature);

  const ventanaRegistro = document.getElementById('ventanaRegistro');

 ventanaRegistro.style.display = "block";
ventanaRegistro.classList.remove("minimizada");
});

function guardar(){

  const form = document.getElementById('formAfectacion');

  const nombre   = form.nombre.value.trim();
  const cliente  = form.cliente.value.trim();
  const contrato = form.contrato.value.trim();
  const fecha    = form.fecha.value.trim();
  const tipo     = form.tipo_de_afectacion.value;
  const x        = form.x.value;
  const y        = form.y.value;

  let camposVacios = [];

  if(!nombre)   camposVacios.push("Nombre");
  if(!cliente)  camposVacios.push("Cliente");
  if(!contrato) camposVacios.push("Contrato");
  if(!fecha)    camposVacios.push("Fecha");
  if(!tipo)     camposVacios.push("Motivo de afectación");
  if(!x || !y)  camposVacios.push("Ubicación en el mapa");

  // Si hay campos vacíos, mostrar ventana y detener proceso
  if(camposVacios.length > 0){

    mostrarErrorCampos(camposVacios);
    return;
  }

  // Si todo está correcto continúa con el registro
  const formData = new FormData(form);


  


  //-----

fetch('afectacion/R_Afec.php',{
  method:'POST',
  body:formData
})
.then(res=>{

  if(res.status === 401){

    alert("⚠ La sesión ha expirado");
    window.location = "../../logout.php";
    return Promise.reject("sesion expirada");

  }

  if(!res.ok){
    throw new Error("Error en la petición");
  }

  return res.json();

})

  //------
  .then(data=>{

  puntoSource.clear();
  poligonoSource.clear();

  const coord = ol.proj.fromLonLat([
    parseFloat(data.x),
    parseFloat(data.y)
  ]);

  const punto = new ol.Feature({
    geometry:new ol.geom.Point(coord)
  });

  puntoSource.addFeature(punto);

  // -------- MOSTRAR POLIGONO SI EXISTE --------

  if(data.poligono){

    const geojsonFormat = new ol.format.GeoJSON();

    const featurePol = geojsonFormat.readFeature(data.poligono,{
      dataProjection:'EPSG:4326',
      featureProjection:'EPSG:3857'
    });

    poligonoSource.addFeature(featurePol);

    map.getView().fit(
      poligonoSource.getExtent(),
      {
        duration:800,
        padding:[40,40,40,40]
      }
    );
  }

  mostrarVentana(data);

  if(data.ok){
    form.reset();
  }

});
}

function mostrarErrorCampos(lista){

  const vieja = document.querySelector('.ventana-overlay');
  if(vieja) vieja.remove();

  let html = `
  <div class="ventana-overlay">
    <div class="ventana-flotante">
      <div class="ventana-header" style="background:#dc3545">
        ⚠ Campos Obligatorios
        <span class="cerrar-btn" onclick="this.closest('.ventana-overlay').remove()">✖</span>
      </div>

      <div class="ventana-body">
        <p>Los siguientes campos son obligatorios:</p>
        <ul style="margin-top:10px;">
  `;

  lista.forEach(campo=>{
    html += `<li>${campo}</li>`;
  });

  html += `
        </ul>
      </div>
    </div>
  </div>
  `;

  document.body.insertAdjacentHTML('beforeend', html);
}

// Mostar Resultados si encuentra Coinsidencia-----------

function mostrarVentana(data){

  const vieja = document.querySelector('.ventana-overlay');
  if(vieja) vieja.remove();

  let colorTitulo = "#28a745";
  let icono = "✅";

  if(data.ordenTrabajo){
    colorTitulo = "#dc3545";
    icono = "🔴";
  }
  else if(data.existe50m){
    colorTitulo = "#ff9800";
    icono = "⚠️";
  }

  let html = `
  <div class="ventana-overlay">
    <div class="ventana-flotante">
      <div class="ventana-header" style="background:${colorTitulo}">
        ${icono} Resultado del Registro
        <span class="cerrar-btn" onclick="this.closest('.ventana-overlay').remove()">✖</span>
      </div>

      <div class="ventana-body">
        <p><b>Mensaje:</b> ${data.msg}</p>
        <p><b>Código Seguimiento:</b> ${data.seguimiento}</p>
        <p><b>Estatus Final:</b> ${data.estatus}</p>
  `;

  if(data.ordenTrabajo){
    html += `<p style="color:#dc3545;"><b>⚠ Ya existe Orden de Trabajo en la zona</b></p>`;
  }

  if(data.afectacion){
    html += `
      <hr>
      <p><b>ID Afectación:</b> ${data.afectacion.id_afectacion}</p>
      <p><b>Tipo:</b> ${data.afectacion.tipo}</p>
      <p><b>Nivel:</b> ${data.afectacion.nivel}</p>
      <p><b>Periodo:</b> ${data.afectacion.periodo}</p>
      <p><b>Inicio:</b> ${data.afectacion.fecha_inicio}</p>
      <p><b>Fin:</b> ${data.afectacion.fecha_fin}</p>
      <p><b>Tipo:</b> ${data.afectacion.desc}</p>
      `;
  }

  html += `
      </div>
    </div>
  </div>
  `;

  document.body.insertAdjacentHTML('beforeend', html);
 
}

//motivo rellenar Formulario-----------------------

document.addEventListener('DOMContentLoaded', function(){
  cargarMotivos();
});

function cargarMotivos(){

  fetch('afectacion/motivo_ap_ds.php')
    .then(res => res.json())
    .then(data => {

      const select = document.getElementById('tipo_de_afectacion');
      select.innerHTML = '';

      if(!data.ok){
        select.innerHTML = '<option>Error al cargar</option>';
        return;
      }

      select.innerHTML = '<option value="">Seleccione un motivo</option>';

      data.data.forEach(item => {

        const option = document.createElement('option');
        option.value = item.code;     
        option.textContent = item.motivo;  

        select.appendChild(option);
      });

    })
    .catch(()=>{
      document.getElementById('tipo_de_afectacion').innerHTML =
        '<option>Error de conexión</option>';
    });
}

function abrirConsultaSeguimiento(){
  const ventana = document.getElementById("consultaContainer");
  ventana.style.display = "block";
  ventana.classList.remove("minimizada");
  ventana.style.zIndex = 2000;
}

function cerrarConsulta(){
  document.getElementById("consultaContainer")
          .classList.add("hidden-window");
}

function consultarSeguimiento(){

  const codigo = document.getElementById("codigoBuscar").value.trim();

  if(!codigo){
    alert("Ingrese código de seguimiento");
    return;
  }

  fetch("afectacion/consulta_seguimiento.php",{
    method:"POST",
    headers:{"Content-Type":"application/x-www-form-urlencoded"},
    body:"codigo="+encodeURIComponent(codigo)
  })
  .then(res=>res.json())
  .then(data=>{

    const div = document.getElementById("resultadoConsulta");

    if(!data.ok){
      div.innerHTML = `<p style="color:red;">${data.msg}</p>`;
      return;
    }

    div.innerHTML = `
      <p><b>Cliente:</b> ${data.cliente}</p>
      <p><b>Contrato:</b> ${data.contrato}</p>
      <p><b>Fecha:</b> ${data.fecha}</p>
      <p><b>Estatus:</b> ${data.estatus}</p>
    `;

    // Mostrar punto en mapa
    puntoSource.clear();

    const coord = ol.proj.fromLonLat([
      parseFloat(data.x),
      parseFloat(data.y)
    ]);

    puntoSource.addFeature(
      new ol.Feature(new ol.geom.Point(coord))
    );

    map.getView().animate({
      center:coord,
      zoom:18,
      duration:800
    });

  });
}


//-------------ubicar contrato
async function buscarContrato(){

let contrato = document.getElementById("contrato").value.trim();
let cliente  = document.getElementById("cliente").value.trim();

if(!contrato || !cliente) return;

const res = await fetch('./afectacion/consultar_cliente.php',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({
contrato:contrato,
cliente:cliente
})
});

const data = await res.json();

if(data.status==="ok"){

let lon = parseFloat(data.lon);
let lat = parseFloat(data.lat);

document.getElementById("x").value = lon;
document.getElementById("y").value = lat;

document.getElementById("coordenadaMapa").innerHTML =
"📍 Coordenada: "+lon.toFixed(6)+" , "+lat.toFixed(6);

// convertir a proyección del mapa
let coord = ol.proj.fromLonLat([lon,lat]);

capaCliente.getSource().clear();

let feature = new ol.Feature({
geometry:new ol.geom.Point(coord)
});

capaCliente.getSource().addFeature(feature);

map.getView().animate({
center:coord,
zoom:18,
duration:800
});

}else{

document.getElementById("coordenadaMapa").innerHTML =
"⚠ Contrato y cliente no coinciden. Ubique manualmente.";

}

}
document.getElementById("contrato")
.addEventListener("change",buscarContrato);

document.getElementById("cliente")
.addEventListener("change",buscarContrato);