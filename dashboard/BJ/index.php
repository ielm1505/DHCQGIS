<?php

?>

<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <link rel="stylesheet" href="./resources/ol.css">
        <link rel="stylesheet" href="resources/fontawesome-all.min.css">
        <link rel="stylesheet" type="text/css" href="resources/horsey.min.css">
        <link rel="stylesheet" type="text/css" href="resources/ol3-search-layer.min.css">
        <link rel="stylesheet" href="./resources/ol-layerswitcher.css">
        <link rel="stylesheet" href="./resources/qgis2web.css">

        <style>
        html, body {
            background-color: #ffffff;
        }
        .ol-control > * {
            background-color: #f8f8f8!important;
            color: #444444!important;
            border-radius: 0px;
        }
        .ol-attribution a, .gcd-gl-input::placeholder, .search-layer-input-search::placeholder {
            color: #444444!important;
        }
        .search-layer-input-search {
            background-color: #f8f8f8!important;
        }
        .ol-control > *:focus, .ol-control >*:hover {
            background-color: rgba(248, 248, 248, 0.7)!important;
        } 
        .ol-control {
            background-color: rgba(255,255,255,.4) !important;
            padding: 2px !important;
        } 
        </style>

        <style>
        html, body, #map {
            width: 100%;
            height: 100%;
            padding: 0;
            margin: 0;

        }
        </style>
        <title>DHC_AGUAKAN</title>

        <script>
            
     fetch('verificar_sesion.php')
    .then(response => response.json())
    .then(data => {
       if (!data.activo) {
            window.location.href = '../index.html'; // Redirige al login si no hay sesión activa
        } else {
            // Cargar dinámicamente layer.js y ejecutar la función
            const script = document.createElement('script');
            script.src = 'layers/layer.js';
            script.onload = () => inicializarMapa();
            document.body.appendChild(script);
        }
    })
    .catch(error => console.error('Error:', error));
    
      //  Función para cerrar sesión
  function cerrarSesion() {
            window.location.href = "../logout.php"; // Redirige al logout.php
        }
        let inactivityTime = 20 * 60 * 1000; // 20 minutos en milisegundos
let timeout;
// inactividad en la plataforma
function resetTimer() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        window.location.href = "../logout.php"; // Redirige al cerrar sesión
    }, inactivityTime);
}
// verificar sesion activa cada 30s
setInterval(() => {
  fetch('verificar_sesion.php')
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.text();
    })
    .then(text => {
      try {
        const data = JSON.parse(text);
        if (!data.activo) {
          window.location.href = '../index.html';
        }
      } catch (e) {
        console.error('Respuesta no es JSON válido:', e, text);
      }
    })
    .catch(err => console.error('Error en verificación:', err));
}, 30000);



// Iniciar el temporizador por primera vez
resetTimer();


        </script>

    </head>
    <body>

        <body>
    <div id="alerta-expirada"></div>

    <script>
        const params = new URLSearchParams(window.location.search);
        if (params.has('expirada')) {
            const alerta = document.getElementById('alerta-expirada');
            alerta.textContent = 'Tu sesión fue cerrada porque iniciaste sesión en otro dispositivo.';
            alerta.style.color = 'red';
            alerta.style.fontWeight = 'bold';
            alerta.style.marginBottom = '1em';
        }
    </script>
</body>

        <!-- Botón de cerrar sesión -->
        <button id="logout-btn" onclick="cerrarSesion()">Cerrar Sesion</button>
        
        <div id="map">
            <div id="popup" class="ol-popup">
                <a href="#" id="popup-closer" class="ol-popup-closer"></a>
                <div id="popup-content"></div>
            </div>
        </div>


        <script src="resources/qgis2web_expressions.js"></script>
        <script src="resources/proj4.js"></script>
        <script>proj4.defs('EPSG:32616','+proj=utm +zone=16 +datum=WGS84 +units=m +no_defs');</script>
		    <script src="resources/polyfills.js"></script>
        <script src="./resources/functions.js"></script>
        <script src="./resources/ol.js"></script>
        <script src="resources/horsey.min.js"></script>
        <script src="resources/ol3-search-layer.js"></script>
        <script src="./resources/ol-layerswitcher.js"></script>



        <script src="styles/Tanques_34_style.js"></script>
        <script src="styles/Conduccion_BJ_copy_1_style.js"></script>
        <script src="styles/Distribucion_BJ_copy_1_style.js"></script>
        <script src="styles/Ptar_28_style.js"></script>
        <script src="styles/Emisores_26_style.js"></script>
        <script src="styles/colectores_26_style.js"></script>
        <script src="styles/Tuberia_ASS_0_style.js"></script>
        <script src="styles/Carcamos_25_style.js"></script>

	
    
    
    <script src="./layers/layers.js" type="text/javascript"></script> 
        <script src="./resources/Autolinker.min.js"></script>
        <script src="./resources/qgis2web.js"></script>

        <script>
            window.addEventListener('beforeunload', function () {
                navigator.sendBeacon('/Login/logout.php');
            });





            </script>
        
    </body>
</html>

