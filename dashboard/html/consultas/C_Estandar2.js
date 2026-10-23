let capaSeleccionada = null;
let srsSeleccionado = "EPSG:3857";



window.abrirFormularioAssCana = async function () {
  const capaAss = "DHC_AGUAKAN:Ass_cana";
  const srs = "EPSG:3857";


 capaSeleccionada = capaAss;
  srsSeleccionado = srs;

  const urlDescribe = `https://dhcqgis.aguakan.com/geoserver/wfs?service=WFS&version=1.0.0&request=DescribeFeatureType&typeName=${capaAss}&outputFormat=application/json`;
  const urlValores = `https://dhcqgis.aguakan.com/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=${capaAss}&outputFormat=application/json&srsname=${srs}`;

  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");

  if (modal && overlay) {
    modal.style.display = "block";
    overlay.style.display = "block";
  } else {
 
  }


  try {
    const [resDescribe, resValores] = await Promise.all([
      fetch(urlDescribe),
      fetch(urlValores)
    ]);


    const jsonDescribe = await resDescribe.json();
    const jsonValores = await resValores.json();



    const propiedades = jsonDescribe.featureTypes[0].properties.filter(p => p.name !== 'geom');

    // ⚠️ Ajusta los campos según los que tenga esta nueva capa
    const campos = [ "Municipio", "diametre", "materiau", "typcana","type_res"];
    const opciones = {};

    campos.forEach(campo => {
      opciones[campo] = new Set();
    });

    jsonValores.features.forEach(f => {
      const props = f.properties;
      campos.forEach(campo => {
        if (props[campo] != null && props[campo] !== "") {
          opciones[campo].add(props[campo]);
        }
      });
    });

    for (let campo in opciones) {
      opciones[campo] = Array.from(opciones[campo]).sort();
    }

    generarFormularioAvanzado(propiedades, opciones);

    document.getElementById("ventana-formulario").style.display = "block";

  } catch (error) {
    console.error("Error al abrir el formulario:", error);
  }
};
//ieml