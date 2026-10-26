<?php
include '../../authh.php';
checkRole(['Admin']);
require '../../conexion.php';
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Gestión de Usuarios</title>
<style>
    body {
        margin: 0;
        font-family: Arial, sans-serif;
        display: flex;
        height: 100vh;
        background: #f7f9fc;
    }

    /* Menú lateral */
    .sidebar {
        width: 250px;
        background: #39b5d4ff;
        color: #ecf0f1;
        padding-top: 20px;
        display: flex;
        flex-direction: column;
    }
    .sidebar h2 {
        text-align: center;
        margin-bottom: 20px;
    }
    .sidebar a {
        padding: 15px;
        color: #ecf0f1;
        text-decoration: none;
        display: block;
        transition: background 0.3s;
    }
    .sidebar a:hover {
        background: #19dbabff;
    }

    /* Contenido */
    .content {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
    }

    .form-section { display: none; }
    .active { display: block; }

    form {
        max-width: 400px;
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    form input, form select, form button {
        width: 100%;
        margin-bottom: 15px;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    button {
        cursor: pointer;
    }

    table {
        width: 50%;
        border-collapse: collapse;
        background: white;
        margin-top: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    th, td {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        text-align: left;
    }
    th {
        background: #29b9b2ff;
        color: white;
    }

    .btn-danger {
        background: #e74c3c;
        color: white;
        border: none;
        cursor: pointer;
        padding: 8px 12px;
        border-radius: 5px;
    }
    .btn-danger:hover {
        background: #c0392b;
    }

    .btn-refresh {
        background: #27ae60;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 5px;
        margin-bottom: 10px;
    }
    .btn-refresh:hover {
        background: #219150;
    }


    img.logo {
    width: 200px;
    margin-bottom: 30px;
    padding: 15px 15px;
    
}



</style>
</head>
<body>

<div class="sidebar">
    <img src="../../Imagen/logo-aguakan.png" alt="Logo" class="logo">
    <h2>Usuarios</h2>     
    <a href="#" onclick="mostrarSeccion('crear')">➕ Alta de Usuario</a>
    <a href="#" onclick="mostrarSeccion('crear2')">➕ Alta Usuario Externo</a>
    <a href="#" onclick="mostrarSeccion('lista')">👥 Usuarios Registrados</a>
    <a href="#" onclick="mostrarSeccion('borrar')">🗑️ Eliminar Usuario</a>
    <a href="#" onclick="mostrarSeccion('Permiso_pagina')">☑️ Asignar pagina a Rol</a>
    <a href="#" onclick="mostrarSeccion('Permiso_a_funsiones')">☑️ Asignar funciones a Rol</a>
    <a href="../index.php">Volver al inicio</a>

</div>

<div class="content">

    <div id="crear" class="form-section active">
        <h2>Alta de Usuario @aguakan.mx</h2>
        <form method="POST" action="crear_usuario.php">
            <input type="text" name="usuario" placeholder="Nombre de usuario" required>
            <select name="rol" required>
                <option value="">Seleccione rol</option>
                <option value="Admin">Admin</option>
                <option value="Usuario">Estandar</option>
                <option value="Editor">Editor</option>
            </select>
            <input type="text" name="html" placeholder="Ruta HTML asignada" required>
            <button type="submit">Crear Usuario</button>
        </form>
    </div>


    <div id="crear2" class="form-section">
        <h2>Alta Usuario Externo</h2>
       <form method="POST" action="usuario_local.php">
        <div class="mb-3">
            <label for="usuario" class="form-label">Nombre de usuario</label>
            <input type="text" id="usuario" name="usuario" class="form-control" required>
        </div>

        <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" id="password" name="password" class="form-control" required>
        </div>

        <div class="mb-3">
            <label for="rol" class="form-label">Rol</label>
            <select id="rol" name="rol" class="form-select" required>
                <option value="">Seleccione un rol...</option>
                <option value="Editor">Editor</option>
                <option value="Estandar">Invitado</option>
            </select>
        </div>

        <div class="mb-3">
            <label for="html" class="form-label">Ruta HTML (inicio)</label>
            <input type="text" id="html" name="html" class="form-control" placeholder="html/index.php" required>
        </div>

        <button type="submit" class="btn btn-primary">Crear Usuario</button>
        </form>
    </div>

    <!-- Listar usuarios -->
    <div id="lista" class="form-section">
        <h2>Usuarios Registrados</h2>
        <button class="btn-refresh" onclick="cargarUsuarios()">🔄 Refrescar</button>
        <table id="tablaUsuarios">
          
            <tbody>
                
            </tbody>
        </table>
    </div>

    <!-- Borrar usuario -->
    <div id="borrar" class="form-section">
        <h2>Eliminar Usuario</h2>
        <form method="POST" action="borrar_usuario.php">
            <input type="text" name="usuario" placeholder="Nombre de usuario a eliminar" required>
            <button type="submit" class="btn-danger">Eliminar</button>
        </form>
    </div>



 <!-- Permisos a pagina -->
    <div id="Permiso_pagina" class="form-section">
        <h2>Asignar permisos a Roles</h2>
        
    </div>

     <!-- Permisos a funciones -->
    <div id="Permiso_a_funsiones" class="form-section">
        <h2>Asignar Funciones a Roles</h2>
        
    </div>




</div>



<script>
// Alternar secciones
function mostrarSeccion(id) {
    document.querySelectorAll('.form-section').forEach(div => div.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if (id === 'lista') cargarUsuarios();
}

// Cargar usuarios dinámicamente con fetch
function cargarUsuarios() {
    fetch('usuario_registrados.php')
        .then(response => response.text())
        .then(html => {
            document.querySelector('#tablaUsuarios tbody').innerHTML = html;
        })
        .catch(err => console.error('Error al cargar usuarios:', err));
}


</script>

</body>
</html>
