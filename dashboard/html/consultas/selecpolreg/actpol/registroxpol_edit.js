let cambiosElementos = {
    agregar: [],
    eliminar: []
};

proj4.defs(
    "EPSG:32616",
    "+proj=utm +zone=16 +datum=WGS84 +units=m +no_defs"
);

ol.proj.proj4.register(
    proj4
);

const proj32616 =    ol.proj.get("EPSG:32616"   );
proj32616.setExtent([
    166021,
    0,
    833978,
    9329005

]);

const osm = new ol.layer.Tile({
    source:new ol.source.OSM()
});

const urlGeoServer =
    "https://dhcqgis.aguakan.com/geoserver/DHC_AGUAKAN/ows?";

function crearCapaWFS(
    layerName,
    visible=true,
    labelField="sm"
){

    return new ol.layer.Vector({
        visible:visible,
        source:new ol.source.Vector({
            format:new ol.format.GeoJSON(),
            url:function(extent){
                return (

                    urlGeoServer +
                    "service=WFS" +
                    "&version=1.0.0" +
                    "&request=GetFeature" +
                    "&typeName=" + layerName +
                    "&outputFormat=application/json" +
                    "&srsname=EPSG:3857" +
                    "&bbox=" +
                    extent.join(",") +
                    ",EPSG:3857"
                );

            },

            strategy:
                ol.loadingstrategy.bbox
        }),
        style:function(feature){
            return new ol.style.Style({
                stroke:new ol.style.Stroke({
                    color:"#666",
                    width:1
                }),
                fill:new ol.style.Fill({
                    color:"rgba(0,0,0,0.05)"
                }),
                text:new ol.style.Text({
                    text:
                        feature.get(labelField)
                        ? feature
                            .get(labelField)
                            .toString()
                        : "",
                    font:"11px Arial",
                    fill:new ol.style.Fill({
                        color:"#000"
                    }),
                    stroke:new ol.style.Stroke({
                        color:"#fff",
                        width:3
                    })
                })
            });
        }
    });
}

const sm_bj =
    crearCapaWFS(
        "DHC_AGUAKAN:SM_BJ",
        true,
        "sm"
    );
const sm_sol =
    crearCapaWFS(
        "DHC_AGUAKAN:SM_SOL",
        true,
        "sm"
    );
const sm_pm =
    crearCapaWFS(
        "DHC_AGUAKAN:SM_PM",
        true,
        "sm"
    );
const sm_lv =
    crearCapaWFS(
        "DHC_AGUAKAN:SM_LV",
        false,
        "sm"
    );
const sm_im =
    crearCapaWFS(
        "DHC_AGUAKAN:SM_IM",
        true,
        "sm"
    );
const vectorSeleccion =
    new ol.source.Vector();

const layerSeleccion =
    new ol.layer.Vector({
        source:vectorSeleccion,
        style:new ol.style.Style({
            stroke:new ol.style.Stroke({
                color:"#ff0000",
                width:3
            }),
            fill:new ol.style.Fill({
                color:"rgba(255,0,0,0.2)"
            })
        })
    });
const fuenteAfectacion =
    new ol.source.Vector();
const layerAfectacion =
    new ol.layer.Vector({
        source:fuenteAfectacion,
        style:new ol.style.Style({
            stroke:new ol.style.Stroke({
                color:"#00BCD4",
                width:4
            }),
            fill:new ol.style.Fill({
                color:"rgba(0,188,212,0.2)"
            })
        })
    });
const map = new ol.Map({
    target:"map",
    layers:[
        osm,
        sm_bj,
        sm_sol,
        sm_pm,
        sm_lv,
        sm_im,
        layerAfectacion,
        layerSeleccion
    ],
    view:new ol.View({
        center:
            ol.proj.fromLonLat(
                [-86.85,21.16]
            ),
        zoom:11
    })

});
let seleccionActiva = false;
let seleccionados = [];
let clonesSeleccion = {};
let featureAfectacion = null;
const capasSeleccionables = [sm_bj,sm_sol,sm_pm,sm_lv,sm_im];

//
function obtenerSMSeleccionadas(){

    return seleccionados.map(obj => {

        let tipo = "";

        const layer = obj.layer;

        if(layer === sm_bj) tipo = "SM_BJ";
        else if(layer === sm_sol) tipo = "SM_SOL";
        else if(layer === sm_pm) tipo = "SM_PM";
        else if(layer === sm_lv) tipo = "SM_LV";
        else if(layer === sm_im) tipo = "SM_IM";

        return {
            tipo: tipo,
            valor: obj.feature.get("sm")?.toString().trim()
        };

    }).filter(obj => obj.valor);
}

