function imprimirMapa() {
  // Oculta capas problemáticas (ej. ESRI Satellite) si es necesario:
  // lyr_ESRISatellite_1.setVisible(false);

  setTimeout(() => {
    html2canvas(document.getElementById('layoutImpresion'), {
      useCORS: true,
      allowTaint: false
    }).then(canvas => {
      let imgData = canvas.toDataURL("image/png");
      let win = window.open();
      win.document.write('<img src="' + imgData + '"/>');
    }).catch(err => {
      console.error('Error al capturar el mapa:', err);
    }).finally(() => {
      // Restaurar visibilidad de capas si las ocultaste
      // lyr_ESRISatellite_1.setVisible(true);
    });
  }, 1000);
}
