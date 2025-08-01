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
                        interactive: true,'opacity':0.50000,
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
        





var lyr_tuberia_0 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "https://dhcqgis.aguakan.com/geoserver/wms",
    attributions: ' ',
                              params: {
                                "LAYERS": "DHC_AGUAKAN:AEP_CANA_AP",
                                "TILED": "true",
                                "VERSION": "1.3.0",
                                "CQL_FILTER": "Tipo_de_Re='Distribucion' and Municipio='Benito Juarez'",
                            },
                            })),
                            title: "Distribicion",
                            opacity: 1.000000,
                           serverType:"geoserver",
                            
                          });

var lyr_Tuberia_ASS_0 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "https://dhcqgis.aguakan.com/geoserver/wms",
    attributions: ' ',
                              params: {
                                "LAYERS": "	DHC_AGUAKAN:Ass_cana",
                                "TILED": "true",
                                "VERSION": "1.3.0",
                                "CQL_FILTER":"Municipio='Benito Juarez'",
                            },
                            })),
                            title: "Red Secundaria",
                            opacity: 1.000000,
                            
                            
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


              var lyr_Clientes_BJ_33 = new ol.layer.Tile({
                source: new ol.source.TileWMS(({
                  url: "https://dhcqgis.aguakan.com/geoserver/wms",
attributions: ' ',
                  params: {
                    "LAYERS": "DHC_AGUAKAN:PM_BJ",
                    "TILED": "true",
                    "VERSION": "1.3.0"},
                })),
                title: "Clientes_BJ",
                opacity: 1.000000,
                
                
              });
  wms_layers.push([lyr_Clientes_BJ_33, 0]);


  var lyr_Clientes_Sol_01 = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
      url: "https://dhcqgis.aguakan.com/geoserver/wms",
attributions: ' ',
      params: {
        "LAYERS": "DHC_AGUAKAN:Clientes_Sol",
        "TILED": "true",
        "VERSION": "1.3.0"},
    })),
    title: "Clientes_Sol",
    opacity: 1.000000,
    
    
  });
wms_layers.push([lyr_Clientes_Sol_01, 0]);



var format_Agua_Superficial_2012_2013_1 = new ol.format.GeoJSON();
var features_Agua_Superficial_2012_2013_1 = format_Agua_Superficial_2012_2013_1.readFeatures(json_Agua_Superficial_2012_2013_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Agua_Superficial_2012_2013_1 = new ol.source.Vector({
    attributions: ' &middot; <a href="https://www.gob.mx/conagua/es/articulos/indicadores-de-calidad-del-agua?idiom=es">CONAGUA </a>',
});
jsonSource_Agua_Superficial_2012_2013_1.addFeatures(features_Agua_Superficial_2012_2013_1);
var lyr_Agua_Superficial_2012_2013_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Agua_Superficial_2012_2013_1, 
                style: style_Agua_Superficial_2012_2013_1,
                popuplayertitle: "Agua_Superficial_2012_2023_CALIDAD",
                interactive: true,
    title: 'Agua_Superficial_2012_2023_SEMAFORO<br />\
    <img src="styles/legend/Agua_Superficial_2012_2013_1_0.png" /> Amarillo<br />\
    <img src="styles/legend/Agua_Superficial_2012_2013_1_1.png" /> Rojo<br />\
    <img src="styles/legend/Agua_Superficial_2012_2013_1_2.png" /> Verde<br />'
        });
var format_Calidad_delagua_Subterranea_122023_2 = new ol.format.GeoJSON();
var features_Calidad_delagua_Subterranea_122023_2 = format_Calidad_delagua_Subterranea_122023_2.readFeatures(json_Calidad_delagua_Subterranea_122023_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Calidad_delagua_Subterranea_122023_2 = new ol.source.Vector({
    attributions: ' &middot; <a href="https://www.gob.mx/conagua/es/articulos/indicadores-de-calidad-del-agua?idiom=es">CONAGUA </a>',
});
jsonSource_Calidad_delagua_Subterranea_122023_2.addFeatures(features_Calidad_delagua_Subterranea_122023_2);
var lyr_Calidad_delagua_Subterranea_122023_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Calidad_delagua_Subterranea_122023_2, 
                style: style_Calidad_delagua_Subterranea_122023_2,
                popuplayertitle: "Calidad_del agua_Subterranea_2012-2023",
                interactive: true,
    title: 'Calidad_del agua_Subterranea_12-2023_CALIDAD<br />\
    <img src="styles/legend/Calidad_delagua_Subterranea_122023_2_0.png" /> Amarillo<br />\
    <img src="styles/legend/Calidad_delagua_Subterranea_122023_2_1.png" /> Rojo<br />\
    <img src="styles/legend/Calidad_delagua_Subterranea_122023_2_2.png" /> Verde<br />'
        });









var format_BN_1 = new ol.format.GeoJSON();
var features_BN_1 = format_BN_1.readFeatures(json_BN_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_BN_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_BN_1.addFeatures(features_BN_1);
var lyr_BN_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_BN_1, 
                style: style_BN_1,
                popuplayertitle: "BN-EGM08",
                interactive: true,
    title: 'BN<br />\
    <img src="styles/legend/BN_1_0.png" /> CANCUN<br />\
    <img src="styles/legend/BN_1_1.png" /> ISLA MUJERES<br />\
    <img src="styles/legend/BN_1_2.png" /> PLAYA DEL CARMEN<br />\
    <img src="styles/legend/BN_1_3.png" /> PUERTO AVENTURAS<br />\
    <img src="styles/legend/BN_1_4.png" /> PUERTO MORELOS<br />'
        });

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
                interactive: true,
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
                interactive: true,
                title: '<img src="styles/legend/Mza_sol_2.png" /> Mza_sol'
            });
var format_Carcamos_3 = new ol.format.GeoJSON();
var features_Carcamos_3 = format_Carcamos_3.readFeatures(json_Carcamos_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Carcamos_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Carcamos_3.addFeatures(features_Carcamos_3);
var lyr_Carcamos_3 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Carcamos_3, 
                style: style_Carcamos_3,
                popuplayertitle: "Carcamos",
                interactive: true,
				
                title: '<img src="styles/legend/Carcamos_3.png" /> Carcamos'
            });
var format_Emisor_Colector_4 = new ol.format.GeoJSON();
var features_Emisor_Colector_4 = format_Emisor_Colector_4.readFeatures(json_Emisor_Colector_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Emisor_Colector_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Emisor_Colector_4.addFeatures(features_Emisor_Colector_4);
var lyr_Emisor_Colector_4 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Emisor_Colector_4, 
                style: style_Emisor_Colector_4,
                popuplayertitle: "Emisor_Colector",
                interactive: true,
                title: '<img src="styles/legend/Emisor_Colector_4.png" /> Emisor_Colector'
            });
var format_posos_colector_5 = new ol.format.GeoJSON();
var features_posos_colector_5 = format_posos_colector_5.readFeatures(json_posos_colector_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_posos_colector_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_posos_colector_5.addFeatures(features_posos_colector_5);
var lyr_posos_colector_5 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_posos_colector_5, 
                style: style_posos_colector_5,
                popuplayertitle: "posos_colector",
                interactive: true,
                title: '<img src="styles/legend/posos_colector_5.png" /> posos_colector'
            });
var format_Ptar_6 = new ol.format.GeoJSON();
var features_Ptar_6 = format_Ptar_6.readFeatures(json_Ptar_6, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Ptar_6 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Ptar_6.addFeatures(features_Ptar_6);
var lyr_Ptar_6 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Ptar_6, 
                style: style_Ptar_6,
                popuplayertitle: "Ptar",
                interactive: true,
                title: '<img src="styles/legend/Ptar_6.png" /> Ptar'
            });
var format_linea_Chemuyil_7 = new ol.format.GeoJSON();
var features_linea_Chemuyil_7 = format_linea_Chemuyil_7.readFeatures(json_linea_Chemuyil_7, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_linea_Chemuyil_7 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_linea_Chemuyil_7.addFeatures(features_linea_Chemuyil_7);
var lyr_linea_Chemuyil_7 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_linea_Chemuyil_7, 
                style: style_linea_Chemuyil_7,
                popuplayertitle: "linea_Chemuyil",
                interactive: true,
                title: '<img src="styles/legend/linea_Chemuyil_7.png" /> linea_Chemuyil'
            });
var format_Conduccion_8 = new ol.format.GeoJSON();
var features_Conduccion_8 = format_Conduccion_8.readFeatures(json_Conduccion_8, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Conduccion_8 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Conduccion_8.addFeatures(features_Conduccion_8);
var lyr_Conduccion_8 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Conduccion_8, 
                style: style_Conduccion_8,
                popuplayertitle: "Conduccion",
                interactive: true,
    title: 'Conduccion<br />\
    <img src="styles/legend/Conduccion_8_0.png" /> EXISTENTE<br />\
    <img src="styles/legend/Conduccion_8_1.png" /> Q2023-2027<br />'
        });
var format_Tanques_9 = new ol.format.GeoJSON();
var features_Tanques_9 = format_Tanques_9.readFeatures(json_Tanques_9, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Tanques_9 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Tanques_9.addFeatures(features_Tanques_9);
var lyr_Tanques_9 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Tanques_9, 
                style: style_Tanques_9,
                popuplayertitle: "Tanques",
                interactive: true,
    title: 'Tanques<br />\
    <img src="styles/legend/Tanques_9_0.png" /> EXISTENTE<br />\
    <img src="styles/legend/Tanques_9_1.png" /> Q2023-2027<br />'
        });
var format_Pozos_captacion_10 = new ol.format.GeoJSON();
var features_Pozos_captacion_10 = format_Pozos_captacion_10.readFeatures(json_Pozos_captacion_10, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Pozos_captacion_10 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Pozos_captacion_10.addFeatures(features_Pozos_captacion_10);
var lyr_Pozos_captacion_10 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Pozos_captacion_10, 
                style: style_Pozos_captacion_10,
                popuplayertitle: "Pozos_captacion",
                interactive: true,
    title: 'Pozos_captacion<br />\
    <img src="styles/legend/Pozos_captacion_10_0.png" /> EXISTENTE<br />\
    <img src="styles/legend/Pozos_captacion_10_1.png" /> Q2023-2027<br />'
        });
var format_P_Osmosis_11 = new ol.format.GeoJSON();
var features_P_Osmosis_11 = format_P_Osmosis_11.readFeatures(json_P_Osmosis_11, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_P_Osmosis_11 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_P_Osmosis_11.addFeatures(features_P_Osmosis_11);
var lyr_P_Osmosis_11 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_P_Osmosis_11, 
                style: style_P_Osmosis_11,
                popuplayertitle: "P_Osmosis",
                interactive: true,
                title: '<img src="styles/legend/P_Osmosis_11.png" /> P_Osmosis'
            });
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
                interactive: true,
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
                interactive: true,
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
                interactive: true,
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
                interactive: true,
                title: '<img src="styles/legend/Manzanas_PuertoMorelos_15.png" /> Manzanas_Puerto Morelos'
            });
var format_Emisor_Colector_16 = new ol.format.GeoJSON();
var features_Emisor_Colector_16 = format_Emisor_Colector_16.readFeatures(json_Emisor_Colector_16, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Emisor_Colector_16 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Emisor_Colector_16.addFeatures(features_Emisor_Colector_16);
var lyr_Emisor_Colector_16 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Emisor_Colector_16, 
                style: style_Emisor_Colector_16,
                popuplayertitle: "Emisor_Colector",
                interactive: true,
                title: '<img src="styles/legend/Emisor_Colector_16.png" /> Emisor_Colector'
            });