function actualizarElementosAfectados(accion){

    if(!featureAfectacion) return;

    const seleccionadosSM = obtenerSMSeleccionadas();

    if(accion === "agregar"){

        seleccionadosSM.forEach(nuevo => {

            const yaEnAgregar = cambiosElementos.agregar.some(a =>
                a.tipo === nuevo.tipo &&
                a.valor === nuevo.valor
            );

            const enEliminar = cambiosElementos.eliminar.findIndex(e =>
                e.tipo === nuevo.tipo &&
                e.valor === nuevo.valor
            );

            // si estaba en eliminar, lo quitamos
            if(enEliminar !== -1){
                cambiosElementos.eliminar.splice(enEliminar, 1);
                return;
            }

            if(!yaEnAgregar){
                cambiosElementos.agregar.push(nuevo);
            }
        });
    }

    else if(accion === "eliminar"){

        seleccionadosSM.forEach(sel => {

            const yaEnEliminar = cambiosElementos.eliminar.some(e =>
                e.tipo === sel.tipo &&
                e.valor === sel.valor
            );

            const enAgregar = cambiosElementos.agregar.findIndex(a =>
                a.tipo === sel.tipo &&
                a.valor === sel.valor
            );

            // si estaba en agregar lo quitamos
            if(enAgregar !== -1){
                cambiosElementos.agregar.splice(enAgregar, 1);
                return;
            }

            if(!yaEnEliminar){
                cambiosElementos.eliminar.push(sel);
            }
        });
    }

    console.log("CAMBIOS:", cambiosElementos);
}

function getFeatureKey(feature,layer){

    return (
        layer.ol_uid +
        "_" +
        feature.ol_uid
    );
}

function activarSeleccion(){
    seleccionActiva = true;
    alert(
        "Seleccione polígonos"
    );
}
function limpiarSeleccion(){
    seleccionados = [];
    clonesSeleccion = {};
    vectorSeleccion.clear();
    seleccionActiva = false;
}

map.on(
    "singleclick",
    function(evt){
        if(!seleccionActiva)
            return;
        map.forEachFeatureAtPixel(
            evt.pixel,
            function(feature,layer){
                if(
                    !capasSeleccionables
                    .includes(layer)
                ){
                    return false;
                }
                const key =
                    getFeatureKey(
                        feature,
                        layer
                    );
                const existe =
                    seleccionados.find(

                        obj =>
                        obj.key === key
                    );
                            if(existe){
                    seleccionados =
                        seleccionados.filter(
                            obj =>
                            obj.key !== key
                        );
                    if(
                        clonesSeleccion[key]
                    ){
                        vectorSeleccion
                        .removeFeature(
                            clonesSeleccion[key]
                        );
                        delete clonesSeleccion[key];
                    }
                }
                               else{
                    seleccionados.push({
                        key:key,
                        feature:feature,
                        layer:layer
                    });
                    const clon =
                        feature.clone();
                    clonesSeleccion[key] =
                        clon;
                    vectorSeleccion
                    .addFeature(clon);
                }
                return true;
            }
        );
    }
);
//
function cargarGeometriaAfectacion(feature){

    fuenteAfectacion.clear();

    featureAfectacion = feature.clone();

    let elementos = feature.get("elementos_afectados");

    if(typeof elementos === "string"){
        try{
            elementos = JSON.parse(elementos);
        }catch(e){
            elementos = [];
        }
    }

    if(!Array.isArray(elementos)){
        elementos = [];
    }

    // 🔥 fuente única de verdad
    bufferElementos = elementos;

    featureAfectacion.set(
        "elementos_afectados",
        bufferElementos
    );

    fuenteAfectacion.addFeature(featureAfectacion);
}

