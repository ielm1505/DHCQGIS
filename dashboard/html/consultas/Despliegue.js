
window.toggleSubMenu=function (span) {
  const submenu = span.nextElementSibling;
  if (submenu) {
    const isHidden = submenu.classList.contains("oculto");
    submenu.classList.toggle("oculto", !isHidden);
    span.textContent = (isHidden ? "📂" : "📁") + " " + span.textContent.slice(2);
  }
}



window.generarMenuConsultas=function() {
  return `
    <div style="font-family: sans-serif; font-size: 14px;">
      <div style="background: navy; color: white; padding: 5px;">INTERROGACIÓN DE DATOS</div>
      <ul style="list-style: none; padding-left: 10px;">
        <li><span onclick="toggleSubMenu(this)">📁 Agua Potable</span>
          <ul class="submenu oculto">
           <li><button onclick="abrirFormulario()">Tuberia</button></li>

            <li onclick="">---</li>
          </ul>
        </li>
        <li><span onclick="toggleSubMenu(this)">📁 Alcantarillado</span>
          <ul class="submenu oculto">
          <li><button onclick="abrirFormularioAssCana()">Tuberia</button></li>  
          <li onclick="">---</li>
          </ul>
        </li>
        <li><span onclick="toggleSubMenu(this)">📁 Cliente</span>
        <ul class="submenu oculto">
          <li><button onclick="abrirFormularioCliente()">Punto de Medicion</button></li>  
          <li onclick="">---</li>
          </ul>
        
        </li>
        <li><span onclick="realizarConsulta('Catastro')">📁 Catastro</span></li>
      </ul>
    </div>
  `;
}




 