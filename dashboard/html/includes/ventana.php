<!-- Ventanas flotantes -->
<div id="ventanaFactibilidad" class="ventana-flotante" style="display:none;">
  <div class="ventana-header">
    <span>Edición</span>
    <div>
      <button type="button" onclick="minimizarVentana()">➖</button>
      <button onclick="cerrarVentana()">✖</button>
    </div>
  </div>
  <div class="ventana-cuerpo">
    <form id="formFactibilidad"></form>
    <button type="button" onclick="guardarCambios()">Guardar Cambios</button>
    <button type="button" onclick="eliminarSeleccion()">Eliminar selección</button>
  </div>
</div>

<div id="ventana-consultas" class="ventana-flotante" style="display: none;">
  <div id="header-consultas" style="cursor: move; background: #aaa; color: white; padding: 5px 10px; display: flex; justify-content: space-between;">
    <span>Consultas</span>
    <div>
      <button id="minimizar-consultas">_</button>
      <button id="cerrar-consultas">×</button>
    </div>
  </div>
  <div id="contenido-consultas" style="padding: 10px;"></div>
</div>


