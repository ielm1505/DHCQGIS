function guardarCambios(features, tipo) {
    const formatWFS = new ol.format.WFS();
    const formatGML = new ol.format.GML({
        featureNS: 'http://dhcqgis.aguakan.com',
        featureType: 'DHC_AGUAKAN:Fact_Desarollo',
        srsName: 'EPSG:4326'
    });

    let node;
    if (tipo === 'insert') {
        node = formatWFS.writeTransaction(features, null, null, formatGML);
    } else if (tipo === 'update') {
        node = formatWFS.writeTransaction(null, features, null, formatGML);
    } else if (tipo === 'delete') {
        node = formatWFS.writeTransaction(null, null, features, formatGML);
    }

    const serializer = new XMLSerializer();
    const xmlString = serializer.serializeToString(node);

    fetch('/Login/proxy_wfs.php', {
        method: 'POST',
        headers: { 'Content-Type': 'text/xml' },
        body: xmlString
    })
    .then(response => response.text())
    .then(data => {
        console.log("Respuesta WFS-T:", data);
        alert("Cambios guardados correctamente.");
    })
    .catch(err => {
        console.error("Error al guardar:", err);
        alert("Error al guardar cambios.");
    });
}
