let canvasPreview = null;
let previewAbierto = false;
let printConfig = {};

const logosImg = [];
let logosCargados = false;

const BASE = {
  landscape: { w: 432, h: 279 },
  portrait: { w: 279, h: 432 }
};

// =====================
// DATOS Del pie de plano
// =====================
const datosPlano = {
  proyecto: '',
  ubicacion: '',
  plano: '',
  contenido: '',
  observaciones: '',
  municipio: '',
  clave: '',
  nplano: '',
  estado: 'Quintana Roo'
};

// =====================
// CONFIGURACIoN DE LOGOS
// =====================
function cargarLogos() {
  return new Promise((resolve) => {
    if (logosCargados) {
      resolve();
      return;
    }

    const logosConfig = [
      { src: 'Imagen/dhc.jpg' },
      { src: 'Imagen/logo-aguakan.png' },
      { src: 'Imagen/LOGO-SIN-FONDO-ESR.png' }
    ];

    let cargados = 0;
    const total = logosConfig.length;

    logosImg.length = 0;

    logosConfig.forEach((logo, index) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = function() {
        logosImg[index] = img;
        cargados++;
        
        if (cargados === total) {
          logosCargados = true;
          resolve();
        }
      };
      
      img.onerror = function() {
        console.warn(`Error cargando logo: ${logo.src}`);
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 50;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#0066cc';
        ctx.fillRect(0, 0, 100, 50);
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`LOGO ${index + 1}`, 50, 25);
        
        logosImg[index] = canvas;
        cargados++;
        
        if (cargados === total) {
          logosCargados = true;
          resolve();
        }
      };
      
      img.src = logo.src;
    });

    if (total === 0) {
      logosCargados = true;
      resolve();
    }
  });
}

// =====================
// MAPA MICRO - SLECCION DEL MUNICIPIO
// =====================
const canvasMapaMicro = document.createElement('canvas');
canvasMapaMicro.width = 500;
canvasMapaMicro.height = 150;

const capaMunicipio = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON()
  }),
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#000',
      width: 2
    }),
    fill: new ol.style.Fill({
      color: 'rgba(0,120,200,0.35)'
    })
  })
});

const mapaMicro = new ol.Map({
  target: document.createElement('div'),
  renderer: 'canvas',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    capaMunicipio
  ],
  view: new ol.View({
    projection: 'EPSG:3857'
  }),
  controls: []
});

function renderizarMapaMicro() {
  return new Promise((resolve) => {
    const municipio = datosPlano.municipio;
    if (!municipio) {
      const ctx = canvasMapaMicro.getContext('2d');
      ctx.fillStyle = '#f8f8f8';
      ctx.fillRect(0, 0, canvasMapaMicro.width, canvasMapaMicro.height);
      ctx.fillStyle = '#000';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Municipio no especificado', canvasMapaMicro.width/2, canvasMapaMicro.height/2);
      resolve();
      return;
    }

    const size = [canvasMapaMicro.width, canvasMapaMicro.height];
    mapaMicro.setSize(size);
    
    const url =
      'https://dhcqgis.aguakan.com/geoserver/wfs?' +
      'service=WFS' +
      '&version=1.1.0' +
      '&request=GetFeature' +
      '&typeName=DHC_AGUAKAN:municipioqr' +
      '&srsName=EPSG:3857' +
      '&outputFormat=application/json' +
      `&CQL_FILTER=nom_mun='${municipio}'`;

    capaMunicipio.getSource().clear();

    fetch(url)
      .then(r => r.json())
      .then(data => {
        const features = new ol.format.GeoJSON().readFeatures(data);
        if (!features.length) {
          const ctx = canvasMapaMicro.getContext('2d');
          ctx.fillStyle = '#f8f8f8';
          ctx.fillRect(0, 0, canvasMapaMicro.width, canvasMapaMicro.height);
          ctx.fillStyle = '#000';
          ctx.font = '14px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(`Municipio: ${municipio}`, canvasMapaMicro.width/2, canvasMapaMicro.height/2);
          resolve();
          return;
        }

        capaMunicipio.getSource().addFeatures(features);

        const extent = capaMunicipio.getSource().getExtent();
        mapaMicro.getView().fit(extent, {
          size,
          padding: [10, 10, 10, 10]
        });

        mapaMicro.once('rendercomplete', () => {
          const sourceCanvas = mapaMicro
            .getViewport()
            .querySelector('canvas');

          const ctxMicro = canvasMapaMicro.getContext('2d');
          ctxMicro.clearRect(0, 0, canvasMapaMicro.width, canvasMapaMicro.height);
          
          if (sourceCanvas) {
            ctxMicro.drawImage(sourceCanvas, 0, 0);
          } else {
            ctxMicro.fillStyle = '#f8f8f8';
            ctxMicro.fillRect(0, 0, canvasMapaMicro.width, canvasMapaMicro.height);
            ctxMicro.fillStyle = '#000';
            ctxMicro.font = '14px Arial';
            ctxMicro.textAlign = 'center';
            ctxMicro.textBaseline = 'middle';
            ctxMicro.fillText(`Municipio: ${municipio}`, canvasMapaMicro.width/2, canvasMapaMicro.height/2);
          }

          resolve();
        });

        mapaMicro.renderSync();
      })
      .catch(error => {
        console.error('Error cargando mapa micro:', error);
        const ctx = canvasMapaMicro.getContext('2d');
        ctx.fillStyle = '#f8f8f8';
        ctx.fillRect(0, 0, canvasMapaMicro.width, canvasMapaMicro.height);
        ctx.fillStyle = '#000';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`Municipio: ${municipio}`, canvasMapaMicro.width/2, canvasMapaMicro.height/2);
        resolve();
      });
  });
}

