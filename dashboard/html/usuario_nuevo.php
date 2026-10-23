<?php
// Incluir auth.php para proteger la página
include '../authh.php'; // Ajusta la ruta según tu estructura

// Verificar que solo el rol admin pueda acceder
checkRole(['Admin']);
?>

<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Gestión de Usuarios</title>
<style>
body { margin: 0; font-family: Arial; display: flex; height: 100vh; }
#menu { width: 250px; background: #2c3e50; color: white; display: flex; flex-direction: column; }
#menu h2 { text-align: center; padding: 20px 0; margin: 0; background: #1a252f; }
#menu button { padding: 15px 20px; border: none; background: none; color: white; text-align: left; cursor: pointer; font-size: 16px; width: 100%; transition: background 0.3s; }
#menu button:hover { background: #34495e; }
#contenido { flex: 1; padding: 20px; overflow-y: auto; background: #ecf0f1; }
.seccion { display: none; }
.seccion.active { display: block; }
table { border-collapse: collapse; width: 100%; }
th, td { border: 1px solid #999; padding: 8px; text-align: left; }
th { background: #34495e; color: white; }
a.eliminar { color: red; text-decoration: none; }
</style>
</head>
<body>

<div id="menu">
  <h2>Usuarios</h2>
  <button onclick="mostrarSeccion('crear')">Crear Usuario</button>
  <button onclick="mostrarSeccion('listar')">Usuarios Existentes</button>
</div>

<div id="contenido">
  <!-- Crear Usuario -->
  <div id="crear" class="seccion active">
    <h2>Crear Usuario</h2>
    <form method="post" action="">
      <input type="hidden" name="nuevo_usuario" value="1">
      <label>Usuario:</label><br>
      <input type="text" name="usuario" required><br><br>

      <label>Rol:</label><br>
      <select name="rol" required>
        <option value="Admin">Admin</option>
        <option value="Usuario">Usuario</option>
        <option value="Editor1">Editor1</option>
      </select><br><br>

      <label>HTML:</label><br>
      <input type="text" name="html"><br><br>

      <button type="submit">Crear Usuario</button>
    </form>
  </div>

  <!-- Usuarios Existentes -->
  <div id="listar" class="seccion">
    <h2>Usuarios Existentes</h2>
    <table>
      <tr>
        <th>ID</th>
        <th>Usuario</th>
        <th>Rol</th>
        <th>HTML</th>
        <th>Acciones</th>
      </tr>
      <?php while($row = $usuarios->fetch_assoc()): ?>
      <tr>
        <td><?= $row['id'] ?></td>
        <td><?= htmlspecialchars($row['usuario']) ?></td>
        <td><?= htmlspecialchars($row['rol']) ?></td>
        <td><?= htmlspecialchars($row['html']) ?></td>
        <td>
          <a class="eliminar" href="?eliminar=<?= $row['id'] ?>" onclick="return confirm('¿Eliminar este usuario?')">Eliminar</a>
        </td>
      </tr>
      <?php endwhile; ?>
    </table>
  </div>
</div>

<script>
function mostrarSeccion(seccion) {
  document.querySelectorAll('.seccion').forEach(div => div.classList.remove('active'));
  document.getElementById(seccion).classList.add('active');
}
</script>

</body>
</html>