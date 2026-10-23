var map = new ol.Map({target:'map',layers:[new ol.layer.Tile({source:new ol.source.OSM()})],view:new ol.View({center:ol.proj.fromLonLat([-86.85,21.16]),zoom:11})});
var capaPreview=null;

function seleccionarTodos(chk){document.querySelectorAll('input[name="carga[]"]').forEach(c=>c.checked=chk.checked);}

function verMapa(id)
{fetch('../ver_capa.php?id='+id).then(r=>r.json()).then(data=>{if(capaPreview){map.removeLayer(capaPreview);
}var features=new ol.format.GeoJSON().readFeatures(data,{dataProjection:'EPSG:4326',featureProjection:'EPSG:3857'});
capaPreview=new ol.layer.Vector({source:new ol.source.Vector({features:features}),style:function(feature){return new ol.style.Style({stroke:new ol.style.Stroke({color:'#ff0000',width:2}),fill:new ol.style.Fill({color:'rgba(255,0,0,0.15)'}),image:new ol.style.Circle({radius:4,fill:new ol.style.Fill({color:'#ff0000'})})});}});
map.addLayer(capaPreview);
if(features.length>0){map.getView().fit(capaPreview.getSource().getExtent(),{padding:[30,30,30,30],duration:1000,maxZoom:19});
}});
document.getElementById('mapPanel').style.display='block';}

function aprobarFicha(folio) {
    if(confirm('¿Aprobar esta ficha?')) {
        fetch('../aprobar_ficha.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ folio: folio, accion: 'aprobar' })
        })
        .then(r => r.json())
        .then(data => {
            if(data.success) {
                alert('Ficha aprobada correctamente');
                location.reload();
            } else {
                alert('Error: ' + data.error);
            }
        });
    }
}

function rechazarFicha(folio) {
    let motivo = prompt('Ingrese el motivo del rechazo:');
    if(motivo) {
        fetch('../aprobar_ficha.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ folio: folio, accion: 'rechazar', motivo: motivo })
        })
        .then(r => r.json())
        .then(data => {
            if(data.success) {
                alert('Ficha rechazada');
                location.reload();
            } else {
                alert('Error: ' + data.error);
            }
        });
    }
}

function generarPDF(folio) {
    window.open('../generar_pdf_ficha.php?folio=' + encodeURIComponent(folio), '_blank');
}

(function(){let panel=document.getElementById('mapPanel');let header=document.getElementById('mapHeader');let isDown=false,offsetX,offsetY;header.onmousedown=function(e){isDown=true;offsetX=e.clientX-panel.offsetLeft;offsetY=e.clientY-panel.offsetTop;} ;window.onmouseup=function(){isDown=false;} ;window.onmousemove=function(e){if(!isDown) return;panel.style.left=(e.clientX-offsetX)+'px';panel.style.top=(e.clientY-offsetY)+'px';panel.style.right='auto';panel.style.bottom='auto';}})();

//-------------

function toggleMaximizar(){

    let panel = document.getElementById('mapPanel');
    let btn = document.getElementById('btnMax');

    panel.classList.toggle('maximizado');

    if(panel.classList.contains('maximizado')){
        btn.innerHTML='🗗';
    }else{
        btn.innerHTML='🗖';
    }

    setTimeout(function(){
        map.updateSize();
    },300);
}

function mostrarTab(id,btn){

    document.querySelectorAll('.tab-content')
    .forEach(tab=>{
        tab.classList.remove('active');
    });

    document.querySelectorAll('.tab-btn')
    .forEach(b=>{
        b.classList.remove('active');
    });

    document.getElementById(id)
    .classList.add('active');

    btn.classList.add('active');

    setTimeout(function(){
        if(typeof map !== 'undefined'){
            map.updateSize();
        }
    },200);
}

/* ========================= */
/* MAPA OPENLAYERS */
/* ========================= */

var map = new ol.Map({

    target:'map',

    layers:[
        new ol.layer.Tile({
            source:new ol.source.OSM()
        })
    ],

    view:new ol.View({
        center:ol.proj.fromLonLat([-86.85,21.16]),
        zoom:11
    })

});

/* ========================= */
/* SELECCIONAR TODOS */
/* ========================= */

function seleccionarTodos(chk){

    document
    .querySelectorAll('input[name="carga[]"]')
    .forEach(c=>c.checked=chk.checked);

}