// =====================
// MAPA MACROLOCALIZACION - QUINTANA ROO
// =====================
const canvasMapaMacro = document.createElement('canvas');
canvasMapaMacro.width = 300;
canvasMapaMacro.height = 200;

const mapaMacro = new ol.Map({
  target: document.createElement('div'),
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    projection: 'EPSG:3857',
    center: [-9793880, 2253000],
    zoom: 4
  }),
  controls: []
});

function renderizarMapaMacro() {
  return new Promise((resolve) => {
    const size = [canvasMapaMacro.width, canvasMapaMacro.height];
    mapaMacro.setSize(size);

    mapaMacro.getView().fit(
      [-9940000, 2130000, -9650000, 2580000],
      { size }                       //centra en el mapa el estado de quintana Roo
    );

    mapaMacro.once('rendercomplete', () => {
      const sourceCanvas = mapaMacro
        .getViewport()
        .querySelector('canvas');

      if (!sourceCanvas) {
        console.error('No se encontró canvas del macromapa');
        const ctxMacro = canvasMapaMacro.getContext('2d');
        ctxMacro.clearRect(0, 0, canvasMapaMacro.width, canvasMapaMacro.height);
        ctxMacro.fillStyle = '#f8f8f8';
        ctxMacro.fillRect(0, 0, canvasMapaMacro.width, canvasMapaMacro.height);
        ctxMacro.fillStyle = '#000';
        ctxMacro.font = '14px Arial';
        ctxMacro.textAlign = 'center';
        ctxMacro.textBaseline = 'middle';
        ctxMacro.fillText('Macrolocalización: Quintana Roo', canvasMapaMacro.width/2, canvasMapaMacro.height/2);
        resolve();
        return;
      }

      const ctxMacro = canvasMapaMacro.getContext('2d');
      ctxMacro.clearRect(0, 0, canvasMapaMacro.width, canvasMapaMacro.height);
      ctxMacro.drawImage(sourceCanvas, 0, 0);

      resolve();
    });

    mapaMacro.renderSync();
  });
}

// =====================
// FUNCIONES BÁSICAS ABRIR y CERRAR APLICATIVO DE IMPREION
// =====================
function abrirPrint() {
  previewAbierto = true;
  document.getElementById('printPanel').style.display = 'block';
  generarPreview();
}

function cerrarPrint() {
  previewAbierto = false;
  document.getElementById('printPanel').style.display = 'none';
}

function actualizarDatosPlano() {
  datosPlano.proyecto = document.getElementById('txtProyecto')?.value || '';
  datosPlano.ubicacion = document.getElementById('txtUbicacion')?.value || '';
  datosPlano.plano = document.getElementById('txtPlano')?.value || '';
  datosPlano.contenido = document.getElementById('txtContenido')?.value || '';
  datosPlano.observaciones = document.getElementById('txtcomentarios')?.value || '';
  datosPlano.clave = document.getElementById('txtclave')?.value || '';
  datosPlano.nplano = document.getElementById('txtnplano')?.value || '';
  datosPlano.municipio = document.getElementById('txtmunicipio')?.value || '';
}

// =====================
// FUNCIONES aUXILIARES oBTENER 
// =====================
function ajustarTexto(texto, maxWidth) {
  const ctx = document.createElement('canvas').getContext('2d');
  ctx.font = '12px Arial';
  
  if (typeof texto !== 'string') texto = String(texto || '');
  const palabras = texto.split(' ');
  const lineas = [];
  let lineaActual = '';
  
  for (let i = 0; i < palabras.length; i++) {
    const palabra = palabras[i];
    const medida = ctx.measureText(lineaActual + (lineaActual ? ' ' : '') + palabra);
    
    if (medida.width < maxWidth || lineaActual === '') {
      lineaActual += (lineaActual ? ' ' : '') + palabra;
    } else {
      lineas.push(lineaActual);
      lineaActual = palabra;
    }
  }
  
  if (lineaActual) {
    lineas.push(lineaActual);
  }
  
  return lineas.length > 0 ? lineas : [texto];
}

