function contarPuntosDeMedicion(idCana) {
  const wfsUrl = 'https://tu-servidor-geoserver/geoserver/DHC_AGUAKAN/ows';
  
  const params = new URLSearchParams({
    service: 'WFS',
    version: '1.1.0',
    request: 'GetFeature',
    typename: 'DHC_AGUAKAN:Puntos_de_medicion',
    outputFormat: 'application/json',
    CQL_FILTER: `id_cana='${idCana}'`
  });

  fetch(`${wfsUrl}?${params.toString()}`)
    .then(response => response.json())
    .then(data => {
      const numPuntos = data.features.length;
      
      let html = `<p><strong>ID del canal:</strong> ${idCana}</p>`;
      html += `<p><strong>Total de puntos de medición:</strong> ${numPuntos}</p>`;

      if (numPuntos > 0) {
        html += `<table border="1" cellpadding="5" cellspacing="0">
                   <thead>
                     <tr>
                       <th>ID</th>
                       <th>Nombre</th>
                       <th>Coordenadas</th>
                     </tr>
                   </thead>
                   <tbody>`;
        data.features.forEach(f => {
          const props = f.properties;
          const coords = f.geometry.coordinates;
          html += `<tr>
                     <td>${props.id}</td>
                     <td>${props.nombre || '-'}</td>
                     <td>${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}</td>
                   </tr>`;
        });
        html += `</tbody></table>`;
      }

      document.getElementById('resultadoPuntos').innerHTML = html;
    })
    .catch(error => {
      console.error('Error al consultar los puntos de medición:', error);
      document.getElementById('resultadoPuntos').innerHTML = '<p style="color:red;">Error al cargar los puntos.</p>';
    });
}
