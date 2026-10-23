<script>

    function C_Tub() {window.location.href = "./consultas/C_Tub.php";}
    function infraAPDS() {window.location.href = "./consultas/infraAPDS.php";}
    function Admin() {window.location.href = "../html/consultas/usuario_nuevo.php";}
    function toggleDropdown(element) {
      const dropdown = element.nextElementSibling;
      const allDropdowns = document.querySelectorAll('.dropdown-content');
      allDropdowns.forEach(menu => {
      if (menu !== dropdown) menu.style.display = 'none';
      });
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }
      
    function Dash_dhc() {window.location.href = "./consultas/dash.php";}

     document.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      const menu = document.getElementById("contextMenu");
      menu.style.top = e.clientY + "px";
      menu.style.left = e.clientX + "px";
      menu.style.display = "block";
    });

      // Ocultar si se hace clic fuera

    document.addEventListener("click", function () {
      document.getElementById("contextMenu").style.display = "none";
    });
    let capaActiva = null;
    function cerrarVPruebas(){document.getElementById("ventanaVPruebas").style.display = "none";}

//Abrir página verificación
    function abrirVerificacion(){window.open("Consultas/vpgrapds/fact3.php", "_blank");}

//
    function abrirBuscarFolio(){window.open("buscar_folio_verificacion.php", "_blank");}
// afectacion

function afectacion() {window.location.href = "./consultas/afectacion.php";}
function registroxpol() {window.location.href = "./consultas/selecpolreg/registroxpol.php";}
function segregafec() {window.location.href = "./consultas/selecpolreg/segregafec.php";}
function cogeom() {window.location.href = "./consultas/selecpolreg/actpol/index.php";}
function bafectacion() {window.location.href = "./consultas/selecpolreg/consulta/index.php";}
function editcondominio() {window.location.href = "./consultas/editcond/editarcondominio.php";}


function altadesarrollador() {window.location.href = "./consultas/altadesarrollo.php";}

function admin_desa() {window.location.href = "../cargazip/admin_cargas/admin_cargas/index.php";}
 

    // function altadesarrollador(){window.open("consultas/altadesarrollo.php", "_blank");}

dragElement(document.getElementById("ventanaVPruebas"));
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var header = document.getElementById("headerVPruebas");

  header.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


// ===== MAPA CROQUIS =====
var sourceCroquis = new ol.source.Vector();

var layerCroquis = new ol.layer.Vector({
  source: sourceCroquis,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#ff0000',
      width: 2
    }),
    fill: new ol.style.Fill({
      color: 'rgba(255,0,0,0.1)'
    })
  })
});

var mapaUbicacion = new ol.Map({
  target: 'mapa-ubicacion',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    layerCroquis
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-86.85, 21.16]), // Cancún
    zoom: 13
  })
});

</script>

<script>

// Mostrar / ocultar caja de captura
document.getElementById("btnMostrarFolio")
    .addEventListener("click", function () {

        let contenedor = document.getElementById("contenedorFolio");

        if (contenedor.style.display === "none" || contenedor.style.display === "") {
            contenedor.style.display = "block";
        } else {
            contenedor.style.display = "none";
        }

    });