function formatearNumero(numero) {
  if (!numero) return '0';
  return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function obtenerFechaActual() {
  const hoy = new Date();
  const dia = String(hoy.getDate()).padStart(2, '0');
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const anio = hoy.getFullYear();
  return `${dia}/${mes}/${anio}`;
}

function calcularEscalaDesdeResolucion(resolucion, dpi = 150) {
  const pulgadasPorMetro = 39.37;
  return Math.round(resolucion * dpi * pulgadasPorMetro);
}

// =====================
// FUNCIONES DE Integrcion DE la leyenda LEYENDA -
// =====================

// Función para obtener capas visibles del mapa
function obtenerCapasVisibles(layers, filtroFunc) {
  const resultado = [];
  
  function procesarLayer(layer) {
    // Si es un grupo de capas, procesar recursivamente
    if (layer instanceof ol.layer.Group) {
      const subLayers = layer.getLayers();
      subLayers.forEach(procesarLayer);
      return;
    }
    
    // Si es una capa individual, aplicar filtro
    if (filtroFunc(layer)) {
      resultado.push(layer);
    }
  }
  
  layers.forEach(procesarLayer);
  return resultado;
}

// Función que valida si una capa es valida para integrarse a la leyenda
function capaValidaParaLeyenda(layer) {
  if (!layer.getVisible || !layer.getVisible()) return false;
  if (!layer.get('title')) return false;
  if (layer instanceof ol.layer.Vector) return true;
  
  if (layer instanceof ol.layer.Tile || layer instanceof ol.layer.Image) {
    const source = layer.getSource ? layer.getSource() : null;
    return source && (source instanceof ol.source.TileWMS || 
                      source instanceof ol.source.ImageWMS);
  }
  
  return false;
}

// Función para construir item de leyenda
function construirItemLeyenda(layer) {
  // Verificar que layer tenga métodos necesarios
  if (!layer || !layer.get) return null;
  
  const titulo = layer.get('title');
  if (!titulo) return null;
  
  if (layer instanceof ol.layer.Vector) {
    return { tipo: 'vector', titulo: titulo, layer: layer };
  }
  
  if (layer instanceof ol.layer.Tile || layer instanceof ol.layer.Image) {
    const source = layer.getSource ? layer.getSource() : null;
    if (source && (source instanceof ol.source.TileWMS || 
                   source instanceof ol.source.ImageWMS)) {
      
      const params = source.getParams ? source.getParams() : {};
      const layerName = params.LAYERS;
      
      let baseUrl;
      if (source.getUrls) {
        baseUrl = source.getUrls()[0];
      } else if (source.getUrl) {
        baseUrl = source.getUrl();
      } else {
        return null;
      }
      
      return {
        tipo: 'wms',
        titulo: titulo,
        legendUrl: `${baseUrl}?SERVICE=WMS&REQUEST=GetLegendGraphic&FORMAT=image/png&LAYER=${layerName}`,
        layer: layer
      };
    }
  }
  
  return null;
}

// Funcion que permite identificar si la cpaa es de tipo WFS o WMS
function obtenerCapasActivasLeyenda() {
  const items = [];
  
  if (!window.map || !map.getLayers) {
    console.warn('Mapa no disponible para obtener leyenda');
    return items;
  }
  
  try {
    // Obtener todas las capas visibles del mapa
    const capasVisibles = obtenerCapasVisibles(
      map.getLayers().getArray(),
      capaValidaParaLeyenda
    );
    
    // Construir items de leyenda
    capasVisibles.forEach(layer => {
      const item = construirItemLeyenda(layer);
      if (item) items.push(item);
    });
    
  } catch (error) {
    console.error('Error obteniendo capas activas:', error);
  }
  
  return items;
}

// Función para parsear HTML de leyenda (para capas vectoriales con HTML en el título)
function parsearHTMLLeyenda(html) {
  if (!html) return { titulo: 'Sin título', items: [] };
  
  const partes = String(html).split(/<br\s*\/?>/i).map(p => p.trim()).filter(Boolean);
  const titulo = partes.shift()?.replace(/<[^>]*>/g, '') || 'Sin título';
  
  const items = partes.map(p => {
    const imgMatch = p.match(/<img[^>]*src=["']([^"']+)["']/i);
    const texto = p.replace(/<[^>]*>/g, '').trim();
    return { img: imgMatch ? imgMatch[1] : null, texto: texto || 'Elemento' };
  });
  
  return { titulo, items };
}

// Función para obtener símbolos de capas vectoriales
function obtenerSimbolosVector(layer) {
  const simbolos = [];
  
  try {
    const style = layer.getStyle();
    
    if (style instanceof ol.style.Style) {
      // Estilo simple
      const fill = style.getFill();
      const stroke = style.getStroke();
      const image = style.getImage();
      
     
    } 
  } catch (error) {
   
  }
  
  return simbolos;
}

// =====================
// FUNCIONES DE DIBUJO de los marcos de LAYOUT
// =====================
function definirLayoutFinal(canvasW, canvasH, formato, orientacion, dpi) {
  const pxPorMm = dpi / 25.4;
  const baseMM = orientacion === 'landscape' 
    ? { w: 432, h: 279 } 
    : { w: 279, h: 432 };
  
  const baseW = baseMM.w * pxPorMm;
  const baseH = baseMM.h * pxPorMm;
  
  const scaleX = canvasW / baseW;
  const scaleY = canvasH / baseH;
  const scale = Math.min(scaleX, scaleY);
  
  const S = v => v * scale;
  const box = (x, y, w, h) => ({
    x: S(x),
    y: S(y),
    width: S(w),
    height: S(h)
  });
  
  let base;
  if (orientacion === 'landscape') {
    base = {
      mapa: { x: 40, y: 40, w: baseW-600, h: baseH -80 },
      leyenda: { x: 2000, y: 200, w: 510, h: 810 },
      leyenda1: { x: 2000, y: 40, w: 250, h: 150 },
      leyenda2: { x: 2260, y: 40, w: 250, h: 150 },
      texto: { x: 2000, y: 1020, w: 270, h: 50 },
      texto1: { x: 2000, y: 1080, w: 270, h: 50 },
      texto2: { x: 2280, y: 1020, w: 230, h: 50 },
      texto3: { x: 2280, y: 1080, w: 230, h: 50 },
      sello: { x: 2000, y: 1140, w: 270, h: 150 },
      sello1: { x: 2000, y: 1300, w: 270, h: 150 },
      observaciones: { x: 2280, y: 1140, w: 230, h: 150 },
      fecha: { x: 2280, y: 1300, w: 115, h: 70 },
      localidad: { x: 2280, y: 1380, w: 115, h: 70 },
      clave: { x: 2400, y: 1300, w: 110, h: 70 },
      nplano: { x: 2400, y: 1380, w: 110, h: 70 },
      logos: { x: 2000, y: 1460, w: 510, h: 150 }
    };
  } else {
    base = {
      mapa: { x: 40, y: 40, w: baseW-80, h: baseH-500 },
      leyenda: { x: baseW-1605, y: 2200, w: 460, h: 310 },
      leyenda1: { x: baseW-1130, y: 2200, w: 250, h: 150 },
      leyenda2: { x: baseW-1130, y: 2360, w: 250, h: 150 },
      texto: { x: baseW-310, y: 2260, w: 270, h: 50 },
      texto1: { x: baseW-310, y: 2200, w: 270, h: 50 },
      texto2: { x: baseW-310, y: 2320, w: 270, h: 50 },
      texto3: { x: baseW-310, y: 2380, w: 270, h: 50 },
      sello: { x: baseW-590, y: 2200, w: 270, h: 150 },
      sello1: { x: baseW-590, y: 2360, w: 270, h: 150 },
      observaciones: { x: baseW-870, y: 2200, w: 270, h: 150 },
      fecha: { x: baseW-870, y: 2360, w: 120, h: 70 },
      localidad: { x: baseW-870, y: 2440, w: 120, h: 70 },
      clave: { x: baseW-740, y: 2360, w: 140, h: 70 },
      nplano: { x: baseW-740, y: 2440, w: 140, h: 70 },
      logos: { x: baseW-550, y: 2460, w: 410, h: 150 }
    };
  }
  
  const layout = {};
  Object.keys(base).forEach(k => {
    const b = base[k];
    layout[k] = box(b.x, b.y, b.w, b.h);
  });
  
  return layout;
}

function dibujarMarcoMapa(ctx, layout) {
  ctx.save();
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 3;
  ctx.strokeRect(layout.mapa.x, layout.mapa.y, layout.mapa.width, layout.mapa.height);
  ctx.restore();
}

function dibujarMarcoHoja(ctx, canvas) {
  ctx.save();
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
  ctx.restore();
}

// Función de dibujo de leyenda CORREGIDA
function dibujarMarcoLeyenda(ctx, layout) {
  const { x, y, width, height } = layout.leyenda;
  
  ctx.save();
  
  // Fondo
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.fillRect(x, y, width, height);
  
  // Marco
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, width, height);
  
  // Título
  ctx.fillStyle = '#000';
  ctx.font = 'bold 16px Arial';
  ctx.fillText('LEYENDA', x + 10, y + 25);
  
  // Obtener capas activas reales
  const items = obtenerCapasActivasLeyenda();
  let offsetY = y + 45;
  
  if (items.length === 0) {
    ctx.font = '12px Arial';
    ctx.fillText('Sin capas activas', x + 10, offsetY);
    ctx.restore();
    return;
  }
  
  // Dibujar cada capa
  items.forEach(item => {
    if (item.tipo === 'vector') {
      const data = parsearHTMLLeyenda(item.titulo);
      
      // Título de la capa
      ctx.font = 'bold 13px Arial';
      ctx.fillStyle = '#000';
      ctx.fillText(data.titulo || item.titulo, x + 10, offsetY);
      offsetY += 18;
      
      // Si hay items en el HTML, usarlos
      if (data.items && data.items.length > 0) {
        ctx.font = '12px Arial';
        data.items.forEach(sym => {
          if (sym.img) {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = sym.img;
            img.onload = () => {
              ctx.drawImage(img, x + 15, offsetY - 12, 16, 16);
            };
          } else {
            ctx.fillStyle = '#1f78b4';
            ctx.fillRect(x + 15, offsetY - 12, 16, 16);
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 15, offsetY - 12, 16, 16);
          }
          
          ctx.fillStyle = '#000';
          ctx.fillText(sym.texto || '', x + 40, offsetY);
          offsetY += 18;
        });
      } else {
        // Obtener símbolos de la capa vectorial
        const simbolos = obtenerSimbolosVector(item.layer);
        ctx.font = '12px Arial';
        
        if (simbolos.length > 0) {
          simbolos.forEach(simbolo => {
            if (simbolo.icon) {
              const img = new Image();
              img.crossOrigin = 'anonymous';
              img.src = simbolo.icon;
              img.onload = () => {
                ctx.drawImage(img, x + 15, offsetY - 12, 16, 16);
              };
            } else {
              ctx.fillStyle = simbolo.color;
              ctx.fillRect(x + 15, offsetY - 12, 16, 16);
              ctx.strokeStyle = '#000';
              ctx.lineWidth = 1;
              ctx.strokeRect(x + 15, offsetY - 12, 16, 16);
            }
            
            ctx.fillStyle = '#000';
            ctx.fillText(simbolo.texto, x + 40, offsetY);
            offsetY += 18;
          });
        } 
      }
      
      offsetY += 6;
    }
    
    if (item.tipo === 'wms') {
      ctx.font = 'bold 13px Arial';
      ctx.fillStyle = '#000';
      ctx.fillText(item.titulo || '', x + 10, offsetY);
      offsetY += 20;
      
      // Cargar y dibujar leyenda WMS
      if (item.legendUrl) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = item.legendUrl;
        
        img.onload = () => {
          const maxWidth = 140;
          const scale = Math.min(1, maxWidth / img.width);
          const drawWidth = img.width * scale;
          const drawHeight = img.height * scale;
          
          ctx.drawImage(img, x + 10, offsetY, drawWidth, drawHeight);
        };
        
        // Reservar espacio para la imagen
        offsetY += 50; // Espacio estimado
      }
      
      offsetY += 10;
    }
  });
  
  ctx.restore();
}

