/* =========================================================
   NAVEGACION OPENLAYERS
   ========================================================= */




// =====================================================
// VARIABLES
// =====================================================

let navUbicacionUsuario = null;

let navDestino = null;

let navWatchID = null;

let navModoSeleccion = false;




// =====================================================
// SOURCE
// =====================================================

const navSource = new ol.source.Vector();




// =====================================================
// CAPA
// =====================================================

const navLayer = new ol.layer.Vector({

    source: navSource,

    zIndex:9999

});




// =====================================================
// AGREGAR AL MAPA
// =====================================================

map.addLayer(navLayer);




// =====================================================
// ESTILOS
// =====================================================

const estiloRuta = new ol.style.Style({

    stroke:new ol.style.Stroke({

        color:'#0066ff',

        width:6

    })

});



const estiloInicio = new ol.style.Style({

    image:new ol.style.Circle({

        radius:8,

        fill:new ol.style.Fill({

            color:'#00aa00'

        }),

        stroke:new ol.style.Stroke({

            color:'#ffffff',

            width:3

        })

    })

});



const estiloDestino = new ol.style.Style({

    image:new ol.style.Circle({

        radius:8,

        fill:new ol.style.Fill({

            color:'#ff0000'

        }),

        stroke:new ol.style.Stroke({

            color:'#ffffff',

            width:3

        })

    })

});




// =====================================================
// INICIAR GPS
// =====================================================

function iniciarNavegacion(){

    if(navWatchID){

        return;

    }



    navWatchID = navigator.geolocation.watchPosition(

        function(pos){

            navUbicacionUsuario = [

                pos.coords.longitude,

                pos.coords.latitude

            ];



            actualizarPuntoInicio();



            if(navDestino){

                calcularRuta();

            }

        },



        function(error){

            console.error(error);

            alert("No se pudo obtener GPS");

        },



        {

            enableHighAccuracy:true,

            maximumAge:0,

            timeout:10000

        }

    );

}




// =====================================================
// ACTUALIZAR PUNTO
// =====================================================

function actualizarPuntoInicio(){

    navSource.getFeatures()

    .filter(f=>f.get('tipo')==='inicio')

    .forEach(f=>navSource.removeFeature(f));



    const feature = new ol.Feature({

        geometry:new ol.geom.Point(

            ol.proj.fromLonLat(

                navUbicacionUsuario

            )

        ),

        tipo:'inicio'

    });



    feature.setStyle(estiloInicio);



    navSource.addFeature(feature);

}




// =====================================================
// ACTIVAR DESTINO
// =====================================================

function activarSeleccionDestino(){

    iniciarNavegacion();

    navModoSeleccion = true;

    alert("Seleccione destino en el mapa");

}




// =====================================================
// CLICK MAPA
// =====================================================

// =====================================================
// CLICK MAPA
// DESTINO DESDE CAPAS ACTIVAS
// =====================================================

map.on('click', function(evt){

    if(!navModoSeleccion){

        return;

    }

    let encontrado = false;



    map.forEachFeatureAtPixel(

        evt.pixel,

        function(feature, layer){

            // =========================================
            // VALIDAR CAPA
            // =========================================

            if(

                layer &&

                layer.getVisible()

            ){

                encontrado = true;

                navModoSeleccion = false;



                const geom = feature.getGeometry();

                let coord = null;



                // =====================================
                // POINT
                // =====================================

                if(

                    geom instanceof ol.geom.Point

                ){

                    coord = geom.getCoordinates();

                }



                // =====================================
                // LINESTRING
                // =====================================

                else if(

                    geom instanceof ol.geom.LineString

                ){

                    coord =

                    geom.getFirstCoordinate();

                }



                // =====================================
                // POLYGON
                // =====================================

                else if(

                    geom instanceof ol.geom.Polygon

                ){

                    coord =

                    geom.getInteriorPoint()

                    .getCoordinates();

                }



                // =====================================
                // MULTIPOLYGON
                // =====================================

                else if(

                    geom instanceof ol.geom.MultiPolygon

                ){

                    coord =

                    geom.getInteriorPoints()

                    .getCoordinates()[0];

                }



                // =====================================
                // VALIDAR
                // =====================================

                if(!coord){

                    alert(

                        "Geometría no soportada"

                    );

                    return true;

                }



                // =====================================
                // TRANSFORMAR
                // =====================================

                navDestino = ol.proj.toLonLat(

                    coord

                );



                // =====================================
                // NOMBRE FEATURE
                // =====================================

                const nombre =

                    feature.get('nombre') ||

                    feature.get('name') ||

                    feature.get('id') ||

                    feature.get('gid') ||

                    'Destino';



                console.log(

                    'Destino:',

                    nombre

                );



                // =====================================
                // CALCULAR RUTA
                // =====================================

                calcularRuta();



                return true;

            }

        },

        {

            hitTolerance:10

        }

    );



    // =============================================
    // SI NO ENCONTRO
    // =============================================

    if(!encontrado){

        alert(

            'Seleccione un elemento válido'

        );

    }

});




