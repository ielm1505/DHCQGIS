var size = 0;
var placement = 'point';
function categories_Ptar_18(feature, value, size, resolution, labelText,
                       labelFont, labelFill, bufferColor, bufferWidth,
                       placement) {
                switch(value.toString()) {case 'AGUAKAN':
                    return [ new ol.style.Style({
        image: new ol.style.RegularShape({radius: 10.0 + size, points: 3,
            stroke: new ol.style.Stroke({color: 'rgba(210,35,35,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0.0}), fill: new ol.style.Fill({color: 'rgba(106,73,27,1.0)'})}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })];
                    break;
case 'DESARROLLADOR':
                    return [ new ol.style.Style({
        image: new ol.style.RegularShape({radius: 10.0 + size, points: 3,
            stroke: new ol.style.Stroke({color: 'rgba(35,35,35,1.0)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 0.0}), fill: new ol.style.Fill({color: 'rgba(228,80,156,1.0)'})}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })];
                    break;}};

var style_Ptar_18 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    var value = feature.get("operador");
    var labelText = "";
    size = 0;
    var labelFont = "15.0px \'Open Sans\', sans-serif";
    var labelFill = "#000000";
    var bufferColor = "";
    var bufferWidth = 1;
    var textAlign = "left";
    var offsetX = 8;
    var offsetY = 3;
    var placement = 'point';
    if (feature.get("Nombre") !== null) {
        labelText = String(feature.get("Nombre"));
    }
    
var style = categories_Ptar_18(feature, value, size, resolution, labelText,
                          labelFont, labelFill, bufferColor,
                          bufferWidth, placement);

    return style;
};
