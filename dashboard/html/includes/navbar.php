<div id="contextMenu">
    <ul>
        <li id="searchById">Buscar por Cliente</li>
        <li id="btnBuscarUbicacionSM">Buscar SM</li>
        <li id="menuBuscarCondominio">Buscar Condominios</li>
        <li id="Infraestructura">Buscar Infraestructura</li>
    </ul>
</div>

  <div class="navbar">
      <div class="menu-item">
          <a onclick="cerrarSesion()">Cerrar Sesion</a>
      </div>

      <div class="menu-item">
          <a onclick="abrirPrint()">Imprimir</a>
      </div>

      <div class="menu-item">
          <a onclick="toggleDropdown(this)">Archivo</a>
          <div class="dropdown-content">
              <a onclick="document.getElementById('fileInput').click()">Cargar KMZ Temp</a>
              <input type="checkbox" id="toggleKmlLayer" checked> Mostrar KML/KMZ
          </div>
      </div>
      <div class="menu-item">
          <a onclick="toggleDropdown(this)">Herramientas</a>
          <div class="dropdown-content">
              <a onclick="activarDibujo('Point')">Punto</a>
              <a onclick="activarDibujo('LineString')">Línea</a>
              <a onclick="activarDibujo('Polygon')">Polígono</a>      
              <a onclick="activarDibujo('Circle')">Circulo</a>  
              <a onclick="zoom()">Zoom</a>
              <a onclick="limpiarDibujo()">Limpíar pantalla</a>  
          </div>
          
      </div>
      <div class="menu-item">
          <a onclick="toggleDropdown(this)">Consultas</a>
          <div class="dropdown-content">
            <a onclick="infraAPDS()">Infraestructura AP, DS</a>
            <a onclick="C_Tub()">Redes AP y DS</a>
            
            <a onclick="abrirVentanaConsultas(generarMenuConsultas())">Consulta Estándar</a>
            <a onclick="activarConsultaEspacial()">Consulta Espacial</a>
            <a id="btnFactibilidad" onclick="Factibilidad()">Factibilidad</a>
            <a onclick="altadesarrollador()">Alta de desarrollador</a>
            <a onclick="admin_desa()">Administrar Desarrollo</a>

            
            <a id="vpruebas" onclick="vpruebas()" style="cursor:pointer;"> Verificación de Pruebas</a>
          </div>
      </div>
      <div class="menu-item">
              <a onclick="Dash_dhc()">Dashboard</a>
      </div>


      <div class="menu-item">
          <a onclick="toggleDropdown(this)">Comercial</a>
          <div class="dropdown-content">
           <a onclick="afectacion()">Reg. Afec. Cliente</a>
           <a onclick="registroxpol()">Reg. Zona de Afectacion</a>
           <a onclick="cogeom()">Corregir Geom</a>
           <a onclick="segregafec()">Seguiento Zona de Afectacion</a>
           <a onclick="bafectacion()">Historico</a>
            <a onclick="editcondominio()"> Condominio </a>
          </div>
          
      </div>





         <div class="menu-item">
              <a onclick="Admin()">Administrar</a>
      </div>
    
  </div>




<!-- ================= busqueda de condominio ================= -->



<div id="ventanaCondominio" class="ventana-flotantecon" style="display:none;">

 <div class="titulo-ventana" id="tituloCondominio">
   <span> Buscar Condominio</span>
    <button class="cerrarVentana" id="cerrarVentanaCondominio">✕</button>
</div>

    <div class="contenido-ventana">

        <input type="text"
               id="txtCondominio"
               list="listaCondominios"placeholder="Nombre Condominio...">

        <datalist id="listaCondominios"></datalist>

        

        <button id="btnBuscarCondominioAceptar">Buscar</button>
        <button id="btnCancelarCondominio">Cancelar</button>

    </div>

</div>




  <div class="selected-value" id="selectedValue"></div>

  <div id="zoom-menu" style="display: none;">
      <div class="drag-header">
        <span>🧭 Zoom</span>
        <button id="cerrar-menu" title="Cerrar">✖</button>
      </div>
      <div class="zoom-buttons">
        <button id="zoom-prev" title="Zoom anterior">⬅️Z_Ant.</button>
        <button id="zoom-box" title="Zoom por ventana">🔲Z_Vent.</button>
        <button id="zoom-home" title="Zoom inicial">🏠Z_Inicial</button>
        <button id="btnGPS" title="Mi ubicación">📍 GPS</button>
        <button id="recorrido" title="recorrido">📍 Recorrido</button>
      </div>
  </div>

  <!-- Ventana flotante de factibilidad -->

  <div id="ventanaFactibilidad" class="ventana-flotante" style="display:none;">
    <div class="ventana-header">
      <span>Edición</span>
      <div>
        <button type="button" onclick="minimizarVentana()">➖</button>
        <button onclick="cerrarVentana()">✖</button>
      </div>
    </div>
    <div class="ventana-cuerpo">
      <form id="formFactibilidad"></form>
      <button type="button" onclick="guardarCambios()">Guardar Cambios</button>
      <button type="button" onclick="eliminarSeleccion()">eliminar seleccion</button>
    </div>
  </div>

