<?php
require '../../conexion.php';
session_start();

if(!isset($_SESSION['desarrollador_id'])){
    die("No autorizado");
}

$dev_id = $_SESSION['desarrollador_id'];
$empresa = $_SESSION['nombre_empresa'] ?? $_SESSION['usuario'];

$stmt = $pdo->prepare("
    SELECT id,nombre_desarrollo,municipio,localidad
    FROM dexterno_ap.desarrollos
    WHERE desarrollador_id=?
    ORDER BY nombre_desarrollo
");
$stmt->execute([$dev_id]);
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Dashboard GIS Desarrollador</title>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@v7.5.2/ol.css">
<script src="https://cdn.jsdelivr.net/npm/ol@v7.5.2/dist/ol.js"></script>

<style>
body{
    font-family:Arial;
    margin:0;
    background:#f4f6f9
}

header{
    background:#0b3d91; color:#fff; padding:15px
}

.container{
    padding:20px
}

/* 🔥 SOLO inputs de texto */
input[type="text"]{
    /* your styles here */
    border: 2px solid #ccc;
    padding: 10px;
    font-size: 16px;
},
input[type="number"],
input[type="date"]{
    width:100%; padding:10px; margin-bottom:10px;
}

/* 🔥 FIX IMPORTANTE */
input[type="checkbox"]{
    width:auto; margin:0;
}

/* TABLAS */
table{
    width:100%; border-collapse:collapse; background:#fff
}

th,td{
    border:1px solid #ddd;  padding:8px;  text-align:left
}

th{
    background:#0b3d91; color:#fff
}

/* BOTONES */
button{
    padding:7px 12px; background:#0b3d91; color:#fff; border:none; cursor:pointer; border-radius:4px;
}

button:hover{
    background:#082d6b
}

/* MODAL */
#listaCargas{margin-top:20px}

#visorModal{
    display:none;
    position:fixed;
    top:0;left:0;
    width:100%;height:100%;
    background:rgba(0,0,0,0.7);
    z-index:9999;
}

#visorBox{
    position:absolute;
    top:4%;
    left:4%;
    width:92%;
    height:92%;
    background:#fff;
    border-radius:10px;
    overflow:hidden;
}

#map{
    width:100%;
    height:100%
}

.cerrar{
    position:absolute;
    top:10px;
    right:10px;
    z-index:99999;
    background:red;
}

/* PANEL CAPAS */
#panelCapas{
    position:absolute;
    top:15px;
    left:15px;
    z-index:99999;
    background:#fff;
    padding:12px;
    border-radius:10px;
    box-shadow:0 2px 15px rgba(0,0,0,.35);
    font-size:13px;
    width:220px;
    max-height:85%;
    overflow:auto;
    text-align:left; /* 🔥 clave */
}

/* TITULOS */
.grupoTitulo{
    font-weight:bold;
    cursor:pointer;
    margin-top:10px;
    background:#4bbcd8;
    color:#fff;
    padding:6px;
    border-radius:5px;
}

/* CONTENEDOR DE CAPAS */
.grupoCapas{
    padding:8px;
    display:block;
    margin-left:0;
}

/* CHECKBOX BIEN ALINEADO */
.check-item{
    display:flex;
    align-items:center; /* 🔥 FIX */
    gap:8px;
    padding:3px 0;
    cursor:pointer;
}

/* TEXTO */
.check-item span{
    text-align:left;
}

/* HOVER PRO */
.check-item:hover{
    background:#f1f1f1;
    border-radius:4px;
}

/* BOTON EXTRA */
#btnPrueba{
    width:100%; margin-top:10px; background:#28a745;
}

#btnPrueba:hover{
    background:#1f7d34;
}
</style>
</head>
<body>

<header>
<h2>Dashboard GIS Desarrollador - <?php echo $empresa; ?></h2>
</header>
<br>
<hr>
  </button>
      <a href="../index.php"><button>Volver</button></a><br>
      <hr>
<div class="container">

<input type="text" id="filtro"  placeholder="Buscar desarrollo...">
<hr>
<table id="tablaDes">
<tr>
<th>Desarrollo</th>
<th>Municipio</th>
<th>Localidad</th>
<th>GIS</th>
</tr>

<?php foreach($rows as $r){ ?>
<tr>
<td><?= $r['nombre_desarrollo'] ?></td>
<td><?= $r['municipio'] ?></td>
<td><?= $r['localidad'] ?></td>
<td>
<button onclick="verCargas(
    <?= $r['id'] ?>,
    '<?= addslashes($r['nombre_desarrollo']) ?>'
)">Ver Cargas GIS</button>
</td>
</tr>
<?php } ?>
</table>

