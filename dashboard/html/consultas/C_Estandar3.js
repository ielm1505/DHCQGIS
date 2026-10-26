window.abrirFormularioCliente = async function () {
  const capaCliente ="	DHC_AGUAKAN:vista_pm_basex7_local";
  const srs = "EPSG:3857";

  capaSeleccionada = capaCliente;
  srsSeleccionado = srs;

  const urlDescribe = `https://dhcqgis.aguakan.com/geoserver/wfs?service=WFS&version=1.0.0&request=DescribeFeatureType&typeName=${capaCliente}&outputFormat=application/json`;
  const urlValores = `https://dhcqgis.aguakan.com/geoserver/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=${capaCliente}&outputFormat=application/json&srsname=${srs}`;

  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");

  if (modal && overlay) {
    modal.style.display = "block";
    overlay.style.display = "block";
  }

  try {
    const [resDescribe, resValores] = await Promise.all([
      fetch(urlDescribe),
      fetch(urlValores)
    ]);

    const jsonDescribe = await resDescribe.json();
    const jsonValores = await resValores.json();

    const propiedades = jsonDescribe.featureTypes[0].properties.filter(p => p.name !== 'geom');
    const campos = ["localidad", "uso_desc", "giro_comercial_desc", "agua_alcantarillado", "tipo de corte", "sm", "manzana", "centro_oper", "estado_inmueble_desc"];
    const opciones = {};
    const smPorLocalidad = {};
    const localidadMap = {};

    // Inicializar sets para cada campo
    campos.forEach(campo => opciones[campo] = new Set());

    // Recorrer todas las features
    jsonValores.features.forEach(f => {
      const props = f.properties;
      const { localidad, sm } = props;

      // Guardar SM por localidad (clave sin tildes)
      if (localidad && sm) {
        const locKey = localidad.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (!smPorLocalidad[locKey]) smPorLocalidad[locKey] = new Set();
        smPorLocalidad[locKey].add(sm);
      }

      // Guardar valores únicos por campo
      campos.forEach(campo => {
        if (props[campo] != null && props[campo] !== "") {
          opciones[campo].add(props[campo]);
        }
      });
    });

    // Convertir los sets a arrays ordenados
    for (let campo in opciones) {
      opciones[campo] = Array.from(opciones[campo]).sort();
    }

    // Mapear localidades a claves sin tildes
    opciones["localidad"].forEach(loc => {
      const key = loc.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      localidadMap[loc] = key;
    });

    // Generar el formulario
    generarFormularioAvanzado(propiedades, opciones);

    // Lógica dependiente: SM por localidad
    const selectLocalidad = document.querySelector('[name="localidad__like"]');
    const selectSM = document.querySelector('[name="sm__like"]');

    if (selectLocalidad && selectSM) {
      selectSM.disabled = false;

      selectLocalidad.addEventListener("change", function () {
        const localidadSeleccionada = this.value;
        const locKey = localidadMap[localidadSeleccionada];

        selectSM.innerHTML = '<option value="">Seleccione SM</option>';
        selectSM.disabled = false;

        if (smPorLocalidad[locKey]) {
          Array.from(smPorLocalidad[locKey])
            .sort()
            .forEach(sm => {
              const opt = document.createElement("option");
              opt.value = sm;
              opt.textContent = sm;
              selectSM.appendChild(opt);
            });
          selectSM.disabled = false;
        }
      });
    }

    // Mostrar formulario flotante
    document.getElementById("ventana-formulario").style.display = "block";

  } catch (error) {
    console.error("Error al abrir el formulario:", error);
  }
};
