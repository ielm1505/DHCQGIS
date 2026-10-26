ol.proj.proj4.register(proj4);
//ol.proj.get("EPSG:32616").setExtent([496709.547122, 2313133.576448, 547685.222186, 2350128.059080]);
// function inicializarMapa() {
var wms_layers = [];


        var lyr_ESRIGraydark_0 = new ol.layer.Tile({
            'title': 'ESRI Gray (dark)',
            'type': 'base',
            'opacity': 1.000000,
            crossOrigin: 'anonymous',
            
            source: new ol.source.XYZ({
    attributions: ' ',
    crossOrigin: 'anonymous',
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}'
                
            })
        });

        var lyr_ESRITopo_0 = new ol.layer.Tile({
            'title': 'ESRI Topo',
            'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
            crossOrigin: 'anonymous',
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
            })
        });

        var lyr_ESRISatellite_1 = new ol.layer.Tile({
            'title': 'ESRI Satellite',
            'type': 'base',
            'opacity': 1.000000,
            
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
            crossOrigin: 'anonymous',
                url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            })
        });

        var lyr_ESRIGraylight_3 = new ol.layer.Tile({
            'title': 'ESRI Gray (light)',
            'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' ',
    crossOrigin: 'anonymous',
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
            })
        });



        var format_Quintana_Roo_1 = new ol.format.GeoJSON();
        var features_Quintana_Roo_1 = format_Quintana_Roo_1.readFeatures(json_Quintana_Roo_1, 
                    {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
        var jsonSource_Quintana_Roo_1 = new ol.source.Vector({
            attributions: ' ',
            
        });
        jsonSource_Quintana_Roo_1.addFeatures(features_Quintana_Roo_1);
        var lyr_Quintana_Roo_1 = new ol.layer.Vector({
                        declutter: false,
                        source:jsonSource_Quintana_Roo_1, 
                        style: style_Quintana_Roo_1,
                        popuplayertitle: "Quintana_Roo",
                        interactive: false,'opacity':0.50000,
            title: 'Quintana_Roo<br />\
            <img src="styles/legend/Quintana_Roo_1_0.png" /> Bacalar<br />\
            <img src="styles/legend/Quintana_Roo_1_1.png" /> Benito Juárez<br />\
            <img src="styles/legend/Quintana_Roo_1_2.png" /> Cozumel<br />\
            <img src="styles/legend/Quintana_Roo_1_3.png" /> Felipe Carrillo Puerto<br />\
            <img src="styles/legend/Quintana_Roo_1_4.png" /> Isla Mujeres<br />\
            <img src="styles/legend/Quintana_Roo_1_5.png" /> José María Morelos<br />\
            <img src="styles/legend/Quintana_Roo_1_6.png" /> Lázaro Cárdenas<br />\
            <img src="styles/legend/Quintana_Roo_1_7.png" /> Othón P. Blanco<br />\
            <img src="styles/legend/Quintana_Roo_1_8.png" /> Puerto Morelos<br />\
            <img src="styles/legend/Quintana_Roo_1_9.png" /> Solidaridad<br />\
            <img src="styles/legend/Quintana_Roo_1_10.png" /> Tulum<br />'
                });
        


var lyr_Manzanas_BJ_35 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "https://dhcqgis.aguakan.com/geoserver/wms",
    attributions: ' ',
                              params: {
                                "LAYERS": "DHC_AGUAKAN:Manzanas_BJ",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "Manzanas_BJ",
                            opacity: 0.700000,
                            
                            
                          });
              wms_layers.push([lyr_Manzanas_BJ_35, 0]);



const lyr_Clientes_BJ_33 = new ol.layer.Tile({
    title: "Vista PM Base",
  source: new ol.source.TileWMS({
    url: 'https://dhcqgis.aguakan.com/geoserver/DHC_AGUAKAN/wms?',
    params: {
      'LAYERS': 'DHC_AGUAKAN:vista_pm_basex7_local',
      'TILED': true,
       "CQL_FILTER": "localidad='CANCÚN'"
    },
    serverType: 'geoserver',
    crossOrigin: 'anonymous'
  }),
  visible: true
});


var lyr_puntos_topograficos = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "https://dhcqgis.aguakan.com/geoserver/wms",
    attributions: ' ',
                              params: {
                                "LAYERS": "DHC_AGUAKAN:puntos_topograficos",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "Puntos Topograficos",
                            opacity: 0.700000,
                            
                            
                          });
              wms_layers.push([lyr_puntos_topograficos, 0]);

const lyr_Clientes_Sol_01 = new ol.layer.Tile({
    title: "Vista PM Base",
  source: new ol.source.TileWMS({
    url: 'https://dhcqgis.aguakan.com/geoserver/DHC_AGUAKAN/wms?',
    params: {
      'LAYERS': 'DHC_AGUAKAN:vista_pm_basex7_local',
      'TILED': true,
       "CQL_FILTER": "localidad='PLAYA DEL CARMEN'"
    },
    serverType: 'geoserver',
    crossOrigin: 'anonymous'
  }),
  visible: true
});





var jsonSource_mza_lv = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:mza_lv" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_mza_lv = new ol.format.GeoJSON();
            var features_mza_lv = format_mza_lv.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_mza_lv.addFeatures(features_mza_lv);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_mza_lv = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_mza_lv, 
            style: style_mza_lv,
            popuplayertitle: "Manzana leona Vicario",
            interactive: false,
            name: '	DHC_AGUAKAN:mza_lv',
            title: '<img src="styles/legend/SM_23.png" /> Manzana Leona Vicario'
            });

var jsonSource_parcel_lv = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:parcel_lv" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_parcel_lv = new ol.format.GeoJSON();
            var features_parcel_lv = format_parcel_lv.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_parcel_lv.addFeatures(features_parcel_lv);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_parcel_lv = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_parcel_lv, 
            style: style_parcel_lv,
            popuplayertitle: "Lotes leona Vicario",
            interactive: false,
            name: '	DHC_AGUAKAN:parcel_lv',
            title: '<img src="styles/legend/SM_23.png" /> Lotes Leona Vicario'
            });


















// "&CQL_FILTER= Estatus='Existente'"



var format_Agua_Superficial_2012_2013_1 = new ol.format.GeoJSON();
var features_Agua_Superficial_2012_2013_1 = format_Agua_Superficial_2012_2013_1.readFeatures(json_Agua_Superficial_2012_2013_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Agua_Superficial_2012_2013_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Agua_Superficial_2012_2013_1.addFeatures(features_Agua_Superficial_2012_2013_1);
var lyr_Agua_Superficial_2012_2013_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Agua_Superficial_2012_2013_1, 
                style: style_Agua_Superficial_2012_2013_1,
                popuplayertitle: "Agua_Superficial_2012_2023_CALIDAD",
                interactive: false,
    title: 'Agua_Superficial_2012_2023_SEMAFORO<br />\
    <img src="styles/legend/Agua_Superficial_2012_2013_1_0.png" /> Amarillo<br />\
    <img src="styles/legend/Agua_Superficial_2012_2013_1_1.png" /> Rojo<br />\
    <img src="styles/legend/Agua_Superficial_2012_2013_1_2.png" /> Verde<br />'
        });
var format_Calidad_delagua_Subterranea_122023_2 = new ol.format.GeoJSON();
var features_Calidad_delagua_Subterranea_122023_2 = format_Calidad_delagua_Subterranea_122023_2.readFeatures(json_Calidad_delagua_Subterranea_122023_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Calidad_delagua_Subterranea_122023_2 = new ol.source.Vector({
    attributions: '',
});
jsonSource_Calidad_delagua_Subterranea_122023_2.addFeatures(features_Calidad_delagua_Subterranea_122023_2);
var lyr_Calidad_delagua_Subterranea_122023_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Calidad_delagua_Subterranea_122023_2, 
                style: style_Calidad_delagua_Subterranea_122023_2,
                popuplayertitle: "Calidad_del agua_Subterranea_2012-2023",
                interactive: false,
    title: 'Calidad_del agua_Subterranea_12-2023_CALIDAD<br />\
    <img src="styles/legend/Calidad_delagua_Subterranea_122023_2_0.png" /> Amarillo<br />\
    <img src="styles/legend/Calidad_delagua_Subterranea_122023_2_1.png" /> Rojo<br />\
    <img src="styles/legend/Calidad_delagua_Subterranea_122023_2_2.png" /> Verde<br />'
        });


        var jsonSource_BN_1 = new ol.source.Vector({
            attributions: ' ',
        });

            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
            "service=WFS&version=1.0.0&request=GetFeature&typeName=	DHC_AGUAKAN:BN" +
            "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_BN_1 = new ol.format.GeoJSON();
            var features_BN_1 = format_BN_1.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_BN_1.addFeatures(features_BN_1);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_BN_1 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_BN_1, 
            style: style_BN_1,
            popuplayertitle: "Carcamos",
            interactive: false,
            title: 'BN<br />\
            <img src="styles/legend/BN_1_0.png" /> CANCUN<br />\
            <img src="styles/legend/BN_1_1.png" /> ISLA MUJERES<br />\
            <img src="styles/legend/BN_1_2.png" /> PLAYA DEL CARMEN<br />\
            <img src="styles/legend/BN_1_3.png" /> PUERTO AVENTURAS<br />\
            <img src="styles/legend/BN_1_4.png" /> PUERTO MORELOS<br />'
                });


           //Solidaridad     
        
var format_SM_SOL_1 = new ol.format.GeoJSON();
var features_SM_SOL_1 = format_SM_SOL_1.readFeatures(json_SM_SOL_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_SM_SOL_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_SM_SOL_1.addFeatures(features_SM_SOL_1);
var lyr_SM_SOL_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_SM_SOL_1,
maxResolution:28.00446615226196,
 
                style: style_SM_SOL_1,
                popuplayertitle: "SM_SOL",
                interactive: false,
                title: '<img src="styles/legend/SM_SOL_1.png" /> SM_SOL'
            });


var format_Mza_sol_2 = new ol.format.GeoJSON();
var features_Mza_sol_2 = format_Mza_sol_2.readFeatures(json_Mza_sol_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Mza_sol_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Mza_sol_2.addFeatures(features_Mza_sol_2);
var lyr_Mza_sol_2 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Mza_sol_2,
maxResolution:2.8004466152261966,
 
                style: style_Mza_sol_2,
                popuplayertitle: "Mza_sol",
                interactive: false,
                title: '<img src="styles/legend/Mza_sol_2.png" /> Mza_sol'
            });


        var jsonSource_C_PTAR_2025_5_SOL = new ol.source.Vector({
            attributions: ' ',
        });
                
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                    "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:C_PTAR_2025_5_SOL" +
                    "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_C_PTAR_2025_5_SOL = new ol.format.GeoJSON();
            var features_C_PTAR_2025_5_SOL = format_C_PTAR_2025_5_SOL.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_C_PTAR_2025_5_SOL.addFeatures(features_C_PTAR_2025_5_SOL);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_C_PTAR_2025_5_SOL = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_C_PTAR_2025_5_SOL, 
            style: style_C_PTAR_2025_5_SOL_1,
            popuplayertitle: 'C_PTAR_2025_5_SOL',
            interactive: false,'opacity':1.0000,
            title: 'C_PTAR_2025_5_SOL<br />\
            <img src="styles/legend/C_PTAR_2025_5_SOL_1_0.png" /> GONZALO GUERRERO<br />\
            <img src="styles/legend/C_PTAR_2025_5_SOL_1_1.png" /> PLAYA CAR<br />\
            <img src="styles/legend/C_PTAR_2025_5_SOL_1_2.png" /> PUERTO AVENTURAS<br />\
            <img src="styles/legend/C_PTAR_2025_5_SOL_1_3.png" /> SAASTUNHA<br />' });


        var jsonSource_Carcamos_3 = new ol.source.Vector({
                    attributions: ' ',
        });
        
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
            "service=WFS&version=1.0.0&request=GetFeature&typeName=	DHC_AGUAKAN:Carcamos_SOL" +
            "&outputFormat=application/json&srsname=EPSG:3857"+
        "&CQL_FILTER= Estatus='Existente'")
            .then(response => response.json())  
            .then(data => {
            var format_Carcamos_3 = new ol.format.GeoJSON();
            var features_Carcamos_3 = format_Carcamos_3.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Carcamos_3.addFeatures(features_Carcamos_3);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Carcamos_3 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Carcamos_3, 
            style: style_Carcamos_3,
            popuplayertitle: "Carcamos",
            interactive: false,
            title: 'Carcamo<br />\
            <img src="styles/legend/Carcamos_25.png" /> Carcamos<br />'
                });


            var jsonSource_Emisor_4 = new ol.source.Vector({
            attributions: ' ',
        });
                
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=	DHC_AGUAKAN:Emisor_Colector_SOL" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
            "&CQL_FILTER= layer='EMISOR'and Estatus='Existente'")
            .then(response => response.json())  
            .then(data => {
            var format_Emisor_4 = new ol.format.GeoJSON();
            var features_Emisor_4 = format_Emisor_4.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Emisor_4.addFeatures(features_Emisor_4);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Emisor_4 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Emisor_4, 
            style: style_Emisor_4,
            popuplayertitle: "Red DS",
            interactive: false,
            title: 'Emisores<br />\
            <img src="styles/legend/Emisores_colectores_26_1.png" /> EMISOR<br />'
                });


            var jsonSource_Colector_4 = new ol.source.Vector({
            attributions: ' ',
        });
                
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=	DHC_AGUAKAN:Emisor_Colector_SOL" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
            "&CQL_FILTER= layer='Colector'and Estatus='Existente'")
            .then(response => response.json())  
            .then(data => {
            var format_Colector_4 = new ol.format.GeoJSON();
            var features_Colector_4 = format_Colector_4.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Colector_4.addFeatures(features_Colector_4);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Colector_4 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Colector_4, 
            style: style_Colector_4,
            popuplayertitle: "Red DS",
            interactive: false,
            title: 'Colectores<br />\
            <img src="styles/legend/Emisores_colectores_26_0.png" /> Colector<br />'
                 });

var jsonSource_Tuberia_ASS_SOl = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Ass_cana" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
            "&CQL_FILTER= Municipio='Solidaridad'")
            .then(response => response.json())  
            .then(data => {
            var format_Tuberia_ASS_SOl = new ol.format.GeoJSON();
            var features_Tuberia_ASS_SOl = format_Tuberia_ASS_SOl.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Tuberia_ASS_SOl.addFeatures(features_Tuberia_ASS_SOl);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Tuberia_ASS_SOl = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Tuberia_ASS_SOl, 
            style: style_Tuberia_ASS_0,
            popuplayertitle: "Redes Secundaria",
            interactive: false,
            title: 'Red Secundaria<br />\
            <img src="styles/legend/Tuberia_ASS_0.png" /> Atarjeas<br />\
            '
            });

        var jsonSource_posos_colector_5 = new ol.source.Vector({
            attributions: ' ',
        });
        
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
            "service=WFS&version=1.0.0&request=GetFeature&typeName=	DHC_AGUAKAN:posos_colector_SOL" +
            "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_posos_colector_5 = new ol.format.GeoJSON();
            var features_posos_colector_5 = format_posos_colector_5.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_posos_colector_5.addFeatures(features_posos_colector_5);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_posos_colector_5 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_posos_colector_5, 
            style: style_posos_colector_5,
            popuplayertitle: "Pozos colector",
            interactive: false,
            title: '<img src="styles/legend/posos_colector_5.png" /> posos_colector'
            });


        var jsonSource_Ptar_6 = new ol.source.Vector({
            attributions: ' ',
        });
        
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
            "service=WFS&version=1.0.0&request=GetFeature&typeName=	DHC_AGUAKAN:Ptar_SOL" +
            "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_Ptar_6 = new ol.format.GeoJSON();
            var features_Ptar_6 = format_Ptar_6.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Ptar_6.addFeatures(features_Ptar_6);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Ptar_6 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Ptar_6, 
            style: style_Ptar_6,
            popuplayertitle: "Tanques_SOL",
            interactive: false,
            title: '<img src="styles/legend/Ptar_6.png" /> Ptar'
            });

        var jsonSource_linea_Chemuyil_7 = new ol.source.Vector({
            attributions: ' ',
        });
        
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=	DHC_AGUAKAN:AEP_CANA_AP" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
            "&CQL_FILTER= Municipio='Solidaridad' and Tipo_de_Re='Distribucion'and Estatus='Existente'")
            .then(response => response.json())  
            .then(data => {
            var format_linea_Chemuyil_7 = new ol.format.GeoJSON();
            var features_linea_Chemuyil_7 = format_linea_Chemuyil_7.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_linea_Chemuyil_7.addFeatures(features_linea_Chemuyil_7);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_linea_Chemuyil_7 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_linea_Chemuyil_7, 
            style: style_Distribucion_BJ_copy_1,
                popuplayertitle: "Distribucion",
                interactive: false,
                title: 'Distribucion<br />\
                <img src="styles/legend/Tanques_34_0.png" /> Existente<br />\
                '
                });

        var jsonSource_Conduccion_8 = new ol.source.Vector({
                attributions: ' ',
        });
                
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=	DHC_AGUAKAN:AEP_CANA_AP" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
            "&CQL_FILTER= Municipio='Solidaridad' and Tipo_de_Re='Conduccion' and Estatus='Existente' ")

            .then(response => response.json())  
            .then(data => {
            var format_Conduccion_8 = new ol.format.GeoJSON();
            var features_Conduccion_8 = format_Conduccion_8.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Conduccion_8.addFeatures(features_Conduccion_8);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Conduccion_8 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Conduccion_8, 
             style: style_Conduccion_BJ_copy_1,
            popuplayertitle: "Conduccion",
            interactive: false,
            title: 'Conduccion<br />\
            <img src="styles/legend/Tanques_34_2.png" /> Existente<br />\
            '
            });



        var jsonSource_Conduccion_Proy_Sol = new ol.source.Vector({
            attributions: ' ',
        });
        
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:AEP_CANA_AP" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
                "&CQL_FILTER=Tipo_de_Re='Conduccion' and Municipio='Solidaridad'and Estatus='Q2023_2027' ")

            .then(response => response.json())  
            .then(data => {
            var format_Conduccion_Proy_Sol = new ol.format.GeoJSON();
            var features_Conduccion_Proy_Sol = format_Conduccion_Proy_Sol.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Conduccion_Proy_Sol.addFeatures(features_Conduccion_Proy_Sol);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Conduccion_Proy_Sol = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Conduccion_Proy_Sol, 
            style: style_Conduccion_40,
            popuplayertitle: "Tuberia",
            interactive: false,
            title: 'Conduccion<br />\
            <img src="styles/legend/Tanques_34_1.png" /> Q2023-2027<br />'
                });




    
        var jsonSource_Tanques_9 = new ol.source.Vector({
                attributions: ' ',
        });
        
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
            "service=WFS&version=1.0.0&request=GetFeature&typeName=	DHC_AGUAKAN:Tanques_SOL" +
            "&outputFormat=application/json&srsname=EPSG:3857"+
        "&CQL_FILTER= Estatus='Existente' ")
            .then(response => response.json())  
            .then(data => {
            var format_Tanques_9 = new ol.format.GeoJSON();
            var features_Tanques_9 = format_Tanques_9.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Tanques_9.addFeatures(features_Tanques_9);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Tanques_9 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Tanques_9, 
            style: style_Tanques_9,
            popuplayertitle: "Tanques_SOL",
            interactive: false,
            title: 'Tanques<br />\
            <img src="styles/legend/Tanques_9_0.png" /> EXISTENTE<br />\
            '
                });

        var jsonSource_Pozos_captacion_10 = new ol.source.Vector({
            attributions: ' ',
        });
                
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                    "service=WFS&version=1.0.0&request=GetFeature&typeName=	DHC_AGUAKAN:Pozos_captacion_SOL" +
                    "&outputFormat=application/json&srsname=EPSG:3857"+
                "&CQL_FILTER= Estatus='Existente'")
            .then(response => response.json())  
            .then(data => {
            var format_Pozos_captacion_10 = new ol.format.GeoJSON();
            var features_Pozos_captacion_10 = format_Pozos_captacion_10.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Pozos_captacion_10.addFeatures(features_Pozos_captacion_10);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Pozos_captacion_10 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Pozos_captacion_10, 
            style: style_Pozos_captacion_10,
            popuplayertitle: "Pozos de Captacion",
            interactive: false,
            title: 'Pozos_captacion<br />\
            <img src="styles/legend/Pozos_captacion_10_0.png" /> EXISTENTE<br />\
            '
                });
        

        var jsonSource_P_Osmosis_11 = new ol.source.Vector({
            attributions: ' ',
        });
                
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                    "service=WFS&version=1.0.0&request=GetFeature&typeName=	DHC_AGUAKAN:P_Osmosis_SOL" +
                    "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_P_Osmosis_11 = new ol.format.GeoJSON();
            var features_P_Osmosis_11 = format_P_Osmosis_11.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_P_Osmosis_11.addFeatures(features_P_Osmosis_11);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_P_Osmosis_11 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_P_Osmosis_11, 
            style: style_P_Osmosis_11,
            popuplayertitle: "P_Osmosis",
            interactive: false,
            title: '<img src="styles/legend/P_Osmosis_11.png" /> P_Osmosis'
        });






    var jsonSource_C_T_2025_5_SOL_0 = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:C_T_2025_5_SOL" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_C_T_2025_5_SOL_0 = new ol.format.GeoJSON();
            var features_C_T_2025_5_SOL_0 = format_C_T_2025_5_SOL_0.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_C_T_2025_5_SOL_0.addFeatures(features_C_T_2025_5_SOL_0);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_C_T_2025_5_SOL_0 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_C_T_2025_5_SOL_0, 
            style: style_C_T_2025_5_SOL_0,
            popuplayertitle: "C_T_2025_5_SOL",
            interactive: false,'opacity':1,
            title: 'C_T_2025_5_SOL<br />\
    <img src="styles/legend/C_T_2025_5_SOL_0_0.png" /> Palmanova<br />\
    <img src="styles/legend/C_T_2025_5_SOL_0_1.png" /> TANQUE 1<br />\
    <img src="styles/legend/C_T_2025_5_SOL_0_2.png" /> TANQUE 10<br />\
    <img src="styles/legend/C_T_2025_5_SOL_0_3.png" /> TANQUE 11<br />\
    <img src="styles/legend/C_T_2025_5_SOL_0_4.png" /> TANQUE 12<br />\
    <img src="styles/legend/C_T_2025_5_SOL_0_5.png" /> TANQUE 2<br />\
    <img src="styles/legend/C_T_2025_5_SOL_0_6.png" /> TANQUE 3<br />\
    <img src="styles/legend/C_T_2025_5_SOL_0_7.png" /> TANQUE 4<br />\
    <img src="styles/legend/C_T_2025_5_SOL_0_8.png" /> TANQUE 5<br />\
    <img src="styles/legend/C_T_2025_5_SOL_0_9.png" /> TANQUE 6<br />\
    <img src="styles/legend/C_T_2025_5_SOL_0_10.png" /> TANQUE 7<br />\
    <img src="styles/legend/C_T_2025_5_SOL_0_11.png" /> TANQUE 8<br />\
    <img src="styles/legend/C_T_2025_5_SOL_0_12.png" /> TANQUE 9<br />\
    <img src="styles/legend/C_T_2025_5_SOL_0_13.png" /> TANQUE DIAMANTE<br />\
    <img src="styles/legend/C_T_2025_5_SOL_0_14.png" /> TANQUE PUEBLO<br />\
    <img src="styles/legend/C_T_2025_5_SOL_0_15.png" /> TANQUE PUERTO MAYA<br />\
    <img src="styles/legend/C_T_2025_5_SOL_0_16.png" /> <br />' });




    var jsonSource_Cob_Lin_AP_PC_26 = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Cobertura_LineaAP_2026_PC" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_Cob_Lin_AP_PC_26 = new ol.format.GeoJSON();
            var features_Cob_Lin_AP_PC_26 = format_Cob_Lin_AP_PC_26.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Cob_Lin_AP_PC_26.addFeatures(features_Cob_Lin_AP_PC_26);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Cob_Lin_AP_PC_26 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Cob_Lin_AP_PC_26, 
            style: style_Cob_AP_PC_2026_1,
            popuplayertitle: "Cob linea AP_PC_2026",
            interactive: false,'opacity':1,
               title: 'Cob linea AP_PC_2026<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_0.png" /> 7.1 28 de Julio<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_1.png" /> 7.1 Bosque Real - Fundador I<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_2.png" /> 7.1 Galaxia I<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_3.png" /> 7.1 Galaxia II<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_4.png" /> 7.1 Mision del Carmen<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_5.png" /> 7.1 Mundo Habitat<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_6.png" /> 7.1 Privadas Bosque Real Norte<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_7.png" /> 7.1 Privadas Bosque Real Sur<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_8.png" /> 7.1 Santa Fe<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_9.png" /> 7.2 Caribe Residencial<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_10.png" /> 7.2 Catalunha I<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_11.png" /> 7.2 Catalunha II<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_12.png" /> 7.2 Los Olivos I<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_13.png" /> 7.2 Los Olivos III<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_14.png" /> 7.2 Los Olivos IV<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_15.png" /> 7.2 Mision Villamar I<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_16.png" /> 7.2 Paraiso Playa del Carmen<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_17.png" /> 7.2 Real del Sol<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_18.png" /> 7.2 SM 75<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_19.png" /> 7.2 Toscana<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_20.png" /> 7.2 Tumben Chilam<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_21.png" /> 7.2 Walmart Petempich<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_22.png" /> 7.3 Arrecifes<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_23.png" /> 7.3 La Selva<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_24.png" /> 7.3 Univ. de Quintana Roo<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_25.png" /> 7.3 Villa Maya<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_26.png" /> 7.3 Villamar II<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_27.png" /> 7.5<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_28.png" /> L-30 TAP DIAMANTE<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_29.png" /> L30-TAP 11 PC<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_30.png" /> TAP 1 PC<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_31.png" /> TAP 10 PC<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_32.png" /> TAP 12 PC<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_33.png" /> TAP 13 PC<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_34.png" /> TAP 14 PC<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_35.png" /> TAP 15 PC<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_36.png" /> TAP 2 PC<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_37.png" /> TAP 3 PC<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_38.png" /> TAP 4 PC<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_39.png" /> TAP 5 PC<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_40.png" /> TAP 6 - Ejidal I<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_41.png" /> TAP 6 - Ejido II y Forjadores<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_42.png" /> TAP 6 - Ejido III<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_43.png" /> TAP 6 - Ejido IV<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_44.png" /> TAP 6 CRUZ<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_45.png" /> TAP 6 PC<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_46.png" /> TAP 8 PC<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_47.png" /> TAP 9 PC<br />\
    <img src="styles/legend/Cob_AP_PC_2026_1_48.png" /> <br />' });









    var jsonSource_C_C_2025_5_SOL_1 = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:C_C_2025_5_SOL" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_C_C_2025_5_SOL_1 = new ol.format.GeoJSON();
            var features_C_C_2025_5_SOL_1 = format_C_C_2025_5_SOL_1.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_C_C_2025_5_SOL_1.addFeatures(features_C_C_2025_5_SOL_1);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_C_C_2025_5_SOL_1 = new ol.layer.Vector({
            declutter: false,
            source: jsonSource_C_C_2025_5_SOL_1, 
            style: style_C_C_2025_5_SOL_1,
            popuplayertitle: "C_C_2025_5_SOL",
            interactive: false,'opacity':1,
            title:'C_C_2025_5_SOL<br />\
    <img src="styles/legend/C_C_2025_5_SOL_1_0.png" /> 88<br />\
    <img src="styles/legend/C_C_2025_5_SOL_1_1.png" /> BALAM TUN<br />\
    <img src="styles/legend/C_C_2025_5_SOL_1_2.png" /> CAME<br />\
    <img src="styles/legend/C_C_2025_5_SOL_1_3.png" /> COLOSIO<br />\
    <img src="styles/legend/C_C_2025_5_SOL_1_4.png" /> CTM<br />\
    <img src="styles/legend/C_C_2025_5_SOL_1_5.png" /> DIAMANTE<br />\
    <img src="styles/legend/C_C_2025_5_SOL_1_6.png" /> EJIDO SUR<br />\
    <img src="styles/legend/C_C_2025_5_SOL_1_7.png" /> FINAL<br />\
    <img src="styles/legend/C_C_2025_5_SOL_1_8.png" /> GAVIOTAS<br />\
    <img src="styles/legend/C_C_2025_5_SOL_1_9.png" /> GONZALO GUERRERO<br />\
    <img src="styles/legend/C_C_2025_5_SOL_1_10.png" /> LAS PALMAS<br />\
    <img src="styles/legend/C_C_2025_5_SOL_1_11.png" /> MAYAKOBA<br />\
    <img src="styles/legend/C_C_2025_5_SOL_1_12.png" /> MISION LAS FLORES<br />\
    <img src="styles/legend/C_C_2025_5_SOL_1_13.png" /> PALMANOVA<br />\
    <img src="styles/legend/C_C_2025_5_SOL_1_14.png" /> PLAYERO<br />\
    <img src="styles/legend/C_C_2025_5_SOL_1_15.png" /> PTAR GONZALO G.<br />\
    <img src="styles/legend/C_C_2025_5_SOL_1_16.png" /> Puerto aventuras<br />\
    <img src="styles/legend/C_C_2025_5_SOL_1_17.png" /> Puerto Aventuras2<br />\
    <img src="styles/legend/C_C_2025_5_SOL_1_18.png" /> TOSCANA<br />\
    <img src="styles/legend/C_C_2025_5_SOL_1_19.png" /> VILLAS DEL SOL<br />\
    <img src="styles/legend/C_C_2025_5_SOL_1_20.png" /> VILLAS DEL SOL VI<br />\
    <img src="styles/legend/C_C_2025_5_SOL_1_21.png" /> <br />' });













        var jsonSource_Puntos_sectorizacion_PDC = new ol.source.Vector({
            attributions: ' ',
        });
        
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Puntos_sectorizacion_PDC" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_Puntos_sectorizacion_PDC = new ol.format.GeoJSON();
            var features_Puntos_sectorizacion_PDC = format_Puntos_sectorizacion_PDC.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Puntos_sectorizacion_PDC.addFeatures(features_Puntos_sectorizacion_PDC);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Puntos_sectorizacion_PDC = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Puntos_sectorizacion_PDC, 
            style: style_AEP_VANN_VALVULAS_5,
            popuplayertitle: "Puntos sectorizacion",
            interactive: false,
            title: ' <img src="styles/legend/AEP_VANN_VALVULAS_5.png" />Puntos sectorizacion<br />\ '
            });