</script>
  <script src="resources/qgis2web_expressions.js"></script>
  <script src="resources/proj4.js"></script>
  <script>proj4.defs('EPSG:32616','+proj=utm +zone=16 +datum=WGS84 +units=m +no_defs');</script>
  <script src="resources/polyfills.js"></script>
  <script src="./resources/functions.js"></script>
  <script src="./resources/ol.js"></script>
  <script src="./resources/ol-layerswitcher.js"></script>
        
  <!-- Capas SOL -->

  <script src="layers/SM_SOL_1.js"></script>
  <script src="layers/Mza_sol_2.js"></script>
       
  <!-- Capas PM -->
          
  <script src="layers/Poligono_Actuacion_12.js"></script>
  <script src="layers/Sectores_PM_13.js"></script>
  <script src="layers/SM_Puerto_Morelos_14.js"></script>
  <script src="layers/Manzanas_PuertoMorelos_15.js"></script>
  <script src="layers/zones_22.js"></script>
        
	   
  <!-- Capas IM -->
       
  <!-- Capas BJ -->
    

  <!-- Capas Complementos -->
    
  <script src="layers/Agua_Superficial_2012_2013_1.js"></script>
  <script src="layers/Calidad_delagua_Subterranea_122023_2.js"></script>

  <!-- Capas Division Politica -->    

  <script src="layers/Quintana_Roo_1.js"></script>

  <!-- BJ -->

  <script src="styles/Lotes_BJ_style.js"></script>     
  <script src="styles/Zonas_captacion_29_style.js"></script>
  <script src="styles/Cobertura_Tanques_31_style.js"></script>
  <script src="styles/cobertura_linea_2026_1_style.js"></script>
  <script src="styles/Horario_Servicio_BJ_32_style.js"></script>
  <script src="styles/Conduccion_BJ_copy_1_style.js"></script>
  <script src="styles/Distribucion_BJ_copy_1_style.js"></script>
  <script src="styles/AEP_VANN_VALVULAS_5_style.js"></script>   
  <script src="styles/Tanques_34_style.js"></script>
  <script src="styles/pozos_captacion_35_style.js"></script>
  <script src="styles/P_Cloro_style.js"></script>
  <script src="styles/Tuberia_ASS_0_style.js"></script>
  <script src="styles/Carcamos_25_style.js"></script>
  <script src="styles/Emisores_26_style.js"></script>
  <script src="styles/colectores_26_style.js"></script>
  <script src="styles/pozos_colectores_27_style.js"></script>
  <script src="styles/Ptar_28_style.js"></script>
  <script src="styles/Cobertura_PTAR_BJ_0_style.js"></script>
  <script src="styles/Fact_Red_AP_style.js"></script>
  <script src="styles/nodos_style.js"></script>
  <script src="styles/Pol_Actuacion_BJ_style.js"></script>
  <script src="styles/Sectores_BJ_style.js"></script>
  <script src="styles/Tipo_de_afectacion_0_style.js"></script>
   <script src="styles/nivel_Tanques_34_style.js"></script>
  <script src="styles/Nivel_Carcamos_25_style.js"></script>
   <script src="styles/condominios_style.js"></script>
    <script src="styles/dhc_cobertura_style.js"></script>
    <script src="styles/dhc_cobertura_cland_style.js"></script>
         <script src="styles/dhc_sin_cobertura_style.js"></script>


  <!-- IM -->

  <script src="styles/Emisor_colector_37_style.js"></script>
  <script src="styles/Carcamos_38_style.js"></script>
  <script src="styles/Ptar_39_style.js"></script>
  <script src="styles/Pol_Carcamo_1_style.js"></script>
  <script src="styles/Conduccion_40_style.js"></script>
  <script src="styles/Tanques_41_style.js"></script>
  <script src="styles/Pol_Tanques_2_style.js"></script>
  <script src="styles/Carcamos_Proy_style.js"></script>

  <!-- PM -->

  <script src="styles/Emisor_Colector_16_style.js"></script>
  <script src="styles/Carcamo_17_style.js"></script>
  <script src="styles/Ptar_18_style.js"></script>
  <script src="styles/Conduccion_Distribucion_19_style.js"></script>
  <script src="styles/Tanques_20_style.js"></script>
  <script src="styles/VALVULAS_21_style.js"></script>
  <script src="styles/mza_lv_style.js"></script>
  <script src="styles/lote_lv_style.js"></script>

  <!-- SOL -->

  <script src="styles/Carcamos_3_style.js"></script>
  <script src="styles/Emisor_4_style.js"></script>
  <script src="styles/Colector_4_style.js"></script>
  <script src="styles/posos_colector_5_style.js"></script>
  <script src="styles/Ptar_6_style.js"></script>
  <script src="styles/SM_SOL_1_style.js"></script>
  <script src="styles/linea_Chemuyil_7_style.js"></script>
  <script src="styles/Conduccion_8_style.js"></script>
  <script src="styles/Tanques_9_style.js"></script>
  <script src="styles/Pozos_captacion_10_style.js"></script>
  <script src="styles/P_Osmosis_11_style.js"></script>
  <script src="styles/C_PTAR_2025_5_SOL_1_style.js"></script>
  <script src="styles/C_C_2025_5_SOL_1_style.js"></script>
  <script src="styles/C_T_2025_5_SOL_0_style.js"></script>
  <script src="styles/Cob_AP_PC_2026_1_style.js"></script>
		
  <!-- Complementos -->

  <script src="styles/BN_1_style.js"></script>
  <script src="styles/Agua_Superficial_2012_2013_1_style.js"></script>
  <script src="styles/Calidad_delagua_Subterranea_122023_2_style.js"></script>

  <!-- Division Politica -->    

  <script src="layers/Quintana_Roo_1.js"></script>
  <script src="styles/Quintana_Roo_1_style.js"></script>
  <script src="styles/Mza_sol_2_style.js"></script>
  <script src="styles/Poligono_Actuacion_12_style.js"></script>
  <script src="styles/Sectores_PM_13_style.js"></script>
  <script src="styles/SM_Puerto_Morelos_14_style.js"></script>
  <script src="styles/Manzanas_PuertoMorelos_15_style.js"></script>
  <script src="styles/zones_22_style.js"></script>
  <script src="styles/SM_23_style.js"></script>
  <script src="styles/Manzanas_BJ_24_style.js"></script>
  <script src="styles/Fact_Desarrollo_style.js"></script> 

