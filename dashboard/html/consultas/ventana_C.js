const ventanaConsultas = document.getElementById("ventana-consultas");
const headerConsultas = document.getElementById("header-consultas");
const cerrarConsultas = document.getElementById("cerrar-consultas");
const minimizarBtn = document.getElementById("minimizar-consultas");
const contenidoConsultas = document.getElementById("contenido-consultas");

let dragging = false;
//let offsetX, offsetY;
let minimizado = false;

headerConsultas.addEventListener("mousedown", (e) => {
  dragging = true;
  const rect = ventanaConsultas.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;
  document.body.style.userSelect = "none";
});

document.addEventListener("mouseup", () => {
  dragging = false;
  document.body.style.userSelect = "auto";
});

document.addEventListener("mousemove", (e) => {
  if (dragging) {
    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;

    const maxX = window.innerWidth - ventanaConsultas.offsetWidth;
    const maxY = window.innerHeight - ventanaConsultas.offsetHeight;
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > maxX) x = maxX;
    if (y > maxY) y = maxY;

    ventanaConsultas.style.left = x + "px";
    ventanaConsultas.style.top = y + "px";
  }
});

cerrarConsultas.addEventListener("click", () => {
  ventanaConsultas.style.display = "none";
});

minimizarBtn.addEventListener("click", () => {
  minimizado = !minimizado;
  contenidoConsultas.style.display = minimizado ? "none" : "block";
  minimizarBtn.textContent = minimizado ? "▢" : "_";
  ventanaConsultas.style.height = minimizado ? "auto" : "";
});

// Función para mostrar la ventana con contenido dinámico
function abrirVentanaConsultas(html = "") {
  contenidoConsultas.innerHTML = html;
  contenidoConsultas.style.display = "block";
  minimizarBtn.textContent = "_";
  minimizado = false;
  ventanaConsultas.style.display = "block";
}