// PM



var format_Poligono_Actuacion_12 = new ol.format.GeoJSON();
var features_Poligono_Actuacion_12 = format_Poligono_Actuacion_12.readFeatures(json_Poligono_Actuacion_12, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Poligono_Actuacion_12 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Poligono_Actuacion_12.addFeatures(features_Poligono_Actuacion_12);
var lyr_Poligono_Actuacion_12 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Poligono_Actuacion_12,
maxResolution:28.00446615226196,
 
                style: style_Poligono_Actuacion_12,
                popuplayertitle: "Poligono_Actuacion",
                interactive: false,
                title: '<img src="styles/legend/Poligono_Actuacion_12.png" /> Poligono_Actuacion'
            });

var format_Sectores_PM_13 = new ol.format.GeoJSON();
var features_Sectores_PM_13 = format_Sectores_PM_13.readFeatures(json_Sectores_PM_13, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Sectores_PM_13 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Sectores_PM_13.addFeatures(features_Sectores_PM_13);
var lyr_Sectores_PM_13 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Sectores_PM_13,
maxResolution:16.802679691357177,
 
                style: style_Sectores_PM_13,
                popuplayertitle: "Sectores_PM",
                interactive: false,
                title: '<img src="styles/legend/Sectores_PM_13.png" /> Sectores_PM'
            });

var format_SM_Puerto_Morelos_14 = new ol.format.GeoJSON();
var features_SM_Puerto_Morelos_14 = format_SM_Puerto_Morelos_14.readFeatures(json_SM_Puerto_Morelos_14, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_SM_Puerto_Morelos_14 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_SM_Puerto_Morelos_14.addFeatures(features_SM_Puerto_Morelos_14);
var lyr_SM_Puerto_Morelos_14 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_SM_Puerto_Morelos_14,
maxResolution:8.401339845678589,
 
                style: style_SM_Puerto_Morelos_14,
                popuplayertitle: "SM_Puerto_Morelos",
                interactive: false,
                title: '<img src="styles/legend/SM_Puerto_Morelos_14.png" /> SM_Puerto_Morelos'
            });
            
var format_Manzanas_PuertoMorelos_15 = new ol.format.GeoJSON();
var features_Manzanas_PuertoMorelos_15 = format_Manzanas_PuertoMorelos_15.readFeatures(json_Manzanas_PuertoMorelos_15, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Manzanas_PuertoMorelos_15 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Manzanas_PuertoMorelos_15.addFeatures(features_Manzanas_PuertoMorelos_15);
var lyr_Manzanas_PuertoMorelos_15 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Manzanas_PuertoMorelos_15,
maxResolution:2.8004466152261966,
 
                style: style_Manzanas_PuertoMorelos_15,
                popuplayertitle: "Manzanas_Puerto Morelos",
                interactive: false,
                title: '<img src="styles/legend/Manzanas_PuertoMorelos_15.png" /> Manzanas_Puerto Morelos'
            });

        var jsonSource_Emisor_Colector_16 = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName= DHC_AGUAKAN:Emisor_Colector" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_Emisor_Colector_16 = new ol.format.GeoJSON();
            var features_Emisor_Colector_16 = format_Emisor_Colector_16.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Emisor_Colector_16.addFeatures(features_Emisor_Colector_16);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Emisor_Colector_16 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Emisor_Colector_16, 
            style: style_Emisor_Colector_16,
            popuplayertitle: "Emisor_Colector",
            interactive: false,
            interactive: false,
            title: '<img src="styles/legend/Emisor_Colector_16.png" /> Emisor_Colector'
        });

        var jsonSource_Carcamo_17 = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName= DHC_AGUAKAN:Carcamo_PM" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
                "&CQL_FILTER=Estatus='Existente'")
            .then(response => response.json())  
            .then(data => {
            var format_Carcamo_17 = new ol.format.GeoJSON();
            var features_Carcamo_17 = format_Carcamo_17.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Carcamo_17.addFeatures(features_Carcamo_17);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Carcamo_17 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Carcamo_17, 
            style: style_Carcamo_17,
            popuplayertitle: "Emisor_Colector",
            interactive: false,
            interactive: false,
            title: '<img src="styles/legend/Carcamo_17.png" /> Carcamo'
            });

        var jsonSource_Ptar_18 = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName= DHC_AGUAKAN:Ptar_PM" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
            "&CQL_FILTER=Estatus='Existente'")
            .then(response => response.json())  
            .then(data => {
            var format_Ptar_18 = new ol.format.GeoJSON();
            var features_Ptar_18 = format_Ptar_18.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Ptar_18.addFeatures(features_Ptar_18);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Ptar_18 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Ptar_18, 
            style: style_Ptar_18,
            popuplayertitle: "Emisor_Colector",
            interactive: false,
            interactive: false,
            title: 'Ptar<br />\
            <img src="styles/legend/Ptar_28_1.png" /> AGUAKAN<br />\
            <img src="styles/legend/Ptar_18_1.png" /> DESARROLLADOR<br />'
            });

        var jsonSource_Conduccion_PM= new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                    "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:AEP_CANA_AP" +
                    "&outputFormat=application/json&srsname=EPSG:3857"+
                "&CQL_FILTER=Tipo_de_Re='Conduccion' and Municipio='Puerto Morelos'")
            .then(response => response.json())  
            .then(data => {
            var format_Conduccion_PM = new ol.format.GeoJSON();
            var features_Conduccion_PM= format_Conduccion_PM.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Conduccion_PM.addFeatures(features_Conduccion_PM);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Conduccion_PM = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Conduccion_PM, 
            style: style_Conduccion_40,
            popuplayertitle: "Tuberia",
            interactive: false,
            title: 'Conduccion<br />\
            <img src="styles/legend/Tanques_34_2.png" /> Existente<br />\
            '
                });

            var jsonSource_Distribucion_PM_copy_1 = new ol.source.Vector({
                attributions: ' ',
            });
            
                fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                    "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:AEP_CANA_AP" +
                    "&outputFormat=application/json&srsname=EPSG:3857"+
                "&CQL_FILTER=Tipo_de_Re='Distribucion' and Municipio='Puerto Morelos'")
                .then(response => response.json())  
                .then(data => {
                var format_Distribucion_PM_copy_1 = new ol.format.GeoJSON();
                var features_Distribucion_PM_copy_1 = format_Distribucion_PM_copy_1.readFeatures(data, {
                            
                featureProjection: 'EPSG:3857' 
                });
                jsonSource_Distribucion_PM_copy_1.addFeatures(features_Distribucion_PM_copy_1);
                })
                .catch(error => console.error("Error al cargar los datos:", error));
                
                var lyr_Distribucion_PM_copy_1 = new ol.layer.Vector({
                declutter: true,
                source: jsonSource_Distribucion_PM_copy_1, 
                style: style_Distribucion_BJ_copy_1,
                popuplayertitle: "Distribucion",
                interactive: false,
                title: 'Distribucion<br />\
                <img src="styles/legend/Tanques_34_0.png" /> Existente<br />\
                '
                });

        var jsonSource_Tanques_20 = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName= DHC_AGUAKAN:Tanques_PM	" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_Tanques_20 = new ol.format.GeoJSON();
            var features_Tanques_20 = format_Tanques_20.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Tanques_20.addFeatures(features_Tanques_20);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Tanques_20 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Tanques_20, 
            style: style_Tanques_20,
            popuplayertitle: "Tanque",
            interactive: false,
            title: 'Tanque <br/>\
            <img src="styles/legend/Tanques_20.png" /> Existente'
            });

 var jsonSource_pozos_captacion_PM = new ol.source.Vector({
            attributions: ' ',
        });
                
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                    "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Pozos_de_Captacion" +
                    "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_pozos_captacion_PM = new ol.format.GeoJSON();
            var features_pozos_captacion_PM = format_pozos_captacion_PM.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_pozos_captacion_PM.addFeatures(features_pozos_captacion_PM);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_pozos_captacion_PM = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_pozos_captacion_PM, 
            style: style_pozos_captacion_35,
            popuplayertitle: "Pozos de captacion PM",
            interactive: false,
            title: 'Pozos Captacion<br />\
            <img src="styles/legend/pozos_captacion_35_0.png" /> Existente<br />'
            });

        var jsonSource_VALVULAS_21 = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName= DHC_AGUAKAN:VALVULAS_PM	" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_VALVULAS_21 = new ol.format.GeoJSON();
            var features_VALVULAS_21 = format_VALVULAS_21.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_VALVULAS_21.addFeatures(features_VALVULAS_21);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_VALVULAS_21 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_VALVULAS_21, 
            style: style_VALVULAS_21,
            popuplayertitle: "Valvulas",
            interactive: false,
            interactive: false,
            title: '<img src="styles/legend/VALVULAS_21.png" /> VALVULAS'
            });


const lyr_Clientes_lv_01 = new ol.layer.Tile({
    title: "Leona Vicario",
  source: new ol.source.TileWMS({
    url: 'https://dhcqgis.aguakan.com/geoserver/DHC_AGUAKAN/wms?',
    params: {
      'LAYERS': 'DHC_AGUAKAN:vista_pm_basex7_local',
      'TILED': true,
       "CQL_FILTER": "localidad='LEONA VICARIO'"
    },
    serverType: 'geoserver',
    crossOrigin: 'anonymous'
  }),
  visible: true
});


const lyr_Clientes_PM_01 = new ol.layer.Tile({
    title: "Puerto Morelos",
  source: new ol.source.TileWMS({
    url: 'https://dhcqgis.aguakan.com/geoserver/DHC_AGUAKAN/wms?',
    params: {
      'LAYERS': 'DHC_AGUAKAN:vista_pm_basex7_local',
      'TILED': true,
       "CQL_FILTER": "localidad='PUERTO MORELOS'"
    },
    serverType: 'geoserver',
    crossOrigin: 'anonymous'
  }),
  visible: true
});



//Benito Juarez--------