<!-- Impresion-->

<div id="printPanel" style="
  position:fixed;
  inset:0;
  background:rgba(0,0,0,.6);
  display:none;
  z-index:10000;
">

  <div style="
    background:#fff;
    width:85%;
    height:90%;
    margin:2% auto;
    display:flex;
    gap:10px;
    padding:10px;
  ">

    <!-- CONTROLES -->
    <div style="width:260px;border-right:1px solid #ccc;padding-right:10px">
      <h3>Impresión</h3>
          <h3>Contenido de plano</h3>
          <div id="formDatosPlano" style="padding:10px;font-family:Arial;font-size:12px">

            <label>Proyecto:</label><br>
            <input type="text" id="txtProyecto" style="width:50%"><br>
            <label>Plano:</label><br>
            <input type="text" id="txtPlano" style="width:50%"><br>
            <label>Ubicación:</label><br>
            <input type="text" id="txtUbicacion" style="width:95%"><br>
<label>No. de Plano:</label><br>
            <input type="text" id="txtnplano" style="width:50%"><br>
            <label>Clave:</label><br>
            <input type="text" id="txtclave" style="width:50%"><br>
                       
            <label>Municipio:</label><br>
            <input type="text" id="txtmunicipio" style="width:50%"><br>
            <label>Contenido:</label><br>
            <textarea id="txtContenido" rows="3" style="width:95%"></textarea>
            <br>
            <label>Observaciones:</label><br>
            <textarea id="txtcomentarios" rows="3" style="width:95%"></textarea>
            <br>

          </div>
<h3>Configuracion de Papel</h3>
      <label>Modo de escala</label>
          <select id="modoEscala" onchange="generarPreview()">
            <option value="ajustar">Ajustar contenido al papel</option>
            <option value="fija">Escala fija</option>
          </select>

          <br><br>

          <label>Escala</label>
          <select id="escala" onchange="generarPreview()">
            <option value="500">1:500</option>
            <option value="1000">1:1,000</option>
            <option value="2500">1:2,500</option>
            <option value="5000" selected>1:5,000</option>
            <option value="10000">1:10,000</option>
            <option value="25000">1:25,000</option>
          </select>

          <br><br>
            <label>Formato</label>
            <select id="formato" onchange="generarPreview()">
              <option value="carta">Carta</option>
              <option value="a4" >A4</option>
              <option value="a3">A3</option>
              <option value="tabloide"selected>Tabloide</option>
              <option value="arch_d">Arch D</option>
              <option value="arch_e">Arch E</option>
            </select>

                <br><br>

      <label>Orientación</label>
      <select id="orientacion" onchange="generarPreview()">
        <option value="landscape">Horizontal</option>
        <option value="portrait">Vertical</option>
        
      </select>

      <br><br>

      <button onclick="confirmarImpresion('pdf')">📄 PDF</button>
      <button onclick="confirmarImpresion('imagen')">🖼 PNG</button>
      <button onclick="confirmarImpresion('impresora')">🖨 Impresora</button>

      <br><br>
      <button onclick="cerrarPrint()">❌ Cerrar</button>


    </div>

    <!-- VISTA PREVIA -->
 <div style="flex:1; border:1px solid #ccc; background:#eee; overflow:auto; display:flex;">
  <div id="previewWrapper">
    <canvas id="previewCanvas"></canvas>
  </div>
</div>


  </div>
</div>

<div id="macroMap"
     style="width:300px;height:200px;position:absolute;left:-9999px;top:-9999px;"></div>

// impresion----------------------------

  <!-- Ventana flotante de Infraestructura -->

  <div id="formulario-infraestructura" class="ventana" style="display: none; position: absolute; top: 100px; left: 100px; background: white; border: 1px solid #ccc; padding: 10px; z-index: 1000; box-shadow: 2px 2px 10px rgba(0,0,0,0.3);">
    <div class="ventana-header" style="font-weight: bold; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
      <span>Buscar Infraestructura</span>
      <button onclick="cerrarVentanaInfra()" style="background: transparent; border: none; font-size: 16px; cursor: pointer;">✖</button>
    </div>
    <div class="ventana-cuerpo">
      <label for="busqueda-nombre">Nombre:</label>
      <input type="text" id="busqueda-nombre" list="sugerencias-nombre" placeholder="Escriba un nombre...">
      <datalist id="sugerencias-nombre"></datalist>
      <button onclick="consultarInfraestructura()">Buscar</button>
      </div>
  </div>
  <!-- Cuadro flotante para mostrar el resultado -->
 <!-- Cuadro flotante -->