function unirGeometrias(){
    if(!featureAfectacion){
        alert("No existe afectación");
        return;
    }
    if(seleccionados.length===0){
        alert("Seleccione polígonos");
        return;
    }
    try{
        const parser = new jsts.io.OL3Parser();
        const TOLERANCIA = 0.0001;
               
        let todasGeometrias = [];
        let geomBase = parser.read(featureAfectacion.getGeometry());
        todasGeometrias.push(geomBase);
        
        
        for(let obj of seleccionados){
            let geomSel = parser.read(obj.feature.getGeometry());
            todasGeometrias.push(geomSel);
        }
        
       
        function limpiar(geom) {
            try {
              
                let cleaned = geom.buffer(0);
                // Pequeño buffer para suavizar
                cleaned = cleaned.buffer(TOLERANCIA);
                cleaned = cleaned.buffer(-TOLERANCIA);
                return cleaned;
            } catch(e) {
                console.warn("Error limpiando geometría:", e);
                return geom;
            }
        }
        
        // Limpiar todas las geometrías individualme
        todasGeometrias = todasGeometrias.map(g => limpiar(g));
        
        
        let resultado = todasGeometrias[0];
        
        for(let i = 1; i < todasGeometrias.length; i++) {
            try {
                resultado = resultado.union(todasGeometrias[i]);
                resultado = limpiar(resultado);
            } catch(e) {
                console.error(`Error uniendo geometría ${i}:`, e);
                
                // Si falla, intentar con buffer más grande
                try {
                    let bufResultado = resultado.buffer(TOLERANCIA * 5);
                    let bufGeom = todasGeometrias[i].buffer(TOLERANCIA * 5);
                    resultado = bufResultado.union(bufGeom);
                    resultado = resultado.buffer(-TOLERANCIA * 5);
                    resultado = limpiar(resultado);
                } catch(e2) {
                    throw new Error(`No se pudo unir la geometría ${i}: ${e2.message}`);
                }
            }
        }
        
        if(resultado.isEmpty()) {
            throw new Error("La geometría resultante está vacía");
        }
        
        const nuevaGeom = parser.write(resultado);
        
        featureAfectacion.setGeometry(nuevaGeom);
        actualizarElementosAfectados("agregar");
        
        fuenteAfectacion.clear();
        fuenteAfectacion.addFeature(featureAfectacion);
        limpiarSeleccion();
        alert("Polígonos integrados correctamente");
        
    } catch(err){
        console.error("Error detallado en unión:", err);
        alert("Error al unir polígonos: " + err.message);
    }}

function eliminarGeometrias(){
    if(!featureAfectacion){
        alert("No existe afectación");
        return;
    }
    if(seleccionados.length===0){
        alert("Seleccione polígonos");
        return;
    }
    try{
        const parser = new jsts.io.OL3Parser();
        const TOLERANCIA = 0.0001;
        
        let geomBase = parser.read(featureAfectacion.getGeometry());
        
        // Limpiar geometría base
        geomBase = geomBase.buffer(0);
        
        for(let obj of seleccionados){
            let geomSel = parser.read(obj.feature.getGeometry());
            geomSel = geomSel.buffer(0);
            
            if(!geomBase.intersects(geomSel)){
                console.warn("No intersecta, omitiendo");
                continue;
            }
            
            try {
                geomBase = geomBase.difference(geomSel);
                geomBase = geomBase.buffer(0); // Limpiar después de diferencia
                
                if(geomBase.isEmpty()){
                    throw new Error("La geometría quedó vacía");
                }
            } catch(e) {
                console.error("Error en diferencia:", e);
                // Si falla la diferencia, intentar con buffer pequeño
                let geomBaseBuf = geomBase.buffer(TOLERANCIA);
                let geomSelBuf = geomSel.buffer(TOLERANCIA);
                geomBase = geomBaseBuf.difference(geomSelBuf);
                geomBase = geomBase.buffer(-TOLERANCIA);
                geomBase = geomBase.buffer(0);
            }
        }
        
        const nuevaGeom = parser.write(geomBase);
        
        featureAfectacion.setGeometry(nuevaGeom);
        actualizarElementosAfectados("eliminar");
        
        fuenteAfectacion.clear();
        fuenteAfectacion.addFeature(featureAfectacion);
        limpiarSeleccion();
        alert("Polígonos eliminados correctamente");
        
    } catch(err){
        console.error("ERROR EN DIFERENCIA:", err);
        alert("Error al eliminar polígonos: " + err.message);
    }
}

//
async function guardarEdicionGeom(){

    const id = document.getElementById("idAfectacion").value;

    const clon = featureAfectacion.clone();

    clon.getGeometry().transform("EPSG:3857", "EPSG:32616");

    const geojson =
        new ol.format.GeoJSON().writeFeatureObject(clon);

    const payload = {

        id: id,

        geom: JSON.stringify(geojson.geometry),

        // 🔥 SOLO DIFERENCIAS
        agregar: cambiosElementos.agregar,
        eliminar: cambiosElementos.eliminar

    };

    const res = await fetch("update_geom_afectacion.php", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(payload)
    });

    const result = await res.json();

    if(result.status === "ok"){
        alert("Actualizado correctamente");

        // limpiar cambios después de guardar
        cambiosElementos = {agregar:[], eliminar:[]};
    }else{
        alert(result.detalle || "Error");
    }
}
//