// =====================================================
// CALCULAR RUTA
// =====================================================

function calcularRuta(){

    if(!navUbicacionUsuario || !navDestino){

        return;

    }



    limpiarSoloRuta();



    const url =

    `https://router.project-osrm.org/route/v1/driving/`+

    `${navUbicacionUsuario[0]},${navUbicacionUsuario[1]};`+

    `${navDestino[0]},${navDestino[1]}`+

    `?overview=full&steps=true&geometries=geojson`;



    fetch(url)

    .then(r=>r.json())

    .then(data=>{

        if(!data.routes.length){

            alert("Ruta no encontrada");

            return;

        }



        const ruta = data.routes[0];



        // =============================================
        // LINEA
        // =============================================

        const linea = new ol.geom.LineString(

            ruta.geometry.coordinates

        )

        .transform(

            'EPSG:4326',

            'EPSG:3857'

        );



        const featureRuta = new ol.Feature({

            geometry:linea,

            tipo:'ruta'

        });



        featureRuta.setStyle(estiloRuta);



        navSource.addFeature(featureRuta);




        // =============================================
        // DESTINO
        // =============================================

        const featureDestino = new ol.Feature({

            geometry:new ol.geom.Point(

                ol.proj.fromLonLat(

                    navDestino

                )

            ),

            tipo:'destino'

        });



        featureDestino.setStyle(estiloDestino);



        navSource.addFeature(featureDestino);




        // =============================================
        // AJUSTAR
        // =============================================

        map.getView().fit(

            linea,

            {

                padding:[80,80,80,80],

                duration:1000

            }

        );




        // =============================================
        // MOSTRAR PASOS
        // =============================================

        mostrarPasosRuta(ruta);

    });

}




// =====================================================
// PASOS
// =====================================================

// =====================================================
// PASOS RUTA - VENTANA FLOTANTE
// =====================================================

function mostrarPasosRuta(ruta){

    let div = document.getElementById('panelRuta');



    // =================================================
    // CREAR VENTANA
    // =================================================

    if(!div){

        div = document.createElement('div');

        div.id = 'panelRuta';



        div.innerHTML = `

        <div id="tituloRuta">

            <span>
                🧭 Ruta
            </span>

            <div>

                <button id="minRuta">
                    ─
                </button>

                <button id="cerrarRuta">
                    ✖
                </button>

            </div>

        </div>

        <div id="contenidoRuta"></div>

        `;



        // =============================================
        // ESTILOS
        // =============================================

        div.style.position = 'absolute';

        div.style.top = '70px';

        div.style.right = '20px';

        div.style.width = '320px';

        div.style.maxHeight = '500px';

        div.style.background = 'white';

        div.style.borderRadius = '10px';

        div.style.overflow = 'hidden';

        div.style.zIndex = '99999';

        div.style.boxShadow =
        '0 0 10px rgba(0,0,0,.3)';



        document.body.appendChild(div);




        // =============================================
        // TITULO
        // =============================================

        const titulo = document.getElementById(
            'tituloRuta'
        );



        titulo.style.background = '#0066ff';

        titulo.style.color = 'white';

        titulo.style.padding = '10px';

        titulo.style.display = 'flex';

        titulo.style.justifyContent =
        'space-between';

        titulo.style.alignItems = 'center';

        titulo.style.cursor = 'move';




        // =============================================
        // CONTENIDO
        // =============================================

        const contenido = document.getElementById(
            'contenidoRuta'
        );



        contenido.style.maxHeight = '420px';

        contenido.style.overflow = 'auto';

        contenido.style.padding = '10px';




        // =============================================
        // BOTONES
        // =============================================

        document.getElementById(
            'minRuta'
        ).onclick = function(){

            const c = document.getElementById(
                'contenidoRuta'
            );

            c.style.display =

            c.style.display === 'none'
            ? 'block'
            : 'none';

        };



        document.getElementById(
            'cerrarRuta'
        ).onclick = function(){

            div.remove();

        };



        // =============================================
        // HACER ARRASTRABLE
        // =============================================

        hacerVentanaArrastrable(

            div,

            titulo

        );

    }




    // =================================================
    // CONTENIDO
    // =================================================

    const km = (

        ruta.distance / 1000

    ).toFixed(2);



    const min = (

        ruta.duration / 60

    ).toFixed(1);




    let html = `

    <b>Distancia:</b> ${km} km<br>

    <b>Tiempo:</b> ${min} min

    <hr>

    `;




    ruta.legs[0].steps.forEach((step,i)=>{

        const texto = traducirInstruccion(

            step.maneuver.type

        );



        html += `

        <div style="
            padding:6px;
            border-bottom:1px solid #ddd;
        ">

            <b>${i+1}</b>

            ${texto}

            <br>

            <small>

                ${(step.distance/1000).toFixed(2)} km

            </small>

        </div>

        `;

    });



    document.getElementById(

        'contenidoRuta'

    ).innerHTML = html;

}



