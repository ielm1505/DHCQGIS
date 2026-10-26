const osm = new ol.layer.Tile({
    source:new ol.source.OSM()
});

const url_wfs =
    "https://dhcqgis.aguakan.com/geoserver/DHC_AGUAKAN/ows?";

// =======================================
// CREAR CAPA
// =======================================

function crearCapa(
    nombre,
    visible=true,
    campoLabel="nombre"
){

    return new ol.layer.Vector({

        visible:visible,

        source:new ol.source.Vector({

            url:function(extent){

                return url_wfs+

                    "service=WFS&version=1.0.0&request=GetFeature"+

                    "&typeName="+nombre+

                    "&outputFormat=application/json"+

                    "&srsname=EPSG:3857"+

                    "&bbox="+extent.join(",")+",EPSG:3857";

            },

            format:new ol.format.GeoJSON(),

            strategy:ol.loadingstrategy.bbox

        }),

        style:function(feature){

            return new ol.style.Style({

                stroke:new ol.style.Stroke({
                    color:"#555",
                    width:1
                }),

                fill:new ol.style.Fill({
                    color:"rgba(100,100,100,0.1)"
                }),

                text:new ol.style.Text({

                    text:feature.get(campoLabel)
                        ? feature.get(campoLabel).toString()
                        : "",

                    font:"12px Arial",

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

// =======================================
// CAPAS
// =======================================

const localidades =
    crearCapa(
        "DHC_AGUAKAN:Localidades",
        false,
        "Localidad"
    );

const sm_bj =
    crearCapa(
        "DHC_AGUAKAN:SM_BJ",
        true,
        "sm"
    );

const cc_bj =
    crearCapa(
        "DHC_AGUAKAN:C_C_2025_05",
        false,
        "Nom"
    );

const ct_bj =
    crearCapa(
        "DHC_AGUAKAN:C_T_2025_05",
        false,
        "tanque"
    );

const sm_sol =
    crearCapa(
        "DHC_AGUAKAN:SM_SOL",
        true,
        "sma"
    );

const cc_sol =
    crearCapa(
        "DHC_AGUAKAN:C_C_2025_5_SOL",
        false,
        "CARCAMO"
    );

const ct_sol =
    crearCapa(
        "DHC_AGUAKAN:C_T_2025_5_SOL",
        false,
        "Nombre"
    );

const sm_pm =
    crearCapa(
        "DHC_AGUAKAN:SM_PM",
        true,
        "sm"
    );

const sm_lv =
    crearCapa(
        "DHC_AGUAKAN:sm_lv",
        true,
        "sm"
    );

const sm_im =
    crearCapa(
        "DHC_AGUAKAN:SM_IM",
        true,
        "sm"
    );

// =======================================
// VECTOR SELECCION
// =======================================

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
                color:"rgba(255,0,0,0.3)"
            })

        })

    });

// =======================================
// MAPA
// =======================================

const map = new ol.Map({

    target:"map",

    layers:[

        osm,

        sm_bj,
        cc_bj,
        ct_bj,

        sm_sol,
        cc_sol,
        ct_sol,

        sm_pm,
        sm_lv,
        sm_im,

        layerSeleccion,

        localidades

    ],

    view:new ol.View({

        center:ol.proj.fromLonLat([-86.85,21.1]),

        zoom:11

    })

});

// =======================================
// VARIABLES
// =======================================

let seleccionActiva=false;

let seleccionados=[];

let clonesSeleccion={};

const capasSeleccionables=[

    sm_bj,
    cc_bj,
    ct_bj,

    sm_sol,
    cc_sol,
    ct_sol,

    sm_pm,
    sm_lv,
    sm_im,

    localidades

];

// =======================================
// KEY ESTABLE
// =======================================

function getFeatureKey(feature,layer){

    const geom =
        new ol.format.GeoJSON()
        .writeGeometry(
            feature.getGeometry()
        );

    const lname =
        layer && layer.ol_uid
            ? layer.ol_uid
            : "sinlayer";

    return lname+"_"+geom;

}

// =======================================
// CLICK SELECCION
// =======================================

map.on("singleclick",function(evt){

    if(!seleccionActiva) return;

    map.forEachFeatureAtPixel(

        evt.pixel,

        function(feature,layer){

            if(layer===layerSeleccion)
                return false;

            if(!capasSeleccionables.includes(layer))
                return false;

            const key =
                getFeatureKey(feature,layer);

            const existe =
                seleccionados.find(
                    obj=>obj.key===key
                );

            // ===================================
            // DESELECCIONAR
            // ===================================

            if(existe){

                seleccionados =
                    seleccionados.filter(
                        obj=>obj.key!==key
                    );

                if(clonesSeleccion[key]){

                    vectorSeleccion.removeFeature(
                        clonesSeleccion[key]
                    );

                    delete clonesSeleccion[key];

                }

            }

            // ===================================
            // SELECCIONAR
            // ===================================

            else{

                seleccionados.push({

                    key:key,

                    feature:feature,

                    layer:layer

                });

                const clon =
                    feature.clone();

                clon.set(
                    "key_original",
                    key
                );

                clonesSeleccion[key]=clon;

                vectorSeleccion.addFeature(clon);

            }

            return true;

        }

    );

});

// =======================================
// UNION JSTS
// =======================================

function unirGeometriasJSTS(features){

    const parser =
        new jsts.io.OL3Parser();

    let geomUnion=null;

    features.forEach(function(obj){

        let jstsGeom =
            parser.read(
                obj.feature.getGeometry()
            );

        if(geomUnion===null){

            geomUnion=jstsGeom;

        }else{

            geomUnion =
                geomUnion.union(jstsGeom);

        }

    });

    return parser.write(geomUnion);

}

// =======================================
// OBTENER ELEMENTOS
// =======================================

function obtenerElementosSeleccionados(){

    let elementos=[];

    seleccionados.forEach(obj=>{

        const feature=obj.feature;

        const layer=obj.layer;

        let tipo="";
        let valor="";

        // ===================================
        // BENITO JUAREZ
        // ===================================

        if(layer===sm_bj){

            tipo="SM_BJ";

            valor=feature.get("sm");

        }

        else if(layer===cc_bj){

            tipo="CC_BJ";

            valor=feature.get("Nom");

        }

        else if(layer===ct_bj){

            tipo="CT_BJ";

            valor=feature.get("tanque");

        }

        // ===================================
        // PLAYA DEL CARMEN
        // ===================================

        else if(layer===sm_sol){

            tipo="SM_SOL";

            valor=feature.get("sma");

        }

        else if(layer===cc_sol){

            tipo="CC_SOL";

            valor=feature.get("CARCAMO");

        }

        else if(layer===ct_sol){

            tipo="CT_SOL";

            valor=feature.get("Nombre");

        }

        // ===================================
        // PTO MORELOS
        // ===================================

        else if(layer===sm_pm){

            tipo="SM_PM";

            valor=feature.get("sm");

        }

        else if(layer===sm_lv){

            tipo="SM_LV";

            valor=feature.get("sm");

        }

        // ===================================
        // ISLA MUJERES
        // ===================================

        else if(layer===sm_im){

            tipo="SM_IM";

            valor=feature.get("sm");

        }

        // ===================================
        // LOCALIDADES
        // ===================================

        else if(layer===localidades){

            tipo="LOCALIDAD";

            valor=feature.get("Localidad");

        }

        if(valor){

            elementos.push({

                tipo:tipo,

                valor:valor

            });

        }

    });

    // ===================================
    // ELIMINAR DUPLICADOS
    // ===================================

    elementos = elementos.filter(

        (obj,index,self)=>

            index===self.findIndex(

                t=>

                    t.tipo===obj.tipo &&

                    t.valor===obj.valor

            )

    );

    return elementos;

}

// =======================================
// GENERAR AFECTACION
// =======================================

function generarAfectacion(){

    // ===================================
    // ACTIVAR MODO SELECCION
    // ===================================

    if(!seleccionActiva){

        seleccionActiva=true;

        seleccionados=[];

        clonesSeleccion={};

        vectorSeleccion.clear();

        alert(
            "Seleccione polígonos y vuelva a presionar"
        );

        return;

    }

    // ===================================
    // VALIDAR SELECCION
    // ===================================

    if(seleccionados.length===0){

        alert("Seleccione polígonos");

        return;

    }

    let olGeom;

    try{

        olGeom =
            unirGeometriasJSTS(
                seleccionados
            );

    }catch(err){

        console.error(
            "ERROR JSTS:",
            err
        );

        alert(
            "Error topológico al unir"
        );

        return;

    }

    if(!olGeom){

        alert(
            "No fue posible generar unión"
        );

        return;

    }

    vectorSeleccion.clear();

    clonesSeleccion={};

    const featureUnion =
        new ol.Feature({

            geometry:olGeom

        });

    vectorSeleccion.addFeature(
        featureUnion
    );

    seleccionActiva=false;

    const geojson =
        new ol.format.GeoJSON()
        .writeGeometryObject(olGeom);

    guardarGeom(geojson);

}

// =======================================
// GUARDAR GEOMETRIA
// =======================================

function guardarGeom(geom){

    const elementos =
        obtenerElementosSeleccionados();

    console.log(
        "ELEMENTOS:",
        elementos
    );

    fetch("guardar_geom.php",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            geom:geom,

            elementos:elementos

        })

    })

    .then(r=>r.json())

    .then(d=>{

        console.log(d);

        if(d.status==="ok"){

            abrirFicha(
                d.id,
                elementos
            );

        }else{

            alert(
                "Error: "+d.msg
            );

        }

    });

}

