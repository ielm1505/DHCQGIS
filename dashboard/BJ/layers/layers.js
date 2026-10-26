ol.proj.proj4.register(proj4);
//ol.proj.get("EPSG:32616").setExtent([496709.547122, 2313133.576448, 547685.222186, 2350128.059080]);

var wms_layers = [];


        var lyr_ESRIGraydark_0 = new ol.layer.Tile({
            'title': 'ESRI Gray (dark)',
            'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' ',
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}'
            })
        });

        var lyr_ESRITopo_0 = new ol.layer.Tile({
            'title': 'ESRI Topo',
            'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
            })
        });

        var lyr_ESRISatellite_1 = new ol.layer.Tile({
            'title': 'ESRI Satellite',
            'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            })
        });

        var lyr_ESRIGraylight_3 = new ol.layer.Tile({
            'title': 'ESRI Gray (light)',
            'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' ',
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
            })
        });



//-- Banito Juarez---AP






var jsonSource_Tanques_34 = new ol.source.Vector({
            attributions: ' ',
        });
        
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Tanques_BJ" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
                "&CQL_FILTER=Estatus='Existente'")
            .then(response => response.json())  
            .then(data => {
            var format_Tanques_34 = new ol.format.GeoJSON();
            var features_Tanques_34 = format_Tanques_34.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Tanques_34.addFeatures(features_Tanques_34);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Tanques_34 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Tanques_34, 
            style: style_Tanques_34,
            popuplayertitle: "Tanques",
            interactive: false,
            title: '<img src="styles/legend/Tanques_34_0.png" /> Tanques<br />'
            });


var jsonSource_Conduccion_BJ_copy_1 = new ol.source.Vector({
            attributions: ' ',
        });
        
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=	DHC_AGUAKAN:AEP_CANA_AP" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
            "&CQL_FILTER=Tipo_de_Re='Conduccion' and Municipio='Benito Juarez'and Estatus='Existente'")
            .then(response => response.json())  
            .then(data => {
            var format_Conduccion_BJ_copy_1 = new ol.format.GeoJSON();
            var features_Conduccion_BJ_copy_1 = format_Conduccion_BJ_copy_1.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Conduccion_BJ_copy_1.addFeatures(features_Conduccion_BJ_copy_1);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Conduccion_BJ_copy_1 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Conduccion_BJ_copy_1, 
            style: style_Conduccion_BJ_copy_1,
            popuplayertitle: "Conduccion",
            interactive: false,
            title: '<img src="styles/legend/Tanques_34_2.png" /> Conducción<br />\ '
            });




var jsonSource_Distribucion_BJ_copy_1 = new ol.source.Vector({
                attributions: ' ',
            });
            
                fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                    "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:AEP_CANA_AP" +
                    "&outputFormat=application/json&srsname=EPSG:3857"+
                "&CQL_FILTER=Tipo_de_Re='Distribucion' and Municipio='Benito Juarez' and Estatus='Existente'")
                .then(response => response.json())  
                .then(data => {
                var format_Distribucion_BJ_copy_1 = new ol.format.GeoJSON();
                var features_Distribucion_BJ_copy_1 = format_Distribucion_BJ_copy_1.readFeatures(data, {
                            
                featureProjection: 'EPSG:3857' 
                });
                jsonSource_Distribucion_BJ_copy_1.addFeatures(features_Distribucion_BJ_copy_1);
                })
                .catch(error => console.error("Error al cargar los datos:", error));
                
                var lyr_Distribucion_BJ_copy_1 = new ol.layer.Vector({
                declutter: true,
                source: jsonSource_Distribucion_BJ_copy_1, 
                style: style_Distribucion_BJ_copy_1,
                popuplayertitle: "Distribucion",
                interactive: false,
                title: '<img src="styles/legend/Tanques_34_0.png" /> Distribución<br />\
                '
                });

//-- Banito Juarez---DS



var jsonSource_Ptar_28 = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=	DHC_AGUAKAN:Ptar" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
            "&CQL_FILTER=Estatus='Existente' or Estatus='CONSTRUCCION'")
            .then(response => response.json())  
            .then(data => {
            var format_Ptar_28 = new ol.format.GeoJSON();
            var features_Ptar_28 = format_Ptar_28.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Ptar_28.addFeatures(features_Ptar_28);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Ptar_28 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Ptar_28, 
            style: style_Ptar_28,
            popuplayertitle: "Ptar",
            interactive: false,
            title: 'Plantas de Tratamiento<br />\
            <img src="styles/legend/Ptar_28_0.png" /> Construccion<br />\
            <img src="styles/legend/Ptar_28_1.png" /> Existente<br />\
            '
                });