<div id="listaCargas"></div>

</div>

<div id="visorModal">
    <div id="visorBox">
        <button class="cerrar" onclick="cerrarVisor()">Cerrar</button>

        <div id="map"></div>

<div id="panelCapas">

    <h3>Capas GIS</h3>

<div class="grupoTitulo" onclick="toggleGrupo('aguaGroup')">▶ Agua Potable</div>

<div id="aguaGroup" class="grupoCapas">
    <div class="check-item">
        <input type="checkbox" id="cana_ap" checked onchange="toggleCapa('cana_ap')">
        <label for="cana_ap">Lineas AP</label>
    </div>

    <div class="check-item">
        <input type="checkbox" id="cana_cv" checked onchange="toggleCapa('cana_cv')">
        <label for="cana_cv">Cajas de Valvulas</label>
    </div>

    <div class="check-item">
        <input type="checkbox" id="cana_val" checked onchange="toggleCapa('cana_val')">
        <label for="cana_val">Valvulas</label>
    </div>

    <div class="check-item">
        <input type="checkbox" id="cana_nodo" checked onchange="toggleCapa('cana_nodo')">
        <label for="cana_nodo">Nodos (Accesorios)</label>
    </div>
</div>


<div class="grupoTitulo" onclick="toggleGrupo('assGroup')">▶ Descarga Sanitaria</div>

<div id="assGroup" class="grupoCapas">
    <div class="check-item">
        <input type="checkbox" id="ass_cana" checked onchange="toggleCapa('ass_cana')">
        <label for="ass_cana">Lineas DS</label>
    </div>

    <div class="check-item">
        <input type="checkbox" id="ass_cv" checked onchange="toggleCapa('ass_cv')">
        <label for="ass_cv">Cajas de Valvulas</label>
    </div>

   

    <div class="check-item">
        <input type="checkbox" id="ass_pv" checked onchange="toggleCapa('ass_pv')">
        <label for="ass_pv">pozos de Visita</label>
    </div>

    <div class="check-item">
        <input type="checkbox" id="ass_val" checked onchange="toggleCapa('ass_val')">
        <label for="ass_val">Valvulas</label>
    </div>
</div>

    
    <hr>

    <button onclick="activarSeleccionPrueba()" style="top:10px;left:10px;z-index:99999;background:#28a745;">Seleccionar Área</button>


    
</div>





    </div>

</div>

<script>
let map=null;
let capas={};
let capasVectoriales=[];
let sourceGeneral=null;
let sourceCroquis = new ol.source.Vector();
let layerCroquis = new ol.layer.Vector({
 source:sourceCroquis,
 style:new ol.style.Style({
   stroke:new ol.style.Stroke({color:'#ff0000',width:3}),
   fill:new ol.style.Fill({color:'rgba(255,0,0,0.08)'})
 })
});
/*===============================
FILTRO DESARROLLO
===============================*/
document.getElementById('filtro').addEventListener('keyup',function(){
    let v=this.value.toLowerCase();
    document.querySelectorAll('#tablaDes tr').forEach((tr,i)=>{
        if(i===0)return;
        tr.style.display = tr.innerText.toLowerCase().includes(v)?'':'none';
    });
});

/*===============================
CONSULTAR CARGAS APROBADAS
===============================*/
let desarrolloSeleccionado = null;

function verCargas(idDesarrollo, nombreDesarrollo){

    desarrolloSeleccionado = {
        id: idDesarrollo,
        nombre: nombreDesarrollo
    };

    fetch(
        'obtener_cargas_desarrollo.php?desarrollo='
        + encodeURIComponent(nombreDesarrollo)
    )
    .then(r=>r.text())
    .then(html=>{
        document.getElementById('listaCargas').innerHTML = html;
    });
}

/*===============================
ESTILO POR TABLA
===============================*/
function estiloPorNombre(nombre){

    let c='#000000';

    if(nombre==='cana_ap') c='#0066ff';
    if(nombre==='cana_cv') c='#00aa00';
    if(nombre==='cana_val') c='#ff0000';
    if(nombre==='cana_nodo') c='#ff8800';
    if(nombre==='ass_cana') c='#8000ff';
    if(nombre==='ass_cv') c='#00cccc';
    if(nombre==='ass_nodo') c='#cccc00';
    if(nombre==='ass_pv') c='#ff33aa';
    if(nombre==='ass_val') c='#8B4513';

    return new ol.style.Style({
        stroke:new ol.style.Stroke({color:c,width:2}),
        fill:new ol.style.Fill({color:'rgba(0,0,0,0.03)'}),
        image:new ol.style.Circle({
            radius:4,
            stroke:new ol.style.Stroke({color:c,width:2})
        })
    });
}