// =====================================================
// VENTANA ARRASTRABLE PC + MOVIL
// =====================================================

function hacerVentanaArrastrable(

    ventana,

    barra

){

    let moviendo = false;

    let offsetX = 0;

    let offsetY = 0;



    // =================================================
    // MOUSE
    // =================================================

    barra.addEventListener(

        'mousedown',

        function(e){

            moviendo = true;

            offsetX =

            e.clientX - ventana.offsetLeft;

            offsetY =

            e.clientY - ventana.offsetTop;

        }

    );



    document.addEventListener(

        'mousemove',

        function(e){

            if(!moviendo){

                return;

            }

            moverVentana(

                e.clientX,

                e.clientY

            );

        }

    );



    document.addEventListener(

        'mouseup',

        function(){

            moviendo = false;

        }

    );



    // =================================================
    // TOUCH
    // =================================================

    barra.addEventListener(

        'touchstart',

        function(e){

            moviendo = true;

            const touch = e.touches[0];

            offsetX =

            touch.clientX - ventana.offsetLeft;

            offsetY =

            touch.clientY - ventana.offsetTop;

        },

        { passive:true }

    );



    document.addEventListener(

        'touchmove',

        function(e){

            if(!moviendo){

                return;

            }

            const touch = e.touches[0];

            moverVentana(

                touch.clientX,

                touch.clientY

            );

        },

        { passive:true }

    );



    document.addEventListener(

        'touchend',

        function(){

            moviendo = false;

        }

    );



    // =================================================
    // MOVER
    // =================================================

    function moverVentana(x,y){

        ventana.style.left =

        (x - offsetX) + 'px';



        ventana.style.top =

        (y - offsetY) + 'px';



        ventana.style.right = 'auto';

    }

}

// =====================================================
// TRADUCCION
// =====================================================

function traducirInstruccion(tipo){

    const t = {

        depart:'Inicie recorrido',

        turn:'Gire',

        arrive:'Ha llegado al destino',

        merge:'Incorpórese',

        fork:'Manténgase',

        roundabout:'Entre a glorieta',

        end:'Fin de ruta'

    };



    return t[tipo] || tipo;

}




// =====================================================
// LIMPIAR SOLO RUTA
// =====================================================

function limpiarSoloRuta(){

    navSource.getFeatures()

    .filter(f=>

        f.get('tipo')==='ruta' ||

        f.get('tipo')==='destino'

    )

    .forEach(f=>

        navSource.removeFeature(f)

    );

}




// =====================================================
// LIMPIAR TODO
// =====================================================

function limpiarRuta(){

    navSource.clear();

    navDestino = null;



    const panel = document.getElementById(

        'panelRuta'

    );



    if(panel){

        panel.remove();

    }

}




// =====================================================
// DETENER GPS
// =====================================================

function detenerNavegacion(){

    if(navWatchID){

        navigator.geolocation.clearWatch(

            navWatchID

        );

        navWatchID = null;

    }

}




// =====================================================
// BOTON PRINCIPAL
// =====================================================

document

.getElementById('recorrido')

.addEventListener('click',function(){

    const panel = document.getElementById(

        'panelNavegacion'

    );



    panel.style.display =

    panel.style.display === 'block'

    ? 'none'

    : 'block';

});




// =====================================================
// CERRAR PANEL
// =====================================================

document

.getElementById('cerrarNav')

.addEventListener('click',function(){

    document.getElementById(

        'panelNavegacion'

    ).style.display='none';

});




// =====================================================
// SELECCIONAR DESTINO
// =====================================================

document

.getElementById('btnSeleccionarDestino')

.addEventListener('click',function(){

    activarSeleccionDestino();

});




// =====================================================
// LIMPIAR RUTA
// =====================================================

document

.getElementById('btnLimpiarRuta')

.addEventListener('click',function(){

    limpiarRuta();

});




// =====================================================
// DETENER GPS
// =====================================================

document

.getElementById('btnDetenerGPS')

.addEventListener('click',function(){

    detenerNavegacion();

});




// =====================================================
// PANEL ARRASTRABLE
// =====================================================

hacerArrastrable(

    'panelNavegacion',

    'tituloNav'

);




function hacerArrastrable(panelID,barraID){

    const panel = document.getElementById(

        panelID

    );



    const barra = document.getElementById(

        barraID

    );



    let moviendo = false;

    let offsetX = 0;

    let offsetY = 0;




    barra.addEventListener('mousedown',function(e){

        moviendo = true;



        offsetX =

        e.clientX - panel.offsetLeft;



        offsetY =

        e.clientY - panel.offsetTop;

    });




    document.addEventListener('mousemove',function(e){

        if(!moviendo){

            return;

        }



        panel.style.left =

        (

            e.clientX - offsetX

        ) + 'px';



        panel.style.top =

        (

            e.clientY - offsetY

        ) + 'px';

    });




    document.addEventListener('mouseup',function(){

        moviendo = false;

    });

}