// =======================================
// FECHA ACTUAL
// =======================================

function fechaHoraActual(){

    const ahora=new Date();

    let yyyy=
        ahora.getFullYear();

    let mm=
        (ahora.getMonth()+1)
        .toString()
        .padStart(2,"0");

    let dd=
        ahora.getDate()
        .toString()
        .padStart(2,"0");

    let hh=
        ahora.getHours()
        .toString()
        .padStart(2,"0");

    let mi=
        ahora.getMinutes()
        .toString()
        .padStart(2,"0");

    return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;

}

// =======================================
// ABRIR FICHA
// =======================================

function abrirFicha(id,elementos=[]){

    document.getElementById("ficha")
        .style.display="block";

    document.getElementById("id_afectacion")
        .value=id;

    document.getElementById("tipo")
        .value="";

    document.getElementById("nivel")
        .value="";

    document.getElementById("periodo")
        .value=5;

    document.getElementById("estatus")
        .value="Activo";

    document.getElementById("fecha_inicio")
        .value=fechaHoraActual();

    calcularFechaFin();

    document.getElementById("descripcion")
        .value="";

    document.getElementById("tipo_afectacion")
        .value="";

    console.log(
        "ELEMENTOS AFECTADOS:",
        elementos
    );

}

// =======================================
// CANCELAR
// =======================================

