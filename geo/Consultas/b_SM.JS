proj4.defs("EPSG:32616", "+proj=utm +zone=16 +datum=WGS84 +units=m +no_defs");
ol.proj.proj4.register(proj4);


const smPoligonoSource = new ol.source.Vector();
const capaSMPoligono = new ol.layer.Vector({
    source: smPoligonoSource,
    style: function(feature) {

  
        return new ol.style.Style({
           
            stroke: new ol.style.Stroke({ color: 'orange', width: 2 }),
            fill: new ol.style.Fill({ color: 'rgba(255, 165, 0, 0.3)' }),
            text: new ol.style.Text({
                text: 'SM:'+feature.get('sm'), // Mostramos el valor de SM
               
                font: 'bold 14px Arial',
                fill: new ol.style.Fill({ color: '#000' }),
                stroke: new ol.style.Stroke({ color: '#fff', width: 3 }),
                overflow: true
            })
        });
         
    }
});

map.addLayer(capaSMPoligono);
map.on('singleclick', function () {
    smPoligonoSource.clear();
});


function ubicarPoligonoSM(sm) {
    const cql = `sm='${sm}'`;
    const url = "https://dhcqgis.aguakan.com/geoserver/wfs?" +
        "service=WFS&version=1.0.0&request=GetFeature" +
        "&typeName=DHC_AGUAKAN:SM_BJ" +
        "&outputFormat=application/json" +
        "&srsname=EPSG:32616" +  
        "&CQL_FILTER=" + encodeURIComponent(cql);

    fetch(url)
        .then(res => res.json())
        .then(geojson => {
            const format = new ol.format.GeoJSON();
            const features = format.readFeatures(geojson, {
                dataProjection: 'EPSG:32616',      
                featureProjection: 'EPSG:3857'    
            });

            smPoligonoSource.clear();

            if (features.length === 0) {
                alert("No se encontró el polígono del SM especificado.");
                return;
            }

            smPoligonoSource.addFeatures(features);

            const geometry = features[0].getGeometry();
            map.getView().fit(geometry.getExtent(), { duration: 1000, padding: [20, 20, 20, 20] });

            contarPuntosDeMedicionEnSM(geometry); 
        })
        .catch(err => {
            console.error("Error al consultar polígono de SM:", err);
            alert("Error en la consulta:\n" + err.message);
        });
}

function contarPuntosDeMedicionEnSM(geometry) {
    const geometry32616 = geometry.clone().transform('EPSG:3857', 'EPSG:32616');
    const wktFormat = new ol.format.WKT();
    
    const wkt = wktFormat.writeGeometry(geometry32616);

    const cql = `INTERSECTS(geom, ${wkt})`;
    const url = "https://dhcqgis.aguakan.com/geoserver/wfs?" +
        "service=WFS&version=1.0.0&request=GetFeature" +
        "&typeName=DHC_AGUAKAN:Puntos_de_medicion" +
        "&outputFormat=application/json" +
        "&srsname=EPSG:32616" +
        "&CQL_FILTER=" + encodeURIComponent(cql);

    fetch(url)
        .then(res => res.json())
        .then(geojson => {
            const cantidad = geojson.features.length;
            
            // Mostrar el número en el centro del polígono
            const extent = geometry.getExtent();
            const center = ol.extent.getCenter(extent);
            
            const point = new ol.geom.Point(center);

            const feature = new ol.Feature(point);
            feature.setStyle(new ol.style.Style({
               
              
                text: new ol.style.Text({
                    text: '',
                    font: 'bold 14px sans-serif',
                    fill: new ol.style.Fill({ color: 'black' }),
                    stroke: new ol.style.Stroke({ color: 'white', width: 2 })
                })
            }));
            smPoligonoSource.addFeature(feature);

           // alert(`Cantidad de puntos de medición en la SM: ${cantidad}`);

        })
        .catch(err => {
            console.error("Error al consultar puntos de medición:", err);
            alert("Error en la consulta de puntos de medición:\n" + err.message);
        });
}


document.getElementById('btnBuscarUbicacionSM').onclick = function () {
    var sm = prompt("Introduce la SM:");
    if (sm) {
        ubicarPoligonoSM(sm);
    }
    contextMenu.style.display = 'none'; // Cerrar menú si aplica
};