var format_Carcamo_17 = new ol.format.GeoJSON();
var features_Carcamo_17 = format_Carcamo_17.readFeatures(json_Carcamo_17, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Carcamo_17 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Carcamo_17.addFeatures(features_Carcamo_17);
var lyr_Carcamo_17 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Carcamo_17, 
                style: style_Carcamo_17,
                popuplayertitle: "Carcamo",
                interactive: true,
                title: '<img src="styles/legend/Carcamo_17.png" /> Carcamo'
            });
var format_Ptar_18 = new ol.format.GeoJSON();
var features_Ptar_18 = format_Ptar_18.readFeatures(json_Ptar_18, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Ptar_18 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Ptar_18.addFeatures(features_Ptar_18);
var lyr_Ptar_18 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Ptar_18, 
                style: style_Ptar_18,
                popuplayertitle: "Ptar",
                interactive: true,
    title: 'Ptar<br />\
    <img src="styles/legend/Ptar_18_0.png" /> AGUAKAN<br />\
    <img src="styles/legend/Ptar_18_1.png" /> DESARROLLADOR<br />'
        });
var format_Conduccion_Distribucion_19 = new ol.format.GeoJSON();
var features_Conduccion_Distribucion_19 = format_Conduccion_Distribucion_19.readFeatures(json_Conduccion_Distribucion_19, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Conduccion_Distribucion_19 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Conduccion_Distribucion_19.addFeatures(features_Conduccion_Distribucion_19);
var lyr_Conduccion_Distribucion_19 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Conduccion_Distribucion_19, 
                style: style_Conduccion_Distribucion_19,
                popuplayertitle: "Conduccion_Distribucion",
                interactive: true,
                title: '<img src="styles/legend/Conduccion_Distribucion_19.png" /> Conduccion_Distribucion'
            });
var format_Tanques_20 = new ol.format.GeoJSON();
var features_Tanques_20 = format_Tanques_20.readFeatures(json_Tanques_20, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Tanques_20 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Tanques_20.addFeatures(features_Tanques_20);
var lyr_Tanques_20 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Tanques_20, 
                style: style_Tanques_20,
                popuplayertitle: "Tanques",
                interactive: true,
                title: '<img src="styles/legend/Tanques_20.png" /> Tanques'
            });
var format_VALVULAS_21 = new ol.format.GeoJSON();
var features_VALVULAS_21 = format_VALVULAS_21.readFeatures(json_VALVULAS_21, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_VALVULAS_21 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_VALVULAS_21.addFeatures(features_VALVULAS_21);
var lyr_VALVULAS_21 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_VALVULAS_21, 
                style: style_VALVULAS_21,
                popuplayertitle: "VALVULAS",
                interactive: true,
                title: '<img src="styles/legend/VALVULAS_21.png" /> VALVULAS'
            });
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
                interactive: true,'opacity':0.50000,
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
var format_SM_23 = new ol.format.GeoJSON();
var features_SM_23 = format_SM_23.readFeatures(json_SM_23, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_SM_23 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_SM_23.addFeatures(features_SM_23);
var lyr_SM_23 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_SM_23,
maxResolution:28.00446615226196,
 
                style: style_SM_23,
                popuplayertitle: "SM",
                interactive: true,
                title: '<img src="styles/legend/SM_23.png" /> SM'
            });
			
			

			
			
var format_Carcamos_25 = new ol.format.GeoJSON();
var features_Carcamos_25 = format_Carcamos_25.readFeatures(json_Carcamos_25, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Carcamos_25 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Carcamos_25.addFeatures(features_Carcamos_25);
var lyr_Carcamos_25 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Carcamos_25, 
                style: style_Carcamos_25,
                popuplayertitle: "Carcamos",
                interactive: true,
                title: '<img src="styles/legend/Carcamos_25.png" /> Carcamos'
            });
var format_Emisores_colectores_26 = new ol.format.GeoJSON();
var features_Emisores_colectores_26 = format_Emisores_colectores_26.readFeatures(json_Emisores_colectores_26, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Emisores_colectores_26 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Emisores_colectores_26.addFeatures(features_Emisores_colectores_26);
var lyr_Emisores_colectores_26 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Emisores_colectores_26, 
                style: style_Emisores_colectores_26,
                popuplayertitle: "Emisores_colectores",
                interactive: true,
    title: 'Emisores_colectores<br />\
    <img src="styles/legend/Emisores_colectores_26_0.png" /> Colector<br />\
    <img src="styles/legend/Emisores_colectores_26_1.png" /> EMISOR<br />'
        });
var format_pozos_colectores_27 = new ol.format.GeoJSON();
var features_pozos_colectores_27 = format_pozos_colectores_27.readFeatures(json_pozos_colectores_27, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_pozos_colectores_27 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_pozos_colectores_27.addFeatures(features_pozos_colectores_27);
var lyr_pozos_colectores_27 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_pozos_colectores_27, 
                style: style_pozos_colectores_27,
                popuplayertitle: "pozos_colectores",
                interactive: true,
                title: '<img src="styles/legend/pozos_colectores_27.png" /> pozos_colectores'
            });
			
			
			
var format_Ptar_28 = new ol.format.GeoJSON();
var features_Ptar_28 = format_Ptar_28.readFeatures(json_Ptar_28, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Ptar_28 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Ptar_28.addFeatures(features_Ptar_28);
var lyr_Ptar_28 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Ptar_28, 
                style: style_Ptar_28,
                popuplayertitle: "Ptar",
                interactive: true,
    title: 'Ptar<br />\
    <img src="styles/legend/Ptar_28_0.png" /> CONSTRUCCION<br />\
    <img src="styles/legend/Ptar_28_1.png" /> EXISTENTE<br />\
    <img src="styles/legend/Ptar_28_2.png" /> Q2023-2027<br />'
        });


var format_Cobertura_PTAR_BJ_0 = new ol.format.GeoJSON();
var features_Cobertura_PTAR_BJ_0 = format_Cobertura_PTAR_BJ_0.readFeatures(json_Cobertura_PTAR_BJ_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Cobertura_PTAR_BJ_0 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Cobertura_PTAR_BJ_0.addFeatures(features_Cobertura_PTAR_BJ_0);
var lyr_Cobertura_PTAR_BJ_0 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Cobertura_PTAR_BJ_0, 
                style: style_Cobertura_PTAR_BJ_0,
                popuplayertitle: "Cobertura_PTAR_BJ",
                interactive: true,'opacity':0.40000,
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
  
  
  
  
  
  
  

var format_Zonas_captacion_29 = new ol.format.GeoJSON();
var features_Zonas_captacion_29 = format_Zonas_captacion_29.readFeatures(json_Zonas_captacion_29, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Zonas_captacion_29 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Zonas_captacion_29.addFeatures(features_Zonas_captacion_29);
var lyr_Zonas_captacion_29 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Zonas_captacion_29, 
                style: style_Zonas_captacion_29,
                popuplayertitle: "Zonas_captacion",
                interactive: true,
                title: '<img src="styles/legend/Zonas_captacion_29.png" /> Zonas_captacion'
            });


 var jsonSource_Coberturas_Lineas_30 = new ol.source.Vector({
            attributions: ' ',
        });
            
            fetch("https://dhcqgis.aguakan.com/geoserver/wfs?" +
                "service=WFS&version=1.0.0&request=GetFeature&typeName=	DHC_AGUAKAN:Coberturas_Lineas" +
                "&outputFormat=application/json&srsname=EPSG:3857"+
            "&CQL_FILTER=Fecha_Rev='2025/05/28'")
            
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
            style: style_Coberturas_Lineas_30,
            popuplayertitle: "Coberturas_Lineas",
            interactive: false,'opacity':0.50000,
            title: 'Conberturas_Lineas<br />\
            <img src="styles/legend/Conberturas_Lineas_30_0.png" /> 0+000 L6<br />\
            <img src="styles/legend/Conberturas_Lineas_30_1.png" /> 2000 Oriente L40s<br />\
            <img src="styles/legend/Conberturas_Lineas_30_2.png" /> 2000 Portillo L12<br />\
            <img src="styles/legend/Conberturas_Lineas_30_3.png" /> 2000 Portillo L20<br />\
            <img src="styles/legend/Conberturas_Lineas_30_4.png" /> 2000 Portillo L24<br />\
            <img src="styles/legend/Conberturas_Lineas_30_5.png" /> Aeropuerto ZU L36<br />\
            <img src="styles/legend/Conberturas_Lineas_30_6.png" /> Andalucia  L-24 500s<br />\
            <img src="styles/legend/Conberturas_Lineas_30_7.png" /> Andalucia  L24 LSF<br />\
            <img src="styles/legend/Conberturas_Lineas_30_8.png" /> Andalucia L24 LSF<br />\
            <img src="styles/legend/Conberturas_Lineas_30_9.png" /> ARA<br />\
            <img src="styles/legend/Conberturas_Lineas_30_10.png" /> Carcamo 1A<br />\
            <img src="styles/legend/Conberturas_Lineas_30_11.png" /> Carcamo 2<br />\
            <img src="styles/legend/Conberturas_Lineas_30_12.png" /> Carcamo 3000<br />\
            <img src="styles/legend/Conberturas_Lineas_30_13.png" /> Carcamo 6A<br />\
            <img src="styles/legend/Conberturas_Lineas_30_14.png" /> CTM<br />\
            <img src="styles/legend/Conberturas_Lineas_30_15.png" /> Donceles<br />\
            <img src="styles/legend/Conberturas_Lineas_30_16.png" /> El table<br />\
            <img src="styles/legend/Conberturas_Lineas_30_17.png" /> El Table<br />\
            <img src="styles/legend/Conberturas_Lineas_30_18.png" /> Heroes L24<br />\
            <img src="styles/legend/Conberturas_Lineas_30_19.png" /> Hiperbolico 15 L10<br />\
            <img src="styles/legend/Conberturas_Lineas_30_20.png" /> Hiperbolico 15 L14<br />\
            <img src="styles/legend/Conberturas_Lineas_30_21.png" /> Hiperbolico 23 L10<br />\
            <img src="styles/legend/Conberturas_Lineas_30_22.png" /> Hiperbolico 23 L14<br />\
            <img src="styles/legend/Conberturas_Lineas_30_23.png" /> Hiperbolico 23 L8<br />\
            <img src="styles/legend/Conberturas_Lineas_30_24.png" /> Infonavit 103<br />\
            <img src="styles/legend/Conberturas_Lineas_30_25.png" /> Infonavit 14<br />\
            <img src="styles/legend/Conberturas_Lineas_30_26.png" /> Infovir<br />\
            <img src="styles/legend/Conberturas_Lineas_30_27.png" /> Itzáles L12<br />\
            <img src="styles/legend/Conberturas_Lineas_30_28.png" /> Kusamil<br />\
            <img src="styles/legend/Conberturas_Lineas_30_29.png" /> La Joya<br />\
            <img src="styles/legend/Conberturas_Lineas_30_30.png" /> Lombardo<br />\
            <img src="styles/legend/Conberturas_Lineas_30_31.png" /> Luciernagas<br />\
            <img src="styles/legend/Conberturas_Lineas_30_32.png" /> Otoch L16 y LX<br />\
            <img src="styles/legend/Conberturas_Lineas_30_33.png" /> Otoch Paraiso L24<br />\
            <img src="styles/legend/Conberturas_Lineas_30_34.png" /> Paraiso Maya<br />\
            <img src="styles/legend/Conberturas_Lineas_30_35.png" /> Paseos Del Mar<br />\
            <img src="styles/legend/Conberturas_Lineas_30_36.png" /> Prado Norte 2 L20<br />\
            <img src="styles/legend/Conberturas_Lineas_30_37.png" /> Prado Norte L20<br />\
            <img src="styles/legend/Conberturas_Lineas_30_38.png" /> Puerto Juarez  L4<br />\
            <img src="styles/legend/Conberturas_Lineas_30_39.png" /> Puerto Juarez  L90s<br />\
            <img src="styles/legend/Conberturas_Lineas_30_40.png" /> Puerto Juarez L10 Tabachines<br />\
            <img src="styles/legend/Conberturas_Lineas_30_41.png" /> Puerto Juarez L8 Turistico<br />\
            <img src="styles/legend/Conberturas_Lineas_30_42.png" /> Quetzales 523<br />\
            <img src="styles/legend/Conberturas_Lineas_30_43.png" /> Reserva 1<br />\
            <img src="styles/legend/Conberturas_Lineas_30_44.png" /> Reserva 2<br />\
            <img src="styles/legend/Conberturas_Lineas_30_45.png" /> Reserva 3<br />\
            <img src="styles/legend/Conberturas_Lineas_30_46.png" /> Tanque SM 11<br />\
            <img src="styles/legend/Conberturas_Lineas_30_47.png" /> Tierra Maya<br />\
            <img src="styles/legend/Conberturas_Lineas_30_48.png" /> Urbi<br />\
            <img src="styles/legend/Conberturas_Lineas_30_49.png" /> Uxmal L12<br />\
            <img src="styles/legend/Conberturas_Lineas_30_50.png" /> Uxmal L6<br />\
            <img src="styles/legend/Conberturas_Lineas_30_53.png" /> Santa Fe<br />\
            <img src="styles/legend/Conberturas_Lineas_30_51.png" /> Villas del Mar L20 y LX<br />\
            <img src="styles/legend/Conberturas_Lineas_30_52.png" /> Vista Real<br />'
                });