function cancelarFicha(){

    document.getElementById("ficha")
        .style.display="none";

    vectorSeleccion.clear();

    seleccionados=[];

    clonesSeleccion={};

    seleccionActiva=false;

}

// =======================================
// CALCULAR FECHA FIN
// =======================================

document.getElementById("fecha_inicio")
.addEventListener(
    "change",
    calcularFechaFin
);

document.getElementById("periodo")
.addEventListener(
    "input",
    calcularFechaFin
);

function calcularFechaFin(){

    let inicio =
        document.getElementById(
            "fecha_inicio"
        ).value;

    let horas =
        document.getElementById(
            "periodo"
        ).value;

    if(!inicio || !horas)
        return;

    let fecha =
        new Date(inicio);

    fecha.setHours(
        fecha.getHours() +
        parseInt(horas)
    );

    let yyyy =
        fecha.getFullYear();

    let mm =
        (fecha.getMonth()+1)
        .toString()
        .padStart(2,"0");

    let dd =
        fecha.getDate()
        .toString()
        .padStart(2,"0");

    let hh =
        fecha.getHours()
        .toString()
        .padStart(2,"0");

    let mi =
        fecha.getMinutes()
        .toString()
        .padStart(2,"0");

    document.getElementById(
        "fecha_fin"
    ).value =
        `${yyyy}-${mm}-${dd}T${hh}:${mi}`;

}

// =======================================
// GUARDAR FICHA
// =======================================

function guardarFicha(){

    if(
        !document.getElementById(
            "fecha_inicio"
        ).value
    ){

        document.getElementById(
            "fecha_inicio"
        ).value =
            fechaHoraActual();

    }

    calcularFechaFin();

    const datos={

        id:
            document.getElementById(
                "id_afectacion"
            ).value,

        tipo:
            document.getElementById(
                "tipo"
            ).value,

        tipo_afectacion:
            document.getElementById(
                "tipo_afectacion"
            ).value,

        nivel:
            document.getElementById(
                "nivel"
            ).value,

        periodo:
            document.getElementById(
                "periodo"
            ).value,

        estatus:
            document.getElementById(
                "estatus"
            ).value,

        fecha_inicio:
            document.getElementById(
                "fecha_inicio"
            ).value,

        fecha_fin:
            document.getElementById(
                "fecha_fin"
            ).value,

        descripcion:
            document.getElementById(
                "descripcion"
            ).value,

        elementos:
            obtenerElementosSeleccionados()

    };

    console.log(
        "DATOS GUARDAR:",
        datos
    );

    fetch(
        "actualizar_afectacion.php",
        {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(datos)

        }
    )

    .then(r=>r.json())

    .then(d=>{

        console.log(d);

        if(d.status==="ok"){

            alert(
                "Datos guardados"
            );

            cancelarFicha();

        }else{

            alert(
                "Error: "+d.msg
            );

        }

    });

}