function dibujarMarcoLeyenda1(ctx, layout) {
  const { x, y, width, height } = layout.leyenda1;
  const padding = 6;
  
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, width, height);
  ctx.fillStyle = '#000';
  ctx.font = 'bold 7px Arial';
  ctx.fillText('Microlocalización (Municipio)', x + 5, y + 10);
  
  if (canvasMapaMicro) {
    ctx.drawImage(
      canvasMapaMicro,
      0, 0,
      canvasMapaMicro.width,
      canvasMapaMicro.height,
      x + padding,
      y + 14,
      width - padding * 2,
      height - 20
    );
  }
  
  ctx.restore();
}

function dibujarMarcoLeyenda2(ctx, layout) {
  const { x, y, width, height } = layout.leyenda2;
  const padding = 8;
  
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, width, height);
  ctx.fillStyle = '#000';
  ctx.font = 'bold 7px Arial';
  ctx.fillText('Macrolocalización', x + 5, y + 10);
  
  if (canvasMapaMacro) {
    ctx.drawImage(
      canvasMapaMacro,
      0, 0,
      canvasMapaMacro.width,
      canvasMapaMacro.height,
      x + padding,
      y + 14,
      width - padding * 2,
      height - 20
    );
  }
  
  ctx.restore();
}

function dibujarMarcotexto(ctx, layout) {
  const { x, y, width, height } = layout.texto;
  
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, width, height);
  ctx.fillStyle = '#000';
  ctx.font = 'bold 10px Arial';
  ctx.fillText('PROYECTO:', x + 5, y + 12);
  
  ctx.font = '12px Arial';
  const proyecto = datosPlano.proyecto || 'Sin especificar';
  const lineas = ajustarTexto(proyecto, width - 10);
  let yTexto = y + 28;
  
  lineas.forEach(linea => {
    ctx.fillText(linea, x + 5, yTexto);
    yTexto += 14;
  });
  
  ctx.restore();
}

