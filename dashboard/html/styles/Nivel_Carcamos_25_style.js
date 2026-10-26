var cacheIconos={};

var style_Nivel_Carcamos_25 =function(feature){

    var nivel=feature.get("historic_level_percent") || 0;

    var conectado=feature.get("connect");

    var key=nivel+"_"+conectado;

    if(!cacheIconos[key]){

        cacheIconos[key]=new ol.style.Icon({

            img:crearIndicadorNivel(nivel,conectado),

            imgSize:[40,60]

        });

    }

    return new ol.style.Style({

        image:cacheIconos[key],

        text:new ol.style.Text({

            text:feature.get("Nombre"),

            offsetY:-42,

            font:"12px Calibri",

            fill:new ol.style.Fill({
                color:"#000"
            }),

            stroke:new ol.style.Stroke({
                color:"#fff",
                width:3
            })

        })

    });

};



function crearIndicadorNivel(nivel, conectado) {

    var canvas = document.createElement("canvas");

    canvas.width = 40;
    canvas.height = 60;

    var ctx = canvas.getContext("2d");

    //---------------------------------------------------
    // Fondo blanco
    //---------------------------------------------------

    ctx.fillStyle = "white";
    ctx.fillRect(0,0,40,60);

    //---------------------------------------------------
    // Tanque
    //---------------------------------------------------

    ctx.strokeStyle="#222";
    ctx.lineWidth=2;

    ctx.strokeRect(8,8,24,40);

    //---------------------------------------------------
    // Sin comunicación
    //---------------------------------------------------

    if(!conectado){

        ctx.fillStyle="#999";

        ctx.fillRect(8,8,24,40);

        ctx.strokeStyle="red";

        ctx.beginPath();
        ctx.moveTo(8,8);
        ctx.lineTo(32,48);

        ctx.moveTo(32,8);
        ctx.lineTo(8,48);

        ctx.stroke();

        return canvas;

    }

    //---------------------------------------------------
    // Color del agua
    //---------------------------------------------------

    var color="#F44336";

    if(nivel<80)
        color="#FF9800";

    if(nivel<50)
        color="#FFD600";

    if(nivel<20)
        color="#00C853";

    //---------------------------------------------------
    // Agua
    //---------------------------------------------------

    var altura=(nivel/100)*40;

    ctx.fillStyle=color;

    ctx.fillRect(
        8,
        48-altura,
        24,
        altura
    );

    //---------------------------------------------------
    // Texto %
    //---------------------------------------------------

    ctx.font="bold 10px Arial";

    ctx.fillStyle="black";

    ctx.textAlign="center";

    ctx.fillText(
        Math.round(nivel)+"%",
        20,
        58
    );

    return canvas;

}