var size = 0;
var placement = 'point';
function categories_Distribucion_BJ_copy_1(feature, value, size, resolution, labelText,
                       labelFont, labelFill, bufferColor, bufferWidth,
                       placement) {
                switch(value.toString()) {case 'Existente':
                    return [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(0,153,255,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 1.3299999999999998}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })];
                    break;
case 'Q2023_2027':
                    return [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(26,47,232,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 1.3299999999999998}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })];
                    break;}};

var style_Distribucion_BJ_copy_1 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    var value = feature.get("Estatus");
    var labelText = "";
    size = 0;
    var labelFont = "13.0px \'Open Sans\', sans-serif";
    var labelFill = "#000000";
    var bufferColor = "";
    var bufferWidth = 0;
    var textAlign = "left";
    var offsetX = 8;
    var offsetY = 3;
    var placement = 'line';
    if (feature.get("LAYERNAME") !== null) {
        labelText = String(feature.get("LAYERNAME"));
    }
    
var style = categories_Distribucion_BJ_copy_1(feature, value, size, resolution, labelText,
                          labelFont, labelFill, bufferColor,
                          bufferWidth, placement);

    return style;
};