function dibujarMarcotexto1(ctx, layout) {
  const { x, y, width, height } = layout.texto1;
  
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, width, height);
  ctx.fillStyle = '#000';
  ctx.font = 'bold 10px Arial';
  ctx.fillText('UBICACIÓN:', x + 5, y + 12);
  
  ctx.font = '12px Arial';
  const ubicacion = datosPlano.ubicacion || 'Sin especificar';
  const lineas = ajustarTexto(ubicacion, width - 10);
  let yTexto = y + 28;
  
  lineas.forEach(linea => {
    ctx.fillText(linea, x + 5, yTexto);
    yTexto += 14;
  });
  
  ctx.restore();
}

function dibujarMarcotexto2(ctx, layout) {
  const { x, y, width, height } = layout.texto2;
  
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, width, height);
  ctx.fillStyle = '#000';
  ctx.font = 'bold 10px Arial';
  ctx.fillText('PLANO:', x + 5, y + 12);
  
  ctx.font = '12px Arial';
  const plano = datosPlano.plano || 'Sin especificar';
  const lineas = ajustarTexto(plano, width - 10);
  let yTexto = y + 28;
  
  lineas.forEach(linea => {
    ctx.fillText(linea, x + 5, yTexto);
    yTexto += 14;
  });
  
  ctx.restore();
}