var format_zones_22 = new ol.format.GeoJSON();
var features_zones_22 = format_zones_22.readFeatures(json_zones_22, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_zones_22 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_zones_22.addFeatures(features_zones_22);
var lyr_zones_22 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_zones_22, 
                style: style_zones_22,
                popuplayertitle: "zones",
                interactive: false,'opacity':0.50000,
            title: 'zones<br />\
            <img src="styles/legend/zones_22_0.png" /> Zona 1<br />\
            <img src="styles/legend/zones_22_1.png" /> Zona 10<br />\
            <img src="styles/legend/zones_22_2.png" /> Zona 11<br />\
            <img src="styles/legend/zones_22_3.png" /> Zona 11A<br />\
            <img src="styles/legend/zones_22_4.png" /> Zona 11B<br />\
            <img src="styles/legend/zones_22_5.png" /> Zona 12<br />\
            <img src="styles/legend/zones_22_6.png" /> Zona 13<br />\
            <img src="styles/legend/zones_22_7.png" /> Zona 15<br />\
            <img src="styles/legend/zones_22_8.png" /> Zona 2<br />\
            <img src="styles/legend/zones_22_9.png" /> Zona 3<br />\
            <img src="styles/legend/zones_22_10.png" /> Zona 4<br />\
            <img src="styles/legend/zones_22_11.png" /> Zona 5<br />\
            <img src="styles/legend/zones_22_12.png" /> Zona 6<br />\
            <img src="styles/legend/zones_22_13.png" /> Zona 7<br />\
            <img src="styles/legend/zones_22_14.png" /> Zona 7B<br />\
            <img src="styles/legend/zones_22_15.png" /> Zona 8<br />'
                });

       var jsonSource_SM_23 = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:SM_BJ" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_SM_23 = new ol.format.GeoJSON();
            var features_SM_23 = format_SM_23.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_SM_23.addFeatures(features_SM_23);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_SM_23 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_SM_23, 
            style: style_SM_23,
            popuplayertitle: "SM",
            interactive: false,
            title: '<img src="styles/legend/SM_23.png" /> SM'
            });


    var jsonSource_condominios = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:condominios" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_condominios = new ol.format.GeoJSON();
            var features_condominios = format_condominios.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_condominios.addFeatures(features_condominios);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_condominios = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_condominios, 
            style: style_condominios,
            popuplayertitle: "SM",
            interactive: false,
            title: '<img src="styles/legend/SM_23.png" /> Condominios'
            });






        var jsonSource_Lotes_BJ = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Parcelas_BJ" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_Lotes_BJ = new ol.format.GeoJSON();
            var features_Lotes_BJ = format_Lotes_BJ.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Lotes_BJ.addFeatures(features_Lotes_BJ);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Lotes_BJ = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Lotes_BJ, 
            maxResolution:20,
            maxResolution:1,
            style: style_Lotes_BJ,
            popuplayertitle: "Lotes",
            interactive: false,
            title: '<img src="styles/legend/SM_23.png" /> Lotes'
            });

        var jsonSource_Sectores_BJ = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Sectores_BJ" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_Sectores_BJ = new ol.format.GeoJSON();
            var features_Sectores_BJ = format_Sectores_BJ.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Sectores_BJ.addFeatures(features_Sectores_BJ);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Sectores_BJ = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Sectores_BJ, 
            style: style_Lotes_BJ,
            popuplayertitle: "Sectores_BJ",
            interactive: false,
            title: '<img src="styles/legend/SM_23.png" /> Sectores'
            });

        var jsonSource_Pol_Actuacion_BJ = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Pol_Actuacion_BJ" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_Pol_Actuacion_BJ = new ol.format.GeoJSON();
            var features_Pol_Actuacion_BJ = format_Pol_Actuacion_BJ.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Pol_Actuacion_BJ.addFeatures(features_Pol_Actuacion_BJ);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Pol_Actuacion_BJ = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Pol_Actuacion_BJ, 
            style: style_Lotes_BJ,
            popuplayertitle: "Pol_Actuacion_BJ",
            interactive: false,
            title: '<img src="styles/legend/SM_23.png" /> Pololigono de Actuacion'
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
            title: 'Emisores<br />\
                       <img src="styles/legend/Emisores_colectores_26_1.png" /> EMISOR<br />'
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
            title: 'Colectores<br />\
            <img src="styles/legend/Emisores_colectores_26_0.png" /> Colector<br />'
                });

        var jsonSource_pozos_colectores_27 = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:pozos_colectores" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_pozos_colectores_27 = new ol.format.GeoJSON();
            var features_pozos_colectores_27 = format_pozos_colectores_27.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_pozos_colectores_27.addFeatures(features_pozos_colectores_27);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_pozos_colectores_27 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_pozos_colectores_27, 
            style: style_pozos_colectores_27,
            popuplayertitle: "Pozos colectores",
            interactive: false,
            title: '<img src="styles/legend/pozos_colectores_27.png" /> pozos_colectores'
        });

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
            title: 'Ptar<br />\
            <img src="styles/legend/Ptar_28_0.png" /> CONSTRUCCION<br />\
            <img src="styles/legend/Ptar_28_1.png" /> EXISTENTE<br />\
            '
                });

        var jsonSource_Cobertura_PTAR_BJ_0 = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=	DHC_AGUAKAN:Cobertura_PTAR_BJ" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_Cobertura_PTAR_BJ_0 = new ol.format.GeoJSON();
            var features_Cobertura_PTAR_BJ_0 = format_Cobertura_PTAR_BJ_0.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Cobertura_PTAR_BJ_0.addFeatures(features_Cobertura_PTAR_BJ_0);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Cobertura_PTAR_BJ_0 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Cobertura_PTAR_BJ_0, 
            style: style_Cobertura_PTAR_BJ_0,
            popuplayertitle: "Cobertura_PTAR_BJ",
            interactive: false,'opacity':1.0000,
            title: 'Cobertura_PTAR_BJ<br />\
            <img src="styles/legend/Cobertura_PTAR_BJ_0_0.png" /> CARIBE 2000<br />\
            <img src="styles/legend/Cobertura_PTAR_BJ_0_1.png" /> EL REY<br />\
            <img src="styles/legend/Cobertura_PTAR_BJ_0_2.png" /> GUKUMATZ<br />\
            <img src="styles/legend/Cobertura_PTAR_BJ_0_3.png" /> ISLA AZUL<br />\
            <img src="styles/legend/Cobertura_PTAR_BJ_0_4.png" /> KUSAMIL<br />\
            <img src="styles/legend/Cobertura_PTAR_BJ_0_5.png" /> LOGISTICO SUR<br />\
            <img src="styles/legend/Cobertura_PTAR_BJ_0_6.png" /> NORPONIENTE<br />\
            <img src="styles/legend/Cobertura_PTAR_BJ_0_7.png" /> NORTE<br />\
            <img src="styles/legend/Cobertura_PTAR_BJ_0_8.png" /> POK TA POK<br />\
            <img src="styles/legend/Cobertura_PTAR_BJ_0_9.png" /> SUR<br />'
            });
  
        var jsonSource_Zonas_captacion_29 = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=	DHC_AGUAKAN:Zonas_captacion" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_Zonas_captacion_29 = new ol.format.GeoJSON();
            var features_Zonas_captacion_29 = format_Zonas_captacion_29.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Zonas_captacion_29.addFeatures(features_Zonas_captacion_29);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Zonas_captacion_29 = new ol.layer.Vector({
            declutter: false,
            source: jsonSource_Zonas_captacion_29, 
            style: style_Zonas_captacion_29,
            popuplayertitle: "Zonas_captacion",
                interactive: false,
                title: '<img src="styles/legend/Zonas_captacion_29.png" /> Zonas_captacion'
            });

        var jsonSource_Coberturas_Lineas_30 = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:cobertura_linea_2026" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
            "&CQL_FILTER=Fecha_Rev='2026/01/10'")            
            .then(response => response.json())  
            .then(data => {
            var format_Coberturas_Lineas_30 = new ol.format.GeoJSON();
            var features_Coberturas_Lineas_30 = format_Coberturas_Lineas_30.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Coberturas_Lineas_30.addFeatures(features_Coberturas_Lineas_30);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Coberturas_Lineas_30 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Coberturas_Lineas_30, 
            style: style_cobertura_linea_2026_1,
            popuplayertitle: "Coberturas_Lineas",
            interactive: false,'opacity':1.0000,
    title: 'cobertura_linea_2026<br />\
    <img src="styles/legend/cobertura_linea_2026_1_0.png" /> 0+000 L6<br />\
    <img src="styles/legend/cobertura_linea_2026_1_1.png" /> 1A - Casas del Mar<br />\
    <img src="styles/legend/cobertura_linea_2026_1_2.png" /> 1A - La Selva<br />\
    <img src="styles/legend/cobertura_linea_2026_1_3.png" /> 1A - Linda Vista<br />\
    <img src="styles/legend/cobertura_linea_2026_1_4.png" /> 1A - Tierra Maya<br />\
    <img src="styles/legend/cobertura_linea_2026_1_5.png" /> 1A - Villas del Caribe<br />\
    <img src="styles/legend/cobertura_linea_2026_1_6.png" /> 2 Cuchilla<br />\
    <img src="styles/legend/cobertura_linea_2026_1_7.png" /> 2 pegue 95<br />\
    <img src="styles/legend/cobertura_linea_2026_1_8.png" /> 2 pegue 96<br />\
    <img src="styles/legend/cobertura_linea_2026_1_9.png" /> 2 pegue 97<br />\
    <img src="styles/legend/cobertura_linea_2026_1_10.png" /> 2 pegue 98<br />\
    <img src="styles/legend/cobertura_linea_2026_1_11.png" /> 2 pegue 99<br />\
    <img src="styles/legend/cobertura_linea_2026_1_12.png" /> 2 Villas Carobin<br />\
    <img src="styles/legend/cobertura_linea_2026_1_13.png" /> 2 Zona Industrial<br />\
    <img src="styles/legend/cobertura_linea_2026_1_14.png" /> 2000 Oriente L40s<br />\
    <img src="styles/legend/cobertura_linea_2026_1_15.png" /> 2000 Portillo L12<br />\
    <img src="styles/legend/cobertura_linea_2026_1_16.png" /> 2000 Portillo L20<br />\
    <img src="styles/legend/cobertura_linea_2026_1_17.png" /> 2000 Portillo L24<br />\
    <img src="styles/legend/cobertura_linea_2026_1_18.png" /> 6A - Cd Natura<br />\
    <img src="styles/legend/cobertura_linea_2026_1_19.png" /> 6A - Lagos<br />\
    <img src="styles/legend/cobertura_linea_2026_1_20.png" /> 6A - Palmas<br />\
    <img src="styles/legend/cobertura_linea_2026_1_21.png" /> 6A - Paseos del Sol<br />\
    <img src="styles/legend/cobertura_linea_2026_1_22.png" /> 6A - Real Valencia<br />\
    <img src="styles/legend/cobertura_linea_2026_1_23.png" /> 6A - Villas Lakin<br />\
    <img src="styles/legend/cobertura_linea_2026_1_24.png" /> Aeropuerto ZT L20 y 0+000 L24<br />\
    <img src="styles/legend/cobertura_linea_2026_1_25.png" /> Aeropuerto ZU L36<br />\
    <img src="styles/legend/cobertura_linea_2026_1_26.png" /> Almendros<br />\
    <img src="styles/legend/cobertura_linea_2026_1_27.png" /> Americas<br />\
    <img src="styles/legend/cobertura_linea_2026_1_28.png" /> Andalucia  L-24 500s<br />\
    <img src="styles/legend/cobertura_linea_2026_1_29.png" /> Andalucia L24 LSF<br />\
    <img src="styles/legend/cobertura_linea_2026_1_30.png" /> ARA<br />\
    <img src="styles/legend/cobertura_linea_2026_1_31.png" /> Bonampak<br />\
    <img src="styles/legend/cobertura_linea_2026_1_32.png" /> Bonfil<br />\
    <img src="styles/legend/cobertura_linea_2026_1_33.png" /> Carcamo 2<br />\
    <img src="styles/legend/cobertura_linea_2026_1_34.png" /> Carcamo 3000<br />\
    <img src="styles/legend/cobertura_linea_2026_1_35.png" /> Carcamo 6A<br />\
    <img src="styles/legend/cobertura_linea_2026_1_36.png" /> CTM<br />\
    <img src="styles/legend/cobertura_linea_2026_1_37.png" /> Cumbres<br />\
    <img src="styles/legend/cobertura_linea_2026_1_38.png" /> Donceles<br />\
    <img src="styles/legend/cobertura_linea_2026_1_39.png" /> El Table<br />\
    <img src="styles/legend/cobertura_linea_2026_1_40.png" /> Heroes - Guadalupana<br />\
    <img src="styles/legend/cobertura_linea_2026_1_41.png" /> Heroes L24<br />\
    <img src="styles/legend/cobertura_linea_2026_1_42.png" /> Hiperbolico 15 L10<br />\
    <img src="styles/legend/cobertura_linea_2026_1_43.png" /> Hiperbolico 15 L14<br />\
    <img src="styles/legend/cobertura_linea_2026_1_44.png" /> Hiperbolico 23 L10<br />\
    <img src="styles/legend/cobertura_linea_2026_1_45.png" /> Hiperbolico 23 L14<br />\
    <img src="styles/legend/cobertura_linea_2026_1_46.png" /> Hiperbolico 23 L8<br />\
    <img src="styles/legend/cobertura_linea_2026_1_47.png" /> Infonavit 103<br />\
    <img src="styles/legend/cobertura_linea_2026_1_48.png" /> Infonavit 14<br />\
    <img src="styles/legend/cobertura_linea_2026_1_49.png" /> Infovir<br />\
    <img src="styles/legend/cobertura_linea_2026_1_50.png" /> Itzáles L12<br />\
    <img src="styles/legend/cobertura_linea_2026_1_51.png" /> Kusamil<br />\
    <img src="styles/legend/cobertura_linea_2026_1_52.png" /> La Joya<br />\
    <img src="styles/legend/cobertura_linea_2026_1_53.png" /> Lombardo<br />\
    <img src="styles/legend/cobertura_linea_2026_1_54.png" /> Luciernagas<br />\
    <img src="styles/legend/cobertura_linea_2026_1_55.png" /> Otoch L16 y LX<br />\
    <img src="styles/legend/cobertura_linea_2026_1_56.png" /> Otoch Paraiso L24<br />\
    <img src="styles/legend/cobertura_linea_2026_1_57.png" /> Paraiso Maya<br />\
    <img src="styles/legend/cobertura_linea_2026_1_58.png" /> Paseos Del Mar<br />\
    <img src="styles/legend/cobertura_linea_2026_1_59.png" /> Prado Norte 2 L20<br />\
    <img src="styles/legend/cobertura_linea_2026_1_60.png" /> Prado Norte L20<br />\
    <img src="styles/legend/cobertura_linea_2026_1_61.png" /> Puerto Cancun<br />\
    <img src="styles/legend/cobertura_linea_2026_1_62.png" /> Puerto Juarez  L4<br />\
    <img src="styles/legend/cobertura_linea_2026_1_63.png" /> Puerto Juarez  L90s<br />\
    <img src="styles/legend/cobertura_linea_2026_1_64.png" /> Puerto Juarez L10 Tabachines<br />\
    <img src="styles/legend/cobertura_linea_2026_1_65.png" /> Puerto Juarez L8 Turistico<br />\
    <img src="styles/legend/cobertura_linea_2026_1_66.png" /> Quetzales 523<br />\
    <img src="styles/legend/cobertura_linea_2026_1_67.png" /> Reserva 1<br />\
    <img src="styles/legend/cobertura_linea_2026_1_68.png" /> Reserva 2<br />\
    <img src="styles/legend/cobertura_linea_2026_1_69.png" /> Reserva 3<br />\
    <img src="styles/legend/cobertura_linea_2026_1_70.png" /> Santa Fe<br />\
    <img src="styles/legend/cobertura_linea_2026_1_71.png" /> Tanque SM 12 FONATUR<br />\
    <img src="styles/legend/cobertura_linea_2026_1_72.png" /> TAP 10<br />\
    <img src="styles/legend/cobertura_linea_2026_1_73.png" /> TAP 9<br />\
    <img src="styles/legend/cobertura_linea_2026_1_74.png" /> Tierra Maya<br />\
    <img src="styles/legend/cobertura_linea_2026_1_75.png" /> Urbi<br />\
    <img src="styles/legend/cobertura_linea_2026_1_76.png" /> Uxmal L12<br />\
    <img src="styles/legend/cobertura_linea_2026_1_77.png" /> Uxmal L6<br />\
    <img src="styles/legend/cobertura_linea_2026_1_78.png" /> Villas del Mar L20 y LX<br />\
    <img src="styles/legend/cobertura_linea_2026_1_79.png" /> Vista Real<br />\
    <img src="styles/legend/cobertura_linea_2026_1_80.png" /> <br />' });



    /*
        var jsonSource_Cobertura_Tanques_31 = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=	DHC_AGUAKAN:Cobertura_Tanques" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_Cobertura_Tanques_31 = new ol.format.GeoJSON();
            var features_Cobertura_Tanques_31 = format_Cobertura_Tanques_31.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Cobertura_Tanques_31.addFeatures(features_Cobertura_Tanques_31);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Cobertura_Tanques_31 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Cobertura_Tanques_31, 
            style: style_Cobertura_Tanques_31,
            popuplayertitle: "Cobertura_Tanques",
            interactive: false,'opacity':1.0000,
            title: 'Cobertura_Tanques<br />\
            <img src="styles/legend/Cobertura_Tanques_31_0.png" /> Carcamo 1A<br />\
            <img src="styles/legend/Cobertura_Tanques_31_1.png" /> Carcamo 2<br />\
            <img src="styles/legend/Cobertura_Tanques_31_2.png" /> Carcamo 2000 Oriente<br />\
            <img src="styles/legend/Cobertura_Tanques_31_3.png" /> Carcamo 2000 Portillo<br />\
            <img src="styles/legend/Cobertura_Tanques_31_4.png" /> Carcamo 3000<br />\
            <img src="styles/legend/Cobertura_Tanques_31_5.png" /> Carcamo 6A<br />\
            <img src="styles/legend/Cobertura_Tanques_31_6.png" /> Carcamo Andalucia<br />\
            <img src="styles/legend/Cobertura_Tanques_31_7.png" /> Carcamo ARA<br />\
            <img src="styles/legend/Cobertura_Tanques_31_8.png" /> Carcamo Heroes<br />\
            <img src="styles/legend/Cobertura_Tanques_31_9.png" /> Carcamo Infovir 227<br />\
            <img src="styles/legend/Cobertura_Tanques_31_10.png" /> Carcamo Kusamil<br />\
            <img src="styles/legend/Cobertura_Tanques_31_11.png" /> Carcamo Prado Norte<br />\
            <img src="styles/legend/Cobertura_Tanques_31_12.png" /> Carcamo Prado Norte 2<br />\
            <img src="styles/legend/Cobertura_Tanques_31_13.png" /> Carcamo Puerto Juárez<br />\
            <img src="styles/legend/Cobertura_Tanques_31_14.png" /> Carcamo Urbi Villas del Rey<br />\
            <img src="styles/legend/Cobertura_Tanques_31_15.png" /> CTM<br />\
            <img src="styles/legend/Cobertura_Tanques_31_16.png" /> Donceles 28<br />\
            <img src="styles/legend/Cobertura_Tanques_31_17.png" /> El Table<br />\
            <img src="styles/legend/Cobertura_Tanques_31_18.png" /> Hiperbolico 15<br />\
            <img src="styles/legend/Cobertura_Tanques_31_19.png" /> Hiperbolico 23<br />\
            <img src="styles/legend/Cobertura_Tanques_31_20.png" /> Infonavit 103<br />\
            <img src="styles/legend/Cobertura_Tanques_31_21.png" /> Infonavit 14<br />\
            <img src="styles/legend/Cobertura_Tanques_31_22.png" /> La Joya<br />\
            <img src="styles/legend/Cobertura_Tanques_31_23.png" /> Lombardo toledano<br />\
            <img src="styles/legend/Cobertura_Tanques_31_24.png" /> Luciernagas<br />\
            <img src="styles/legend/Cobertura_Tanques_31_25.png" /> Luciernagas II<br />\
            <img src="styles/legend/Cobertura_Tanques_31_26.png" /> Otoch<br />\
            <img src="styles/legend/Cobertura_Tanques_31_27.png" /> Otoch Paraiso<br />\
            <img src="styles/legend/Cobertura_Tanques_31_28.png" /> Paraiso Maya<br />\
            <img src="styles/legend/Cobertura_Tanques_31_29.png" /> Paseos Del Mar<br />\
            <img src="styles/legend/Cobertura_Tanques_31_30.png" /> Planta 0+000<br />\
            <img src="styles/legend/Cobertura_Tanques_31_31.png" /> Planta aeropuerto<br />\
            <img src="styles/legend/Cobertura_Tanques_31_32.png" /> Quetzales sm 523<br />\
            <img src="styles/legend/Cobertura_Tanques_31_33.png" /> Reserva 1<br />\
            <img src="styles/legend/Cobertura_Tanques_31_34.png" /> Reserva 2<br />\
            <img src="styles/legend/Cobertura_Tanques_31_35.png" /> Reserva 3<br />\
            <img src="styles/legend/Cobertura_Tanques_31_36.png" /> Tierra Maya<br />\
            <img src="styles/legend/Cobertura_Tanques_31_37.png" /> Uxmal<br />\
            <img src="styles/legend/Cobertura_Tanques_31_38.png" /> Villas del Mar<br />\
            <img src="styles/legend/Cobertura_Tanques_31_39.png" /> Vista Real<br />'
            });


            */




            


//-----------------------------

        var jsonSource_dhc_cobertura = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:dhc_cobertura" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
             "&CQL_FILTER=Municipio='BJ'and Estatus='Regular'")
            .then(response => response.json())  
            .then(data => {
            var format_dhc_cobertura = new ol.format.GeoJSON();
            var features_dhc_cobertura = format_dhc_cobertura.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_dhc_cobertura.addFeatures(features_dhc_cobertura);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_dhc_cobertura = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_dhc_cobertura, 
            style: style_dhc_cobertura,
            popuplayertitle: "Cobertura_Tanques",
            interactive: false,'opacity':1.0000,
            title: 'Cobertura_Tanques<br '
            });


        var jsonSource_dhc_cobertura_pc = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:dhc_cobertura" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
             "&CQL_FILTER=Municipio='PC'and Estatus='Regular'")
            .then(response => response.json())  
            .then(data => {
            var format_dhc_cobertura_pc = new ol.format.GeoJSON();
            var features_dhc_cobertura_pc = format_dhc_cobertura_pc.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_dhc_cobertura_pc.addFeatures(features_dhc_cobertura_pc);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_dhc_cobertura_pc = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_dhc_cobertura_pc, 
            style: style_dhc_cobertura,
            popuplayertitle: "Cobertura_Tanques",
            interactive: false,'opacity':1.0000,
            title: 'Cobertura_Tanques<br '
            });



var jsonSource_dhc_cobertura_im =new ol.source.Vector({
    attributions:'',
})
fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:dhc_cobertura" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
             "&CQL_FILTER=Municipio='IM'and Estatus='Regular'")
            .then(response=>response.json())
            .then(data =>{
                var format_dhc_cobertura_im=new ol.format.GeoJSON();
                var features_dhc_cobertura_im=format_dhc_cobertura_im.readFeatures(data,{
                    featureProjection:'EPSG:3857'
                });
                jsonSource_dhc_cobertura_im.addFeatures(features_dhc_cobertura_im);
            })
            .catch(error=>console.error("Error al cargar los datos", error));
            var lyr_dhc_cobertura_im=new ol.layer.Vector({
            declutter:false,
            source:jsonSource_dhc_cobertura_im,
            style: style_dhc_cobertura,
            popuplayertitle:"Cobertura de Tanques",
            interactive:false,
            'opacity':1.000,
            title:'Cobertura de Tanques'
            });

        
var jsonSource_dhc_cobertura_pm = new ol.source.Vector({

    attributions: '',

})

fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:dhc_cobertura" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
             "&CQL_FILTER=Municipio='PM'and Estatus='Regular'")
             .then(response=>response.json())
             .then(data=>{
                var format_dhc_cobertura_pm=new ol.format.GeoJSON();
                var features_dhc_cobertura_pm=format_dhc_cobertura_pm.readFeatures(data,{
                    featureProjection:'EPSG:3857'
                });
                jsonSource_dhc_cobertura_pm.addFeatures(features_dhc_cobertura_pm);
                        })
            .catch(error=>console.error("error al cargar los datos",error));
            var lyr_dhc_cobertura_pm=new ol.layer.Vector({
            declutter:false,
            source:jsonSource_dhc_cobertura_pm,
            style:style_dhc_cobertura,
            popuplayertitle:"Cobertura de Tanques",
            interactive: false,
            'opacity': 1.000,
            title:'Cobertura de Tanques'
            });

var jsonSource_dhc_cobertura_cland = new ol.source.Vector({

    attributions: '',

})
fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:dhc_cobertura" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
             "&CQL_FILTER=Estatus='Clandestinaje'or Estatus='Clandestinaje Probable'or Estatus='Clandestinaje, Propuesta De Medidor'")
             .then(response=>response.json())
             .then(data=>{
                var format_dhc_cobertura_cland=new ol.format.GeoJSON();
                var features_dhc_cobertura_cland=format_dhc_cobertura_cland.readFeatures(data,{
                    featureProjection:'EPSG:3857'
                });
                jsonSource_dhc_cobertura_cland.addFeatures(features_dhc_cobertura_cland);
                        })
            .catch(error=>console.error("error al cargar los datos",error));
            var lyr_dhc_cobertura_cland=new ol.layer.Vector({
            declutter:false,
            source:jsonSource_dhc_cobertura_cland,
            style:style_dhc_cobertura_cland,
            popuplayertitle:"Clandestinaje",
            interactive: false,
            'opacity': 1.000,
            title:'Cobertura de Clandestinaje'
            });

            
       
var jsonSource_dhc_sin_cobertura = new ol.source.Vector({

    attributions: '',

})

fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:dhc_cobertura" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
             "&CQL_FILTER=Municipio='BJ'and Estatus='Sin Servicio'")
             .then(response=>response.json())
             .then(data=>{
                var format_dhc_sin_cobertura=new ol.format.GeoJSON();
                var features_dhc_sin_cobertura=format_dhc_sin_cobertura.readFeatures(data,{
                    featureProjection:'EPSG:3857'
                });
                jsonSource_dhc_sin_cobertura.addFeatures(features_dhc_sin_cobertura);
                        })
            .catch(error=>console.error("error al cargar los datos",error));
            var lyr_dhc_sin_cobertura=new ol.layer.Vector({
            declutter:false,
            source:jsonSource_dhc_sin_cobertura,
            style:style_dhc_sin_cobertura,
            popuplayertitle:"Sin Servicio",
            interactive: false,
            'opacity': 1.000,
            title:'Sin Servicio'
            });

            
var jsonSource_dhc_sin_cobertura_pm = new ol.source.Vector({

    attributions: '',

})

fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:dhc_cobertura" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
             "&CQL_FILTER=Municipio='PM'and Estatus='Sin Servicio'")
             .then(response=>response.json())
             .then(data=>{
                var format_dhc_sin_cobertura_pm=new ol.format.GeoJSON();
                var features_dhc_sin_cobertura_pm=format_dhc_sin_cobertura_pm.readFeatures(data,{
                    featureProjection:'EPSG:3857'
                });
                jsonSource_dhc_sin_cobertura_pm.addFeatures(features_dhc_sin_cobertura_pm);
                        })
            .catch(error=>console.error("error al cargar los datos",error));
            var lyr_dhc_sin_cobertura_pm=new ol.layer.Vector({
            declutter:false,
            source:jsonSource_dhc_sin_cobertura_pm,
            style:style_dhc_sin_cobertura,
            popuplayertitle:"Sin Servicio",
            interactive: false,
            'opacity': 1.000,
            title:'Sin Servicio'
            });



var jsonSource_dhc_sin_cobertura_pc = new ol.source.Vector({

    attributions: '',

})

fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:dhc_cobertura" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
             "&CQL_FILTER=Municipio='PC'and Estatus='Sin Servicio'")
             .then(response=>response.json())
             .then(data=>{
                var format_dhc_sin_cobertura_pc=new ol.format.GeoJSON();
                var features_dhc_sin_cobertura_pc=format_dhc_sin_cobertura_pc.readFeatures(data,{
                    featureProjection:'EPSG:3857'
                });
                jsonSource_dhc_sin_cobertura_pc.addFeatures(features_dhc_sin_cobertura_pc);
                        })
            .catch(error=>console.error("error al cargar los datos",error));
            var lyr_dhc_sin_cobertura_pc=new ol.layer.Vector({
            declutter:false,
            source:jsonSource_dhc_sin_cobertura_pc,
            style:style_dhc_sin_cobertura,
            popuplayertitle:"Sin Servicio",
            interactive: false,
            'opacity': 1.000,
            title:'Sin Servicio'
            });





//-----------------------------
        var jsonSource_Horario_Servicio_BJ_32 = new ol.source.Vector({
            attributions: ' ',
        });
        
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Horario_Servicio_BJ" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_Horario_Servicio_BJ_32 = new ol.format.GeoJSON();
            var features_Horario_Servicio_BJ_32 = format_Horario_Servicio_BJ_32.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Horario_Servicio_BJ_32.addFeatures(features_Horario_Servicio_BJ_32);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Horario_Servicio_BJ_32 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Horario_Servicio_BJ_32, 
            style: style_Horario_Servicio_BJ_32,
            popuplayertitle: "Contanquesduccion",
            interactive: false,'opacity':0.50000,
            title: 'Horario_Servicio_BJ<br />\
            <img src="styles/legend/Horario_Servicio_BJ_32_0.png" /> 0 - 6<br />\
            <img src="styles/legend/Horario_Servicio_BJ_32_1.png" /> 6 - 9<br />\
            <img src="styles/legend/Horario_Servicio_BJ_32_2.png" /> 9 - 11<br />\
            <img src="styles/legend/Horario_Servicio_BJ_32_3.png" /> 11 - 16<br />\
            <img src="styles/legend/Horario_Servicio_BJ_32_4.png" /> 16 - 24<br />'
            });