<div id="searchResult" style="
    display:none;
    position:absolute;
    background:white;
    border:1px solid black;
    z-index:100;
    width:350px;
">

    <!-- Encabezado fijo arrastrable -->
    <div id="dragHeader" style="
        cursor: move;
        background:#2c3e50;
        color:white;
        padding:6px;
        font-weight:bold;
        display:flex;
        justify-content:space-between;
        align-items:center;
    ">
        <span>Resultado</span>
        <button onclick="closeFloatingBox()" 
            style="background:red;color:white;border:none;cursor:pointer;">
            ✕
        </button>
    </div>

    <!-- Contenido dinámico -->
    <div id="searchContent" style="padding:10px;"></div>

</div>

//--------------------

    <!-- Cuadro flotante para mostrar el resultado Estadistica -->
    <div id="estadisticas_popup" class="popup" style="display: none;">
        <div id="popup_header" class="popup-header">
            <h3>Estadísticas</h3>
            <button id="btnMinimizarEstadisticas">_</button>
            <button id="btnCerrarEstadisticas">X</button>
        </div>
        <div id="contenido_estadisticas" class="popup-content"></div>
        <button id="btnDescargarPuntos">Descargar puntos GeoJSON</button>

    </div>

    <div id="infoDibujo" class="floating-box1" style="display:none;">
        <button class="close-btn" onclick="document.getElementById('infoDibujo').style.display='none'">×</button>
        <div id="infoContenido"></div>
    </div>

  <!--Cargar un kmz-->

  <input type="file" id="fileInput" accept=".kml,.kmz" style="display:none;" />

  <div id="mouse-position" style="
      position: absolute;
      bottom: 50px;
      right: 10px;
      background: rgba(255, 255, 255, 0.8);
      padding: 4px 8px;
      font-family: sans-serif;
      font-size: 13px;
      border-radius: 4px;
      border: 1px solid #ccc;
      z-index: 999;
  "></div>

  <!-- Ventana flotante: Consultas -->
  <div id="ventana-consultas" class="ventana-flotante" style="display: none; position: absolute; top: 100px; left: 100px; border: 1px solid #ccc; background: white; width: 400px; box-shadow: 0 0 10px rgba(0,0,0,0.2);">
    <div id="header-consultas" style="cursor: move; background: #aaa; color: white; padding: 5px 10px; display: flex; justify-content: space-between; align-items: center;">
      <span>Consultas</span>
      <div>
        <button id="minimizar-consultas" style="margin-right: 5px;">_</button>
        <button id="cerrar-consultas">×</button>
      </div>
    </div>
    <div id="contenido-consultas" style="padding: 10px;">
  
    </div>
  </div>
  <!-- Ventana flotante: Consultas_estandar -->

  <div id="ventana-formulario" class="ventana-flotante" style="display: none; position: absolute; top: 100px; left: 100px; border: 1px solid #ccc; background: white; width: 400px; box-shadow: 0 0 10px rgba(0,0,0,0.2);">
    <div id="ventana-formulario-header" class="ventana-header">
      <span>Formulario de Busqueda</span>
      <button onclick="cerrarFormulario()">X</button>
    </div>
    <form id="formulario-dinamico" class="ventana-contenido"></form>
    <div style="padding: 10px;">
      <button type="button" onclick="cerrarFormulario()">Cerrar</button>
      <button type="button" onclick="consultarDatos()">Consultar</button>
    </div>
  </div>

  <div id="ventana-resultados" class="ventana-flotante" style="display: none; position: absolute; top: 100px; left: 100px; border: 1px solid #ccc; background: white; width: 400px; box-shadow: 0 0 10px rgba(0,0,0,0.2);">
    <div id="ventana-header" style="cursor: move; background: #aaa; color: white; padding: 5px 10px; display: flex; justify-content: space-between; align-items: center;">
      <span>📊 Resultados Estadísticos </span>
      <div>
        <button onclick="minimizarVentanaResultados() " style="margin-right: 5px;" >–</button>
        <button onclick="cerrarVentanaResultados()">X</button>
      </div>
    
    </div>
    <button onclick="descargarXLS()">📥 Descargar XLS</button>
     <button onclick="identificarObjetosEnMapa(window.ultimaDataWFS)">🧭 Identificar</button>
    <div id="contenido-resultados" class="ventana-contenido">
    </div>
  </div>

  <div id="resultados-estadisticas"></div>

