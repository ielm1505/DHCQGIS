<!-- Contenedor del mapa -->
<div id="map">
  <div id="popup" class="ol-popup">
    <a href="#" id="popup-closer" class="ol-popup-closer"></a>
    <div id="popup-content"></div>
  </div>
</div>

<input type="file" id="fileInput" accept=".kml,.kmz" style="display:none;" />
<div id="mouse-position" style="
  position: absolute;
  bottom: 50px;
  right: 10px;
  background: rgba(255, 255, 255, 0.8);
  padding: 4px 8px;
  font-family: sans-serif;
  font-size: 13px;
  border-radius: 4px;
  border: 1px solid #ccc;
  z-index: 999;">
</div>