function dibujarMarcotexto3(ctx, layout) {
  const { x, y, width, height } = layout.texto3;
  
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, width, height);
  ctx.fillStyle = '#000';
  ctx.font = 'bold 10px Arial';
  ctx.fillText('CONTENIDO:', x + 5, y + 12);
  
  ctx.font = '12px Arial';
  const contenido = datosPlano.contenido || 'Sin especificar';
  const lineas = ajustarTexto(contenido, width - 10);
  let yTexto = y + 28;
  
  lineas.forEach(linea => {
    ctx.fillText(linea, x + 5, yTexto);
    yTexto += 14;
  });
  
  ctx.restore();
}

function dibujarMarcofecha(ctx, layout, map) {
  const { x, y, width, height } = layout.fecha;
  
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, width, height);
  ctx.fillStyle = '#000';
  
  const fechaActual = obtenerFechaActual();
  
  let escala = '1:1,000';
  if (map && map.getView) {
    const resolucion = map.getView().getResolution();
    if (resolucion) {
      const escalaMetros = calcularEscalaDesdeResolucion(resolucion);
      escala = `1:${formatearNumero(escalaMetros)}`;
    }
  }
  
  ctx.font = 'bold 7px Arial';
  ctx.fillText('FECHA:', x + 5, y + 12);
  ctx.font = '11px Arial';
  ctx.fillText(fechaActual, x + 5, y + 25);
  
  ctx.font = 'bold 7px Arial';
  ctx.fillText('ESCALA (m):', x + 5, y + 42);
  ctx.font = '11px Arial';
  ctx.fillText(escala, x + 5, y + 55);
  
  ctx.restore();
}

function dibujarMarcolocalidad(ctx, layout) {
  const { x, y, width, height } = layout.localidad;
  
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, width, height);
  ctx.fillStyle = '#000';
  
  ctx.font = 'bold 7px Arial';
  ctx.fillText('ESTADO:', x + 5, y + 12);
  ctx.font = '12px Arial';
  const estado = datosPlano.estado || 'Quintana Roo';
  ctx.fillText(estado, x + 5, y + 30);
  
  ctx.font = 'bold 7px Arial';
  ctx.fillText('MUNICIPIO:', x + 5, y + 45);
  ctx.font = '12px Arial';
  const municipio = datosPlano.municipio || 'Sin especificar';
  const lineas = ajustarTexto(municipio, width - 10);
  let yTexto = y + 60;
  
  lineas.forEach(linea => {
    ctx.fillText(linea, x + 5, yTexto);
    yTexto += 14;
  });
  
  ctx.restore();
}

function dibujarMarcoclave(ctx, layout) {
  const { x, y, width, height } = layout.clave;
  
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, width, height);
  ctx.fillStyle = '#000';
  ctx.font = 'bold 7px Arial';
  ctx.fillText('CLAVE:', x + 5, y + 12);
  
  ctx.font = '12px Arial';
  const clave = datosPlano.clave || 'Sin especificar';
  const lineas = ajustarTexto(clave, width - 10);
  let yTexto = y + 38;
  
  lineas.forEach(linea => {
    ctx.fillText(linea, x + 5, yTexto);
    yTexto += 14;
  });
  
  ctx.restore();
}

function dibujarMarconplano(ctx, layout) {
  const { x, y, width, height } = layout.nplano;
  
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, width, height);
  ctx.fillStyle = '#000';
  ctx.font = 'bold 7px Arial';
  ctx.fillText('No. PLANO:', x + 5, y + 12);
  
  ctx.font = '20px Arial';
  const nplano = datosPlano.nplano || '0000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(nplano, x + width/2, y + height/2);
  
  ctx.restore();
}

function dibujarMarcoObservaciones(ctx, layout) {
  const { x, y, width, height } = layout.observaciones;
  
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, width, height);
  ctx.fillStyle = '#000';
  ctx.font = 'bold 10px Arial';
  ctx.fillText('OBSERVACIONES', x + 5, y + 10);
  
  ctx.font = '12px Arial';
  const observaciones = datosPlano.observaciones || 'Sin observaciones';
  const lineas = ajustarTexto(observaciones, width - 10);
  let yTexto = y + 28;
  
  lineas.forEach(linea => {
    ctx.fillText(linea, x + 5, yTexto);
    yTexto += 14;
  });
  
  ctx.restore();
}

function dibujarMarcosello(ctx, layout) {
  const { x, y, width, height } = layout.sello;
  
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, width, height);
  ctx.fillStyle = '#000';
  ctx.font = 'bold 10px Arial';
  ctx.fillText('SELLOS DE AUTORIZACIÓN', x + 5, y + 10);
  
  ctx.beginPath();
  ctx.moveTo(x + 10, y + height - 20);
  ctx.lineTo(x + width - 10, y + height - 20);
  ctx.stroke();
  
  ctx.font = '8px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('FIRMA Y SELLO', x + width/2, y + height - 10);
  
  ctx.restore();
}