var jsonSource_afectacion = new ol.source.Vector({
            attributions: ' ',
        });
        
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=	DHC_AGUAKAN:Tipo_de_afectacion" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
            "&CQL_FILTER=estatus='Activo'")
            .then(response => response.json())  
            .then(data => {
            var format_afectacion = new ol.format.GeoJSON();
            var features_afectacion = format_afectacion.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_afectacion.addFeatures(features_afectacion);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_afectacion = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_afectacion, 
            style: style_Tipo_de_afectacion_0,
            popuplayertitle: "tipo de Afectacion",
            interactive: false,'opacity':1.0,
           title: 'Tipo de afectacion<br />\
    <img src="styles/legend/Tipo_de_afectacion_0_0.png" /> Activo<br />' });







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
            title: 'Conduccion<br />\
            <img src="styles/legend/Tanques_34_2.png" /> Existente<br />\
            '
            });

        var jsonSource_Conduccion_Proy_BJ = new ol.source.Vector({
            attributions: ' ',
        });
        
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:AEP_CANA_AP" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
                "&CQL_FILTER=Tipo_de_Re='Conduccion' and Municipio='Benito Juarez'and Estatus='Q2023_2027' ")

            .then(response => response.json())  
            .then(data => {
            var format_Conduccion_Proy_BJ = new ol.format.GeoJSON();
            var features_Conduccion_Proy_BJ = format_Conduccion_Proy_BJ.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Conduccion_Proy_BJ.addFeatures(features_Conduccion_Proy_BJ);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Conduccion_Proy_BJ = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Conduccion_Proy_BJ, 
            style: style_Conduccion_40,
            popuplayertitle: "Tuberia",
            interactive: false,
            title: 'Conduccion<br />\
            <img src="styles/legend/Tanques_34_1.png" /> Q2023-2027<br />'
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
                title: 'Distribucion<br />\
                <img src="styles/legend/Tanques_34_0.png" /> Existente<br />\
                '
                });

        var jsonSource_aep_nds = new ol.source.Vector({
            attributions: ' ',
        });
        
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:aep_nds" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
            "&CQL_FILTER=localidad='BENITO JUAREZ' ")
            .then(response => response.json())  
            .then(data => {
            var format_aep_nds = new ol.format.GeoJSON();
            var features_aep_nds = format_aep_nds.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_aep_nds.addFeatures(features_aep_nds);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_aep_nds = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_aep_nds, 
            style: style_aep_nds,
            popuplayertitle: "Nodos",
            interactive: false,
            title: 'Nodos <br />\
            <img src="styles/legend/Tanques_34_0.png" /> Nodos<br />\ '
            });

        var jsonSource_Tanques_34 = new ol.source.Vector({
            attributions: ' ',
        });
        
        


        var jsonSource_Puntos_sectorizacion_BJ = new ol.source.Vector({
            attributions: ' ',
        });
        
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Puntos_sectorizacion_BJ" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_Puntos_sectorizacion_BJ = new ol.format.GeoJSON();
            var features_Puntos_sectorizacion_BJ = format_Puntos_sectorizacion_BJ.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Puntos_sectorizacion_BJ.addFeatures(features_Puntos_sectorizacion_BJ);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Puntos_sectorizacion_BJ = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Puntos_sectorizacion_BJ, 
            style: style_AEP_VANN_VALVULAS_5,
            popuplayertitle: "Puntos sectorizacion",
            interactive: false,
            title: ' <img src="styles/legend/AEP_VANN_VALVULAS_5.png" />Puntos sectorizacion<br />\ '
            });




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
            title: 'Tanques<br />\
            <img src="styles/legend/Tanques_34_0.png" /> Existente<br />\ '
            });

        var jsonSource_pozos_captacion_35 = new ol.source.Vector({
            attributions: ' ',
        });
                
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                    "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:pozos_captacion_BJ" +
                    "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_pozos_captacion_35 = new ol.format.GeoJSON();
            var features_pozos_captacion_35 = format_pozos_captacion_35.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_pozos_captacion_35.addFeatures(features_pozos_captacion_35);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_pozos_captacion_35 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_pozos_captacion_35, 
            style: style_pozos_captacion_35,
            popuplayertitle: "Pozos Captacion BJ",
            interactive: false,
            title: 'Pozos Captacion<br />\
            <img src="styles/legend/pozos_captacion_35_0.png" /> Existente<br />'
            });
    
		var jsonSource_AEP_VANN_VALVULAS_5 = new ol.source.Vector({
            attributions: ' ',
         });
                    
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                            "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:AEP_VANN_VALVULAS" +
                            "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_AEP_VANN_VALVULAS_5 = new ol.format.GeoJSON();
            var features_AEP_VANN_VALVULAS_5 = format_AEP_VANN_VALVULAS_5.readFeatures(data, {
                                
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_AEP_VANN_VALVULAS_5.addFeatures(features_AEP_VANN_VALVULAS_5);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
                    
            var lyr_AEP_VANN_VALVULAS_5 = new ol.layer.Vector({
            maxResolution:2000.0,
            declutter: true,
            source: jsonSource_AEP_VANN_VALVULAS_5, 
            style: style_AEP_VANN_VALVULAS_5,
            popuplayertitle: "AEP_VANN_VALVULAS",
            interactive: false,
            title: '<img src="styles/legend/AEP_VANN_VALVULAS_5.png" /> AEP_VANN_VALVULAS'
            });
		

  //--------------Isla Mujeres ------------          
        var jsonSource_Emisor_colector_37 = new ol.source.Vector({
            attributions: ' ',
        });
        
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Emisor_colector_IM" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
            "&CQL_FILTER=Estatus='Existente'")
            .then(response => response.json())  
            .then(data => {
            var format_Emisor_colector_37 = new ol.format.GeoJSON();
            var features_Emisor_colector_37 = format_Emisor_colector_37.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Emisor_colector_37.addFeatures(features_Emisor_colector_37);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Emisor_colector_37 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Emisor_colector_37, 
            style: style_Emisor_colector_37,
            popuplayertitle: "Emisor",
            interactive: false,
            title: 'Emisor_colector<br />\
            <img src="styles/legend/Emisor_colector_37_0.png" /> EXISTENTE<br />\
            '
            });

        var jsonSource_Emisor_colector_Proy = new ol.source.Vector({
            attributions: ' ',
        });
        
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Emisor_colector_IM" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
            "&CQL_FILTER=Estatus='Q2023_2027'")
            .then(response => response.json())  
            .then(data => {
            var format_Emisor_colector_Proy = new ol.format.GeoJSON();
            var features_Emisor_colector_Proy = format_Emisor_colector_Proy.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Emisor_colector_Proy.addFeatures(features_Emisor_colector_Proy);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Emisor_colector_Proy = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Emisor_colector_Proy, 
            style: style_Emisor_colector_37,
            popuplayertitle: "Emisor",
            interactive: false,
            title: 'Emisor_colector<br />\
            <img src="styles/legend/Emisor_colector_37_1.png" /> Q2023-2027<br />\
            '
            });

        var jsonSource_Tuberia_ASS_IM = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Ass_cana" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
            "&CQL_FILTER= Municipio='Isla Mujeres'")
            .then(response => response.json())  
            .then(data => {
            var format_Tuberia_ASS_IM = new ol.format.GeoJSON();
            var features_Tuberia_ASS_IM = format_Tuberia_ASS_IM.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Tuberia_ASS_IM.addFeatures(features_Tuberia_ASS_IM);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Tuberia_ASS_IM = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Tuberia_ASS_IM, 
            style: style_Tuberia_ASS_0,
            popuplayertitle: "Redes Secundaria",
            interactive: false,
            title: 'Red Secundaria<br />\
            <img src="styles/legend/Tuberia_ASS_0.png" /> Atarjeas<br />\
            '
            });

        var jsonSource_Carcamos_38 = new ol.source.Vector({
            attributions: ' ',
        });
        
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Carcamos_IM" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
            "&CQL_FILTER=Estatus='Existente'")
            .then(response => response.json())  
            .then(data => {
            var format_Carcamos_38 = new ol.format.GeoJSON();
            var features_Carcamos_38 = format_Carcamos_38.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Carcamos_38.addFeatures(features_Carcamos_38);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Carcamos_38 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Carcamos_38, 
            style: style_Carcamos_25,
            popuplayertitle: "Carcamos",
            interactive: false,
            title: '<img src="styles/legend/Carcamos_25.png" /> Carcamos'
            });

        var jsonSource_Carcamos_Proy = new ol.source.Vector({
            attributions: ' ',
        });
        
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Carcamos_IM" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
            "&CQL_FILTER=Estatus='Q2023_2027'")
            .then(response => response.json())  
            .then(data => {
            var format_Carcamos_Proy = new ol.format.GeoJSON();
            var features_Carcamos_Proy = format_Carcamos_Proy.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Carcamos_Proy.addFeatures(features_Carcamos_Proy);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Carcamos_Proy = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Carcamos_Proy, 
            style: style_Carcamos_Proy,
            popuplayertitle: "Carcamos",
            interactive: false,
            title: '<img src="styles/legend/Carcamos_proy.png" /> Carcamos'
            });

        var jsonSource_Ptar_39 = new ol.source.Vector({
            attributions: ' ',
        });
        
           fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
            "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Ptar_IM" +
            "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_Ptar_39 = new ol.format.GeoJSON();
            var features_Ptar_39 = format_Ptar_39.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Ptar_39.addFeatures(features_Ptar_39);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Ptar_39 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Ptar_39, 
            style: style_Ptar_39,
            popuplayertitle: "Ptar",
            interactive: false,
            title: 'Ptar<br />\
            <img src="styles/legend/Ptar_39_0.png" /> EXISTENTE<br />'
            });

        var jsonSource_Conduccion_40 = new ol.source.Vector({
            attributions: ' ',
        });
        
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:AEP_CANA_AP" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
                "&CQL_FILTER=Tipo_de_Re='Conduccion' and Municipio='Isla Mujeres'and Estatus='Existente' ")

            .then(response => response.json())  
            .then(data => {
            var format_Conduccion_40 = new ol.format.GeoJSON();
            var features_Conduccion_40 = format_Conduccion_40.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Conduccion_40.addFeatures(features_Conduccion_40);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Conduccion_40 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Conduccion_40, 
            style: style_Conduccion_40,
            popuplayertitle: "Tuberia",
            interactive: false,
            title: 'Conduccion<br />\
            <img src="styles/legend/Tanques_34_2.png" /> Existente<br />\
'           });

        var jsonSource_Conduccion_Proy = new ol.source.Vector({
            attributions: ' ',
        });
        
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:AEP_CANA_AP" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
                "&CQL_FILTER=Tipo_de_Re='Conduccion' and Municipio='Isla Mujeres'and Estatus='Q2023_2027' ")

            .then(response => response.json())  
            .then(data => {
            var format_Conduccion_Proy = new ol.format.GeoJSON();
            var features_Conduccion_Proy = format_Conduccion_Proy.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Conduccion_Proy.addFeatures(features_Conduccion_Proy);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Conduccion_Proy = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Conduccion_Proy, 
            style: style_Conduccion_40,
            popuplayertitle: "Tuberia",
            interactive: false,
            title: 'Conduccion<br />\
            <img src="styles/legend/Tanques_34_1.png" /> Q2023-2027<br />'
                });

        var jsonSource_Distribucion_IM_copy_1 = new ol.source.Vector({
            attributions: ' ',
        });
        
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:AEP_CANA_AP" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
            "&CQL_FILTER=Tipo_de_Re='Distribucion' and Municipio='Isla Mujeres'")
            .then(response => response.json())  
            .then(data => {
            var format_Distribucion_IM_copy_1 = new ol.format.GeoJSON();
            var features_Distribucion_IM_copy_1 = format_Distribucion_IM_copy_1.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Distribucion_IM_copy_1.addFeatures(features_Distribucion_IM_copy_1);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Distribucion_IM_copy_1 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Distribucion_IM_copy_1, 
            style: style_Distribucion_BJ_copy_1,
            popuplayertitle: "Distribucion",
            interactive: false,
            title: 'Distribucion<br />\
            <img src="styles/legend/Tanques_34_0.png" /> Existente<br />\ '
            });      
            
        var jsonSource_Tanques_41 = new ol.source.Vector({
            attributions: ' ',
        });
        
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Tanques_IM" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
                "&CQL_FILTER=Estatus='Existente' "
            )
            .then(response => response.json())  
            .then(data => {
            var format_Tanques_41 = new ol.format.GeoJSON();
            var features_Tanques_41 = format_Tanques_41.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Tanques_41.addFeatures(features_Tanques_41);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Tanques_41 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Tanques_41, 
            style: style_Tanques_9,
            popuplayertitle: "Tanques",
            interactive: false,
            title: 'Tanques<br />\
            <img src="styles/legend/Tanques_34_0.png" /> Existente<br />\ '
            });

        var jsonSource_Tanques_41_proy = new ol.source.Vector({
            attributions: ' ',
        });
        
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Tanques_IM" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
                "&CQL_FILTER=Estatus='Q2023_2027' "
            )
            .then(response => response.json())  
            .then(data => {
            var format_Tanques_41_proy = new ol.format.GeoJSON();
            var features_Tanques_41_proy = format_Tanques_41_proy.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Tanques_41_proy.addFeatures(features_Tanques_41_proy);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Tanques_41_proy = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Tanques_41_proy, 
            style: style_Tanques_9,
            popuplayertitle: "Tanques",
            interactive: false,
            title: 'Tanques<br />\
            <img src="styles/legend/Tanques_34_1.png" /> Q2023_2027<br /> '
            });

        var jsonSource_P_Cloro = new ol.source.Vector({
            attributions: ' ',
        });
        
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:P_Cloro" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
                "&CQL_FILTER=Tipo='AP' and Municipio= 'Benito Juarez' "
            )
            .then(response => response.json())  
            .then(data => {
            var format_P_Cloro = new ol.format.GeoJSON();
            var features_P_Cloro = format_P_Cloro.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_P_Cloro.addFeatures(features_P_Cloro);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_P_Cloro = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_P_Cloro, 
            style: style_P_Cloro,
            popuplayertitle: "Cloro",
            interactive: false,
            title: 'Caseta de Cloracion<br />\
            <img src="styles/legend/P_Cloro.png" /> Caseta de Cloracion<br /> '
            });


/* Factibilidades */


        var jsonSource_Fact_Red_AP = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Red_AP" +
                "&outputFormat=application/json&srsname=EPSG:3857"
            )
            .then(response => response.json())  
            .then(data => {
            var format_Fact_Red_AP = new ol.format.GeoJSON();
            var features_Fact_Red_AP = format_Fact_Red_AP.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Fact_Red_AP.addFeatures(features_Fact_Red_AP);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Fact_Red_AP = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Fact_Red_AP, 
            style: style_Tuberia_ASS_0,
            popuplayertitle: "Fact_Red_AP",
            interactive: false,
            name: 'DHC_AGUAKAN:Red_AP',
            title: '<img src="styles/legend/Tuberia_ASS_0.png" /> Fact_Red_AP />\ '
            });

        var jsonSource_Fact_Red_DS = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Red_DS" +
                "&outputFormat=application/json&srsname=EPSG:3857"
            )
            .then(response => response.json())  
            .then(data => {
            var format_Fact_Red_DS = new ol.format.GeoJSON();
            var features_Fact_Red_DS = format_Fact_Red_DS.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Fact_Red_DS.addFeatures(features_Fact_Red_DS);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Fact_Red_DS = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Fact_Red_DS, 
            style: style_Fact_Red_AP,
            popuplayertitle: "Fact_Red_DS",
            interactive: false,
            name: 'DHC_AGUAKAN:Red_DS',
            title: '<img src="styles/legend/Fact_Red_AP.png" /> Fact_Red_DS<br />\
            '
            });

        var jsonSource_Fact_Valvula = new ol.source.Vector({
            attributions: ' ',
        });
                    
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                            "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Valvula_Fact" +
                            "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_Fact_Valvula = new ol.format.GeoJSON();
            var features_Fact_Valvula = format_Fact_Valvula.readFeatures(data, {
                                
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Fact_Valvula.addFeatures(features_Fact_Valvula);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
                    
            var lyr_Fact_Valvula = new ol.layer.Vector({
            maxResolution:2000.0,
            declutter: true,
            source: jsonSource_Fact_Valvula, 
            style: style_AEP_VANN_VALVULAS_5,
            popuplayertitle: "Fact_Valvula",
            interactive: false,
            name: 'DHC_AGUAKAN:Valvula' ,
            title: '<img src="styles/legend/AEP_VANN_VALVULAS_5.png" /> Fact_Valvula'
            });

        var jsonSource_Fact_Pozos_Visita = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Pozos_Visita" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_Fact_Pozos_Visita = new ol.format.GeoJSON();
            var features_Fact_Pozos_Visita = format_Fact_Pozos_Visita.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Fact_Pozos_Visita.addFeatures(features_Fact_Pozos_Visita);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Fact_Pozos_Visita = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Fact_Pozos_Visita, 
            style: style_pozos_colectores_27,
            popuplayertitle: "Fact_Pozos_Visita",
            interactive: false,
            name: 'DHC_AGUAKAN:Pozos_Visita',
            title: '<img src="styles/legend/pozos_colectores_27.png" /> Fact_Pozos_Visita'
        });

var jsonSource_Fact_Desarrollo = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Fact_Desarrollo" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_Fact_Desarrollo = new ol.format.GeoJSON();
            var features_Fact_Desarrollo = format_Fact_Desarrollo.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Fact_Desarrollo.addFeatures(features_Fact_Desarrollo);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Fact_Desarrollo = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Fact_Desarrollo, 
            style: style_Fact_Desarrollo,
            popuplayertitle: "Fact_Desarrollo",
            interactive: false,
            name: 'DHC_AGUAKAN:Fact_Desarrollo',
            title: '<img src="styles/legend/SM_23.png" /> Fact_Desarrollo'
            });



 var jsonSource_Fact_Parcelas = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Parcelas" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_Fact_Parcelas = new ol.format.GeoJSON();
            var features_Fact_Parcelas = format_Fact_Parcelas.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Fact_Parcelas.addFeatures(features_Fact_Parcelas);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Fact_Parcelas = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Fact_Parcelas, 
            style: style_Lotes_BJ,
            popuplayertitle: "Fact_Parcelas",
            interactive: false,
            name: 'DHC_AGUAKAN:Fact_Parcelas',
            title: '<img src="styles/legend/SM_23.png" /> Fact_Parcelas'
            });



 var jsonSource_Fact_Carcamo = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Fact_Carcamo" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_Fact_Carcamo = new ol.format.GeoJSON();
            var features_Fact_Carcamo = format_Fact_Carcamo.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Fact_Carcamo.addFeatures(features_Fact_Carcamo);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Fact_Carcamo = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Fact_Carcamo, 
            style: style_Lotes_BJ,
            popuplayertitle: "Fact_Carcamo",
            interactive: false,
            name: 'DHC_AGUAKAN:Fact_Carcamo',
            title: '<img src="styles/legend/SM_23.png" /> Fact_Carcamo'
            });



 var jsonSource_Fact_TAP = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Fact_TAP" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_Fact_TAP = new ol.format.GeoJSON();
            var features_Fact_TAP = format_Fact_TAP.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Fact_TAP.addFeatures(features_Fact_TAP);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Fact_TAP = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Fact_TAP, 
            style: style_Lotes_BJ,
            popuplayertitle: "Fact_TAP",
            interactive: false,
            name: 'DHC_AGUAKAN:Fact_TAP',
            title: '<img src="styles/legend/SM_23.png" /> Fact_TAP'
            });




// Factibilidad-Planeacion


 var jsonSource_valvulasap_proy = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:valvulasap_proy" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_valvulasap_proy = new ol.format.GeoJSON();
            var features_valvulasap_proy = format_valvulasap_proy.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_valvulasap_proy.addFeatures(features_valvulasap_proy);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_valvulasap_proy = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_valvulasap_proy, 
            style: style_AEP_VANN_VALVULAS_5,
            popuplayertitle: "valvulasap_proy",
            interactive: false,
            name: 'DHC_AGUAKAN:valvulasap_proy',
            title: '<img src="styles/legend/AEP_VANN_VALVULAS_5.png" /> valvulasap_proy'
            });



 var jsonSource_accesorios_proy = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:accesorios_proy" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_accesorios_proy = new ol.format.GeoJSON();
            var features_accesorios_proy = format_accesorios_proy.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_accesorios_proy.addFeatures(features_accesorios_proy);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_accesorios_proy = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_accesorios_proy, 
            style: style_AEP_VANN_VALVULAS_5,
            popuplayertitle: "accesorios_proy",
            interactive: false,
            name: 'DHC_AGUAKAN:accesorios_proy',
            title: '<img src="styles/legend/AEP_VANN_VALVULAS_5.png" /> accesorios_proy'
            });

 var jsonSource_pozo_visita_proy = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:pozo_visita_proy" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_pozo_visita_proy = new ol.format.GeoJSON();
            var features_pozo_visita_proy = format_pozo_visita_proy.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_pozo_visita_proy.addFeatures(features_pozo_visita_proy);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_pozo_visita_proy = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_pozo_visita_proy, 
            style: style_AEP_VANN_VALVULAS_5,
            popuplayertitle: "pozo_visita_proy",
            interactive: false,
            name: 'DHC_AGUAKAN:pozo_visita_proy',
            title: '<img src="styles/legend/AEP_VANN_VALVULAS_5.png" /> pozo_visita_proy'
            });






var jsonSource_redap_proyecto_proy = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:redap_proyecto_proy" +
                "&outputFormat=application/json&srsname=EPSG:3857"
            )
            .then(response => response.json())  
            .then(data => {
            var format_redap_proyecto_proy = new ol.format.GeoJSON();
            var features_redap_proyecto_proy = format_redap_proyecto_proy.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_redap_proyecto_proy.addFeatures(features_redap_proyecto_proy);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_redap_proyecto_proy = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_redap_proyecto_proy, 
            style: style_Tuberia_ASS_0,
            popuplayertitle: "redap_proyecto_proy",
            interactive: false,
            name: 'DHC_AGUAKAN:redap_proyecto_proy',
            title: '<img src="styles/legend/Tuberia_ASS_0.png" /> redap_proyecto_proy<br />\
            '
            });


var jsonSource_redds_proy = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:redds_proy" +
                "&outputFormat=application/json&srsname=EPSG:3857"
            )
            .then(response => response.json())  
            .then(data => {
            var format_redds_proy = new ol.format.GeoJSON();
            var features_redds_proy = format_redds_proy.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_redds_proy.addFeatures(features_redds_proy);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_redds_proy = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_redds_proy, 
            style: style_Fact_Red_AP,
            popuplayertitle: "redds_proy",
            interactive: false,
            name: 'DHC_AGUAKAN:redds_proy',
            title: '<img src="styles/legend/Tuberia_ASS_0.png" /> redds_proy<br />\
            '
            });











/* Factibilidades */



/* TI */


     var jsonSource_Cob_fortigate_IPS = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:Cob_fortigate_IPS" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_Cob_fortigate_IPS = new ol.format.GeoJSON();
            var features_Cob_fortigate_IPS = format_Cob_fortigate_IPS.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Cob_fortigate_IPS.addFeatures(features_Cob_fortigate_IPS);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Cob_fortigate_IPS = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Cob_fortigate_IPS, 
            style: style_pozos_colectores_27,
            popuplayertitle: "Cob_fortigate_IPS",
            interactive: false,
            name: 'DHC_AGUAKAN:Cob_fortigate_IPS',
            title: '<img src="styles/legend/pozos_colectores_27.png" /> Fortigate_IPS'
        });