<!-- otros -->    

 <script src="styles/cfe_style.js"></script>


  <script src="./layers/layers.js" type="text/javascript"></script> 
  <script src="./resources/Autolinker.min.js"></script>
  <script src="./resources/qgis2web.js"></script>

  <script>
/***************************************************************************
 * ACTUALIZADOR AUTOMÁTICO DE CAPAS WFS
 ***************************************************************************/

const capasActualizar = [

    {
        nombre: "Nivel_Tanques",
        layer: lyr_Nivel_Tanques_34,
        source: jsonSource_Nivel_Tanques_34,
        url:
        "https://dhcqgis.aguakan.com/geoserver/wfs?" +
        "service=WFS&version=1.0.0&request=GetFeature" +
        "&typeName=DHC_AGUAKAN:vw_tanques_nivel" +
        "&outputFormat=application/json" +
        "&srsname=EPSG:3857" +
        "&CQL_FILTER=estatus='Existente'"
    },

    {
        nombre: "Nivel_Carcamos",
        layer: lyr_Nivel_Carcamos_25,
        source: jsonSource_Nivel_Carcamos_25,
        url:
        "https://dhcqgis.aguakan.com/geoserver/wfs?" +
        "service=WFS&version=1.0.0&request=GetFeature" +
        "&typeName=DHC_AGUAKAN:vw_carcamo_nivel" +
        "&outputFormat=application/json" +
        "&srsname=EPSG:3857"
    }

];
</script>


  <script src="./consultas/b_Contrato.JS"></script>
  <script src="./consultas/b_SM.JS"></script>
    <script src="./consultas/b_condominio.js"></script>
  <script src="./consultas/Dibujo.js"></script>
  <script src="./consultas/C_E.js"></script>
  <script src="./consultas/cargar_kmz.js"></script>
  <script src="./consultas/ventana_C.js"></script>
  <script src="./consultas/C_Estandar1.js"></script>
  <script src="./consultas/C_Estandar2.js"></script>
  <script src="./consultas/C_Estandar3.js"></script>
  <script src="./consultas/Despliegue.js"></script>
  <script src="./consultas/Infraestructura.js"></script>
  <script src="./consultas/C_Linea.js"></script>
  <script src="./consultas/zoom1.js"></script>
  <script src="./Consultas/print.js"></script>
  <script src="./consultas/recorrido.js"></script>

  <script src="./consultas/etiqueta.js"></script>
  <script src="./consultas/buffer.js"></script>
  <script src="./consultas/ce2.js"></script>
  
<script src="./js_protegido.php?file=./consultas/Factibilidad.js"></script>
<script src="./js_protegido.php?file=./consultas/vpgrapds/g_vpgrapds.js"></script>
<script src="./js_protegido.php?file=./consultas/selecpolreg/segregafec.js"></script>
<script src="./js_protegido.php?file=./consultas/selecpolreg/registroxpol.js"></script>

<script>



function actualizarCapas() {

    console.log("=================================");
    console.log("Actualizando capas...");
    console.log("=================================");

    const formato = new ol.format.GeoJSON();

    capasActualizar.forEach(function(capa){

        if(!capa.layer.getVisible()){

            console.log(capa.nombre + " apagada.");

            return;

        }

        console.log(capa.nombre + " visible.");

        fetch(capa.url + "&_=" + Date.now(),{

            cache:"no-store"

        })

        .then(r=>r.json())

        .then(function(data){

            var features = formato.readFeatures(data,{

                featureProjection:"EPSG:3857"

            });

            capa.source.clear(true);

            capa.source.addFeatures(features);
            
        features.forEach(f => {

    console.log(
        f.get("tanques"),
        f.get("historic_level_percent")
    );

});
           capa.layer.getSource().changed();

            console.log(capa.nombre + " actualizada (" + features.length + " elementos)");

        })

        .catch(function(e){

            console.error(capa.nombre,e);

        });

    });

}

actualizarCapas();

setInterval(actualizarCapas, 600000);

const ZOOM_MAX_BASE = 19;

map.getView().on('change:resolution', function(){

    group_MAPA_BASE.setVisible(
        map.getView().getZoom() <= ZOOM_MAX_BASE
    );

});

</script>