/*===============================
ABRIR VISOR GIS
===============================*/
function abrirVisor(idCarga){

    document.getElementById('visorModal').style.display='block';

    resetChecksCapas();
    capas = {};
    capasVectoriales = [];

    setTimeout(()=>{

        if(map){
            map.setTarget(null);
            document.getElementById('map').innerHTML='';
        }

        map = new ol.Map({
            target:'map',
            layers:[
                new ol.layer.Tile({source:new ol.source.OSM()})
            ],
            view:new ol.View({
                center:ol.proj.fromLonLat([-86.85,21.15]),
                zoom:13
            })
        });

        let listaCapas = [
            'cana_ap','cana_cv','cana_val','cana_nodo',
            'ass_cana','ass_cv','ass_nodo','ass_pv','ass_val'
        ];

        listaCapas.forEach(nombre=>{

            let source = new ol.source.Vector({
                url:'ver_capa.php?id='+idCarga+'&tabla='+nombre,
                format:new ol.format.GeoJSON()
            });

            let layer = new ol.layer.Vector({
                source:source,
                visible:true,
                style:()=>estiloPorNombre(nombre)
            });

            capas[nombre] = layer;
            capasVectoriales.push(layer);

            map.addLayer(layer);

            source.once('change',function(){
                if(source.getState()==='ready' && source.getFeatures().length>0){
                    map.getView().fit(source.getExtent(),{
                        padding:[40,40,40,40],
                        duration:800
                    });
                }
            });

        });

    },200);
}


function toggleCapa(nombre){
    if(capas[nombre]){
        let visible = capas[nombre].getVisible();
        capas[nombre].setVisible(!visible);
    }
}

function resetChecksCapas(){
    document.querySelectorAll('#panelCapas input[type=checkbox]').forEach(ch=>{
        ch.checked = true;
    });
}

/*===============================
CERRAR VISOR
===============================*/
function cerrarVisor(){
    document.getElementById('visorModal').style.display='none';
    if(map){ map.setTarget(null); }
}

function toggleGrupo(id){
    let div = document.getElementById(id);
    div.style.display = (div.style.display==='none') ? 'block' : 'none';
}

function activarSeleccionPrueba(){

    sourceCroquis.clear();

    if(window.drawSeleccion){
        map.removeInteraction(window.drawSeleccion);
    }

    let drawSource = new ol.source.Vector();

    window.drawSeleccion = new ol.interaction.Draw({
        source: drawSource,
        type:'Polygon'
    });

    map.addInteraction(window.drawSeleccion);

    window.drawSeleccion.on('drawend',function(e){

        let poligono = e.feature.getGeometry();
        let seleccionadas = [];

        capasVectoriales.forEach(function(capa){

            if(!capa.getVisible()) return;

            capa.getSource().forEachFeature(function(f){

                if(poligono.intersectsExtent(f.getGeometry().getExtent())){
                    seleccionadas.push(f);
                }

            });

        });

        if(seleccionadas.length===0){
            alert('No se encontraron elementos');
            map.removeInteraction(window.drawSeleccion);
            return;
        }

        // Dibujar croquis
        sourceCroquis.clear();
        sourceCroquis.addFeature(e.feature);

        // Guardar en localStorage
        let geojson = new ol.format.GeoJSON().writeFeatures(seleccionadas,{
            dataProjection:'EPSG:4326',
            featureProjection:map.getView().getProjection()
        });

        localStorage.setItem('croquisSeleccion', geojson);

        // 🔥 MOSTRAR CONFIRMACIÓN
        let total = seleccionadas.length;

        let continuar = confirm(
            "Se seleccionaron " + total + " elementos.\n\n¿Deseas generar la solicitud de prueba?"
        );

        if(continuar){
            abrirVerificacion();
        }

        map.removeInteraction(window.drawSeleccion);

    });
}
function vpruebas(){ window.open('sppgdes/g_vpgrapds.php','_blank'); }
function abrirVerificacion(){

    if(!desarrolloSeleccionado){
        alert("Seleccione un desarrollo");
        return;
    }

    const url =
        "vpgrapds/fact3.php" +
        "?desarrollo_id=" + desarrolloSeleccionado.id +
        "&nombre=" + encodeURIComponent(desarrolloSeleccionado.nombre);

    window.open(url, "_blank");
}
</script>

</body>
</html>