/* Mapa de calor */



        
     // Fuente WFS para la capa de reclamos
  const reclamosSource = new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: function(extent) {
      return 'http://dhcqgis.aguakan.com/geoserver/DHC_AGUAKAN/ows?' +
        'service=WFS&' +
        'version=1.0.0&' +
        'request=GetFeature&' +
        'typeName=DHC_AGUAKAN:reclamos_ap&' +
        'outputFormat=application/json&' +
        'srsname=EPSG:3857&' +   // reproyección a Web Mercator
        'bbox=' + extent.join(',') + ',EPSG:3857';
    },
    strategy: ol.loadingstrategy.bbox
  });

  // Capa de Heatmap
  const heatmapLayer = new ol.layer.Heatmap({
    source: reclamosSource,
    blur: 20,        // desenfoque del calor
    radius: 12,      // radio de influencia de cada punto
    weight: function(feature) {
      // Puedes usar un atributo de la tabla para ponderar el calor
      // Ejemplo: feature.get('prioridad') o poner 1 por defecto

      
      return 1;
    }
  });






//---------------



        var jsonSource_Ejidoqroo = new ol.source.Vector({
            attributions: ' ',
        });

            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
            "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:dgcat_ran_da_dgcat_poligonos_nucleos_agrarios_qroo" +
            "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_Ejidoqroo = new ol.format.GeoJSON();
            var features_Ejidoqroo = format_Ejidoqroo.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Ejidoqroo.addFeatures(features_Ejidoqroo);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Ejidoqroo = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Ejidoqroo, 
            style: style_Lotes_BJ,
            popuplayertitle: "Ejidos",
            interactive: false,
             title: '<img src="styles/legend/SM_23.png" /> Ejidos'
            });

//----------otros CFE-----------

var jsonSource_CFE_Transmision = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName= DHC_AGUAKAN:inegi_lineaCFE_tran_2000" +
                "&outputFormat=application/json&srsname=EPSG:3857"
            )
            .then(response => response.json())  
            .then(data => {
            var format_CFE_Transmision = new ol.format.GeoJSON();
            var features_CFE_Transmision = format_CFE_Transmision.readFeatures(data, {
                        
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_CFE_Transmision.addFeatures(features_CFE_Transmision);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_CFE_Transmision = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_CFE_Transmision, 
            style: style_CFE,
            popuplayertitle: "CFE Transmision",
            interactive: false,
            name: 'DHC_AGUAKAN:inegi_linea_tran_2000',
            title: '<img src="styles/legend/cfe.png" /> CFE Transmision<br />\
                '
            });




//--------------------


       var jsonSource_Nivel_Carcamos_25 = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:vw_carcamo_nivel" +
                "&outputFormat=application/json&srsname=EPSG:3857")
            .then(response => response.json())  
            .then(data => {
            var format_Nivel_Carcamos_25 = new ol.format.GeoJSON();
            var features_Nivel_Carcamos_25 = format_Nivel_Carcamos_25.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Nivel_Carcamos_25.addFeatures(features_Nivel_Carcamos_25);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Nivel_Carcamos_25 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Nivel_Carcamos_25, 
            style: style_Nivel_Carcamos_25,
            popuplayertitle: "Nivel_Carcamos",
            interactive: false,
            title: '<img src="styles/legend/Carcamos_25.png" /> Nivel Carcamos'
            });


            
      var jsonSource_Nivel_Tanques_34 = new ol.source.Vector({
            attributions: ' ',
        });

            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:vw_tanques_nivel" +
                "&outputFormat=application/json&srsname=EPSG:3857"+ "&CQL_FILTER=estatus='Existente'" )
            .then(response => response.json())  
            .then(data => {
            var format_Nivel_Tanques_34 = new ol.format.GeoJSON();
            var features_Nivel_Tanques_34 = format_Nivel_Tanques_34.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Nivel_Tanques_34.addFeatures(features_Nivel_Tanques_34);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Nivel_Tanques_34 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Nivel_Tanques_34, 
            style: style_Nivel_Tanques_34,
            popuplayertitle: "Nivel_Tanques",
            interactive: false,
            title: 'Nivel_Tanques<br />\
            <img src="styles/legend/Tanques_34_0.png" /> Existente<br />\ '
            });




      var jsonSource_Nivel_Tanquespc_34 = new ol.source.Vector({
            attributions: ' ',
        });

            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=DHC_AGUAKAN:vw_tanquessol_nivel" +
                "&outputFormat=application/json&srsname=EPSG:3857"+ "&CQL_FILTER=estatus='Existente'" )
            .then(response => response.json())  
            .then(data => {
            var format_Nivel_Tanquespc_34 = new ol.format.GeoJSON();
            var features_Nivel_Tanquespc_34 = format_Nivel_Tanquespc_34.readFeatures(data, {
                    
            featureProjection: 'EPSG:3857' 
            });
            jsonSource_Nivel_Tanquespc_34.addFeatures(features_Nivel_Tanquespc_34);
            })
            .catch(error => console.error("Error al cargar los datos:", error));
            
            var lyr_Nivel_Tanquespc_34 = new ol.layer.Vector({
            declutter: true,
            source: jsonSource_Nivel_Tanquespc_34, 
            style: style_Nivel_Tanques_34,
            popuplayertitle: "Nivel_Tanques",
            interactive: false,
            title: 'Nivel_Tanques<br />\
            <img src="styles/legend/Tanques_34_0.png" /> Existente<br />\ '
            });







//--------------------



var group_IM = new ol.layer.Group({

    layers: [
       new ol.layer.Group({
                    layers: [],
                    fold: "close",
                    title: "Clientes"}),    
        new ol.layer.Group({
                    layers: [],
                    fold: "close",
                    title: "Catastro"}),
           
        new ol.layer.Group({
                    layers: [
                    

                    new ol.layer.Group({layers:[],
                    fold: "close",
                    title: "Operacion y Coberturas"}),
                    
                    new ol.layer.Group({layers: [],
                    fold: "close",
                    title: "Accesorios"}),lyr_Carcamos_38,lyr_Ptar_39,
                    
                    new ol.layer.Group({layers: [lyr_Tuberia_ASS_IM,
                        new ol.layer.Group({layers:[lyr_Emisor_colector_37,],
                    fold: "close",
                    title: "Red Primaria"}),
                        ], 
                    fold: "close",
                    title: "Red Descarga Sanitaria"}),],
                    fold: "close",
                    title: "Agua Residual"}),
        new ol.layer.Group({
                    layers: [    
                                   
                    new ol.layer.Group({layers: [
                        new ol.layer.Group({layers: [lyr_dhc_cobertura_im,],
                            fold: "close",
                            title: "Cobertura Tanques"}),
                        new ol.layer.Group({layers: [],
                            fold: "close",
                            title: "Cobertura Lineas"}),
                        new ol.layer.Group({layers: [],
                            fold: "close",
                            title: "Horario de Servicio"}),
                        ],
                        fold: "close",
                        title: "Operacion y Cobertura"}), 
                    new ol.layer.Group({
                        layers: [],
                        fold: "close",
                        title: "Accesorios"}),
                        lyr_Tanques_41,
                    new ol.layer.Group({
                        layers: [lyr_Conduccion_40,lyr_Distribucion_IM_copy_1],
                        fold: "close",
                        title: "Red Agua Potable"}),
                    ],
                    fold: "close",
                    title: "Agua Potable"}),],
fold: "close",
title: "Isla Mujeres"});
       

var group_BJ = new ol.layer.Group({
                                layers: [
    new ol.layer.Group({
                    layers: [lyr_condominios,lyr_zones_22,lyr_SM_23,lyr_Manzanas_BJ_35,lyr_Lotes_BJ,lyr_Zonas_captacion_29,lyr_Sectores_BJ,lyr_Pol_Actuacion_BJ],
                    fold: "close",
                    title: "Catastro"}),
    new ol.layer.Group({
                    layers: [lyr_Clientes_BJ_33,],
                    fold: "close",
                    title: "Clientes"}),               
    new ol.layer.Group({
                    layers: [
                  
                    new ol.layer.Group({layers:[lyr_Nivel_Carcamos_25,lyr_Cobertura_PTAR_BJ_0,],
                    fold: "close",
                    title: "Operacion y Coberturas"}),
                    new ol.layer.Group({layers: [lyr_pozos_colectores_27,],
                    fold: "close",
                    title: "Accesorios"}),
                    lyr_Carcamos_25,lyr_Ptar_28,
                    new ol.layer.Group({layers: [lyr_Tuberia_ASS_0,
                    new ol.layer.Group({layers:[lyr_Emisores_26,lyr_colectores_26,],
                    fold: "close",
                    title: "Red Primaria"}),
                    ], 
                    fold: "close",
                    title: "Red Descarga Sanitaria"}),],
                    fold: "close",
                    title: "Agua Residual"}),
    new ol.layer.Group({
                    layers: [   
                     

                    new ol.layer.Group({layers: [lyr_Nivel_Tanques_34,lyr_dhc_sin_cobertura,lyr_dhc_cobertura_cland,
                    new ol.layer.Group({layers: [lyr_dhc_cobertura,
                        
                    //    lyr_Cobertura_Tanques_31
                    
                    ],
                    fold: "close",
                    title: "Cobertura Tanques"}),
                    new ol.layer.Group({layers: [lyr_Coberturas_Lineas_30],
                    fold: "close",
                    title: "Cobertura Lineas"}),
                    new ol.layer.Group({layers: [lyr_Horario_Servicio_BJ_32,],
                    fold: "close",
                    title: "Horario de Servicio"}),
                    
                    
                    
                     new ol.layer.Group({layers: [heatmapLayer],
                    fold: "close",
                    title: "Mapa de Calor REclamos AP"}),
                    ],
                    fold: "close",
                    title: "Operacion y Cobertura"}), 
                    
                    new ol.layer.Group({layers: [lyr_AEP_VANN_VALVULAS_5,lyr_P_Cloro,lyr_Puntos_sectorizacion_BJ,],
                    fold: "close",
                    title: "Accesorios"}),

                    lyr_pozos_captacion_35,lyr_Tanques_34,
                    new ol.layer.Group({layers: [lyr_Conduccion_BJ_copy_1,lyr_Distribucion_BJ_copy_1,],
                    fold: "close",
                    title: "Red Agua Potable"}),
                    ],
                    fold: "close",
                    title: "Agua Potable"}),],
fold: "close",
title: "Benito Juarez"});

var group_PM = new ol.layer.Group({
			
			                 layers: [
    new ol.layer.Group({
                    layers: [lyr_mza_lv,lyr_parcel_lv,],
                    fold: "close",
                    title: "Catastro"}),
    new ol.layer.Group({
                    layers: [lyr_Clientes_lv_01,lyr_Clientes_PM_01],
                    fold: "close",
                    title: "Clientes"}),               
    new ol.layer.Group({
                    layers: [
                    
                    new ol.layer.Group({layers:[],
                    fold: "close",
                    title: "Operacion y Cobertura"}),
                    
                    new ol.layer.Group({layers: [],
                    fold: "close",
                    title: "Accesorios"}),
                    
                    lyr_Ptar_18,lyr_Carcamo_17,
                    
                    new ol.layer.Group({layers: [
                        new ol.layer.Group({layers:[lyr_Emisor_Colector_16,],
                    fold: "close",
                    title: "Red Primaria"}),
                        ], 
                    fold: "close",
                    title: "Red Descarga Sanitaria"}),],
                    fold: "close",
                    title: "Agua Residual"}),
    new ol.layer.Group({
                    layers: [                   
                    new ol.layer.Group({layers: [lyr_dhc_sin_cobertura_pm,
                    new ol.layer.Group({layers: [lyr_dhc_cobertura_pm,],
                    fold: "close",
                    title: "Cobertura Tanques"}),
                    new ol.layer.Group({layers: [],
                    fold: "close",
                    title: "Cobertura Lineas"}),
                    new ol.layer.Group({layers: [],
                    fold: "close",
                    title: "Horario de Servicio"}),
                    ],
                    fold: "close",
                    title: "Operacion y Cobertura"}), 
                    new ol.layer.Group({layers: [lyr_VALVULAS_21,],
                    fold: "close",
                    title: "Accesorios"}),lyr_pozos_captacion_PM,lyr_Tanques_20,
                    new ol.layer.Group({layers: [lyr_Conduccion_PM,lyr_Distribucion_PM_copy_1,],
                    fold: "close",
                    title: "Red Agua Potable"}),
                    ],
                    fold: "close",
                    title: "Agua Potable"}),],

fold: "close",
title: "Puerto Morelos"});

var group_SOL = new ol.layer.Group({

    layers: [
    new ol.layer.Group({
                    layers: [],
                    fold: "close",
                    title: "Catastro"}),
    new ol.layer.Group({
                    layers: [lyr_Clientes_Sol_01,],
                    fold: "close",
                    title: "Clientes"}),               
    new ol.layer.Group({

       layers: [       
                  
             
                    new ol.layer.Group({layers:[lyr_C_PTAR_2025_5_SOL,lyr_C_C_2025_5_SOL_1],
                    fold: "close",
                    title: "Operacion y Cobertura"}),
                    
                    new ol.layer.Group({layers: [lyr_posos_colector_5,],
                    fold: "close",
                    title: "Accesorios"}),lyr_Carcamos_3,lyr_Ptar_6,
                    
                    new ol.layer.Group({layers: [lyr_Tuberia_ASS_SOl,
                        new ol.layer.Group({layers:[lyr_Emisor_4,lyr_Colector_4],
                    fold: "close",
                    title: "Red Primaria"}),
                        ], 
                    fold: "close",
                    title: "Red Descarga Sanitaria"}),],
                    fold: "close",
                    title: "Aguan Residual"}),
    new ol.layer.Group({
                    layers: [    
                    
               
                    new ol.layer.Group({layers: [lyr_Nivel_Tanquespc_34,lyr_dhc_sin_cobertura_pc,
                    new ol.layer.Group({layers: [lyr_dhc_cobertura_pc,
                    //    lyr_C_T_2025_5_SOL_0
                    ],
                    fold: "close",
                    title: "Cobertura Tanques"}),
                    new ol.layer.Group({layers: [lyr_Cob_Lin_AP_PC_26],
                    fold: "close",
                    title: "Cobertura Lineas"}),
                    new ol.layer.Group({layers: [],
                    fold: "close",
                    title: "Horario de Servicio"}),
                    ],
                    fold: "close",
                    title: "Operación y coberturas"}), 
                    new ol.layer.Group({layers: [lyr_Pozos_captacion_10,lyr_Puntos_sectorizacion_PDC,],
                    fold: "close",
                    title: "Accesorios"}),
                    new ol.layer.Group({layers: [lyr_linea_Chemuyil_7,lyr_Conduccion_8,],
                    fold: "close",
                    title: "Red Agua Potable"}),
                    lyr_Tanques_9,lyr_P_Osmosis_11,],
                    fold: "close",
                    title: "Agua Potable"}),],

fold: "close",
title: "Playa del Carmen"});





var group_Complementos = new ol.layer.Group({layers: [
                new ol.layer.Group({
                    layers: [lyr_Cob_fortigate_IPS],
                    fold: "close",
                    title: "Otras Infraestructuras"}),              
			    new ol.layer.Group({
                    layers: [ new ol.layer.Group({
                            layers: [lyr_Ejidoqroo,],
                            fold: "close",
				            title: "Ejidos"}),
                        new ol.layer.Group({
                            layers: [lyr_Quintana_Roo_1,],
                            fold: "close",
				            title: "Municipio"}),],
                    fold: "close",
                    title: "Planificacion Territorial"}),	
                new ol.layer.Group({
                    layers: [lyr_CFE_Transmision,],
                    fold: "close",
                    title: "Infraestructura Electrica"}), 
                new ol.layer.Group({
                    layers: [lyr_BN_1,],
                    fold: "close",
                    title: "Bancos de Nivel"}),
                new ol.layer.Group({
                    layers: [lyr_afectacion,],
                    fold: "close",
                    title: "Atencion a Clientes"}),  
                                      
                     
                 new ol.layer.Group({
                    layers: [lyr_Agua_Superficial_2012_2013_1,lyr_Calidad_delagua_Subterranea_122023_2,],
                                        fold: "close",
                                        title: "Informacion CONAGUA"}),
                                    ],
                                    fold: "close",
                                    title: "Otros"});


var group_INfra_Proy = new ol.layer.Group({layers: [



new ol.layer.Group({layers: [
                            
    new ol.layer.Group({layers: [
        new ol.layer.Group({layers:[lyr_Emisor_colector_Proy,lyr_Carcamos_Proy,],
                    fold: "close",
                    title: "Infra Proyectada DS IM "}),

        new ol.layer.Group({layers: [lyr_Conduccion_Proy,lyr_Tanques_41_proy,],
                    fold: "close",
                    title: "Infra. Proyectada AP IM"}),

        ],
                    fold: "close",
                    title: "Isla Mujeres"}),

    new ol.layer.Group({layers: [
        new ol.layer.Group({layers: [],
                    fold: "close",
                    title: "Infra Proyectada  DS PM"}),
        new ol.layer.Group({layers: [],
                    fold: "close",
                    title: "Infra Proyectada  AP PM"}),
        ],
                    fold: "close",
                    title: "Puerto Morelos"}),    
    
    new ol.layer.Group({layers: [

        new ol.layer.Group({layers: [],
                    fold: "close",
                    title: "Infra Proyectada  DS SOL"}),
        new ol.layer.Group({
                    layers: [lyr_Conduccion_Proy_Sol,],
                    fold: "close",
                    title: "Infra Proyectada AP SOL"}),
        ],
                    fold: "close",
                    title: "Playa del Carmen"}),

    new ol.layer.Group({
                    layers: [
        

        new ol.layer.Group({layers: [lyr_pozo_visita_proy,lyr_redds_proy],
                    fold: "close",
                    title: "Infre Proyectada DS BJ"}),
        new ol.layer.Group({layers: [lyr_valvulasap_proy,lyr_accesorios_proy,lyr_redap_proyecto_proy],
                    fold: "close",
                    title: "Infra. Proyectada AP BJ"}),
                    lyr_puntos_topograficos,
        ],
                    fold: "close",
                    title: "Benito Juarez"}),

],
                    fold: "close",
                    title: "Planificacion"}), 
                new ol.layer.Group({
                    layers: [lyr_Fact_Parcelas,lyr_Fact_Desarrollo,lyr_Fact_Carcamo,lyr_Fact_TAP,lyr_Fact_Pozos_Visita,lyr_Fact_Valvula,lyr_Fact_Red_DS,lyr_Fact_Red_AP,],
                    fold: "close",
                    title: "Desarrollo"}),
                
],
                                    fold: "close",
                                    title: "Planificacion y Proyectos"});




   
var group_MAPA_BASE = new ol.layer.Group({
                                layers: [lyr_ESRIGraydark_0,lyr_ESRITopo_0,lyr_ESRISatellite_1,lyr_ESRIGraylight_3,],
                                fold: "close",
				
                                title: "MAPA_BASE"});




var layersList = [group_MAPA_BASE,group_Complementos,group_INfra_Proy,group_PM,group_IM,group_SOL,group_BJ,];     
                                


//mapa Base
lyr_ESRIGraydark_0.setVisible(false);lyr_ESRITopo_0.setVisible(true);lyr_ESRISatellite_1.setVisible(false);lyr_ESRIGraylight_3.setVisible(false);

//IM

lyr_Conduccion_40.setVisible(true);lyr_Distribucion_IM_copy_1.setVisible(false);lyr_Tanques_41.setVisible(true);lyr_Tuberia_ASS_IM.setVisible(false);lyr_Emisor_colector_37.setVisible(false);
lyr_Carcamos_38.setVisible(false);lyr_Ptar_39.setVisible(false);
lyr_dhc_cobertura_im.setVisible(false);
//BJ

lyr_zones_22.setVisible(false);lyr_SM_23.setVisible(false);lyr_Carcamos_25.setVisible(false);lyr_Emisores_26.setVisible(false);lyr_colectores_26.setVisible(false);
lyr_pozos_colectores_27.setVisible(false);lyr_Ptar_28.setVisible(false);lyr_Zonas_captacion_29.setVisible(false);lyr_Coberturas_Lineas_30.setVisible(false);
//lyr_Cobertura_Tanques_31.setVisible(false);
lyr_Horario_Servicio_BJ_32.setVisible(false);lyr_Tanques_34.setVisible(true);lyr_pozos_captacion_35.setVisible(true);lyr_Clientes_BJ_33.setVisible(false);lyr_Conduccion_BJ_copy_1.setVisible(true);lyr_Distribucion_BJ_copy_1.setVisible(false),lyr_Manzanas_BJ_35.setVisible(false);
lyr_Lotes_BJ.setVisible(true);lyr_Tuberia_ASS_0.setVisible(false);lyr_aep_nds.setVisible(false);lyr_Sectores_BJ.setVisible(false);lyr_Pol_Actuacion_BJ.setVisible(false);
lyr_puntos_topograficos.setVisible(false);lyr_valvulasap_proy.setVisible(false);lyr_accesorios_proy.setVisible(false);lyr_pozo_visita_proy.setVisible(false);lyr_redap_proyecto_proy.setVisible(false);
lyr_redds_proy.setVisible(false);lyr_Puntos_sectorizacion_BJ.setVisible(false);lyr_afectacion.setVisible(false);
lyr_Nivel_Carcamos_25.setVisible(false);
lyr_Nivel_Tanques_34.setVisible(false);
lyr_condominios.setVisible(false);
lyr_dhc_cobertura.setVisible(false);
lyr_dhc_cobertura_cland.setVisible(false);
lyr_dhc_sin_cobertura.setVisible(false);



//PM

lyr_Poligono_Actuacion_12.setVisible(false);lyr_Sectores_PM_13.setVisible(false);lyr_SM_Puerto_Morelos_14.setVisible(false);lyr_Manzanas_PuertoMorelos_15.setVisible(false);lyr_Emisor_Colector_16.setVisible(false);
lyr_Carcamo_17.setVisible(false);lyr_Ptar_18.setVisible(false);lyr_Tanques_20.setVisible(true);lyr_Conduccion_PM.setVisible(true);lyr_Distribucion_PM_copy_1.setVisible(false);
lyr_pozos_captacion_PM.setVisible(false);lyr_VALVULAS_21.setVisible(false);lyr_Clientes_lv_01.setVisible(false);lyr_mza_lv.setVisible(false);
lyr_parcel_lv.setVisible(false);
lyr_Clientes_PM_01.setVisible(false);
lyr_dhc_cobertura_pm.setVisible(false);
lyr_dhc_sin_cobertura_pm.setVisible(false);

//SOL

lyr_Tuberia_ASS_SOl.setVisible(false);lyr_SM_SOL_1.setVisible(false);lyr_Mza_sol_2.setVisible(false);lyr_Carcamos_3.setVisible(false);lyr_Emisor_4.setVisible(false);
lyr_Colector_4.setVisible(false);lyr_posos_colector_5.setVisible(false);lyr_Ptar_6.setVisible(false);lyr_linea_Chemuyil_7.setVisible(false);lyr_Conduccion_8.setVisible(true);
lyr_Tanques_9.setVisible(true);lyr_Pozos_captacion_10.setVisible(false);lyr_P_Osmosis_11.setVisible(false);lyr_Clientes_Sol_01.setVisible(false);
//lyr_C_T_2025_5_SOL_0.setVisible(false);
lyr_dhc_cobertura_pc.setVisible(false);
lyr_C_C_2025_5_SOL_1.setVisible(false);lyr_Cob_Lin_AP_PC_26.setVisible(false);lyr_Puntos_sectorizacion_PDC.setVisible(false);
lyr_Nivel_Tanquespc_34.setVisible(false);lyr_dhc_sin_cobertura_pc.setVisible(false);


//Proyecto