function dibujarMarcosello1(ctx, layout) {
  const { x, y, width, height } = layout.sello1;
  
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, width, height);
  ctx.fillStyle = '#000';
  ctx.font = 'bold 10px Arial';
  ctx.fillText('SELLOS DE AUTORIZACIÓN', x + 5, y + 10);
  
  ctx.beginPath();
  ctx.moveTo(x + 10, y + height - 20);
  ctx.lineTo(x + width - 10, y + height - 20);
  ctx.stroke();
  
  ctx.font = '8px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('FIRMA Y SELLO', x + width/2, y + height - 10);
  
  ctx.restore();
}

function dibujarMarcologo(ctx, layout) {
  const { x, y, width, height } = layout.logos;
  ctx.save();
  
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, width, height);
  
  ctx.fillStyle = '#000';
  ctx.font = 'bold 10px Arial';
  ctx.fillText('LOGOS', x + 10, y + 15);
  
  if (!logosCargados || logosImg.length === 0) {
    ctx.font = '12px Arial';
    ctx.fillStyle = '#666';
    ctx.fillText('Logos no disponibles', x + width/2, y + height/2);
    ctx.restore();
    return;
  }
  
  const padding = 15;
  const espacio = 20;
  const logosCount = Math.min(logosImg.length, 3);
  const logoWidth = (width - padding * 2 - espacio * (logosCount - 1)) / logosCount;
  const logoHeight = height - padding * 2 - 10;
  
  logosImg.forEach((img, i) => {
    if (i >= 3) return;
    
    const lx = x + padding + i * (logoWidth + espacio);
    const ly = y + padding + 10;
    
    if (img instanceof HTMLImageElement && img.complete) {
      const scale = Math.min(logoWidth / img.width, logoHeight / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      
      const offsetX = lx + (logoWidth - w) / 2;
      const offsetY = ly + (logoHeight - h) / 2;
      
      ctx.drawImage(img, offsetX, offsetY, w, h);
    } else if (img instanceof HTMLCanvasElement) {
      const scale = Math.min(logoWidth / img.width, logoHeight / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      
      const offsetX = lx + (logoWidth - w) / 2;
      const offsetY = ly + (logoHeight - h) / 2;
      
      ctx.drawImage(img, offsetX, offsetY, w, h);
    } else {
      ctx.fillStyle = '#0066cc';
      ctx.fillRect(lx, ly, logoWidth, logoHeight);
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`LOGO ${i+1}`, lx + logoWidth/2, ly + logoHeight/2);
    }
  });
  
  ctx.restore();
}

// =====================
// FUNCIONES DE GESTIoN DE MAPA
// =====================
function guardarVistaMapa(map) {
  const view = map.getView();
  return {
    center: view.getCenter().slice(),
    resolution: view.getResolution(),
    size: map.getSize().slice()
  };
}

function restaurarVistaMapa(map, vista) {
  const view = map.getView();
  map.setSize(vista.size);
  view.setResolution(vista.resolution);
  view.setCenter(vista.center);
  map.renderSync();
}




//_---------------------

function dibujarMapaCompletoEnCanvas(ctx, map, layout) {
  const mapCanvases = map.getViewport().querySelectorAll('canvas');
  if (!mapCanvases || mapCanvases.length === 0) {
    console.warn('No se encontraron canvas del mapa');
    return;
  }

  const dstW = layout.mapa.width;
  const dstH = layout.mapa.height;

  // Tomamos el tamaño real del primer canvas como referencia
  const refCanvas = mapCanvases[0];
  const srcW = refCanvas.width;
  const srcH = refCanvas.height;

  const scale = Math.max(dstW / srcW, dstH / srcH);
  const drawW = srcW * scale;
  const drawH = srcH * scale;

  const offsetX = layout.mapa.x + (dstW - drawW) / 2;
  const offsetY = layout.mapa.y + (dstH - drawH) / 2;

  ctx.save();
  ctx.beginPath();
  ctx.rect(layout.mapa.x, layout.mapa.y, dstW, dstH);
  ctx.clip();

  mapCanvases.forEach(canvas => {
    if (canvas.width > 0 && canvas.height > 0) {
      const opacity = canvas.parentNode?.style?.opacity;
      ctx.globalAlpha = opacity === '' || opacity == null ? 1 : Number(opacity);
      ctx.drawImage(canvas, offsetX, offsetY, drawW, drawH);
    }
  });

  ctx.restore();
  ctx.globalAlpha = 1;
}



//----------------