var format_Cobertura_Tanques_31 = new ol.format.GeoJSON();
var features_Cobertura_Tanques_31 = format_Cobertura_Tanques_31.readFeatures(json_Cobertura_Tanques_31, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Cobertura_Tanques_31 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Cobertura_Tanques_31.addFeatures(features_Cobertura_Tanques_31);
var lyr_Cobertura_Tanques_31 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Cobertura_Tanques_31, 
                style: style_Cobertura_Tanques_31,
                popuplayertitle: "Cobertura_Tanques",
                interactive: true,'opacity':0.50000,
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
var format_Horario_Servicio_BJ_32 = new ol.format.GeoJSON();
var features_Horario_Servicio_BJ_32 = format_Horario_Servicio_BJ_32.readFeatures(json_Horario_Servicio_BJ_32, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Horario_Servicio_BJ_32 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Horario_Servicio_BJ_32.addFeatures(features_Horario_Servicio_BJ_32);
var lyr_Horario_Servicio_BJ_32 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Horario_Servicio_BJ_32, 
                style: style_Horario_Servicio_BJ_32,
                popuplayertitle: "Horario_Servicio_BJ",
                interactive: true,'opacity':0.50000,
   title: 'Horario_Servicio_BJ<br />\
    <img src="styles/legend/Horario_Servicio_BJ_32_0.png" /> 0 - 6<br />\
    <img src="styles/legend/Horario_Servicio_BJ_32_1.png" /> 6 - 9<br />\
    <img src="styles/legend/Horario_Servicio_BJ_32_2.png" /> 9 - 11<br />\
    <img src="styles/legend/Horario_Servicio_BJ_32_3.png" /> 11 - 16<br />\
    <img src="styles/legend/Horario_Servicio_BJ_32_4.png" /> 16 - 24<br />'
        });


		var format_Conduccion_BJ_copy_1 = new ol.format.GeoJSON();
var features_Conduccion_BJ_copy_1 = format_Conduccion_BJ_copy_1.readFeatures(json_Conduccion_BJ_copy_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Conduccion_BJ_copy_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Conduccion_BJ_copy_1.addFeatures(features_Conduccion_BJ_copy_1);
var lyr_Conduccion_BJ_copy_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Conduccion_BJ_copy_1, 
                style: style_Conduccion_BJ_copy_1,
                popuplayertitle: "Conduccion_BJ_copy",
                interactive: true,
    title: 'Conduccion<br />\
    <img src="styles/legend/Conduccion_BJ_copy_1_0.png" /> Conduccion<br />'
        });
		

		
var format_Tanques_34 = new ol.format.GeoJSON();
var features_Tanques_34 = format_Tanques_34.readFeatures(json_Tanques_34, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Tanques_34 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Tanques_34.addFeatures(features_Tanques_34);
var lyr_Tanques_34 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Tanques_34, 
                style: style_Tanques_34,
                popuplayertitle: "Tanques",
                interactive: true,
    title: 'Tanques<br />\
    <img src="styles/legend/Tanques_34_0.png" /> Existente<br />\
    <img src="styles/legend/Tanques_34_1.png" /> Q2023-2027<br />'
        });


var format_pozos_captacion_35 = new ol.format.GeoJSON();
var features_pozos_captacion_35 = format_pozos_captacion_35.readFeatures(json_pozos_captacion_35, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_pozos_captacion_35 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_pozos_captacion_35.addFeatures(features_pozos_captacion_35);
var lyr_pozos_captacion_35 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_pozos_captacion_35, 
                style: style_pozos_captacion_35,
                popuplayertitle: "pozos_captacion",
                interactive: true,
    title: 'pozos_captacion<br />\
    <img src="styles/legend/pozos_captacion_35_0.png" /> Existente<br />'
        });
		
			
var format_AEP_VANN_VALVULAS_5 = new ol.format.GeoJSON();
var features_AEP_VANN_VALVULAS_5 = format_AEP_VANN_VALVULAS_5.readFeatures(json_AEP_VANN_VALVULAS_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_AEP_VANN_VALVULAS_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_AEP_VANN_VALVULAS_5.addFeatures(features_AEP_VANN_VALVULAS_5);
var lyr_AEP_VANN_VALVULAS_5 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_AEP_VANN_VALVULAS_5, 
                style: style_AEP_VANN_VALVULAS_5,
                popuplayertitle: "AEP_VANN_VALVULAS",
                interactive: true,
                title: '<img src="styles/legend/AEP_VANN_VALVULAS_5.png" /> AEP_VANN_VALVULAS'
            });
		
var format_Emisor_colector_37 = new ol.format.GeoJSON();
var features_Emisor_colector_37 = format_Emisor_colector_37.readFeatures(json_Emisor_colector_37, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Emisor_colector_37 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Emisor_colector_37.addFeatures(features_Emisor_colector_37);
var lyr_Emisor_colector_37 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Emisor_colector_37, 
                style: style_Emisor_colector_37,
                popuplayertitle: "Emisor_colector",
                interactive: true,
    title: 'Emisor_colector<br />\
    <img src="styles/legend/Emisor_colector_37_0.png" /> EXISTENTE<br />\
    <img src="styles/legend/Emisor_colector_37_1.png" /> Q2023-2027<br />'
        });
				
var format_Carcamos_38 = new ol.format.GeoJSON();
var features_Carcamos_38 = format_Carcamos_38.readFeatures(json_Carcamos_38, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Carcamos_38 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Carcamos_38.addFeatures(features_Carcamos_38);
var lyr_Carcamos_38 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Carcamos_38, 
                style: style_Carcamos_38,
                popuplayertitle: "Carcamos",
                interactive: true,
                title: '<img src="styles/legend/Carcamos_38.png" /> Carcamos'
            });
var format_Ptar_39 = new ol.format.GeoJSON();
var features_Ptar_39 = format_Ptar_39.readFeatures(json_Ptar_39, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Ptar_39 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Ptar_39.addFeatures(features_Ptar_39);
var lyr_Ptar_39 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Ptar_39, 
                style: style_Ptar_39,
                popuplayertitle: "Ptar",
                interactive: true,
    title: 'Ptar<br />\
    <img src="styles/legend/Ptar_39_0.png" /> EXISTENTE<br />'
        });
var format_Conduccion_40 = new ol.format.GeoJSON();
var features_Conduccion_40 = format_Conduccion_40.readFeatures(json_Conduccion_40, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Conduccion_40 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Conduccion_40.addFeatures(features_Conduccion_40);
var lyr_Conduccion_40 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Conduccion_40, 
                style: style_Conduccion_40,
                popuplayertitle: "Conduccion",
                interactive: true,
    title: 'Conduccion<br />\
    <img src="styles/legend/Conduccion_40_0.png" /> EXISTENTE<br />\
    <img src="styles/legend/Conduccion_40_1.png" /> Q2023-2027<br />'
        });
var format_Tanques_41 = new ol.format.GeoJSON();
var features_Tanques_41 = format_Tanques_41.readFeatures(json_Tanques_41, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Tanques_41 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Tanques_41.addFeatures(features_Tanques_41);
var lyr_Tanques_41 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Tanques_41, 
                style: style_Tanques_41,
                popuplayertitle: "Tanques",
                interactive: true,
    title: 'Tanques<br />\
    <img src="styles/legend/Tanques_41_0.png" /> EXISTENTE<br />\
    <img src="styles/legend/Tanques_41_1.png" /> Q2023-2027<br />'
        });
			
		var format_Pol_Carcamo_1 = new ol.format.GeoJSON();
var features_Pol_Carcamo_1 = format_Pol_Carcamo_1.readFeatures(json_Pol_Carcamo_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Pol_Carcamo_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Pol_Carcamo_1.addFeatures(features_Pol_Carcamo_1);
var lyr_Pol_Carcamo_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Pol_Carcamo_1, 
                style: style_Pol_Carcamo_1,
                popuplayertitle: "Pol_Carcamo",
                interactive: true,'opacity':0.50000,
                title: '<img src="styles/legend/Pol_Carcamo_1.png" /> Pol_Carcamo'
            });
var format_Pol_Tanques_2 = new ol.format.GeoJSON();
var features_Pol_Tanques_2 = format_Pol_Tanques_2.readFeatures(json_Pol_Tanques_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Pol_Tanques_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Pol_Tanques_2.addFeatures(features_Pol_Tanques_2);
var lyr_Pol_Tanques_2 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Pol_Tanques_2, 
                style: style_Pol_Tanques_2,
                popuplayertitle: "Pol_Tanques",
                interactive: true,'opacity':0.50000,
                title: '<img src="styles/legend/Pol_Tanques_2.png" /> Pol_Tanques'
            });
		