lyr_C_PTAR_2025_5_SOL.setVisible(false);
lyr_Tanques_41_proy.setVisible(false);
lyr_Conduccion_Proy_Sol.setVisible(false);
lyr_Conduccion_Proy.setVisible(false);
lyr_Conduccion_Proy_BJ.setVisible(false);
lyr_Emisor_colector_Proy.setVisible(false);
lyr_Carcamos_Proy.setVisible(false);


//otros

lyr_Cobertura_PTAR_BJ_0.setVisible(false);lyr_AEP_VANN_VALVULAS_5.setVisible(false);
 lyr_BN_1.setVisible(false);lyr_P_Cloro.setVisible(false);
lyr_Agua_Superficial_2012_2013_1.setVisible(false);lyr_Calidad_delagua_Subterranea_122023_2.setVisible(false);lyr_Quintana_Roo_1.setVisible(false);
lyr_Cob_fortigate_IPS.setVisible(false);lyr_Ejidoqroo.setVisible(false);lyr_CFE_Transmision.setVisible(false);


heatmapLayer.setVisible(false)

// Factibilidad

lyr_Fact_Desarrollo.setVisible(false);lyr_Fact_Pozos_Visita.setVisible(false);lyr_Fact_Valvula.setVisible(false);
lyr_Fact_Red_DS.setVisible(false);lyr_Fact_Red_AP.setVisible(false);lyr_Fact_Parcelas.setVisible(false);
lyr_Fact_Carcamo.setVisible(false);lyr_Fact_TAP.setVisible(false);






lyr_Quintana_Roo_1.set('fieldAliases', {'id': 'id', 'cve_ent': 'cve_ent', 'cve_mun': 'cve_mun', 'nom_mun': 'nom_mun', 'numpoligon': 'numpoligon', 'etiqueta': 'etiqueta', 'estado': 'estado', 'cita': 'cita', 'cov_id': 'cov_id', });
lyr_Quintana_Roo_1.set('fieldImages', {'id': 'TextEdit', 'cve_ent': 'TextEdit', 'cve_mun': 'TextEdit', 'nom_mun': 'TextEdit', 'numpoligon': 'TextEdit', 'etiqueta': 'TextEdit', 'estado': 'TextEdit', 'cita': 'TextEdit', 'cov_id': 'TextEdit', });
lyr_Quintana_Roo_1.set('fieldLabels', {'id': 'no label', 'cve_ent': 'no label', 'cve_mun': 'no label', 'nom_mun': 'no label', 'numpoligon': 'no label', 'etiqueta': 'no label', 'estado': 'no label', 'cita': 'no label', 'cov_id': 'no label', });
lyr_Agua_Superficial_2012_2013_1.set('fieldAliases', {'id': 'id', 'CLAVE': 'CLAVE', 'SITIO': 'SITIO', 'ORGANISMO_DE_CUENCA': 'ORGANISMO_DE_CUENCA', 'ESTADO': 'ESTADO', 'MUNICIPIO': 'MUNICIPIO', 'CUENCA': 'CUENCA', 'CUERPO DE AGUA': 'CUERPO DE AGUA', 'TIPO': 'TIPO', 'SUBTIPO': 'SUBTIPO', 'LONGITUD': 'LONGITUD', 'LATITUD': 'LATITUD', 'PERIODO': 'PERIODO', 'DBO_mg/L': 'DBO_mg/L', 'CALIDAD_DBO': 'CALIDAD_DBO', 'DQO_mg/L': 'DQO_mg/L', 'CALIDAD_DQO': 'CALIDAD_DQO', 'SST_mg/L': 'SST_mg/L', 'CALIDAD_SST': 'CALIDAD_SST', 'COLI_FEC_NMP_100mL': 'COLI_FEC_NMP_100mL', 'CALIDAD_COLI_FEC': 'CALIDAD_COLI_FEC', 'E_COLI_NMP_100mL': 'E_COLI_NMP_100mL', 'CALIDAD_E_COLI': 'CALIDAD_E_COLI', 'ENTEROC_NMP_100mL': 'ENTEROC_NMP_100mL', 'CALIDAD_ENTEROC': 'CALIDAD_ENTEROC', 'OD_PORC': 'OD_PORC', 'CALIDAD_OD_PORC': 'CALIDAD_OD_PORC', 'OD_PORC_SUP': 'OD_PORC_SUP', 'CALIDAD_OD_PORC_SUP': 'CALIDAD_OD_PORC_SUP', 'OD_PORC_MED': 'OD_PORC_MED', 'CALIDAD_OD_PORC_MED': 'CALIDAD_OD_PORC_MED', 'OD_PORC_FON': 'OD_PORC_FON', 'CALIDAD_OD_PORC_FON': 'CALIDAD_OD_PORC_FON', 'TOX_D_48_UT': 'TOX_D_48_UT', 'CALIDAD_TOX_D_48': 'CALIDAD_TOX_D_48', 'TOX_V_15_UT': 'TOX_V_15_UT', 'CALIDAD_TOX_V_15': 'CALIDAD_TOX_V_15', 'TOX_D_48_SUP_UT': 'TOX_D_48_SUP_UT', 'CALIDAD TOX_D_48_SUP': 'CALIDAD TOX_D_48_SUP', 'TOX_D_48_FON_UT': 'TOX_D_48_FON_UT', 'CALIDAD_TOX_D_48_FON': 'CALIDAD_TOX_D_48_FON', 'TOX_FIS_SUP_15_UT': 'TOX_FIS_SUP_15_UT', 'CALIDAD_TOX_FIS_SUP_15': 'CALIDAD_TOX_FIS_SUP_15', 'TOX_FIS_FON_15_UT': 'TOX_FIS_FON_15_UT', 'CALIDAD_TOX_FIS_FON_15': 'CALIDAD_TOX_FIS_FON_15', 'SEMAFORO': 'SEMAFORO', 'CONTAMINANTES': 'CONTAMINANTES', });
lyr_Calidad_delagua_Subterranea_122023_2.set('fieldAliases', {'id': 'id', 'CLAVE': 'CLAVE', 'SITIO': 'SITIO', 'ORGANISMO_DE_CUENCA': 'ORGANISMO_DE_CUENCA', 'ESTADO': 'ESTADO', 'MUNICIPIO': 'MUNICIPIO', 'ACUIFERO': 'ACUIFERO', 'SUBTIPO': 'SUBTIPO', 'LONGITUD': 'LONGITUD', 'LATITUD': 'LATITUD', 'PERIODO': 'PERIODO', 'ALC_mg/L': 'ALC_mg/L', 'CALIDAD_ALC': 'CALIDAD_ALC', 'CONDUCT_mS/cm': 'CONDUCT_mS/cm', 'CALIDAD_CONDUC': 'CALIDAD_CONDUC', 'SDT_mg/L': 'SDT_mg/L', 'CALIDAD_SDT_ra': 'CALIDAD_SDT_ra', 'CALIDAD_SDT_salin': 'CALIDAD_SDT_salin', 'FLUORUROS_mg/L': 'FLUORUROS_mg/L', 'CALIDAD_FLUO': 'CALIDAD_FLUO', 'DUR_mg/L': 'DUR_mg/L', 'CALIDAD_DUR': 'CALIDAD_DUR', 'COLI_FEC_NMP/100_mL': 'COLI_FEC_NMP/100_mL', 'CALIDAD_COLI_FEC': 'CALIDAD_COLI_FEC', 'N_NO3_mg/L': 'N_NO3_mg/L', 'CALIDAD_N_NO3': 'CALIDAD_N_NO3', 'AS_TOT_mg/L': 'AS_TOT_mg/L', 'CALIDAD_AS': 'CALIDAD_AS', 'CD_TOT_mg/L': 'CD_TOT_mg/L', 'CALIDAD_CD': 'CALIDAD_CD', 'CR_TOT_mg/L': 'CR_TOT_mg/L', 'CALIDAD_CR': 'CALIDAD_CR', 'HG_TOT_mg/L': 'HG_TOT_mg/L', 'CALIDAD_HG': 'CALIDAD_HG', 'PB_TOT_mg/L': 'PB_TOT_mg/L', 'CALIDAD_PB': 'CALIDAD_PB', 'MN_TOT_mg/L': 'MN_TOT_mg/L', 'CALIDAD_MN': 'CALIDAD_MN', 'FE_TOT_mg/L': 'FE_TOT_mg/L', 'CALIDAD_FE': 'CALIDAD_FE', 'SEMAFORO': 'SEMAFORO', 'CONTAMINANTES': 'CONTAMINANTES', });
lyr_Agua_Superficial_2012_2013_1.set('fieldImages', {'id': 'TextEdit', 'CLAVE': 'TextEdit', 'SITIO': 'TextEdit', 'ORGANISMO_DE_CUENCA': 'TextEdit', 'ESTADO': 'TextEdit', 'MUNICIPIO': 'TextEdit', 'CUENCA': 'TextEdit', 'CUERPO DE AGUA': 'TextEdit', 'TIPO': 'TextEdit', 'SUBTIPO': 'TextEdit', 'LONGITUD': 'TextEdit', 'LATITUD': 'TextEdit', 'PERIODO': 'TextEdit', 'DBO_mg/L': 'TextEdit', 'CALIDAD_DBO': 'TextEdit', 'DQO_mg/L': 'TextEdit', 'CALIDAD_DQO': 'TextEdit', 'SST_mg/L': 'TextEdit', 'CALIDAD_SST': 'TextEdit', 'COLI_FEC_NMP_100mL': 'TextEdit', 'CALIDAD_COLI_FEC': 'TextEdit', 'E_COLI_NMP_100mL': 'TextEdit', 'CALIDAD_E_COLI': 'TextEdit', 'ENTEROC_NMP_100mL': 'TextEdit', 'CALIDAD_ENTEROC': 'TextEdit', 'OD_PORC': 'TextEdit', 'CALIDAD_OD_PORC': 'TextEdit', 'OD_PORC_SUP': 'TextEdit', 'CALIDAD_OD_PORC_SUP': 'TextEdit', 'OD_PORC_MED': 'TextEdit', 'CALIDAD_OD_PORC_MED': 'TextEdit', 'OD_PORC_FON': 'TextEdit', 'CALIDAD_OD_PORC_FON': 'TextEdit', 'TOX_D_48_UT': 'TextEdit', 'CALIDAD_TOX_D_48': 'TextEdit', 'TOX_V_15_UT': 'TextEdit', 'CALIDAD_TOX_V_15': 'TextEdit', 'TOX_D_48_SUP_UT': 'TextEdit', 'CALIDAD TOX_D_48_SUP': 'TextEdit', 'TOX_D_48_FON_UT': 'TextEdit', 'CALIDAD_TOX_D_48_FON': 'TextEdit', 'TOX_FIS_SUP_15_UT': 'TextEdit', 'CALIDAD_TOX_FIS_SUP_15': 'TextEdit', 'TOX_FIS_FON_15_UT': 'TextEdit', 'CALIDAD_TOX_FIS_FON_15': 'TextEdit', 'SEMAFORO': 'TextEdit', 'CONTAMINANTES': 'TextEdit', });
lyr_Calidad_delagua_Subterranea_122023_2.set('fieldImages', {'id': 'TextEdit', 'CLAVE': 'TextEdit', 'SITIO': 'TextEdit', 'ORGANISMO_DE_CUENCA': 'TextEdit', 'ESTADO': 'TextEdit', 'MUNICIPIO': 'TextEdit', 'ACUIFERO': 'TextEdit', 'SUBTIPO': 'TextEdit', 'LONGITUD': 'TextEdit', 'LATITUD': 'TextEdit', 'PERIODO': 'TextEdit', 'ALC_mg/L': 'TextEdit', 'CALIDAD_ALC': 'TextEdit', 'CONDUCT_mS/cm': 'TextEdit', 'CALIDAD_CONDUC': 'TextEdit', 'SDT_mg/L': 'TextEdit', 'CALIDAD_SDT_ra': 'TextEdit', 'CALIDAD_SDT_salin': 'TextEdit', 'FLUORUROS_mg/L': 'TextEdit', 'CALIDAD_FLUO': 'TextEdit', 'DUR_mg/L': 'TextEdit', 'CALIDAD_DUR': 'TextEdit', 'COLI_FEC_NMP/100_mL': 'TextEdit', 'CALIDAD_COLI_FEC': 'TextEdit', 'N_NO3_mg/L': 'TextEdit', 'CALIDAD_N_NO3': 'TextEdit', 'AS_TOT_mg/L': 'TextEdit', 'CALIDAD_AS': 'TextEdit', 'CD_TOT_mg/L': 'TextEdit', 'CALIDAD_CD': 'TextEdit', 'CR_TOT_mg/L': 'TextEdit', 'CALIDAD_CR': 'TextEdit', 'HG_TOT_mg/L': 'TextEdit', 'CALIDAD_HG': 'TextEdit', 'PB_TOT_mg/L': 'TextEdit', 'CALIDAD_PB': 'TextEdit', 'MN_TOT_mg/L': 'TextEdit', 'CALIDAD_MN': 'TextEdit', 'FE_TOT_mg/L': 'TextEdit', 'CALIDAD_FE': 'TextEdit', 'SEMAFORO': 'TextEdit', 'CONTAMINANTES': 'TextEdit', });
lyr_Agua_Superficial_2012_2013_1.set('fieldLabels', {'id': 'inline label - visible with data', 'CLAVE': 'inline label - visible with data', 'SITIO': 'inline label - visible with data', 'ORGANISMO_DE_CUENCA': 'inline label - visible with data', 'ESTADO': 'inline label - visible with data', 'MUNICIPIO': 'inline label - visible with data', 'CUENCA': 'inline label - visible with data', 'CUERPO DE AGUA': 'inline label - visible with data', 'TIPO': 'inline label - visible with data', 'SUBTIPO': 'inline label - visible with data', 'LONGITUD': 'inline label - visible with data', 'LATITUD': 'inline label - visible with data', 'PERIODO': 'inline label - visible with data', 'DBO_mg/L': 'inline label - visible with data', 'CALIDAD_DBO': 'inline label - visible with data', 'DQO_mg/L': 'inline label - visible with data', 'CALIDAD_DQO': 'inline label - visible with data', 'SST_mg/L': 'inline label - visible with data', 'CALIDAD_SST': 'inline label - visible with data', 'COLI_FEC_NMP_100mL': 'inline label - visible with data', 'CALIDAD_COLI_FEC': 'inline label - visible with data', 'E_COLI_NMP_100mL': 'inline label - visible with data', 'CALIDAD_E_COLI': 'inline label - visible with data', 'ENTEROC_NMP_100mL': 'inline label - visible with data', 'CALIDAD_ENTEROC': 'inline label - visible with data', 'OD_PORC': 'inline label - visible with data', 'CALIDAD_OD_PORC': 'inline label - visible with data', 'OD_PORC_SUP': 'inline label - visible with data', 'CALIDAD_OD_PORC_SUP': 'inline label - visible with data', 'OD_PORC_MED': 'inline label - visible with data', 'CALIDAD_OD_PORC_MED': 'inline label - visible with data', 'OD_PORC_FON': 'inline label - visible with data', 'CALIDAD_OD_PORC_FON': 'inline label - visible with data', 'TOX_D_48_UT': 'inline label - visible with data', 'CALIDAD_TOX_D_48': 'inline label - visible with data', 'TOX_V_15_UT': 'inline label - visible with data', 'CALIDAD_TOX_V_15': 'inline label - visible with data', 'TOX_D_48_SUP_UT': 'inline label - visible with data', 'CALIDAD TOX_D_48_SUP': 'inline label - visible with data', 'TOX_D_48_FON_UT': 'inline label - visible with data', 'CALIDAD_TOX_D_48_FON': 'inline label - visible with data', 'TOX_FIS_SUP_15_UT': 'inline label - visible with data', 'CALIDAD_TOX_FIS_SUP_15': 'inline label - visible with data', 'TOX_FIS_FON_15_UT': 'no label', 'CALIDAD_TOX_FIS_FON_15': 'inline label - visible with data', 'SEMAFORO': 'inline label - visible with data', 'CONTAMINANTES': 'inline label - visible with data', });
lyr_Calidad_delagua_Subterranea_122023_2.set('fieldLabels', {'id': 'inline label - visible with data', 'CLAVE': 'inline label - visible with data', 'SITIO': 'inline label - visible with data', 'ORGANISMO_DE_CUENCA': 'inline label - visible with data', 'ESTADO': 'inline label - visible with data', 'MUNICIPIO': 'inline label - visible with data', 'ACUIFERO': 'inline label - visible with data', 'SUBTIPO': 'inline label - visible with data', 'LONGITUD': 'inline label - visible with data', 'LATITUD': 'inline label - visible with data', 'PERIODO': 'inline label - visible with data', 'ALC_mg/L': 'inline label - visible with data', 'CALIDAD_ALC': 'inline label - visible with data', 'CONDUCT_mS/cm': 'inline label - visible with data', 'CALIDAD_CONDUC': 'inline label - visible with data', 'SDT_mg/L': 'inline label - visible with data', 'CALIDAD_SDT_ra': 'inline label - visible with data', 'CALIDAD_SDT_salin': 'inline label - visible with data', 'FLUORUROS_mg/L': 'inline label - visible with data', 'CALIDAD_FLUO': 'inline label - visible with data', 'DUR_mg/L': 'inline label - visible with data', 'CALIDAD_DUR': 'inline label - visible with data', 'COLI_FEC_NMP/100_mL': 'inline label - visible with data', 'CALIDAD_COLI_FEC': 'inline label - visible with data', 'N_NO3_mg/L': 'inline label - visible with data', 'CALIDAD_N_NO3': 'inline label - visible with data', 'AS_TOT_mg/L': 'inline label - visible with data', 'CALIDAD_AS': 'inline label - visible with data', 'CD_TOT_mg/L': 'inline label - visible with data', 'CALIDAD_CD': 'inline label - visible with data', 'CR_TOT_mg/L': 'inline label - visible with data', 'CALIDAD_CR': 'inline label - visible with data', 'HG_TOT_mg/L': 'inline label - visible with data', 'CALIDAD_HG': 'inline label - visible with data', 'PB_TOT_mg/L': 'inline label - visible with data', 'CALIDAD_PB': 'inline label - visible with data', 'MN_TOT_mg/L': 'inline label - visible with data', 'CALIDAD_MN': 'inline label - visible with data', 'FE_TOT_mg/L': 'inline label - visible with data', 'CALIDAD_FE': 'inline label - visible with data', 'SEMAFORO': 'inline label - visible with data', 'CONTAMINANTES': 'inline label - visible with data', });
lyr_BN_1.set('fieldAliases', {'id': 'ID', 'placa': 'Placa', 'nombre': 'Nombre', 'ubicación': 'Ubicación', 'mojonera': 'Mojonera', 'lat': 'Lat', 'long': 'Long', 'altura_eli': 'Altura_eli', 'norte': 'Norte', 'este': 'Este', 'altura_ort': 'Altura_ort', 'codigo': 'codigo', });
lyr_BN_1.set('fieldImages', {'id': 'TextEdit', 'placa': 'TextEdit', 'nombre': 'TextEdit', 'ubicación': 'TextEdit', 'mojonera': 'TextEdit', 'lat': 'TextEdit', 'long': 'TextEdit', 'altura_eli': 'TextEdit', 'norte': 'TextEdit', 'este': 'TextEdit', 'altura_ort': 'TextEdit', 'codigo': 'TextEdit', });
lyr_BN_1.set('fieldLabels', {'id': 'inline label - visible with data', 'placa': 'inline label - visible with data', 'nombre': 'inline label - visible with data', 'ubicación': 'hidden field', 'mojonera': 'hidden field', 'lat': 'inline label - visible with data', 'long': 'inline label - visible with data', 'altura_eli': 'inline label - visible with data', 'norte': 'inline label - visible with data', 'este': 'inline label - visible with data', 'altura_ort': 'inline label - visible with data', 'codigo': 'hidden field', });

lyr_SM_SOL_1.set('fieldAliases', {'id_0': 'id_0', 'id': 'id', 'sma': 'sma', 'in_med_con': 'in_med_con', 'horas_serv': 'horas_serv', 'surf': 'surf', 'perim': 'perim', 'dwgname': 'dwgname', 'layername': 'layername', 'droite': 'droite', 'gauche': 'gauche', 'haut': 'haut', 'bas': 'bas', });
lyr_Mza_sol_2.set('fieldAliases', {'aep': 'aep', 'ancrfr': 'ancrfr', 'ass': 'ass', 'code': 'code', 'densite': 'densite', 'horpmp': 'horpmp', 'id': 'id', 'nbrhrspmp': 'nbrhrspmp', 'surface': 'surface', 'x1': 'x1', 'x2': 'x2', 'y1': 'y1', 'y2': 'y2', 'zn': 'zn', 'manzana': 'manzana', 'supermanza': 'supermanza', 'localidad': 'localidad', 'capaeva': 'capaeva', 'layername': 'layername', 'dwgname': 'dwgname', });


lyr_Colector_4.set('fieldAliases', {'id': 'id', 'objectid': 'objectid', 'layer': 'layer', 'Estatus': 'Estatus', 'jerarquia': 'jerarquia', 'diamero': 'diamero', 'material': 'material', 'shape_leng': 'shape_leng', 'id_pq': 'id_pq', 'concepto': 'concepto', 'fuente': 'fuente', });
lyr_Colector_4.set('fieldImages', {'id': '', 'objectid': '', 'layer': '', 'Estatus': '', 'jerarquia': '', 'diamero': '', 'material': '', 'shape_leng': '', 'id_pq': '', 'concepto': '', 'fuente': '', });
lyr_Colector_4.set('fieldLabels', {'id': 'no label', 'objectid': 'no label', 'layer': 'no label', 'Estatus': 'no label', 'jerarquia': 'no label', 'diamero': 'no label', 'material': 'no label', 'shape_leng': 'no label', 'id_pq': 'no label', 'concepto': 'no label', 'fuente': 'no label', });

lyr_Emisor_4.set('fieldAliases', {'id': 'id', 'objectid': 'objectid', 'layer': 'layer', 'Estatus': 'Estatus', 'jerarquia': 'jerarquia', 'diamero': 'diamero', 'material': 'material', 'shape_leng': 'shape_leng', 'id_pq': 'id_pq', 'concepto': 'concepto', 'fuente': 'fuente', });
lyr_Emisor_4.set('fieldImages', {'id': '', 'objectid': '', 'layer': '', 'Estatus': '', 'jerarquia': '', 'diamero': '', 'material': '', 'shape_leng': '', 'id_pq': '', 'concepto': '', 'fuente': '', });
lyr_Emisor_4.set('fieldLabels', {'id': 'no label', 'objectid': 'no label', 'layer': 'no label', 'Estatus': 'no label', 'jerarquia': 'no label', 'diamero': 'no label', 'material': 'no label', 'shape_leng': 'no label', 'id_pq': 'no label', 'concepto': 'no label', 'fuente': 'no label', });