// =====================
// FUNCIÓN PRINCIPAL DE GENERAR PREVIEW
// =====================
async function generarPreview() {
  try {
    console.log('Iniciando generación de preview...');
    
    actualizarDatosPlano();
    
    const formato = document.getElementById('formato').value;
    const orientacion = document.getElementById('orientacion').value;
    const dpi = 150;
    const pxPorMm = dpi / 25.4;
    
    const dimensiones = {
      carta: [210, 279],
      a4: [210, 297],
      a3: [297, 420],
      tabloide: [279, 432],
      arch_d: [610, 914],
      arch_e: [914, 1219]
    };
    
    let [wMM, hMM] = dimensiones[formato];
    if (orientacion === 'landscape') [wMM, hMM] = [hMM, wMM];
    
    const canvasW = Math.round(wMM * pxPorMm);
    const canvasH = Math.round(hMM * pxPorMm);
    
    printConfig = { w: wMM, h: hMM, formato, orientacion };
    
    const vistaOriginal = guardarVistaMapa(map);
    const center = map.getView().getCenter();
    const resolution = map.getView().getResolution();
    
    const layout = definirLayoutFinal(canvasW, canvasH, formato, orientacion, dpi);
    
    map.setSize([
      Math.round(layout.mapa.width),
      Math.round(layout.mapa.height)
    ]);

    
    map.updateSize();
    
    map.getView().setCenter(center);
    map.getView().setResolution(resolution);
    
    map.renderSync();
    
    await new Promise(resolve => {
      map.once('rendercomplete', () => {
        setTimeout(resolve, 100);
      });
    });
    
    const canvas = document.createElement('canvas');
    canvas.width = canvasW;
    canvas.height = canvasH;
    canvas.style.width = canvasW + 'px';
    canvas.style.height = canvasH + 'px';
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
  // Forzar render completo antes de capturar
map.renderSync();
await new Promise(r => setTimeout(r, 150));

// Dibujar mapa (WMS + vectores)
dibujarMapaCompletoEnCanvas(ctx, map, layout);

    
    dibujarMarcoMapa(ctx, layout);
    dibujarMarcoLeyenda(ctx, layout); // Ahora muestra capas reales
    dibujarMarcotexto(ctx, layout);
    
    await Promise.all([
      renderizarMapaMicro(),
      renderizarMapaMacro()
    ]);
    
    dibujarMarcoLeyenda1(ctx, layout);
    dibujarMarcoLeyenda2(ctx, layout);
    
    dibujarMarcotexto1(ctx, layout);
    dibujarMarcotexto2(ctx, layout);
    dibujarMarcotexto3(ctx, layout);
    dibujarMarcosello(ctx, layout);
    dibujarMarcosello1(ctx, layout);
    dibujarMarcofecha(ctx, layout, map);
    dibujarMarcolocalidad(ctx, layout);
    dibujarMarcoclave(ctx, layout);
    dibujarMarconplano(ctx, layout);
    
    await cargarLogos();
    dibujarMarcologo(ctx, layout);
    
    dibujarMarcoObservaciones(ctx, layout);
    dibujarMarcoHoja(ctx, canvas);
    
    canvasPreview = canvas;
    mostrarPreview(canvas);
    
    restaurarVistaMapa(map, vistaOriginal);
    map.updateSize();
    
    console.log('Preview generado exitosamente');
    
  } catch (error) {
    console.error('Error generando preview:', error);
    alert('Error al generar el preview: ' + error.message);
  }
}

// =====================
// MOSTRAR PREVIEW
// =====================
function mostrarPreview(canvas) {
  const prev = document.getElementById('previewCanvas');
  if (!prev) {
    console.error('No se encontró elemento previewCanvas');
    return;
  }
  
  prev.width = canvas.width;
  prev.height = canvas.height;
  
  const ctx = prev.getContext('2d');
  ctx.clearRect(0, 0, prev.width, prev.height);
  ctx.drawImage(canvas, 0, 0);
}

// =====================
// CONFIRMAR IMPRESIÓN
// =====================
function confirmarImpresion(tipo) {
  if (!canvasPreview) return alert('No hay preview generado');
  
  const { w, h, formato, orientacion } = printConfig;
  if (!w || !h) {
    alert('Error en tamaño de impresión');
    return;
  }
  
  const img = canvasPreview.toDataURL('image/png');
  
  if (tipo === 'pdf') {
    const pdf = new jspdf.jsPDF({
      orientation: orientacion,
      unit: 'mm',
      format: (formato === 'a4' || formato === 'a3') ? formato : [w, h]
    });
    pdf.addImage(img, 'PNG', 0, 0, w, h);
    pdf.save(`mapa_${formato}.pdf`);
  } else if (tipo === 'imagen') {
    const link = document.createElement('a');
    link.href = img;
    link.download = `mapa_${formato}.png`;
    link.click();
  } else {
    const win = window.open('');
    win.document.write(`
      <html>
      <head>
        <style>
          @page { size:${w}mm ${h}mm; margin:0 }
          body { margin:0 }
          img { width:100% }
        </style>
      </head>
      <body>
        <img src="${img}">
        <script>window.onload=()=>window.print()<\/script>
      </body>
      </html>
    `);
    win.document.close();
  }
  
  cerrarPrint();
}

// =====================
// EVENT LISTENERS
// =====================
document.addEventListener('DOMContentLoaded', function() {
  const modoEscala = document.getElementById('modoEscala');
  if (modoEscala) {
    modoEscala.addEventListener('change', e => {
      const escalaInput = document.getElementById('escala');
      if (escalaInput) {
        escalaInput.disabled = e.target.value === 'ajustar';
      }
    });
  }
  
  const inputs = ['txtProyecto', 'txtUbicacion', 'txtPlano', 'txtContenido', 
                  'txtcomentarios', 'txtclave', 'txtnplano', 'txtmunicipio'];
  
  inputs.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', () => {
        actualizarDatosPlano();
        if (previewAbierto) {
          generarPreview();
        }
      });
    }
  });
});