var group_IM = new ol.layer.Group({

layers: [

    new ol.layer.Group({
                    layers: [],
                    fold: "close",
                    title: "Catastro"}),
    new ol.layer.Group({
                    layers: [],
                    fold: "close",
                    title: "Clientes"}),               
    new ol.layer.Group({
                    layers: [
                    new ol.layer.Group({layers: [],
                    fold: "close",
                    title: "Infra. Proyectada AP"}),
                    
                    new ol.layer.Group({layers:[lyr_Pol_Carcamo_1,],
                    fold: "close",
                    title: "Operacion y Coberturas"}),
                    
                    new ol.layer.Group({layers: [],
                    fold: "close",
                    title: "Accesorios"}),
                    
                    new ol.layer.Group({layers: [
                        new ol.layer.Group({layers:[lyr_Emisor_colector_37,],
                    fold: "close",
                    title: "Red Primaria"}),
                        ], 
                    fold: "close",
                    title: "Red Descarga Sanitaria"}),lyr_Carcamos_38,lyr_Ptar_39,],
                    fold: "close",
                    title: "DS"}),
    new ol.layer.Group({
                    layers: [      
                    new ol.layer.Group({
                    layers: [],
                    fold: "close",
                    title: "Infra. Proyectada AP"}),             
                    new ol.layer.Group({layers: [
                    new ol.layer.Group({layers: [],
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
                    title: "Operacion y Coberturas"}), 
                    new ol.layer.Group({layers: [lyr_Pol_Tanques_2],
                    fold: "close",
                    title: "Accesorios"}),lyr_Tanques_41,
                    new ol.layer.Group({layers: [lyr_Conduccion_40],
                    fold: "close",
                    title: "Red Agua Potable"}),
                    ],
                    fold: "close",
                    title: "AP"}),],

fold: "close",
title: "Isla Mujeres"});
       

var group_BJ = new ol.layer.Group({
                                layers: [
    new ol.layer.Group({
                    layers: [],
                    fold: "close",
                    title: "Catastro"}),
    new ol.layer.Group({
                    layers: [lyr_Clientes_BJ_33,],
                    fold: "close",
                    title: "Clientes"}),               
    new ol.layer.Group({
                    layers: [
                     new ol.layer.Group({layers: [],
                    fold: "close",
                    title: "Infra Proyectada DS"}), 
                    new ol.layer.Group({layers:[lyr_Cobertura_PTAR_BJ_0,],
                    fold: "close",
                    title: "Operacion y Coberturas"}),
                    
                    new ol.layer.Group({layers: [lyr_pozos_colectores_27,],
                    fold: "close",
                    title: "Accesorios"}),
                    lyr_Carcamos_25,lyr_Ptar_28,
                    new ol.layer.Group({layers: [lyr_Tuberia_ASS_0,
                        new ol.layer.Group({layers:[lyr_Emisores_colectores_26,],
                    fold: "close",
                    title: "Red Primaria"}),
                        ], 
                    fold: "close",
                    title: "Red Descarga Sanitaria"}),],
                    fold: "close",
                    title: "DS"}),
    new ol.layer.Group({
                    layers: [      
                    new ol.layer.Group({layers: [],
                    fold: "close",
                    title: "Infra Proyectada AP"}),   
                                  
                    new ol.layer.Group({layers: [
                    new ol.layer.Group({layers: [lyr_Cobertura_Tanques_31],
                    fold: "close",
                    title: "Cobertura Tanques"}),
                    new ol.layer.Group({layers: [lyr_Coberturas_Lineas_30],
                    fold: "close",
                    title: "Cobertura Lineas"}),
                    new ol.layer.Group({layers: [lyr_Horario_Servicio_BJ_32,],
                    fold: "close",
                    title: "Horario de Servicio"}),
                    ],
                    fold: "close",
                    title: "Operacion y Cobertura"}), 

                    new ol.layer.Group({layers: [lyr_pozos_captacion_35,lyr_AEP_VANN_VALVULAS_5,],
                    fold: "close",
                    title: "Accesorios"}),
                    
                    lyr_Tanques_34,
                    new ol.layer.Group({layers: [lyr_tuberia_0,lyr_Conduccion_BJ_copy_1,],
                    fold: "close",
                    title: "Red Agua Potable"}),
                    ],
                    fold: "close",
                    title: "AP"}),],
fold: "close",
title: "Benito Juarez"});
								
var group_PM = new ol.layer.Group({
			
			                 layers: [

                    
                    new ol.layer.Group({
                    layers: [],
                    fold: "close",
                    title: "Catastro"}),
                    new ol.layer.Group({
                    layers: [],
                    fold: "close",
                    title: "Clientes"}),               
                    new ol.layer.Group({
                    layers: [
                    new ol.layer.Group({layers: [],
                    fold: "close",
                    title: "Infra Proyectada DS"}),
                    
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
                    title: "DS"}),
    new ol.layer.Group({
                    layers: [    
                        
                    new ol.layer.Group({layers: [],
                    fold: "close",
                    title: "Infra Proyectada AP"}),
                    new ol.layer.Group({layers: [
                    new ol.layer.Group({layers: [],
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
                    title: "Tematicas"}), 
                    new ol.layer.Group({layers: [lyr_VALVULAS_21,],
                    fold: "close",
                    title: "Accesorios"}),
                    new ol.layer.Group({layers: [lyr_Conduccion_Distribucion_19,],
                    fold: "close",
                    title: "Red Agua Potable"}),
                    lyr_Tanques_20,],
                    fold: "close",
                    title: "AP"}),],

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
        
        new ol.layer.Group({layers: [],
                    fold: "close",
                    title: "Infra Proyectada DS"}),
                    new ol.layer.Group({layers:[],
                    fold: "close",
                    title: "Operacion y Coberturas"}),
                    
                    new ol.layer.Group({layers: [lyr_posos_colector_5,],
                    fold: "close",
                    title: "Accesorios"}),
                    
                    new ol.layer.Group({layers: [
                        new ol.layer.Group({layers:[lyr_Emisor_Colector_4],
                    fold: "close",
                    title: "Red Primaria"}),
                       lyr_Tuberia_ASS_0, ], 
                    fold: "close",
                    title: "Red Descarga Sanitaria"}),lyr_Carcamos_3,lyr_Ptar_6,],
                    fold: "close",
                    title: "DS"}),
    new ol.layer.Group({
                    layers: [    
                        
                        
                        new ol.layer.Group({layers: [],
                    fold: "close",
                    title: "Infra Proyectada AP"}),
                    new ol.layer.Group({layers: [

                    
                    new ol.layer.Group({layers: [],
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
                    title: "Operacion y Coberturas"}), 

                    new ol.layer.Group({layers: [lyr_Pozos_captacion_10,],
                    fold: "close",
                    title: "Accesorios"}),

                    lyr_Tanques_9,lyr_P_Osmosis_11,

                    new ol.layer.Group({layers: [lyr_linea_Chemuyil_7,lyr_Conduccion_8,],
                    fold: "close",
                    title: "Red Agua Potable"}),
                    ],
                    fold: "close",
                    title: "AP"}),],

fold: "close",
title: "Solidaridad"});

var group_Complementos = new ol.layer.Group({layers: [
                new ol.layer.Group({
                    layers: [],
                    fold: "close",
                    title: "Otras Infraestructuras"}),              
			    new ol.layer.Group({
                    layers: [ 
                        new ol.layer.Group({
                            layers: [lyr_Quintana_Roo_1,],
                            fold: "close",
				            title: "Quintana Roo"}),],
                    fold: "close",
                    title: "Planificacion Territorial"}),	
                new ol.layer.Group({
                    layers: [],
                    fold: "close",
                    title: "Infraestructura Electrica"}), 
                new ol.layer.Group({
                    layers: [lyr_BN_1,],
                    fold: "close",
                    title: "Bancos de Nivel"}),
                new ol.layer.Group({
                    layers: [],
                    fold: "close",
                    title: "Atencion a Clientes"}),  
                                      
                 new ol.layer.Group({
                    layers: [lyr_Agua_Superficial_2012_2013_1,lyr_Calidad_delagua_Subterranea_122023_2,],
                                        fold: "close",
                                        title: "Informacion CONAGUA"}),
                                    ],
                                    fold: "close",
                                    title: "Otros"});

var group_MAPA_BASE = new ol.layer.Group({
                                layers: [lyr_ESRIGraydark_0,lyr_ESRITopo_0,lyr_ESRISatellite_1,lyr_ESRIGraylight_3,],
                                fold: "close",
				
                                title: "MAPA_BASE"});



lyr_ESRIGraydark_0.setVisible(false);lyr_ESRITopo_0.setVisible(false);lyr_ESRISatellite_1.setVisible(true);lyr_ESRIGraylight_3.setVisible(false);lyr_SM_SOL_1.setVisible(true);lyr_Mza_sol_2.setVisible(true);lyr_Carcamos_3.setVisible(false);lyr_Emisor_Colector_4.setVisible(false);lyr_posos_colector_5.setVisible(false);lyr_Ptar_6.setVisible(false);lyr_linea_Chemuyil_7.setVisible(false);lyr_Conduccion_8.setVisible(true);lyr_Tanques_9.setVisible(true);lyr_Pozos_captacion_10.setVisible(false);lyr_P_Osmosis_11.setVisible(false);lyr_Poligono_Actuacion_12.setVisible(false);lyr_Sectores_PM_13.setVisible(false);lyr_SM_Puerto_Morelos_14.setVisible(true);lyr_Manzanas_PuertoMorelos_15.setVisible(false);lyr_Emisor_Colector_16.setVisible(false);lyr_Carcamo_17.setVisible(false);lyr_Ptar_18.setVisible(true);lyr_Conduccion_Distribucion_19.setVisible(true);lyr_Tanques_20.setVisible(true);lyr_VALVULAS_21.setVisible(false);lyr_zones_22.setVisible(false);lyr_SM_23.setVisible(false);
lyr_Carcamos_25.setVisible(false);lyr_Emisores_colectores_26.setVisible(false);lyr_pozos_colectores_27.setVisible(false);lyr_Ptar_28.setVisible(false);lyr_Zonas_captacion_29.setVisible(false);lyr_Coberturas_Lineas_30.setVisible(false);lyr_Cobertura_Tanques_31.setVisible(false);lyr_Horario_Servicio_BJ_32.setVisible(false);lyr_Tanques_34.setVisible(true);lyr_pozos_captacion_35.setVisible(false);lyr_Emisor_colector_37.setVisible(false);lyr_Carcamos_38.setVisible(false);lyr_Ptar_39.setVisible(false);lyr_Conduccion_40.setVisible(true);lyr_Tanques_41.setVisible(false);lyr_Pol_Carcamo_1.setVisible(false);lyr_Pol_Tanques_2.setVisible(false);lyr_Cobertura_PTAR_BJ_0.setVisible(false);lyr_AEP_VANN_VALVULAS_5.setVisible(false);
lyr_Tuberia_ASS_0.setVisible(false); lyr_Clientes_BJ_33.setVisible(false);lyr_tuberia_0.setVisible(false);lyr_Conduccion_BJ_copy_1.setVisible(true);lyr_Manzanas_BJ_35.setVisible(false);lyr_BN_1.setVisible(false);lyr_Clientes_Sol_01.setVisible(false);
lyr_Agua_Superficial_2012_2013_1.setVisible(false);lyr_Calidad_delagua_Subterranea_122023_2.setVisible(false);lyr_Quintana_Roo_1.setVisible(false);

var layersList = [group_MAPA_BASE,group_Complementos,group_PM,group_IM,group_SOL,group_BJ,];

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
lyr_Emisor_Colector_4.set('fieldAliases', {'id': 'id', 'objectid': 'objectid', 'layer': 'layer', 'estatus': 'estatus', 'jerarquia': 'jerarquia', 'diamero': 'diamero', 'material': 'material', 'shape_leng': 'shape_leng', 'id_pq': 'id_pq', 'concepto': 'concepto', 'fuente': 'fuente', });
lyr_posos_colector_5.set('fieldAliases', {'id': 'id', 'entity': 'entity', 'layer': 'layer', 'color': 'color', 'linetype': 'linetype', 'elevation': 'elevation', 'linewt': 'linewt', 'refname': 'refname', 'angle': 'angle', });
lyr_Ptar_6.set('fieldAliases', {'id': 'id', 'ptar': 'ptar', 'estatus': 'estatus', 'zona': 'zona', 'operador': 'operador', 'fuente': 'fuente', 'id_pq': 'id_pq', });
lyr_linea_Chemuyil_7.set('fieldAliases', {'id': 'id', 'elevation': 'elevation', 'refname': 'refname', 'long_m': 'long_m', });
lyr_Conduccion_8.set('fieldAliases', {'id': 'id', 'objectid': 'objectid', 'layer': 'layer', 'linetype': 'linetype', 'estatus': 'estatus', 'material': 'material', 'diametro': 'diametro', 't_red': 't_red', 'shape_leng': 'shape_leng', 'id_pq': 'id_pq', 'id_pq_1': 'id_pq_1', 'fuente': 'fuente', });
lyr_Pozos_captacion_10.set('fieldAliases', {'id': 'id', 'layer': 'layer', 'estatus': 'estatus', 'id_pq': 'id_pq', 'fuente': 'fuente', 'oper': 'oper', });
lyr_P_Osmosis_11.set('fieldAliases', {'id_0': 'id_0', 'id': 'id', 'estatus': 'estatus', 'id_pq': 'id_pq', 'fuente': 'fuente', 'nombre': 'nombre', });
lyr_Poligono_Actuacion_12.set('fieldAliases', {'id': 'id', 'pol': 'pol', 'area': 'area', 'mpio': 'mpio', 'localidad': 'localidad', });
lyr_Sectores_PM_13.set('fieldAliases', {'id': 'id', 'MUNICIPIO': 'MUNICIPIO', 'SECTORES': 'SECTORES', 'area': 'area', });
lyr_SM_Puerto_Morelos_14.set('fieldAliases', {'id': 'id', 'municipio': 'municipio', 'localidad': 'localidad', 'zona': 'zona', 'sm': 'sm', 'total MZA': 'total MZA', });
lyr_Manzanas_PuertoMorelos_15.set('fieldAliases', {'id_0': 'id_0', 'aep': 'aep', 'ancrfr': 'ancrfr', 'ass': 'ass', 'code': 'code', 'densite': 'densite', 'horpmp': 'horpmp', 'id': 'id', 'nbrhrspmp': 'nbrhrspmp', 'surface': 'surface', 'x1': 'x1', 'x2': 'x2', 'y1': 'y1', 'y2': 'y2', 'zn': 'zn', 'manzana': 'manzana', 'supermanza': 'supermanza', 'localidad': 'localidad', 'capaeva': 'capaeva', 'layername': 'layername', 'dwgname': 'dwgname', });
lyr_Emisor_Colector_16.set('fieldAliases', {'id': 'id', 'layer': 'layer', 'estatus': 'estatus', 'jerarquia': 'jerarquia', 'diam': 'diam', 'material': 'material', 'long': 'long', 'id_pq': 'id_pq', 'fuente': 'fuente', });
lyr_Carcamo_17.set('fieldAliases', {'id_0': 'id_0', 'id': 'id', 'carcamo': 'carcamo', 'estatus': 'estatus', 'capacidad': 'capacidad', 'fuente': 'fuente', 'id_pq': 'id_pq', });
lyr_Ptar_18.set('fieldAliases', {'id': 'id', 'layer': 'layer', 'nom': 'nom', 'estatus': 'estatus', 'zona': 'zona', 'operador': 'operador', 'id_pq': 'id_pq', 'fuente': 'fuente', });
lyr_Conduccion_Distribucion_19.set('fieldAliases', {'id': 'id', 'layer': 'layer', 'linetype': 'linetype', 'estatus': 'estatus', 'ID_PQ': 'ID_PQ', 'Diametro_Pulg': 'Diametro_Pulg', 'Diametro_mm': 'Diametro_mm', 'Tipo_Red': 'Tipo_Red', });
lyr_Tanques_20.set('fieldAliases', {'id': 'id', 'tanque': 'tanque', 'nombre1': 'nombre1', });
lyr_VALVULAS_21.set('fieldAliases', {'id': 'id', 'id_pq': 'id_pq', 'estatus': 'estatus', 'fuente': 'fuente', 'diametro': 'diametro', 'CODIGO_VALVULA': 'CODIGO_VALVULA', 'TIPO': 'TIPO', });
lyr_zones_22.set('fieldAliases', {'id': 'id', 'zone': 'zone', });
lyr_SM_23.set('fieldAliases', {'id': 'id', 'sm': 'sm', 'area': 'area', 'año': 'año', 'tanque': 'tanque', 'sm_1': 'sm_1', 'nivel_soci': 'nivel_soci', 'vialidades': 'vialidades', 'infra_estr': 'infra_estr', 'infra_es_1': 'infra_es_1', 'cobertura': 'cobertura', 'cobertur_1': 'cobertur_1', 'consumo_pr': 'consumo_pr', 'suma_de__p': 'suma_de__p', 'factor_de': 'factor_de', 'carcamo': 'carcamo', 'fecha': 'fecha', });
lyr_Emisores_colectores_26.set('fieldAliases', {'id': 'id', 'layer': 'layer', 'estatus': 'estatus', 'jerarquia': 'jerarquia', 'tipo_de_im': 'tipo_de_im', 'dia': 'dia', 'material': 'material', 'long': 'long', 'zona': 'zona', 'nom_lin': 'nom_lin', 'id_pq': 'id_pq', 'fuente': 'fuente', });
lyr_pozos_colectores_27.set('fieldAliases', {'id': 'id', 'entity': 'entity', 'layer': 'layer', 'color': 'color', 'linetype': 'linetype', 'elevation': 'elevation', 'linewt': 'linewt', 'refname': 'refname', 'angle': 'angle', });
lyr_Ptar_28.set('fieldAliases', {'id': 'id', 'ptar': 'ptar', 'estatus': 'estatus', 'zona': 'zona', 'operador': 'operador', 'clv': 'clv', 'id_pq': 'id_pq', 'fuente': 'fuente', });
lyr_Zonas_captacion_29.set('fieldAliases', {'id': 'id', 'refname': 'refname', 'zona': 'zona', 'nombre': 'nombre', });
lyr_Coberturas_Lineas_30.set('fieldAliases', {'fid': 'fid', 'id': 'id', 'linea': 'linea', 'cuenta_de': 'cuenta_de', 'subtotal': 'subtotal', 'iva': 'iva', 'total': 'total', 'consumo_m3': 'consumo_m3', });
lyr_Cobertura_Tanques_31.set('fieldAliases', {'id_0': 'id_0', 'fid_1': 'fid_1', 'id': 'id', 'tanque': 'tanque', 'cuenta_de': 'cuenta_de', 'subtotal': 'subtotal', 'iva': 'iva', 'total': 'total', 'consumo_m3': 'consumo_m3', });
lyr_Horario_Servicio_BJ_32.set('fieldAliases', {'id': 'id', 'sm': 'sm', 'area': 'area', 'año': 'año', 'tanque': 'tanque', 'nivel_soci': 'nivel_soci', 'vialidades': 'vialidades', 'infra_estr': 'infra_estr', 'infra_es_1': 'infra_es_1', 'cobertura': 'cobertura', 'cobertur_1': 'cobertur_1', 'consumo_pr': 'consumo_pr', 'suma_de__p': 'suma_de__p', 'factor_de': 'factor_de', 'carcamo': 'carcamo', 'fecha': 'fecha', 'objectid': 'objectid', 'cárcamo': 'cárcamo', 'cárcamo_a': 'cárcamo_a', 'sector': 'sector', 'sm_o_regi': 'sm_o_regi', 'observacio': 'observacio', 'presión_m': 'presión_m', 'hrs_de_ser': 'hrs_de_ser', 'horario_1_': 'horario_1_', 'horario_11': 'horario_11', 'horario_2_': 'horario_2_', 'horario_21': 'horario_21', 'presión_a': 'presión_a', });
lyr_Tanques_34.set('fieldAliases', { 'tanques': 'Tanque', 'estatus': 'Estatus', 'capacidad': 'Capacidad', 'cvl_predio': 'Cvl_predio', 'fuente': 'Fuente', 'id_pq': 'ID_pq', 'dem_n_5': 'dem_n_5', 'clave_n1_4': 'clave_n1_4', });
lyr_pozos_captacion_35.set('fieldAliases', {'id': 'id', 'zona': 'zona', 'num': 'num', 'estatus': 'estatus', 'comentario': 'comentario', 'id_pq': 'id_pq', 'fuente': 'fuente', });
//lyr_tuberia_36.set('fieldAliases', {'id': 'id', 'FID_': 'FID_', 'fid_1': 'fid_1', 'ANCRFR': 'ANCRFR', 'BAS': 'BAS', 'BRANCHEM': 'BRANCHEM', 'CONCENTRAT': 'CONCENTRAT', 'DATE_POSE': 'DATE_POSE', 'DATE_VERIF': 'DATE_VERIF', 'DEBIT': 'DEBIT', 'DIAMETRE': 'DIAMETRE', 'DIAM_EXT': 'DIAM_EXT', 'DIVERS1': 'DIVERS1', 'DIVERS2': 'DIVERS2', 'DIVERS3': 'DIVERS3', 'DROITE': 'DROITE', 'ETAT': 'ETAT', 'FRICTION': 'FRICTION', 'GAUCHE': 'GAUCHE', 'HAUT': 'HAUT', 'ID': 'ID', 'LONGCARTO': 'LONGCARTO', 'LONGUEUR': 'LONGUEUR', 'MATERIAU': 'MATERIAU', 'NOEUD_DEB': 'NOEUD_DEB', 'NOEUD_FIN': 'NOEUD_FIN', 'NOM': 'NOM', 'NPLAN': 'NPLAN', 'ORDRE_RES': 'ORDRE_RES', 'PCHARGE': 'PCHARGE', 'PERTE_GRD': 'PERTE_GRD', 'POSIT_VOIE': 'POSIT_VOIE', 'PROFONDEUR': 'PROFONDEUR', 'PROF_SOL': 'PROF_SOL', 'PROJET': 'PROJET', 'RUE': 'RUE', 'RUGOSITE': 'RUGOSITE', 'TYPCANA': 'TYPCANA', 'TYPIMP': 'TYPIMP', 'VITESSE': 'VITESSE', 'ZN': 'ZN', 'ZONE_GEO': 'ZONE_GEO', 'LAYERNAME': 'LAYERNAME', 'DWGNAME': 'DWGNAME', 'Shape_Leng': 'Shape_Leng', });
lyr_Emisor_colector_37.set('fieldAliases', {'id': 'id', 'id_pq': 'id_pq', 'concepto': 'concepto', 'diametro': 'diametro', 'estatus': 'estatus', 'long_1': 'long_1', 'fuente': 'fuente', 'tipo': 'tipo', });
lyr_Ptar_39.set('fieldAliases', {'id': 'id', 'ptar': 'ptar', 'estatus': 'estatus', 'operador': 'operador', 'zona': 'zona', 'fuente': 'fuente', 'id_pq': 'id_pq', });
lyr_Conduccion_40.set('fieldAliases', {'id': 'id', 'objectid_1': 'objectid_1', 'layer': 'layer', 'estatus': 'estatus', 'tipo_de_re': 'tipo_de_re', 'shape_leng': 'shape_leng', 'comentario': 'comentario', 'id_pq': 'id_pq', 'fuente': 'fuente', });
lyr_AEP_VANN_VALVULAS_5.set('fieldAliases', {'id': 'id', 'ANCRFR': 'ANCRFR', 'COMMANDE': 'COMMANDE', 'CONCENTRAT': 'CONCENTRAT', 'COURBE': 'COURBE', 'DATE_POSE': 'DATE_POSE', 'DATE_VERIF': 'DATE_VERIF', 'DEBIT': 'DEBIT', 'DEGRE': 'DEGRE', 'DIAMETRE': 'DIAMETRE', 'DIVERS1': 'DIVERS1', 'DIVERS2': 'DIVERS2', 'DIVERS3': 'DIVERS3', 'ETAT': 'ETAT', 'FRICTION': 'FRICTION', 'ID': 'ID', 'ID_CANA': 'ID_CANA', 'ID_CHMVAN': 'ID_CHMVAN', 'MARQUE': 'MARQUE', 'MATERIAU': 'MATERIAU', 'MODELE': 'MODELE', 'NOM': 'NOM', 'NPLAN': 'NPLAN', 'NUMERO': 'NUMERO', 'PCHARGE': 'PCHARGE', 'PERTE_GRD': 'PERTE_GRD', 'POS': 'POS', 'PROFONDEUR': 'PROFONDEUR', 'PROF_SOL': 'PROF_SOL', 'PROJET': 'PROJET', 'ROTAT': 'ROTAT', 'STOUR': 'STOUR', 'TYPE_ACP': 'TYPE_ACP', 'TYPE_VAN': 'TYPE_VAN', 'VITESSE': 'VITESSE', 'X': 'X', 'Y': 'Y', 'ZN': 'ZN', 'ZONE_GEO': 'ZONE_GEO', 'LAYERNAME': 'LAYERNAME', 'DWGNAME': 'DWGNAME', 'BLOCKNAME': 'BLOCKNAME', 'DIAMETER': 'DIAMETER', });
lyr_Pol_Carcamo_1.set('fieldAliases', {'id': 'id', 'Layer': 'Layer', 'Nombre': 'Nombre', });
lyr_Pol_Tanques_2.set('fieldAliases', {'id': 'id', 'Layer': 'Layer', 'Nombre': 'Nombre', });
lyr_Cobertura_PTAR_BJ_0.set('fieldAliases', {'id': 'id', 'Nombre': 'Nombre', 'Carcamos': 'Carcamos', });
lyr_SM_SOL_1.set('fieldImages', {'id_0': 'TextEdit', 'id': 'Range', 'sma': 'TextEdit', 'in_med_con': 'TextEdit', 'horas_serv': 'TextEdit', 'surf': 'TextEdit', 'perim': 'TextEdit', 'dwgname': 'TextEdit', 'layername': 'TextEdit', 'droite': 'TextEdit', 'gauche': 'TextEdit', 'haut': 'TextEdit', 'bas': 'TextEdit', });
lyr_Mza_sol_2.set('fieldImages', {'aep': 'TextEdit', 'ancrfr': 'TextEdit', 'ass': 'TextEdit', 'code': 'TextEdit', 'densite': 'TextEdit', 'horpmp': 'TextEdit', 'id': 'Range', 'nbrhrspmp': 'Range', 'surface': 'TextEdit', 'x1': 'TextEdit', 'x2': 'TextEdit', 'y1': 'TextEdit', 'y2': 'TextEdit', 'zn': 'TextEdit', 'manzana': 'TextEdit', 'supermanza': 'TextEdit', 'localidad': 'TextEdit', 'capaeva': 'Range', 'layername': 'TextEdit', 'dwgname': 'TextEdit', });
lyr_Emisor_Colector_4.set('fieldImages', {'id': '', 'objectid': '', 'layer': '', 'estatus': '', 'jerarquia': '', 'diamero': '', 'material': '', 'shape_leng': '', 'id_pq': '', 'concepto': '', 'fuente': '', });
lyr_posos_colector_5.set('fieldImages', {'id': 'TextEdit', 'entity': 'TextEdit', 'layer': 'TextEdit', 'color': 'Range', 'linetype': 'TextEdit', 'elevation': 'TextEdit', 'linewt': 'Range', 'refname': 'TextEdit', 'angle': 'TextEdit', });
lyr_Ptar_6.set('fieldImages', {'id': 'TextEdit', 'ptar': 'TextEdit', 'estatus': 'TextEdit', 'zona': 'TextEdit', 'operador': 'TextEdit', 'fuente': 'TextEdit', 'id_pq': 'TextEdit', });
lyr_linea_Chemuyil_7.set('fieldImages', {'id': 'TextEdit', 'elevation': 'TextEdit', 'refname': 'TextEdit', 'long_m': 'TextEdit', });
lyr_Conduccion_8.set('fieldImages', {'id': 'TextEdit', 'objectid': 'TextEdit', 'layer': 'TextEdit', 'linetype': 'TextEdit', 'estatus': 'TextEdit', 'material': 'TextEdit', 'diametro': 'TextEdit', 't_red': 'TextEdit', 'shape_leng': 'TextEdit', 'id_pq': 'TextEdit', 'id_pq_1': 'TextEdit', 'fuente': 'TextEdit', });
lyr_Pozos_captacion_10.set('fieldImages', {'id': 'TextEdit', 'layer': 'TextEdit', 'estatus': 'TextEdit', 'id_pq': 'TextEdit', 'fuente': 'TextEdit', 'oper': 'TextEdit', });
lyr_P_Osmosis_11.set('fieldImages', {'id_0': 'TextEdit', 'id': 'TextEdit', 'estatus': 'TextEdit', 'id_pq': 'TextEdit', 'fuente': 'TextEdit', 'nombre': 'TextEdit', });
lyr_Poligono_Actuacion_12.set('fieldImages', {'id': 'TextEdit', 'pol': 'TextEdit', 'area': 'TextEdit', 'mpio': 'TextEdit', 'localidad': 'TextEdit', });
lyr_Sectores_PM_13.set('fieldImages', {'id': 'TextEdit', 'MUNICIPIO': 'TextEdit', 'SECTORES': 'TextEdit', 'area': 'TextEdit', });
lyr_SM_Puerto_Morelos_14.set('fieldImages', {'id': 'Range', 'municipio': 'TextEdit', 'localidad': 'TextEdit', 'zona': 'TextEdit', 'sm': 'TextEdit', 'total MZA': 'TextEdit', });
lyr_Manzanas_PuertoMorelos_15.set('fieldImages', {'id_0': 'TextEdit', 'aep': 'TextEdit', 'ancrfr': 'TextEdit', 'ass': 'TextEdit', 'code': 'TextEdit', 'densite': 'TextEdit', 'horpmp': 'TextEdit', 'id': 'Range', 'nbrhrspmp': 'Range', 'surface': 'TextEdit', 'x1': 'TextEdit', 'x2': 'TextEdit', 'y1': 'TextEdit', 'y2': 'TextEdit', 'zn': 'TextEdit', 'manzana': 'TextEdit', 'supermanza': 'TextEdit', 'localidad': 'TextEdit', 'capaeva': 'Range', 'layername': 'TextEdit', 'dwgname': 'TextEdit', });
lyr_Emisor_Colector_16.set('fieldImages', {'id': '', 'layer': '', 'estatus': '', 'jerarquia': '', 'diam': '', 'material': '', 'long': '', 'id_pq': '', 'fuente': '', });
lyr_Carcamo_17.set('fieldImages', {'id_0': 'TextEdit', 'id': 'Range', 'carcamo': 'TextEdit', 'estatus': 'TextEdit', 'capacidad': 'TextEdit', 'fuente': 'TextEdit', 'id_pq': 'TextEdit', });
lyr_Ptar_18.set('fieldImages', {'id': 'TextEdit', 'layer': 'TextEdit', 'nom': 'TextEdit', 'estatus': 'TextEdit', 'zona': 'TextEdit', 'operador': 'TextEdit', 'id_pq': 'TextEdit', 'fuente': 'TextEdit', });
lyr_Conduccion_Distribucion_19.set('fieldImages', {'id': 'TextEdit', 'layer': 'TextEdit', 'linetype': 'TextEdit', 'estatus': 'TextEdit', 'ID_PQ': 'TextEdit', 'Diametro_Pulg': 'TextEdit', 'Diametro_mm': 'Range', 'Tipo_Red': 'TextEdit', });
lyr_Tanques_20.set('fieldImages', {'id': 'TextEdit', 'tanque': 'TextEdit', 'nombre1': 'TextEdit', });
lyr_VALVULAS_21.set('fieldImages', {'id': 'TextEdit', 'id_pq': 'TextEdit', 'estatus': 'TextEdit', 'fuente': 'TextEdit', 'diametro': 'Range', 'CODIGO_VALVULA': 'TextEdit', 'TIPO': 'TextEdit', });
lyr_zones_22.set('fieldImages', {'id': 'TextEdit', 'zone': 'TextEdit', });
lyr_SM_23.set('fieldImages', {'id': 'TextEdit', 'sm': 'TextEdit', 'area': 'TextEdit', 'año': 'TextEdit', 'tanque': 'TextEdit', 'sm_1': 'TextEdit', 'nivel_soci': 'TextEdit', 'vialidades': 'TextEdit', 'infra_estr': 'TextEdit', 'infra_es_1': 'TextEdit', 'cobertura': 'TextEdit', 'cobertur_1': 'TextEdit', 'consumo_pr': 'TextEdit', 'suma_de__p': 'TextEdit', 'factor_de': 'TextEdit', 'carcamo': 'TextEdit', 'fecha': 'TextEdit', });
lyr_Emisores_colectores_26.set('fieldImages', {'id': 'TextEdit', 'layer': 'TextEdit', 'estatus': 'TextEdit', 'jerarquia': 'TextEdit', 'tipo_de_im': 'TextEdit', 'dia': 'TextEdit', 'material': 'TextEdit', 'long': 'TextEdit', 'zona': 'TextEdit', 'nom_lin': 'TextEdit', 'id_pq': 'TextEdit', 'fuente': 'TextEdit', });
lyr_pozos_colectores_27.set('fieldImages', {'id': 'TextEdit', 'entity': 'TextEdit', 'layer': 'TextEdit', 'color': 'Range', 'linetype': 'TextEdit', 'elevation': 'TextEdit', 'linewt': 'Range', 'refname': 'TextEdit', 'angle': 'TextEdit', });
lyr_Ptar_28.set('fieldImages', {'id': 'TextEdit', 'ptar': 'TextEdit', 'estatus': 'TextEdit', 'zona': 'TextEdit', 'operador': 'TextEdit', 'clv': 'TextEdit', 'id_pq': 'TextEdit', 'fuente': 'TextEdit', });
lyr_Zonas_captacion_29.set('fieldImages', {'id': 'TextEdit', 'refname': 'TextEdit', 'zona': 'TextEdit', 'nombre': 'TextEdit', });
lyr_Coberturas_Lineas_30.set('fieldImages', {'fid': 'TextEdit', 'id': 'TextEdit', 'linea': 'TextEdit', 'cuenta_de': 'TextEdit', 'subtotal': 'TextEdit', 'iva': 'TextEdit', 'total': 'TextEdit', 'consumo_m3': 'TextEdit', });
lyr_Cobertura_Tanques_31.set('fieldImages', {'id_0': 'TextEdit', 'fid_1': 'TextEdit', 'id': 'TextEdit', 'tanque': 'TextEdit', 'cuenta_de': 'TextEdit', 'subtotal': 'TextEdit', 'iva': 'TextEdit', 'total': 'TextEdit', 'consumo_m3': 'TextEdit', });
lyr_Horario_Servicio_BJ_32.set('fieldImages', {'id': 'TextEdit', 'sm': 'TextEdit', 'area': 'TextEdit', 'año': 'TextEdit', 'tanque': 'TextEdit', 'nivel_soci': 'TextEdit', 'vialidades': 'TextEdit', 'infra_estr': 'TextEdit', 'infra_es_1': 'TextEdit', 'cobertura': 'TextEdit', 'cobertur_1': 'TextEdit', 'consumo_pr': 'TextEdit', 'suma_de__p': 'TextEdit', 'factor_de': 'TextEdit', 'carcamo': 'TextEdit', 'fecha': 'TextEdit', 'objectid': 'Range', 'cárcamo': 'TextEdit', 'cárcamo_a': 'TextEdit', 'sector': 'TextEdit', 'sm_o_regi': 'TextEdit', 'observacio': 'TextEdit', 'presión_m': 'TextEdit', 'hrs_de_ser': 'TextEdit', 'horario_1_': 'TextEdit', 'horario_11': 'TextEdit', 'horario_2_': 'TextEdit', 'horario_21': 'TextEdit', 'presión_a': 'TextEdit', });
lyr_Tanques_34.set('fieldImages', { 'tanques': 'TextEdit', 'estatus': 'TextEdit', 'capacidad': 'TextEdit', 'cvl_predio': 'TextEdit', 'fuente': 'TextEdit', 'id_pq': 'TextEdit', 'dem_n_5': 'TextEdit', 'clave_n1_4': 'TextEdit', });
lyr_pozos_captacion_35.set('fieldImages', {'id': 'TextEdit', 'zona': 'TextEdit', 'num': 'TextEdit', 'estatus': 'TextEdit', 'comentario': 'TextEdit', 'id_pq': 'TextEdit', 'fuente': 'TextEdit', });
lyr_Emisor_colector_37.set('fieldImages', {'id': 'TextEdit', 'id_pq': 'TextEdit', 'concepto': 'TextEdit', 'diametro': 'TextEdit', 'estatus': 'TextEdit', 'long_1': 'TextEdit', 'fuente': 'TextEdit', 'tipo': 'TextEdit', });
lyr_Ptar_39.set('fieldImages', {'id': 'TextEdit', 'ptar': 'TextEdit', 'estatus': 'TextEdit', 'operador': 'TextEdit', 'zona': 'TextEdit', 'fuente': 'TextEdit', 'id_pq': 'TextEdit', });
lyr_Conduccion_40.set('fieldImages', {'id': 'TextEdit', 'objectid_1': 'TextEdit', 'layer': 'TextEdit', 'estatus': 'TextEdit', 'tipo_de_re': 'TextEdit', 'shape_leng': 'TextEdit', 'comentario': 'TextEdit', 'id_pq': 'TextEdit', 'fuente': 'TextEdit', });
lyr_AEP_VANN_VALVULAS_5.set('fieldImages', {'id': 'TextEdit', 'ANCRFR': 'TextEdit', 'COMMANDE': 'TextEdit', 'CONCENTRAT': 'TextEdit', 'COURBE': 'TextEdit', 'DATE_POSE': 'DateTime', 'DATE_VERIF': 'DateTime', 'DEBIT': 'TextEdit', 'DEGRE': 'Range', 'DIAMETRE': 'Range', 'DIVERS1': 'TextEdit', 'DIVERS2': 'TextEdit', 'DIVERS3': 'TextEdit', 'ETAT': 'TextEdit', 'FRICTION': 'TextEdit', 'ID': 'Range', 'ID_CANA': 'Range', 'ID_CHMVAN': 'Range', 'MARQUE': 'TextEdit', 'MATERIAU': 'TextEdit', 'MODELE': 'TextEdit', 'NOM': 'TextEdit', 'NPLAN': 'TextEdit', 'NUMERO': 'TextEdit', 'PCHARGE': 'TextEdit', 'PERTE_GRD': 'TextEdit', 'POS': 'TextEdit', 'PROFONDEUR': 'TextEdit', 'PROF_SOL': 'TextEdit', 'PROJET': 'TextEdit', 'ROTAT': 'TextEdit', 'STOUR': 'TextEdit', 'TYPE_ACP': 'TextEdit', 'TYPE_VAN': 'TextEdit', 'VITESSE': 'TextEdit', 'X': 'TextEdit', 'Y': 'TextEdit', 'ZN': 'TextEdit', 'ZONE_GEO': 'TextEdit', 'LAYERNAME': 'TextEdit', 'DWGNAME': 'TextEdit', 'BLOCKNAME': 'TextEdit', 'DIAMETER': 'TextEdit', });
lyr_Pol_Carcamo_1.set('fieldImages', {'id': 'TextEdit', 'Layer': 'TextEdit', 'Nombre': 'TextEdit', });
lyr_Pol_Tanques_2.set('fieldImages', {'id': 'TextEdit', 'Layer': 'TextEdit', 'Nombre': 'TextEdit', });
lyr_Cobertura_PTAR_BJ_0.set('fieldImages', {'id': 'TextEdit', 'Nombre': 'TextEdit', 'Carcamos': 'TextEdit', });
lyr_SM_SOL_1.set('fieldLabels', {'id_0': 'no label', 'id': 'no label', 'sma': 'no label', 'in_med_con': 'no label', 'horas_serv': 'no label', 'surf': 'no label', 'perim': 'no label', 'dwgname': 'no label', 'layername': 'no label', 'droite': 'no label', 'gauche': 'no label', 'haut': 'no label', 'bas': 'no label', });
lyr_Mza_sol_2.set('fieldLabels', {'aep': 'no label', 'ancrfr': 'no label', 'ass': 'no label', 'code': 'no label', 'densite': 'no label', 'horpmp': 'no label', 'id': 'no label', 'nbrhrspmp': 'no label', 'surface': 'no label', 'x1': 'no label', 'x2': 'no label', 'y1': 'no label', 'y2': 'no label', 'zn': 'no label', 'manzana': 'no label', 'supermanza': 'no label', 'localidad': 'no label', 'capaeva': 'no label', 'layername': 'no label', 'dwgname': 'no label', });
lyr_Emisor_Colector_4.set('fieldLabels', {'id': 'no label', 'objectid': 'no label', 'layer': 'no label', 'estatus': 'no label', 'jerarquia': 'no label', 'diamero': 'no label', 'material': 'no label', 'shape_leng': 'no label', 'id_pq': 'no label', 'concepto': 'no label', 'fuente': 'no label', });
lyr_posos_colector_5.set('fieldLabels', {'id': 'no label', 'entity': 'no label', 'layer': 'no label', 'color': 'no label', 'linetype': 'no label', 'elevation': 'no label', 'linewt': 'no label', 'refname': 'no label', 'angle': 'no label', });
lyr_Ptar_6.set('fieldLabels', {'id': 'no label', 'ptar': 'no label', 'estatus': 'no label', 'zona': 'no label', 'operador': 'no label', 'fuente': 'no label', 'id_pq': 'no label', });
lyr_linea_Chemuyil_7.set('fieldLabels', {'id': 'no label', 'elevation': 'no label', 'refname': 'no label', 'long_m': 'no label', });
lyr_Conduccion_8.set('fieldLabels', {'id': 'no label', 'objectid': 'no label', 'layer': 'no label', 'linetype': 'no label', 'estatus': 'no label', 'material': 'no label', 'diametro': 'no label', 't_red': 'no label', 'shape_leng': 'no label', 'id_pq': 'no label', 'id_pq_1': 'no label', 'fuente': 'no label', });
lyr_Pozos_captacion_10.set('fieldLabels', {'id': 'no label', 'layer': 'no label', 'estatus': 'no label', 'id_pq': 'no label', 'fuente': 'no label', 'oper': 'no label', });
lyr_P_Osmosis_11.set('fieldLabels', {'id_0': 'no label', 'id': 'no label', 'estatus': 'no label', 'id_pq': 'no label', 'fuente': 'no label', 'nombre': 'no label', });
lyr_Poligono_Actuacion_12.set('fieldLabels', {'id': 'no label', 'pol': 'no label', 'area': 'no label', 'mpio': 'no label', 'localidad': 'no label', });
lyr_Sectores_PM_13.set('fieldLabels', {'id': 'no label', 'MUNICIPIO': 'no label', 'SECTORES': 'no label', 'area': 'no label', });
lyr_SM_Puerto_Morelos_14.set('fieldLabels', {'id': 'no label', 'municipio': 'no label', 'localidad': 'no label', 'zona': 'no label', 'sm': 'no label', 'total MZA': 'no label', });
lyr_Manzanas_PuertoMorelos_15.set('fieldLabels', {'id_0': 'no label', 'aep': 'no label', 'ancrfr': 'no label', 'ass': 'no label', 'code': 'no label', 'densite': 'no label', 'horpmp': 'no label', 'id': 'no label', 'nbrhrspmp': 'no label', 'surface': 'no label', 'x1': 'no label', 'x2': 'no label', 'y1': 'no label', 'y2': 'no label', 'zn': 'no label', 'manzana': 'no label', 'supermanza': 'no label', 'localidad': 'no label', 'capaeva': 'no label', 'layername': 'no label', 'dwgname': 'no label', });
lyr_Emisor_Colector_16.set('fieldLabels', {'id': 'no label', 'layer': 'no label', 'estatus': 'no label', 'jerarquia': 'no label', 'diam': 'no label', 'material': 'no label', 'long': 'no label', 'id_pq': 'no label', 'fuente': 'no label', });
lyr_Carcamo_17.set('fieldLabels', {'id_0': 'no label', 'id': 'no label', 'carcamo': 'no label', 'estatus': 'no label', 'capacidad': 'no label', 'fuente': 'no label', 'id_pq': 'no label', });
lyr_Ptar_18.set('fieldLabels', {'id': 'no label', 'layer': 'no label', 'nom': 'no label', 'estatus': 'no label', 'zona': 'no label', 'operador': 'no label', 'id_pq': 'no label', 'fuente': 'no label', });
lyr_Conduccion_Distribucion_19.set('fieldLabels', {'id': 'no label', 'layer': 'no label', 'linetype': 'no label', 'estatus': 'no label', 'ID_PQ': 'no label', 'Diametro_Pulg': 'no label', 'Diametro_mm': 'no label', 'Tipo_Red': 'no label', });
lyr_Tanques_20.set('fieldLabels', {'id': 'no label', 'tanque': 'no label', 'nombre1': 'no label', });
lyr_VALVULAS_21.set('fieldLabels', {'id': 'no label', 'id_pq': 'no label', 'estatus': 'no label', 'fuente': 'no label', 'diametro': 'no label', 'CODIGO_VALVULA': 'no label', 'TIPO': 'no label', });
lyr_zones_22.set('fieldLabels', {'id': 'no label', 'zone': 'no label', });
lyr_SM_23.set('fieldLabels', {'id': 'no label', 'sm': 'no label', 'area': 'no label', 'año': 'no label', 'tanque': 'no label', 'sm_1': 'no label', 'nivel_soci': 'no label', 'vialidades': 'no label', 'infra_estr': 'no label', 'infra_es_1': 'no label', 'cobertura': 'no label', 'cobertur_1': 'no label', 'consumo_pr': 'no label', 'suma_de__p': 'no label', 'factor_de': 'no label', 'carcamo': 'no label', 'fecha': 'no label', });
lyr_Emisores_colectores_26.set('fieldLabels', {'id': 'no label', 'layer': 'no label', 'estatus': 'no label', 'jerarquia': 'no label', 'tipo_de_im': 'no label', 'dia': 'no label', 'material': 'no label', 'long': 'no label', 'zona': 'no label', 'nom_lin': 'no label', 'id_pq': 'no label', 'fuente': 'no label', });
lyr_pozos_colectores_27.set('fieldLabels', {'id': 'no label', 'entity': 'no label', 'layer': 'no label', 'color': 'no label', 'linetype': 'no label', 'elevation': 'no label', 'linewt': 'no label', 'refname': 'no label', 'angle': 'no label', });
lyr_Ptar_28.set('fieldLabels', {'id': 'no label', 'ptar': 'no label', 'estatus': 'no label', 'zona': 'no label', 'operador': 'no label', 'clv': 'no label', 'id_pq': 'no label', 'fuente': 'no label', });
lyr_Zonas_captacion_29.set('fieldLabels', {'id': 'no label', 'refname': 'no label', 'zona': 'no label', 'nombre': 'no label', });
lyr_Coberturas_Lineas_30.set('fieldLabels', {'fid': 'no label', 'id': 'inline label - visible with data', 'linea': 'inline label - visible with data', 'cuenta_de': 'inline label - visible with data', 'subtotal': 'inline label - visible with data', 'iva': 'inline label - visible with data', 'total': 'inline label - visible with data', 'consumo_m3': 'inline label - visible with data', });
lyr_Cobertura_Tanques_31.set('fieldLabels', {'id_0': 'inline label - visible with data', 'fid_1': 'no label', 'id': 'no label', 'tanque': 'inline label - visible with data', 'cuenta_de': 'inline label - visible with data', 'subtotal': 'inline label - visible with data', 'iva': 'inline label - visible with data', 'total': 'inline label - visible with data', 'consumo_m3': 'inline label - visible with data', });
lyr_Horario_Servicio_BJ_32.set('fieldLabels', {'id': 'no label', 'sm': 'no label', 'area': 'no label', 'año': 'no label', 'tanque': 'no label', 'nivel_soci': 'no label', 'vialidades': 'no label', 'infra_estr': 'no label', 'infra_es_1': 'no label', 'cobertura': 'no label', 'cobertur_1': 'no label', 'consumo_pr': 'no label', 'suma_de__p': 'no label', 'factor_de': 'no label', 'carcamo': 'no label', 'fecha': 'no label', 'objectid': 'no label', 'cárcamo': 'no label', 'cárcamo_a': 'no label', 'sector': 'no label', 'sm_o_regi': 'no label', 'observacio': 'no label', 'presión_m': 'no label', 'hrs_de_ser': 'no label', 'horario_1_': 'no label', 'horario_11': 'no label', 'horario_2_': 'no label', 'horario_21': 'no label', 'presión_a': 'no label', });
lyr_Tanques_34.set('fieldLabels', { 'tanques': 'inline label - visible with data', 'estatus': 'inline label - visible with data', 'capacidad': 'inline label - visible with data', 'cvl_predio': 'no label', 'fuente': 'inline label - visible with data', 'id_pq': 'no label', 'dem_n_5': 'inline label - visible with data', 'clave_n1_4': 'inline label - visible with data', });
lyr_pozos_captacion_35.set('fieldLabels', {'id': 'no label', 'zona': 'no label', 'num': 'no label', 'estatus': 'no label', 'comentario': 'no label', 'id_pq': 'no label', 'fuente': 'no label', });
lyr_Emisor_colector_37.set('fieldLabels', {'id': 'no label', 'id_pq': 'no label', 'concepto': 'no label', 'diametro': 'no label', 'estatus': 'no label', 'long_1': 'no label', 'fuente': 'no label', 'tipo': 'no label', });
lyr_Ptar_39.set('fieldLabels', {'id': 'no label', 'ptar': 'no label', 'estatus': 'no label', 'operador': 'no label', 'zona': 'no label', 'fuente': 'no label', 'id_pq': 'no label', });
lyr_Conduccion_40.set('fieldLabels', {'id': 'no label', 'objectid_1': 'no label', 'layer': 'no label', 'estatus': 'no label', 'tipo_de_re': 'no label', 'shape_leng': 'no label', 'comentario': 'no label', 'id_pq': 'no label', 'fuente': 'no label', });
lyr_AEP_VANN_VALVULAS_5.set('fieldLabels', {'id': 'no label', 'ANCRFR': 'no label', 'COMMANDE': 'no label', 'CONCENTRAT': 'no label', 'COURBE': 'no label', 'DATE_POSE': 'no label', 'DATE_VERIF': 'no label', 'DEBIT': 'no label', 'DEGRE': 'no label', 'DIAMETRE': 'no label', 'DIVERS1': 'no label', 'DIVERS2': 'no label', 'DIVERS3': 'no label', 'ETAT': 'no label', 'FRICTION': 'no label', 'ID': 'no label', 'ID_CANA': 'no label', 'ID_CHMVAN': 'no label', 'MARQUE': 'no label', 'MATERIAU': 'no label', 'MODELE': 'no label', 'NOM': 'no label', 'NPLAN': 'no label', 'NUMERO': 'no label', 'PCHARGE': 'no label', 'PERTE_GRD': 'no label', 'POS': 'no label', 'PROFONDEUR': 'no label', 'PROF_SOL': 'no label', 'PROJET': 'no label', 'ROTAT': 'no label', 'STOUR': 'no label', 'TYPE_ACP': 'no label', 'TYPE_VAN': 'no label', 'VITESSE': 'no label', 'X': 'no label', 'Y': 'no label', 'ZN': 'no label', 'ZONE_GEO': 'no label', 'LAYERNAME': 'no label', 'DWGNAME': 'no label', 'BLOCKNAME': 'no label', 'DIAMETER': 'no label', });
lyr_Pol_Carcamo_1.set('fieldLabels', {'id': 'no label', 'Layer': 'no label', 'Nombre': 'no label', });
lyr_Pol_Tanques_2.set('fieldLabels', {'id': 'no label', 'Layer': 'no label', 'Nombre': 'no label', });
lyr_Cobertura_PTAR_BJ_0.set('fieldLabels', {'id': 'inline label - visible with data', 'Nombre': 'inline label - visible with data', 'Carcamos': 'inline label - visible with data', });
lyr_Carcamos_3.set('fieldAliases', {'id': 'id', 'carcamo': 'carcamo', 'estatus': 'estatus', 'capacidad': 'capacidad', 'id_pq': 'id_pq', 'concepto': 'concepto', 'fuente': 'fuente', 'Dem_N_5': 'Dem_N_5', 'Clave_N1_4': 'Clave_N1_4', });
lyr_Carcamos_3.set('fieldImages', {'id': 'TextEdit', 'carcamo': 'TextEdit', 'estatus': 'TextEdit', 'capacidad': 'TextEdit', 'id_pq': 'TextEdit', 'concepto': 'TextEdit', 'fuente': 'TextEdit', 'Dem_N_5': 'TextEdit', 'Clave_N1_4': 'TextEdit', });
lyr_Carcamos_3.set('fieldLabels', {'id': 'inline label - visible with data', 'carcamo': 'inline label - visible with data', 'estatus': 'inline label - visible with data', 'capacidad': 'inline label - visible with data', 'id_pq': 'inline label - visible with data', 'concepto': 'inline label - visible with data', 'fuente': 'inline label - visible with data', 'Dem_N_5': 'inline label - visible with data', 'Clave_N1_4': 'inline label - visible with data', });
lyr_Tanques_9.set('fieldAliases', {'id': 'id', 'property1': 'property1', 'estatus': 'estatus', 'nombre1': 'nombre1', 'nombre2': 'nombre2', 'id_pq': 'id_pq', 'fuente': 'fuente', 'Dem_N_5': 'Dem_N_5', 'Clave_N1_4': 'Clave_N1_4', });
lyr_Tanques_9.set('fieldImages', {'id': 'TextEdit', 'property1': 'TextEdit', 'estatus': 'TextEdit', 'nombre1': 'TextEdit', 'nombre2': 'TextEdit', 'id_pq': 'TextEdit', 'fuente': 'TextEdit', 'Dem_N_5': 'TextEdit', 'Clave_N1_4': '', });
lyr_Tanques_9.set('fieldLabels', {'id': 'inline label - visible with data', 'property1': 'inline label - visible with data', 'estatus': 'inline label - visible with data', 'nombre1': 'inline label - visible with data', 'nombre2': 'inline label - visible with data', 'id_pq': 'inline label - visible with data', 'fuente': 'inline label - visible with data', 'Dem_N_5': 'inline label - visible with data', 'Clave_N1_4': 'inline label - visible with data', });
lyr_Carcamos_25.set('fieldAliases', {'id': 'id', 'carcamo': 'carcamo', 'estatus': 'estatus', 'capacidad': 'capacidad', 'convenio': 'convenio', 'cvl_predio': 'cvl_predio', 'fuente': 'fuente', 'id_pq': 'id_pq', 'Den_N_5': 'Den_N_5', 'ClaveN1_4': 'ClaveN1_4', });
lyr_Carcamos_25.set('fieldImages', {'id': 'TextEdit', 'carcamo': 'TextEdit', 'estatus': 'TextEdit', 'capacidad': 'TextEdit', 'convenio': 'TextEdit', 'cvl_predio': 'TextEdit', 'fuente': 'TextEdit', 'id_pq': 'TextEdit', 'Den_N_5': '', 'ClaveN1_4': '', });
lyr_Carcamos_25.set('fieldLabels', {'id': 'inline label - visible with data', 'carcamo': 'inline label - visible with data', 'estatus': 'inline label - visible with data', 'capacidad': 'inline label - visible with data', 'convenio': 'inline label - visible with data', 'cvl_predio': 'inline label - visible with data', 'fuente': 'inline label - visible with data', 'id_pq': 'inline label - visible with data', 'Den_N_5': 'inline label - visible with data', 'ClaveN1_4': 'inline label - visible with data', });
lyr_Carcamos_38.set('fieldAliases', {'id': 'id', 'carcamo': 'carcamo', 'estatus': 'estatus', 'capacidad': 'capacidad', 'id_pq': 'id_pq', 'fuente': 'fuente', 'Dem_N_5': 'Dem_N_5', 'Clave_N1_4': 'Clave_N1_4', });
lyr_Carcamos_38.set('fieldImages', {'id': 'TextEdit', 'carcamo': 'TextEdit', 'estatus': 'TextEdit', 'capacidad': 'TextEdit', 'id_pq': 'TextEdit', 'fuente': 'TextEdit', 'Dem_N_5': 'TextEdit', 'Clave_N1_4': 'TextEdit', });
lyr_Carcamos_38.set('fieldLabels', {'id': 'inline label - visible with data', 'carcamo': 'inline label - visible with data', 'estatus': 'inline label - visible with data', 'capacidad': 'inline label - visible with data', 'id_pq': 'inline label - visible with data', 'fuente': 'inline label - visible with data', 'Dem_N_5': 'inline label - visible with data', 'Clave_N1_4': 'inline label - visible with data', });
lyr_Conduccion_BJ_copy_1.set('fieldAliases', {'Layer': 'Layer', 'Estatus': 'Estatus', 'Tipo_de_Re': 'Tipo_de_Re', 'Material': 'Material', 'E_PEP': 'E_PEP', 'FUENTE': 'FUENTE', 'Prof': 'Prof', 'Revision': 'Revision', 'Topo': 'Topo', 'TYCANA': 'TYCANA', 'LAYERNAME': 'LAYERNAME', 'MATERIAU': 'MATERIAU', 'DIAMETRE': 'DIAMETRE', });
//'id': 'id','OBJECTID': 'OBJECTID',
lyr_Conduccion_BJ_copy_1.set('fieldImages', {'Layer': 'TextEdit', 'Estatus': 'TextEdit', 'Tipo_de_Re': 'TextEdit', 'Material': 'TextEdit', 'E_PEP': 'TextEdit', 'FUENTE': 'TextEdit', 'Prof': 'TextEdit', 'Revision': 'DateTime', 'Topo': 'TextEdit', 'TYCANA': 'TextEdit', 'LAYERNAME': 'TextEdit', 'MATERIAU': 'TextEdit', 'DIAMETRE': 'TextEdit', });
//'id': 'TextEdit','OBJECTID': 'TextEdit',
lyr_Conduccion_BJ_copy_1.set('fieldLabels', {'Layer': 'inline label - visible with data', 'Estatus': 'inline label - visible with data', 'Tipo_de_Re': 'inline label - visible with data', 'Material': 'inline label - visible with data', 'E_PEP': 'no label', 'FUENTE': 'no label', 'Prof': 'no label', 'Revision': 'no label', 'Topo': 'no label', 'TYCANA': 'no label', 'LAYERNAME': 'no label', 'MATERIAU': 'no label', 'DIAMETRE': 'no label', });
//'id': 'inline label - visible with data','OBJECTID': 'no label',
lyr_Tanques_41.set('fieldAliases', {'id_0': 'id_0', 'id': 'id', 'tanque': 'tanque', 'estatus': 'estatus', 'capacidad': 'capacidad', 'comentario': 'comentario', 'id_pq': 'id_pq', 'fuente': 'fuente', 'dem_n_5': 'dem_n_5', 'nomenclatu': 'nomenclatu', });
lyr_Tanques_41.set('fieldImages', {'id_0': 'TextEdit', 'id': 'TextEdit', 'tanque': 'TextEdit', 'estatus': 'TextEdit', 'capacidad': 'TextEdit', 'comentario': 'TextEdit', 'id_pq': 'TextEdit', 'fuente': 'TextEdit', 'dem_n_5': 'TextEdit', 'nomenclatu': 'TextEdit', });
lyr_Tanques_41.set('fieldLabels', {'id_0': 'inline label - visible with data', 'id': 'inline label - visible with data', 'tanque': 'inline label - visible with data', 'estatus': 'inline label - visible with data', 'capacidad': 'inline label - visible with data', 'comentario': 'inline label - visible with data', 'id_pq': 'inline label - visible with data', 'fuente': 'inline label - visible with data', 'dem_n_5': 'inline label - visible with data', 'nomenclatu': 'inline label - visible with data', });
lyr_Tanques_41.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});