lyr_posos_colector_5.set('fieldAliases', {'id': 'id', 'entity': 'entity', 'layer': 'layer', 'color': 'color', 'linetype': 'linetype', 'elevation': 'elevation', 'linewt': 'linewt', 'refname': 'refname', 'angle': 'angle', });
lyr_Ptar_6.set('fieldAliases', {'id': 'id', 'ptar': 'ptar', 'Estatus': 'Estatus', 'zona': 'zona', 'operador': 'operador', 'fuente': 'fuente', 'id_pq': 'id_pq', });
lyr_linea_Chemuyil_7.set('fieldAliases', {'id': 'id', 'elevation': 'elevation', 'refname': 'refname', 'long_m': 'long_m', });
lyr_Conduccion_8.set('fieldAliases', {'id': 'id', 'objectid': 'objectid', 'layer': 'layer', 'linetype': 'linetype', 'Estatus': 'Estatus', 'material': 'material', 'diametro': 'diametro', 't_red': 't_red', 'shape_leng': 'shape_leng', 'id_pq': 'id_pq', 'id_pq_1': 'id_pq_1', 'fuente': 'fuente', });
lyr_Pozos_captacion_10.set('fieldAliases', {'id': 'id', 'layer': 'layer', 'Estatus': 'Estatus', 'id_pq': 'id_pq', 'fuente': 'fuente', 'oper': 'oper', });
lyr_P_Osmosis_11.set('fieldAliases', {'id_0': 'id_0', 'id': 'id', 'Estatus': 'Estatus', 'id_pq': 'id_pq', 'fuente': 'fuente', 'nombre': 'nombre', });
lyr_Poligono_Actuacion_12.set('fieldAliases', {'id': 'id', 'pol': 'pol', 'area': 'area', 'mpio': 'mpio', 'localidad': 'localidad', });
lyr_Sectores_PM_13.set('fieldAliases', {'id': 'id', 'MUNICIPIO': 'MUNICIPIO', 'SECTORES': 'SECTORES', 'area': 'area', });
lyr_SM_Puerto_Morelos_14.set('fieldAliases', {'id': 'id', 'municipio': 'municipio', 'localidad': 'localidad', 'zona': 'zona', 'sm': 'sm', 'total MZA': 'total MZA', });
lyr_Manzanas_PuertoMorelos_15.set('fieldAliases', {'id_0': 'id_0', 'aep': 'aep', 'ancrfr': 'ancrfr', 'ass': 'ass', 'code': 'code', 'densite': 'densite', 'horpmp': 'horpmp', 'id': 'id', 'nbrhrspmp': 'nbrhrspmp', 'surface': 'surface', 'x1': 'x1', 'x2': 'x2', 'y1': 'y1', 'y2': 'y2', 'zn': 'zn', 'manzana': 'manzana', 'supermanza': 'supermanza', 'localidad': 'localidad', 'capaeva': 'capaeva', 'layername': 'layername', 'dwgname': 'dwgname', });
lyr_Emisor_Colector_16.set('fieldAliases', {'id': 'id', 'layer': 'layer', 'Estatus': 'Estatus', 'jerarquia': 'jerarquia', 'diam': 'diam', 'material': 'material', 'long': 'long', 'id_pq': 'id_pq', 'fuente': 'fuente', });






lyr_Carcamo_17.set('fieldAliases', {'id_0': 'id_0', 'id': 'id', 'carcamo': 'carcamo', 'Estatus': 'Estatus', 'capacidad': 'capacidad', 'fuente': 'fuente', 'id_pq': 'id_pq', });
lyr_Ptar_18.set('fieldAliases', {'id': 'id', 'layer': 'layer', 'nom': 'nom', 'Estatus': 'Estatus', 'zona': 'zona', 'operador': 'operador', 'id_pq': 'id_pq', 'fuente': 'fuente', });


lyr_Conduccion_PM.set('fieldAliases', {'id': 'id', 'layer': 'layer', 'linetype': 'linetype', 'Estatus': 'Estatus', 'ID_PQ': 'ID_PQ', 'Diametro_Pulg': 'Diametro_Pulg', 'Diametro_mm': 'Diametro_mm', 'Tipo_Red': 'Tipo_Red', });
lyr_Conduccion_PM.set('fieldImages', {'id': 'TextEdit', 'layer': 'TextEdit', 'linetype': 'TextEdit', 'Estatus': 'TextEdit', 'ID_PQ': 'TextEdit', 'Diametro_Pulg': 'TextEdit', 'Diametro_mm': 'Range', 'Tipo_Red': 'TextEdit', });
lyr_Conduccion_PM.set('fieldLabels', {'id': 'no label', 'layer': 'no label', 'linetype': 'no label', 'Estatus': 'no label', 'ID_PQ': 'no label', 'Diametro_Pulg': 'no label', 'Diametro_mm': 'no label', 'Tipo_Red': 'no label', });





lyr_Tanques_20.set('fieldAliases', {'id': 'id', 'tanque': 'tanque', 'nombre1': 'nombre1', });
lyr_VALVULAS_21.set('fieldAliases', {'id': 'id', 'id_pq': 'id_pq', 'Estatus': 'Estatus', 'fuente': 'fuente', 'diametro': 'diametro', 'CODIGO_VALVULA': 'CODIGO_VALVULA', 'TIPO': 'TIPO', });
lyr_zones_22.set('fieldAliases', {'id': 'id', 'zone': 'zone', });
lyr_SM_23.set('fieldAliases', {'id': 'id', 'sm': 'sm', 'area': 'area', 'año': 'año', 'tanque': 'tanque', 'sm_1': 'sm_1', 'nivel_soci': 'nivel_soci', 'vialidades': 'vialidades', 'infra_estr': 'infra_estr', 'infra_es_1': 'infra_es_1', 'cobertura': 'cobertura', 'cobertur_1': 'cobertur_1', 'consumo_pr': 'consumo_pr', 'suma_de__p': 'suma_de__p', 'factor_de': 'factor_de', 'carcamo': 'carcamo', 'fecha': 'fecha', });


lyr_pozos_colectores_27.set('fieldAliases', {'id': 'id', 'entity': 'entity', 'layer': 'layer', 'color': 'color', 'linetype': 'linetype', 'elevation': 'elevation', 'linewt': 'linewt', 'refname': 'refname', 'angle': 'angle', });
lyr_Ptar_28.set('fieldAliases', {'id': 'id', 'ptar': 'ptar', 'Estatus': 'Estatus', 'zona': 'zona', 'operador': 'operador', 'clv': 'clv', 'id_pq': 'id_pq', 'fuente': 'fuente', });
lyr_Zonas_captacion_29.set('fieldAliases', {'id': 'id', 'refname': 'refname', 'zona': 'zona', 'nombre': 'nombre', });
lyr_Coberturas_Lineas_30.set('fieldAliases', {'fid': 'fid', 'id': 'id', 'linea': 'linea', 'cuenta_de': 'cuenta_de', 'subtotal': 'subtotal', 'iva': 'iva', 'total': 'total', 'consumo_m3': 'consumo_m3', });
//lyr_Cobertura_Tanques_31.set('fieldAliases', {'id_0': 'id_0', 'fid_1': 'fid_1', 'id': 'id', 'tanque': 'tanque', 'cuenta_de': 'cuenta_de', 'subtotal': 'subtotal', 'iva': 'iva', 'total': 'total', 'consumo_m3': 'consumo_m3', });
lyr_Horario_Servicio_BJ_32.set('fieldAliases', {'id': 'id', 'sm': 'sm', 'area': 'area', 'año': 'año', 'tanque': 'tanque', 'nivel_soci': 'nivel_soci', 'vialidades': 'vialidades', 'infra_estr': 'infra_estr', 'infra_es_1': 'infra_es_1', 'cobertura': 'cobertura', 'cobertur_1': 'cobertur_1', 'consumo_pr': 'consumo_pr', 'suma_de__p': 'suma_de__p', 'factor_de': 'factor_de', 'carcamo': 'carcamo', 'fecha': 'fecha', 'objectid': 'objectid', 'cárcamo': 'cárcamo', 'cárcamo_a': 'cárcamo_a', 'sector': 'sector', 'sm_o_regi': 'sm_o_regi', 'observacio': 'observacio', 'presión_m': 'presión_m', 'hrs_de_ser': 'hrs_de_ser', 'horario_1_': 'horario_1_', 'horario_11': 'horario_11', 'horario_2_': 'horario_2_', 'horario_21': 'horario_21', 'presión_a': 'presión_a', });
lyr_Tanques_34.set('fieldAliases', { 'tanques': 'Tanque', 'Estatus': 'Estatus', 'capacidad': 'Capacidad', 'cvl_predio': 'Cvl_predio', 'fuente': 'Fuente', 'id_pq': 'ID_pq', 'dem_n_5': 'dem_n_5', 'clave_n1_4': 'clave_n1_4', });
lyr_pozos_captacion_35.set('fieldAliases', {'id': 'id', 'zona': 'zona', 'num': 'num', 'Estatus': 'Estatus', 'comentario': 'comentario', 'id_pq': 'id_pq', 'fuente': 'fuente', });
//lyr_tuberia_36.set('fieldAliases', {'id': 'id', 'FID_': 'FID_', 'fid_1': 'fid_1', 'ANCRFR': 'ANCRFR', 'BAS': 'BAS', 'BRANCHEM': 'BRANCHEM', 'CONCENTRAT': 'CONCENTRAT', 'DATE_POSE': 'DATE_POSE', 'DATE_VERIF': 'DATE_VERIF', 'DEBIT': 'DEBIT', 'DIAMETRE': 'DIAMETRE', 'DIAM_EXT': 'DIAM_EXT', 'DIVERS1': 'DIVERS1', 'DIVERS2': 'DIVERS2', 'DIVERS3': 'DIVERS3', 'DROITE': 'DROITE', 'ETAT': 'ETAT', 'FRICTION': 'FRICTION', 'GAUCHE': 'GAUCHE', 'HAUT': 'HAUT', 'ID': 'ID', 'LONGCARTO': 'LONGCARTO', 'LONGUEUR': 'LONGUEUR', 'MATERIAU': 'MATERIAU', 'NOEUD_DEB': 'NOEUD_DEB', 'NOEUD_FIN': 'NOEUD_FIN', 'NOM': 'NOM', 'NPLAN': 'NPLAN', 'ORDRE_RES': 'ORDRE_RES', 'PCHARGE': 'PCHARGE', 'PERTE_GRD': 'PERTE_GRD', 'POSIT_VOIE': 'POSIT_VOIE', 'PROFONDEUR': 'PROFONDEUR', 'PROF_SOL': 'PROF_SOL', 'PROJET': 'PROJET', 'RUE': 'RUE', 'RUGOSITE': 'RUGOSITE', 'TYPCANA': 'TYPCANA', 'TYPIMP': 'TYPIMP', 'VITESSE': 'VITESSE', 'ZN': 'ZN', 'ZONE_GEO': 'ZONE_GEO', 'LAYERNAME': 'LAYERNAME', 'DWGNAME': 'DWGNAME', 'Shape_Leng': 'Shape_Leng', });
lyr_Emisor_colector_37.set('fieldAliases', {'id': 'id', 'id_pq': 'id_pq', 'concepto': 'concepto', 'diametro': 'diametro', 'Estatus': 'Estatus', 'long_1': 'long_1', 'fuente': 'fuente', 'tipo': 'tipo', });
lyr_Ptar_39.set('fieldAliases', {'id': 'id', 'ptar': 'ptar', 'Estatus': 'Estatus', 'operador': 'operador', 'zona': 'zona', 'fuente': 'fuente', 'id_pq': 'id_pq', });
lyr_Conduccion_40.set('fieldAliases', {'id': 'id', 'objectid_1': 'objectid_1', 'layer': 'layer', 'Estatus': 'Estatus', 'tipo_de_re': 'tipo_de_re', 'shape_leng': 'shape_leng', 'comentario': 'comentario', 'id_pq': 'id_pq', 'fuente': 'fuente', });
lyr_AEP_VANN_VALVULAS_5.set('fieldAliases', {'id': 'id', 'ANCRFR': 'ANCRFR', 'COMMANDE': 'COMMANDE', 'CONCENTRAT': 'CONCENTRAT', 'COURBE': 'COURBE', 'DATE_POSE': 'DATE_POSE', 'DATE_VERIF': 'DATE_VERIF', 'DEBIT': 'DEBIT', 'DEGRE': 'DEGRE', 'DIAMETRE': 'DIAMETRE', 'DIVERS1': 'DIVERS1', 'DIVERS2': 'DIVERS2', 'DIVERS3': 'DIVERS3', 'ETAT': 'ETAT', 'FRICTION': 'FRICTION', 'ID': 'ID', 'ID_CANA': 'ID_CANA', 'ID_CHMVAN': 'ID_CHMVAN', 'MARQUE': 'MARQUE', 'MATERIAU': 'MATERIAU', 'MODELE': 'MODELE', 'NOM': 'NOM', 'NPLAN': 'NPLAN', 'NUMERO': 'NUMERO', 'PCHARGE': 'PCHARGE', 'PERTE_GRD': 'PERTE_GRD', 'POS': 'POS', 'PROFONDEUR': 'PROFONDEUR', 'PROF_SOL': 'PROF_SOL', 'PROJET': 'PROJET', 'ROTAT': 'ROTAT', 'STOUR': 'STOUR', 'TYPE_ACP': 'TYPE_ACP', 'TYPE_VAN': 'TYPE_VAN', 'VITESSE': 'VITESSE', 'X': 'X', 'Y': 'Y', 'ZN': 'ZN', 'ZONE_GEO': 'ZONE_GEO', 'LAYERNAME': 'LAYERNAME', 'DWGNAME': 'DWGNAME', 'BLOCKNAME': 'BLOCKNAME', 'DIAMETER': 'DIAMETER', });
lyr_Cobertura_PTAR_BJ_0.set('fieldAliases', {'id': 'id', 'Nombre': 'Nombre', 'Carcamos': 'Carcamos', });
lyr_SM_SOL_1.set('fieldImages', {'id_0': 'TextEdit', 'id': 'Range', 'sma': 'TextEdit', 'in_med_con': 'TextEdit', 'horas_serv': 'TextEdit', 'surf': 'TextEdit', 'perim': 'TextEdit', 'dwgname': 'TextEdit', 'layername': 'TextEdit', 'droite': 'TextEdit', 'gauche': 'TextEdit', 'haut': 'TextEdit', 'bas': 'TextEdit', });
lyr_Mza_sol_2.set('fieldImages', {'aep': 'TextEdit', 'ancrfr': 'TextEdit', 'ass': 'TextEdit', 'code': 'TextEdit', 'densite': 'TextEdit', 'horpmp': 'TextEdit', 'id': 'Range', 'nbrhrspmp': 'Range', 'surface': 'TextEdit', 'x1': 'TextEdit', 'x2': 'TextEdit', 'y1': 'TextEdit', 'y2': 'TextEdit', 'zn': 'TextEdit', 'manzana': 'TextEdit', 'supermanza': 'TextEdit', 'localidad': 'TextEdit', 'capaeva': 'Range', 'layername': 'TextEdit', 'dwgname': 'TextEdit', });



lyr_posos_colector_5.set('fieldImages', {'id': 'TextEdit', 'entity': 'TextEdit', 'layer': 'TextEdit', 'color': 'Range', 'linetype': 'TextEdit', 'elevation': 'TextEdit', 'linewt': 'Range', 'refname': 'TextEdit', 'angle': 'TextEdit', });
lyr_Ptar_6.set('fieldImages', {'id': 'TextEdit', 'ptar': 'TextEdit', 'Estatus': 'TextEdit', 'zona': 'TextEdit', 'operador': 'TextEdit', 'fuente': 'TextEdit', 'id_pq': 'TextEdit', });
lyr_linea_Chemuyil_7.set('fieldImages', {'id': 'TextEdit', 'elevation': 'TextEdit', 'refname': 'TextEdit', 'long_m': 'TextEdit', });
lyr_Conduccion_8.set('fieldImages', {'id': 'TextEdit', 'objectid': 'TextEdit', 'layer': 'TextEdit', 'linetype': 'TextEdit', 'Estatus': 'TextEdit', 'material': 'TextEdit', 'diametro': 'TextEdit', 't_red': 'TextEdit', 'shape_leng': 'TextEdit', 'id_pq': 'TextEdit', 'id_pq_1': 'TextEdit', 'fuente': 'TextEdit', });
lyr_Pozos_captacion_10.set('fieldImages', {'id': 'TextEdit', 'layer': 'TextEdit', 'Estatus': 'TextEdit', 'id_pq': 'TextEdit', 'fuente': 'TextEdit', 'oper': 'TextEdit', });
lyr_P_Osmosis_11.set('fieldImages', {'id_0': 'TextEdit', 'id': 'TextEdit', 'Estatus': 'TextEdit', 'id_pq': 'TextEdit', 'fuente': 'TextEdit', 'nombre': 'TextEdit', });
lyr_Poligono_Actuacion_12.set('fieldImages', {'id': 'TextEdit', 'pol': 'TextEdit', 'area': 'TextEdit', 'mpio': 'TextEdit', 'localidad': 'TextEdit', });
lyr_Sectores_PM_13.set('fieldImages', {'id': 'TextEdit', 'MUNICIPIO': 'TextEdit', 'SECTORES': 'TextEdit', 'area': 'TextEdit', });
lyr_SM_Puerto_Morelos_14.set('fieldImages', {'id': 'Range', 'municipio': 'TextEdit', 'localidad': 'TextEdit', 'zona': 'TextEdit', 'sm': 'TextEdit', 'total MZA': 'TextEdit', });
lyr_Manzanas_PuertoMorelos_15.set('fieldImages', {'id_0': 'TextEdit', 'aep': 'TextEdit', 'ancrfr': 'TextEdit', 'ass': 'TextEdit', 'code': 'TextEdit', 'densite': 'TextEdit', 'horpmp': 'TextEdit', 'id': 'Range', 'nbrhrspmp': 'Range', 'surface': 'TextEdit', 'x1': 'TextEdit', 'x2': 'TextEdit', 'y1': 'TextEdit', 'y2': 'TextEdit', 'zn': 'TextEdit', 'manzana': 'TextEdit', 'supermanza': 'TextEdit', 'localidad': 'TextEdit', 'capaeva': 'Range', 'layername': 'TextEdit', 'dwgname': 'TextEdit', });
lyr_Emisor_Colector_16.set('fieldImages', {'id': '', 'layer': '', 'Estatus': '', 'jerarquia': '', 'diam': '', 'material': '', 'long': '', 'id_pq': '', 'fuente': '', });
lyr_Carcamo_17.set('fieldImages', {'id_0': 'TextEdit', 'id': 'Range', 'carcamo': 'TextEdit', 'Estatus': 'TextEdit', 'capacidad': 'TextEdit', 'fuente': 'TextEdit', 'id_pq': 'TextEdit', });
lyr_Ptar_18.set('fieldImages', {'id': 'TextEdit', 'layer': 'TextEdit', 'nom': 'TextEdit', 'Estatus': 'TextEdit', 'zona': 'TextEdit', 'operador': 'TextEdit', 'id_pq': 'TextEdit', 'fuente': 'TextEdit', });




lyr_Tanques_20.set('fieldImages', {'id': 'TextEdit', 'tanque': 'TextEdit', 'nombre1': 'TextEdit', });
lyr_VALVULAS_21.set('fieldImages', {'id': 'TextEdit', 'id_pq': 'TextEdit', 'Estatus': 'TextEdit', 'fuente': 'TextEdit', 'diametro': 'Range', 'CODIGO_VALVULA': 'TextEdit', 'TIPO': 'TextEdit', });
lyr_zones_22.set('fieldImages', {'id': 'TextEdit', 'zone': 'TextEdit', });
lyr_SM_23.set('fieldImages', {'id': 'TextEdit', 'sm': 'TextEdit', 'area': 'TextEdit', 'año': 'TextEdit', 'tanque': 'TextEdit', 'sm_1': 'TextEdit', 'nivel_soci': 'TextEdit', 'vialidades': 'TextEdit', 'infra_estr': 'TextEdit', 'infra_es_1': 'TextEdit', 'cobertura': 'TextEdit', 'cobertur_1': 'TextEdit', 'consumo_pr': 'TextEdit', 'suma_de__p': 'TextEdit', 'factor_de': 'TextEdit', 'carcamo': 'TextEdit', 'fecha': 'TextEdit', });




lyr_pozos_colectores_27.set('fieldImages', {'id': 'TextEdit', 'entity': 'TextEdit', 'layer': 'TextEdit', 'color': 'Range', 'linetype': 'TextEdit', 'elevation': 'TextEdit', 'linewt': 'Range', 'refname': 'TextEdit', 'angle': 'TextEdit', });
lyr_Ptar_28.set('fieldImages', {'id': 'TextEdit', 'ptar': 'TextEdit', 'Estatus': 'TextEdit', 'zona': 'TextEdit', 'operador': 'TextEdit', 'clv': 'TextEdit', 'id_pq': 'TextEdit', 'fuente': 'TextEdit', });
lyr_Zonas_captacion_29.set('fieldImages', {'id': 'TextEdit', 'refname': 'TextEdit', 'zona': 'TextEdit', 'nombre': 'TextEdit', });
lyr_Coberturas_Lineas_30.set('fieldImages', {'fid': 'TextEdit', 'id': 'TextEdit', 'linea': 'TextEdit', 'cuenta_de': 'TextEdit', 'subtotal': 'TextEdit', 'iva': 'TextEdit', 'total': 'TextEdit', 'consumo_m3': 'TextEdit', });
//lyr_Cobertura_Tanques_31.set('fieldImages', {'id_0': 'TextEdit', 'fid_1': 'TextEdit', 'id': 'TextEdit', 'tanque': 'TextEdit', 'cuenta_de': 'TextEdit', 'subtotal': 'TextEdit', 'iva': 'TextEdit', 'total': 'TextEdit', 'consumo_m3': 'TextEdit', });
lyr_Horario_Servicio_BJ_32.set('fieldImages', {'id': 'TextEdit', 'sm': 'TextEdit', 'area': 'TextEdit', 'año': 'TextEdit', 'tanque': 'TextEdit', 'nivel_soci': 'TextEdit', 'vialidades': 'TextEdit', 'infra_estr': 'TextEdit', 'infra_es_1': 'TextEdit', 'cobertura': 'TextEdit', 'cobertur_1': 'TextEdit', 'consumo_pr': 'TextEdit', 'suma_de__p': 'TextEdit', 'factor_de': 'TextEdit', 'carcamo': 'TextEdit', 'fecha': 'TextEdit', 'objectid': 'Range', 'cárcamo': 'TextEdit', 'cárcamo_a': 'TextEdit', 'sector': 'TextEdit', 'sm_o_regi': 'TextEdit', 'observacio': 'TextEdit', 'presión_m': 'TextEdit', 'hrs_de_ser': 'TextEdit', 'horario_1_': 'TextEdit', 'horario_11': 'TextEdit', 'horario_2_': 'TextEdit', 'horario_21': 'TextEdit', 'presión_a': 'TextEdit', });
lyr_Tanques_34.set('fieldImages', { 'tanques': 'TextEdit', 'Estatus': 'TextEdit', 'capacidad': 'TextEdit', 'cvl_predio': 'TextEdit', 'fuente': 'TextEdit', 'id_pq': 'TextEdit', 'dem_n_5': 'TextEdit', 'clave_n1_4': 'TextEdit', });
lyr_pozos_captacion_35.set('fieldImages', {'id': 'TextEdit', 'zona': 'TextEdit', 'num': 'TextEdit', 'Estatus': 'TextEdit', 'comentario': 'TextEdit', 'id_pq': 'TextEdit', 'fuente': 'TextEdit', });
lyr_Emisor_colector_37.set('fieldImages', {'id': 'TextEdit', 'id_pq': 'TextEdit', 'concepto': 'TextEdit', 'diametro': 'TextEdit', 'Estatus': 'TextEdit', 'long_1': 'TextEdit', 'fuente': 'TextEdit', 'tipo': 'TextEdit', });
lyr_Ptar_39.set('fieldImages', {'id': 'TextEdit', 'ptar': 'TextEdit', 'Estatus': 'TextEdit', 'operador': 'TextEdit', 'zona': 'TextEdit', 'fuente': 'TextEdit', 'id_pq': 'TextEdit', });
lyr_Conduccion_40.set('fieldImages', {'id': 'TextEdit', 'objectid_1': 'TextEdit', 'layer': 'TextEdit', 'Estatus': 'TextEdit', 'tipo_de_re': 'TextEdit', 'shape_leng': 'TextEdit', 'comentario': 'TextEdit', 'id_pq': 'TextEdit', 'fuente': 'TextEdit', });
lyr_AEP_VANN_VALVULAS_5.set('fieldImages', {'id': 'TextEdit', 'ANCRFR': 'TextEdit', 'COMMANDE': 'TextEdit', 'CONCENTRAT': 'TextEdit', 'COURBE': 'TextEdit', 'DATE_POSE': 'DateTime', 'DATE_VERIF': 'DateTime', 'DEBIT': 'TextEdit', 'DEGRE': 'Range', 'DIAMETRE': 'Range', 'DIVERS1': 'TextEdit', 'DIVERS2': 'TextEdit', 'DIVERS3': 'TextEdit', 'ETAT': 'TextEdit', 'FRICTION': 'TextEdit', 'ID': 'Range', 'ID_CANA': 'Range', 'ID_CHMVAN': 'Range', 'MARQUE': 'TextEdit', 'MATERIAU': 'TextEdit', 'MODELE': 'TextEdit', 'NOM': 'TextEdit', 'NPLAN': 'TextEdit', 'NUMERO': 'TextEdit', 'PCHARGE': 'TextEdit', 'PERTE_GRD': 'TextEdit', 'POS': 'TextEdit', 'PROFONDEUR': 'TextEdit', 'PROF_SOL': 'TextEdit', 'PROJET': 'TextEdit', 'ROTAT': 'TextEdit', 'STOUR': 'TextEdit', 'TYPE_ACP': 'TextEdit', 'TYPE_VAN': 'TextEdit', 'VITESSE': 'TextEdit', 'X': 'TextEdit', 'Y': 'TextEdit', 'ZN': 'TextEdit', 'ZONE_GEO': 'TextEdit', 'LAYERNAME': 'TextEdit', 'DWGNAME': 'TextEdit', 'BLOCKNAME': 'TextEdit', 'DIAMETER': 'TextEdit', });
lyr_Cobertura_PTAR_BJ_0.set('fieldImages', {'id': 'TextEdit', 'Nombre': 'TextEdit', 'Carcamos': 'TextEdit', });
lyr_SM_SOL_1.set('fieldLabels', {'id_0': 'no label', 'id': 'no label', 'sma': 'no label', 'in_med_con': 'no label', 'horas_serv': 'no label', 'surf': 'no label', 'perim': 'no label', 'dwgname': 'no label', 'layername': 'no label', 'droite': 'no label', 'gauche': 'no label', 'haut': 'no label', 'bas': 'no label', });
lyr_Mza_sol_2.set('fieldLabels', {'aep': 'no label', 'ancrfr': 'no label', 'ass': 'no label', 'code': 'no label', 'densite': 'no label', 'horpmp': 'no label', 'id': 'no label', 'nbrhrspmp': 'no label', 'surface': 'no label', 'x1': 'no label', 'x2': 'no label', 'y1': 'no label', 'y2': 'no label', 'zn': 'no label', 'manzana': 'no label', 'supermanza': 'no label', 'localidad': 'no label', 'capaeva': 'no label', 'layername': 'no label', 'dwgname': 'no label', });




