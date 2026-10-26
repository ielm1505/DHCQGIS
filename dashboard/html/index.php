<?php
include '../authh.php'; // Protege la página
//checkRole(['Admin','Estandar','Editor']); // Solo roles permitidos
?>
<!doctype html>
<html lang="es">
<?php include("./includes/head.php"); ?>
<body>

  <?php include("./includes/navbar.php"); ?>
  <?php include("./includes/mapa.php"); ?>
  <?php include("./includes/ventana.php"); ?>
  <?php include("./includes/scripts.php"); ?>

</body>
 
    

<script>
 // ---------------- Heartbeat ----------------

let lastUserAction = Date.now();
let inactivityTimeout;
let timeoutDuration = <?php echo $_SESSION['timeout'] * 1000; ?>; // 30 min

function resetTimer() {
    lastUserAction = Date.now();
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(() => {
        alert("Su sesión ha expirado por inactividad.");
        window.location.href = '../logout.php';
    }, timeoutDuration);
}

// Registrar eventos de actividad
window.onload = resetTimer;
document.addEventListener('mousemove', resetTimer);
document.addEventListener('keydown', resetTimer);
document.addEventListener('scroll', resetTimer);
document.addEventListener('click', resetTimer);

// ---------------- Heartbeat rápido ----------------
setInterval(() => {
    fetch('../hertbeat.php')
        .then(res => res.text())
        .then(data => {
            if (data === 'DUPLICATE' || data === 'CLOSED') {
                alert('Su sesión ha sido cerrada porque inició sesión en otro dispositivo.');
                window.location.href = '../logout.php';
            } else if (data === 'EXPIRED') {
                alert('Su sesión ha expirado.');
                window.location.href = '../logout.php';
            }
        })
        .catch(() => {
            window.location.href = '../logout.php';
        });
}, 30 * 1000); // cada 30 segundos


  


  function cerrarSesion() {
      window.location.href = "../logout.php"; // Redirige al logout.php
      }

      
    // Ocultar menú al hacer clic fuera
    document.addEventListener('click', function() {
        document.getElementById('contextMenu').style.display = 'none';
    });
    document.addEventListener('DOMContentLoaded', () => {
      const toggleBtn = document.getElementById('layerSwitcherToggleBtn');
      const layerSwitcher = document.querySelector('.layer-switcher');
    
    });


</script>

<script>
  
  const input = document.getElementById("busqueda-nombre");
  const datalist = document.getElementById("sugerencias-nombre");

  const nombres = ["Tanque Sur", "Tanque Norte", "Estación Central", "Bomba 3", "Pozo Principal"];

  input.addEventListener("input", () => {
    
    datalist.innerHTML = "";

    const valor = input.value.trim();

    if (valor.length > 0) {
      const filtrados = nombres.filter(nombre =>
        nombre.toLowerCase().includes(valor.toLowerCase())
      );

      filtrados.forEach(nombre => {
        const option = document.createElement("option");
        option.value = nombre;
        datalist.appendChild(option);
      });
    }
  });

    document.getElementById("busqueda-nombre").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      e.preventDefault(); 
      consultarInfraestructura(); 
    }
  });

</script>

</html>