<div id="infoWindow" class="window">
  <div id="ventana_header">
    Atributo Objeto seleccionado
    <span id="closeBtn" class="closeBtn">✖</span>
  </div>
  
  <!-- Barra de pestañas -->
  <div id="tabs" class="tabBar">
    <button class="tabBtn active" data-tab="tab1">Atributos</button>
    <button class="tabBtn" data-tab="tab2">Acciones</button>
  </div>
  
  <!-- Contenido de pestañas -->
  <div id="tabContents">
    <div id="tab1" class="tabContent active">
      <!-- Aquí va el contenido de atributos -->
      <p>Detalles del objeto seleccionado...</p>
    </div>
    <div id="tab2" class="tabContent">
      <!-- Pestaña con botones -->
      <button onclick="accion1()">Acción 1</button>
      <button onclick="accion2()">Acción 2</button>
      <button onclick="accion3()">Acción 3</button>
    </div>
  </div>
</div>

  <!--Factibilidad-->

<!-- Ventana flotante para resultados de consulta espacial -->
<div id="popupResultadosEspacial" style="display:none; position:fixed; top:50px; right:50px; width:400px; max-height:70%; overflow:auto; background:#fff; border:2px solid #444; border-radius:8px; box-shadow:0 4px 8px rgba(0,0,0,0.3); z-index:1000; padding:10px; cursor:move;">
    <div id="headerPopupResultadosEspacial" style="display:flex; justify-content:space-between; align-items:center;box-shadow:0 4px 8px rgba(0,0,0,0.3); margin-bottom:10px; cursor:move;">
        <h3 style="margin:0; font-size:16px;">Consulta Poligono</h3>
        <button id="cerrarPopupResultadosEspacial" style="cursor:pointer; background:#f44336; color:white; border:none; border-radius:4px; padding:2px 6px;">X</button>
    </div>
    <div id="contenidoPopupResultadosEspacial" style="font-size:14px;"></div>
</div>

<!-- Prueba de  factilidad-->
 <div id="ventanaVPruebas" style="
    display:none;
    position:absolute;
    top:120px;
    left:120px;
    width:300px;
    background:white;
    border-radius:10px;
    box-shadow:0 5px 15px rgba(0,0,0,0.3);
    z-index:9999;
    overflow:hidden;
    font-family:Arial, sans-serif;
">

    <!-- Header Arrastrable -->
    <div id="headerVPruebas" style="
        background:#2c3e50;
        color:white;
        padding:10px;
        cursor:move;
        font-weight:bold;
        text-align:center;
    ">
        Verificación de Pruebas
        <span onclick="cerrarVPruebas()" style="
            float:right;
            cursor:pointer;
            font-weight:bold;
        ">X</span>
    </div>

    <!-- Contenido -->
    <div style="padding:15px; display:flex; flex-direction:column; gap:10px;">


     <button id="btnMostrarFolio">Buscar Folio</button>

    </div>

<div id="contenedorFolio" style="display:none; margin-top:8px;"><hr>
    <input type="text" id="inputFolio" placeholder="Ingrese folio..." style="padding:5px; width:150px;">
    <button id="btnBuscarFolio">Buscar</button>
</div>

<div id="modalPDF" style="
    display:none;
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.7);
    z-index:9999;
">

    <div style="
        position:absolute;
        top:5%;
        left:5%;
        width:90%;
        height:90%;
        background:white;
        border-radius:8px;
        overflow:hidden;
    ">

        <button onclick="cerrarModalPDF()" 
            style="position:absolute; right:10px; top:10px; z-index:10;">
            X
        </button>

        <iframe id="visorPDF" 
            style="width:100%; height:100%; border:none;">
        </iframe>

    </div>
</div>
</div>



<!-- =====================================================
     PANEL FLOTANTE
===================================================== -->


<!-- =====================================================
     PANEL FLOTANTE
===================================================== -->

<div id="panelNavegacion" style="display:none;">

    <div id="tituloNav">

        <span>🧭 Navegación</span>

        <button id="cerrarNav">
            ✖
        </button>

    </div>

    <div class="contenidoNav">

        <button id="btnSeleccionarDestino">
            📍 Seleccionar destino
        </button>

        <button id="btnLimpiarRuta">
            🗑 Limpiar ruta
        </button>

        <button id="btnDetenerGPS">
            ⛔ Detener GPS
        </button>

    </div>

</div>