lyr_posos_colector_5.set('fieldLabels', {'id': 'no label', 'entity': 'no label', 'layer': 'no label', 'color': 'no label', 'linetype': 'no label', 'elevation': 'no label', 'linewt': 'no label', 'refname': 'no label', 'angle': 'no label', });
lyr_Ptar_6.set('fieldLabels', {'id': 'no label', 'ptar': 'no label', 'Estatus': 'no label', 'zona': 'no label', 'operador': 'no label', 'fuente': 'no label', 'id_pq': 'no label', });
lyr_linea_Chemuyil_7.set('fieldLabels', {'id': 'no label', 'elevation': 'no label', 'refname': 'no label', 'long_m': 'no label', });
lyr_Conduccion_8.set('fieldLabels', {'id': 'no label', 'objectid': 'no label', 'layer': 'no label', 'linetype': 'no label', 'Estatus': 'no label', 'material': 'no label', 'diametro': 'no label', 't_red': 'no label', 'shape_leng': 'no label', 'id_pq': 'no label', 'id_pq_1': 'no label', 'fuente': 'no label', });
lyr_Pozos_captacion_10.set('fieldLabels', {'id': 'no label', 'layer': 'no label', 'Estatus': 'no label', 'id_pq': 'no label', 'fuente': 'no label', 'oper': 'no label', });
lyr_P_Osmosis_11.set('fieldLabels', {'id_0': 'no label', 'id': 'no label', 'Estatus': 'no label', 'id_pq': 'no label', 'fuente': 'no label', 'nombre': 'no label', });
lyr_Poligono_Actuacion_12.set('fieldLabels', {'id': 'no label', 'pol': 'no label', 'area': 'no label', 'mpio': 'no label', 'localidad': 'no label', });
lyr_Sectores_PM_13.set('fieldLabels', {'id': 'no label', 'MUNICIPIO': 'no label', 'SECTORES': 'no label', 'area': 'no label', });
lyr_SM_Puerto_Morelos_14.set('fieldLabels', {'id': 'no label', 'municipio': 'no label', 'localidad': 'no label', 'zona': 'no label', 'sm': 'no label', 'total MZA': 'no label', });
lyr_Manzanas_PuertoMorelos_15.set('fieldLabels', {'id_0': 'no label', 'aep': 'no label', 'ancrfr': 'no label', 'ass': 'no label', 'code': 'no label', 'densite': 'no label', 'horpmp': 'no label', 'id': 'no label', 'nbrhrspmp': 'no label', 'surface': 'no label', 'x1': 'no label', 'x2': 'no label', 'y1': 'no label', 'y2': 'no label', 'zn': 'no label', 'manzana': 'no label', 'supermanza': 'no label', 'localidad': 'no label', 'capaeva': 'no label', 'layername': 'no label', 'dwgname': 'no label', });
lyr_Emisor_Colector_16.set('fieldLabels', {'id': 'no label', 'layer': 'no label', 'Estatus': 'no label', 'jerarquia': 'no label', 'diam': 'no label', 'material': 'no label', 'long': 'no label', 'id_pq': 'no label', 'fuente': 'no label', });
lyr_Carcamo_17.set('fieldLabels', {'id_0': 'no label', 'id': 'no label', 'carcamo': 'no label', 'Estatus': 'no label', 'capacidad': 'no label', 'fuente': 'no label', 'id_pq': 'no label', });
lyr_Ptar_18.set('fieldLabels', {'id': 'no label', 'layer': 'no label', 'nom': 'no label', 'Estatus': 'no label', 'zona': 'no label', 'operador': 'no label', 'id_pq': 'no label', 'fuente': 'no label', });



lyr_Tanques_20.set('fieldLabels', {'id': 'no label', 'tanque': 'no label', 'nombre1': 'no label', });
lyr_VALVULAS_21.set('fieldLabels', {'id': 'no label', 'id_pq': 'no label', 'Estatus': 'no label', 'fuente': 'no label', 'diametro': 'no label', 'CODIGO_VALVULA': 'no label', 'TIPO': 'no label', });
lyr_zones_22.set('fieldLabels', {'id': 'no label', 'zone': 'no label', });
lyr_SM_23.set('fieldLabels', {'id': 'no label', 'sm': 'no label', 'area': 'no label', 'año': 'no label', 'tanque': 'no label', 'sm_1': 'no label', 'nivel_soci': 'no label', 'vialidades': 'no label', 'infra_estr': 'no label', 'infra_es_1': 'no label', 'cobertura': 'no label', 'cobertur_1': 'no label', 'consumo_pr': 'no label', 'suma_de__p': 'no label', 'factor_de': 'no label', 'carcamo': 'no label', 'fecha': 'no label', });


lyr_Emisores_26.set('fieldAliases', {'id': 'id', 'layer': 'layer', 'Estatus': 'Estatus', 'jerarquia': 'jerarquia', 'tipo_de_im': 'tipo_de_im', 'dia': 'dia', 'material': 'material', 'long': 'long', 'zona': 'zona', 'nom_lin': 'nom_lin', 'id_pq': 'id_pq', 'fuente': 'fuente', });
lyr_Emisores_26.set('fieldImages', {'id': 'TextEdit', 'layer': 'TextEdit', 'Estatus': 'TextEdit', 'jerarquia': 'TextEdit', 'tipo_de_im': 'TextEdit', 'dia': 'TextEdit', 'material': 'TextEdit', 'long': 'TextEdit', 'zona': 'TextEdit', 'nom_lin': 'TextEdit', 'id_pq': 'TextEdit', 'fuente': 'TextEdit', });
lyr_Emisores_26.set('fieldLabels', {'id': 'no label', 'layer': 'no label', 'Estatus': 'no label', 'jerarquia': 'no label', 'tipo_de_im': 'no label', 'dia': 'no label', 'material': 'no label', 'long': 'no label', 'zona': 'no label', 'nom_lin': 'no label', 'id_pq': 'no label', 'fuente': 'no label', });


lyr_colectores_26.set('fieldAliases', {'id': 'id', 'layer': 'layer', 'Estatus': 'Estatus', 'jerarquia': 'jerarquia', 'tipo_de_im': 'tipo_de_im', 'dia': 'dia', 'material': 'material', 'long': 'long', 'zona': 'zona', 'nom_lin': 'nom_lin', 'id_pq': 'id_pq', 'fuente': 'fuente', });
lyr_colectores_26.set('fieldImages', {'id': 'TextEdit', 'layer': 'TextEdit', 'Estatus': 'TextEdit', 'jerarquia': 'TextEdit', 'tipo_de_im': 'TextEdit', 'dia': 'TextEdit', 'material': 'TextEdit', 'long': 'TextEdit', 'zona': 'TextEdit', 'nom_lin': 'TextEdit', 'id_pq': 'TextEdit', 'fuente': 'TextEdit', });
lyr_colectores_26.set('fieldLabels', {'id': 'no label', 'layer': 'no label', 'Estatus': 'no label', 'jerarquia': 'no label', 'tipo_de_im': 'no label', 'dia': 'no label', 'material': 'no label', 'long': 'no label', 'zona': 'no label', 'nom_lin': 'no label', 'id_pq': 'no label', 'fuente': 'no label', });







lyr_pozos_colectores_27.set('fieldLabels', {'id': 'no label', 'entity': 'no label', 'layer': 'no label', 'color': 'no label', 'linetype': 'no label', 'elevation': 'no label', 'linewt': 'no label', 'refname': 'no label', 'angle': 'no label', });
lyr_Ptar_28.set('fieldLabels', {'id': 'no label', 'ptar': 'no label', 'Estatus': 'no label', 'zona': 'no label', 'operador': 'no label', 'clv': 'no label', 'id_pq': 'no label', 'fuente': 'no label', });
lyr_Zonas_captacion_29.set('fieldLabels', {'id': 'no label', 'refname': 'no label', 'zona': 'no label', 'nombre': 'no label', });
lyr_Coberturas_Lineas_30.set('fieldLabels', {'fid': 'no label', 'id': 'inline label - visible with data', 'linea': 'inline label - visible with data', 'cuenta_de': 'inline label - visible with data', 'subtotal': 'inline label - visible with data', 'iva': 'inline label - visible with data', 'total': 'inline label - visible with data', 'consumo_m3': 'inline label - visible with data', });
//lyr_Cobertura_Tanques_31.set('fieldLabels', {'id_0': 'inline label - visible with data', 'fid_1': 'no label', 'id': 'no label', 'tanque': 'inline label - visible with data', 'cuenta_de': 'inline label - visible with data', 'subtotal': 'inline label - visible with data', 'iva': 'inline label - visible with data', 'total': 'inline label - visible with data', 'consumo_m3': 'inline label - visible with data', });
lyr_Horario_Servicio_BJ_32.set('fieldLabels', {'id': 'no label', 'sm': 'no label', 'area': 'no label', 'año': 'no label', 'tanque': 'no label', 'nivel_soci': 'no label', 'vialidades': 'no label', 'infra_estr': 'no label', 'infra_es_1': 'no label', 'cobertura': 'no label', 'cobertur_1': 'no label', 'consumo_pr': 'no label', 'suma_de__p': 'no label', 'factor_de': 'no label', 'carcamo': 'no label', 'fecha': 'no label', 'objectid': 'no label', 'cárcamo': 'no label', 'cárcamo_a': 'no label', 'sector': 'no label', 'sm_o_regi': 'no label', 'observacio': 'no label', 'presión_m': 'no label', 'hrs_de_ser': 'no label', 'horario_1_': 'no label', 'horario_11': 'no label', 'horario_2_': 'no label', 'horario_21': 'no label', 'presión_a': 'no label', });
lyr_Tanques_34.set('fieldLabels', { 'tanques': 'inline label - visible with data', 'Estatus': 'inline label - visible with data', 'capacidad': 'inline label - visible with data', 'cvl_predio': 'no label', 'fuente': 'inline label - visible with data', 'id_pq': 'no label', 'dem_n_5': 'inline label - visible with data', 'clave_n1_4': 'inline label - visible with data', });
lyr_pozos_captacion_35.set('fieldLabels', {'id': 'no label', 'zona': 'no label', 'num': 'no label', 'Estatus': 'no label', 'comentario': 'no label', 'id_pq': 'no label', 'fuente': 'no label', });
lyr_Emisor_colector_37.set('fieldLabels', {'id': 'no label', 'id_pq': 'no label', 'concepto': 'no label', 'diametro': 'no label', 'Estatus': 'no label', 'long_1': 'no label', 'fuente': 'no label', 'tipo': 'no label', });
lyr_Ptar_39.set('fieldLabels', {'id': 'no label', 'ptar': 'no label', 'Estatus': 'no label', 'operador': 'no label', 'zona': 'no label', 'fuente': 'no label', 'id_pq': 'no label', });
lyr_Conduccion_40.set('fieldLabels', {'id': 'no label', 'objectid_1': 'no label', 'layer': 'no label', 'Estatus': 'no label', 'tipo_de_re': 'no label', 'shape_leng': 'no label', 'comentario': 'no label', 'id_pq': 'no label', 'fuente': 'no label', });
lyr_AEP_VANN_VALVULAS_5.set('fieldLabels', {'id': 'no label', 'ANCRFR': 'no label', 'COMMANDE': 'no label', 'CONCENTRAT': 'no label', 'COURBE': 'no label', 'DATE_POSE': 'no label', 'DATE_VERIF': 'no label', 'DEBIT': 'no label', 'DEGRE': 'no label', 'DIAMETRE': 'no label', 'DIVERS1': 'no label', 'DIVERS2': 'no label', 'DIVERS3': 'no label', 'ETAT': 'no label', 'FRICTION': 'no label', 'ID': 'no label', 'ID_CANA': 'no label', 'ID_CHMVAN': 'no label', 'MARQUE': 'no label', 'MATERIAU': 'no label', 'MODELE': 'no label', 'NOM': 'no label', 'NPLAN': 'no label', 'NUMERO': 'no label', 'PCHARGE': 'no label', 'PERTE_GRD': 'no label', 'POS': 'no label', 'PROFONDEUR': 'no label', 'PROF_SOL': 'no label', 'PROJET': 'no label', 'ROTAT': 'no label', 'STOUR': 'no label', 'TYPE_ACP': 'no label', 'TYPE_VAN': 'no label', 'VITESSE': 'no label', 'X': 'no label', 'Y': 'no label', 'ZN': 'no label', 'ZONE_GEO': 'no label', 'LAYERNAME': 'no label', 'DWGNAME': 'no label', 'BLOCKNAME': 'no label', 'DIAMETER': 'no label', });
lyr_Cobertura_PTAR_BJ_0.set('fieldLabels', {'id': 'inline label - visible with data', 'Nombre': 'inline label - visible with data', 'Carcamos': 'inline label - visible with data', });
lyr_Carcamos_3.set('fieldAliases', {'id': 'id', 'carcamo': 'carcamo', 'Estatus': 'Estatus', 'capacidad': 'capacidad', 'id_pq': 'id_pq', 'concepto': 'concepto', 'fuente': 'fuente', 'Dem_N_5': 'Dem_N_5', 'Clave_N1_4': 'Clave_N1_4', });
lyr_Carcamos_3.set('fieldImages', {'id': 'TextEdit', 'carcamo': 'TextEdit', 'Estatus': 'TextEdit', 'capacidad': 'TextEdit', 'id_pq': 'TextEdit', 'concepto': 'TextEdit', 'fuente': 'TextEdit', 'Dem_N_5': 'TextEdit', 'Clave_N1_4': 'TextEdit', });
lyr_Carcamos_3.set('fieldLabels', {'id': 'inline label - visible with data', 'carcamo': 'inline label - visible with data', 'Estatus': 'inline label - visible with data', 'capacidad': 'inline label - visible with data', 'id_pq': 'inline label - visible with data', 'concepto': 'inline label - visible with data', 'fuente': 'inline label - visible with data', 'Dem_N_5': 'inline label - visible with data', 'Clave_N1_4': 'inline label - visible with data', });
lyr_Tanques_9.set('fieldAliases', {'id': 'id', 'property1': 'property1', 'Estatus': 'Estatus', 'nombre1': 'nombre1', 'nombre2': 'nombre2', 'id_pq': 'id_pq', 'fuente': 'fuente', 'Dem_N_5': 'Dem_N_5', 'Clave_N1_4': 'Clave_N1_4', });
lyr_Tanques_9.set('fieldImages', {'id': 'TextEdit', 'property1': 'TextEdit', 'Estatus': 'TextEdit', 'nombre1': 'TextEdit', 'nombre2': 'TextEdit', 'id_pq': 'TextEdit', 'fuente': 'TextEdit', 'Dem_N_5': 'TextEdit', 'Clave_N1_4': '', });
lyr_Tanques_9.set('fieldLabels', {'id': 'inline label - visible with data', 'property1': 'inline label - visible with data', 'Estatus': 'inline label - visible with data', 'nombre1': 'inline label - visible with data', 'nombre2': 'inline label - visible with data', 'id_pq': 'inline label - visible with data', 'fuente': 'inline label - visible with data', 'Dem_N_5': 'inline label - visible with data', 'Clave_N1_4': 'inline label - visible with data', });
lyr_Carcamos_25.set('fieldAliases', {'id': 'id', 'carcamo': 'carcamo', 'Estatus': 'Estatus', 'capacidad': 'capacidad', 'convenio': 'convenio', 'cvl_predio': 'cvl_predio', 'fuente': 'fuente', 'id_pq': 'id_pq', 'Den_N_5': 'Den_N_5', 'ClaveN1_4': 'ClaveN1_4', });
lyr_Carcamos_25.set('fieldImages', {'id': 'TextEdit', 'carcamo': 'TextEdit', 'Estatus': 'TextEdit', 'capacidad': 'TextEdit', 'convenio': 'TextEdit', 'cvl_predio': 'TextEdit', 'fuente': 'TextEdit', 'id_pq': 'TextEdit', 'Den_N_5': '', 'ClaveN1_4': '', });
lyr_Carcamos_25.set('fieldLabels', {'id': 'inline label - visible with data', 'carcamo': 'inline label - visible with data', 'Estatus': 'inline label - visible with data', 'capacidad': 'inline label - visible with data', 'convenio': 'inline label - visible with data', 'cvl_predio': 'inline label - visible with data', 'fuente': 'inline label - visible with data', 'id_pq': 'inline label - visible with data', 'Den_N_5': 'inline label - visible with data', 'ClaveN1_4': 'inline label - visible with data', });
lyr_Carcamos_38.set('fieldAliases', {'id': 'id', 'carcamo': 'carcamo', 'Estatus': 'Estatus', 'capacidad': 'capacidad', 'id_pq': 'id_pq', 'fuente': 'fuente', 'Dem_N_5': 'Dem_N_5', 'Clave_N1_4': 'Clave_N1_4', });
lyr_Carcamos_38.set('fieldImages', {'id': 'TextEdit', 'carcamo': 'TextEdit', 'Estatus': 'TextEdit', 'capacidad': 'TextEdit', 'id_pq': 'TextEdit', 'fuente': 'TextEdit', 'Dem_N_5': 'TextEdit', 'Clave_N1_4': 'TextEdit', });
lyr_Carcamos_38.set('fieldLabels', {'id': 'inline label - visible with data', 'carcamo': 'inline label - visible with data', 'Estatus': 'inline label - visible with data', 'capacidad': 'inline label - visible with data', 'id_pq': 'inline label - visible with data', 'fuente': 'inline label - visible with data', 'Dem_N_5': 'inline label - visible with data', 'Clave_N1_4': 'inline label - visible with data', });
lyr_Conduccion_BJ_copy_1.set('fieldAliases', {'Layer': 'Layer', 'Estatus': 'Estatus', 'Tipo_de_Re': 'Tipo_de_Re', 'Material': 'Material', 'E_PEP': 'E_PEP', 'FUENTE': 'FUENTE', 'Prof': 'Prof', 'Revision': 'Revision', 'Topo': 'Topo', 'TYCANA': 'TYCANA', 'LAYERNAME': 'LAYERNAME', 'MATERIAU': 'MATERIAU', 'DIAMETRE': 'DIAMETRE', });
//'id': 'id','OBJECTID': 'OBJECTID',
lyr_Conduccion_BJ_copy_1.set('fieldImages', {'Layer': 'TextEdit', 'Estatus': 'TextEdit', 'Tipo_de_Re': 'TextEdit', 'Material': 'TextEdit', 'E_PEP': 'TextEdit', 'FUENTE': 'TextEdit', 'Prof': 'TextEdit', 'Revision': 'DateTime', 'Topo': 'TextEdit', 'TYCANA': 'TextEdit', 'LAYERNAME': 'TextEdit', 'MATERIAU': 'TextEdit', 'DIAMETRE': 'TextEdit', });
//'id': 'TextEdit','OBJECTID': 'TextEdit',
lyr_Conduccion_BJ_copy_1.set('fieldLabels', {'Layer': 'inline label - visible with data', 'Estatus': 'inline label - visible with data', 'Tipo_de_Re': 'inline label - visible with data', 'Material': 'inline label - visible with data', 'E_PEP': 'no label', 'FUENTE': 'no label', 'Prof': 'no label', 'Revision': 'no label', 'Topo': 'no label', 'TYCANA': 'no label', 'LAYERNAME': 'no label', 'MATERIAU': 'no label', 'DIAMETRE': 'no label', });
//'id': 'inline label - visible with data','OBJECTID': 'no label',



lyr_Tanques_41.set('fieldAliases', {'id_0': 'id_0', 'id': 'id', 'tanque': 'tanque', 'Estatus': 'Estatus', 'capacidad': 'capacidad', 'comentario': 'comentario', 'id_pq': 'id_pq', 'fuente': 'fuente', 'dem_n_5': 'dem_n_5', 'nomenclatu': 'nomenclatu', });
lyr_Tanques_41.set('fieldImages', {'id_0': 'TextEdit', 'id': 'TextEdit', 'tanque': 'TextEdit', 'Estatus': 'TextEdit', 'capacidad': 'TextEdit', 'comentario': 'TextEdit', 'id_pq': 'TextEdit', 'fuente': 'TextEdit', 'dem_n_5': 'TextEdit', 'nomenclatu': 'TextEdit', });
lyr_Tanques_41.set('fieldLabels', {'id_0': 'inline label - visible with data', 'id': 'inline label - visible with data', 'tanque': 'inline label - visible with data', 'Estatus': 'inline label - visible with data', 'capacidad': 'inline label - visible with data', 'comentario': 'inline label - visible with data', 'id_pq': 'inline label - visible with data', 'fuente': 'inline label - visible with data', 'dem_n_5': 'inline label - visible with data', 'nomenclatu': 'inline label - visible with data', });
lyr_Tanques_41.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});

//}