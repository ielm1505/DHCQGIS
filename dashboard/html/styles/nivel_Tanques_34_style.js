var cacheIconos = {};

var style_Nivel_Tanques_34 = function(feature, resolution){

    var nivel = feature.get("historic_level_percent");
    var conectado = feature.get("connect");

    // Normalizar nivel
    nivel = Number(nivel);
    if (!Number.isFinite(nivel)) {
        nivel = null;
    }

    // Zoom actual
    var zoom = map.getView().getZoom();

    // Escala dinámica
    var escala = 0.6;

    if (zoom >= 14) escala = 0.8;
    if (zoom >= 16) escala = 1.0;
    if (zoom >= 18) escala = 1.3;
    if (zoom >= 20) escala = 1.6;

    // Clave del caché
    var key =
        (nivel === null ? "ND" : nivel.toFixed(1)) +
        "_" +
        conectado +
        "_" +
        escala;

    if (!cacheIconos[key]) {

        cacheIconos[key] = new ol.style.Icon({
            img: crearIndicadorNivelAP(nivel, conectado),
            imgSize: [40, 60],
            scale: escala
        });

    }

    return new ol.style.Style({

        image: cacheIconos[key],

        text: new ol.style.Text({

            text: feature.get("tanques") || "",

            offsetY: -(45 * escala),

            font: "bold " + (16 * escala) + "px Arial",

            fill: new ol.style.Fill({
                color: "#000"
            }),

            stroke: new ol.style.Stroke({
                color: "#fff",
                width: 3
            })

        }),

        zIndex: conectado ? 1000 : 1

    });

};



function crearIndicadorNivelAP(nivel, conectado) {

    var canvas = document.createElement("canvas");

    canvas.width = 40;
    canvas.height = 60;

    var ctx = canvas.getContext("2d");

    // -------------------------
    // Validar nivel
    // -------------------------

    var tieneNivel = Number.isFinite(nivel);

    if (!tieneNivel) {
        nivel = 0;
    }

    // -------------------------
    // Fondo
    // -------------------------

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 40, 60);

    // -------------------------
    // Contorno tanque
    // -------------------------

    ctx.strokeStyle = "#3a38b3";
    ctx.lineWidth = 2;
    ctx.strokeRect(8, 8, 24, 40);

    // -------------------------
    // Desconectado
    // -------------------------

    if (!conectado) {

        ctx.fillStyle = "#999";
        ctx.fillRect(8, 8, 24, 40);

        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.moveTo(8, 8);
        ctx.lineTo(32, 48);
        ctx.moveTo(32, 8);
        ctx.lineTo(8, 48);
        ctx.stroke();

        ctx.font = "bold 11px Arial";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("OFF", 20, 58);

        return canvas;

    }

    // -------------------------
    // Color del agua
    // -------------------------

    var color;

    if (!tieneNivel) {

        color = "#BDBDBD";

    } else if (nivel >= 80) {

        color = "#00C853";

    } else if (nivel >= 50) {

        color = "#FFD600";

    } else if (nivel >= 20) {

        color = "#FF9800";

    } else {

        color = "#F44336";

    }

    // -------------------------
    // Agua
    // -------------------------

    var altura = tieneNivel ? (nivel / 100) * 40 : 0;

    ctx.fillStyle = color;

    ctx.fillRect(
        8,
        48 - altura,
        24,
        altura
    );

    // -------------------------
    // Texto
    // -------------------------

    ctx.font = "bold 12px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";

    ctx.fillText(
        tieneNivel ? nivel.toFixed(1) + "%" : "S/D",
        20,
        58
    );

    return canvas;

}