var jsonSource_Emisores_26 = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName= DHC_AGUAKAN:Emisores_colectores" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_Emisores_26 = new ol.format.GeoJSON();
            var features_Emisores_26 = format_Emisores_26.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Emisores_26.addFeatures(features_Emisores_26);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Emisores_26 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Emisores_26, 
            style: style_Emisores_26,
            popuplayertitle: "Red Principal",
            interactive: false,
            title: '<img src="styles/legend/Emisores_colectores_26_1.png" /> Emisor<br />'
                });

var jsonSource_colectores_26 = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName= DHC_AGUAKAN:Emisores_colectores" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_colectores_26 = new ol.format.GeoJSON();
            var features_colectores_26 = format_colectores_26.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_colectores_26.addFeatures(features_colectores_26);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_colectores_26 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_colectores_26, 
            style: style_colectores_26,
            popuplayertitle: "Red Principal",
            interactive: false,
            title: '<img src="styles/legend/Emisores_colectores_26_0.png" /> Colector<br />'
                });


var jsonSource_Tuberia_ASS_0 = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Ass_cana" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
            "&CQL_FILTER= Municipio='Benito Juarez' and Estatus='Existente'")
            .then(response => response.json())  
            .then(data => {
            var format_Tuberia_ASS_0 = new ol.format.GeoJSON();
            var features_Tuberia_ASS_0 = format_Tuberia_ASS_0.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Tuberia_ASS_0.addFeatures(features_Tuberia_ASS_0);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Tuberia_ASS_0 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Tuberia_ASS_0, 
            style: style_Tuberia_ASS_0,
            popuplayertitle: "Redes Secundaria",
            interactive: false,
            title: 'Red Secundaria<br />\
            <img src="styles/legend/Tuberia_ASS_0.png" /> Atarjeas<br />\
            '
            });


 var jsonSource_Carcamos_25 = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Carcamos_BJ" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_Carcamos_25 = new ol.format.GeoJSON();
            var features_Carcamos_25 = format_Carcamos_25.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Carcamos_25.addFeatures(features_Carcamos_25);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Carcamos_25 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Carcamos_25, 
            style: style_Carcamos_25,
            popuplayertitle: "Carcamos",
            interactive: false,
            title: '<img src="styles/legend/Carcamos_25.png" /> Carcamos'
            });



            
var group_BJ = new ol.layer.Group({
                                layers: [
                   
    new ol.layer.Group({
                    layers: [
                   
                    lyr_Ptar_28,lyr_Carcamos_25,
                    
                    new ol.layer.Group({layers: [
                        new ol.layer.Group({layers:[lyr_Tuberia_ASS_0,lyr_Emisores_26,lyr_colectores_26,],
                    fold: "close",
                    title: "Red Primaria"}),
                        ], 
                    fold: "close",
                    title: "Red Descarga Sanitaria"}),
                
                            ],
                    fold: "open",
                    title: "DS"}),
    new ol.layer.Group({
                    layers: [      

                    lyr_Tanques_34,
                    
                    new ol.layer.Group({layers: [lyr_Conduccion_BJ_copy_1,lyr_Distribucion_BJ_copy_1,],
                    fold: "close",
                    title: "Red Agua Potable"}),
                    ],
                    fold: "open",
                    title: "AP"}),],
fold: "open",
title: "Benito Juarez"});



var group_MAPA_BASE = new ol.layer.Group({
                                layers: [lyr_ESRIGraydark_0,lyr_ESRITopo_0,lyr_ESRISatellite_1,lyr_ESRIGraylight_3,],
                                fold: "close",
				
                                title: "MAPA_BASE"});



lyr_ESRIGraydark_0.setVisible(false);lyr_ESRITopo_0.setVisible(false);lyr_ESRISatellite_1.setVisible(true);lyr_ESRIGraylight_3.setVisible(false);






var layersList = [group_MAPA_BASE,group_BJ,];


lyr_Tanques_34.setVisible(true);lyr_Conduccion_BJ_copy_1.setVisible(true);lyr_Distribucion_BJ_copy_1.setVisible(false);lyr_Ptar_28.setVisible(false);
lyr_Emisores_26.setVisible(false);lyr_colectores_26.setVisible(false);lyr_Tuberia_ASS_0.setVisible(false);lyr_Carcamos_25.setVisible(false);