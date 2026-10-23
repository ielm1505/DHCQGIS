<?php
// Incluir auth.php para proteger la página
include '../../authh.php'; // Ajusta la ruta según tu estructura

// Verificar que solo el rol admin pueda acceder
checkRole(['Admin','Editor']);
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Sistema Desarrolladores</title>

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    font-family:Arial;
    background:#eef2f7;
    display:flex;
    height:100vh;
}

/* =========================
   SIDEBAR
========================= */

.sidebar{
    width:240px;
    background:#0f172a;
    color:white;
    padding:20px;
}

.sidebar h2{
    margin-bottom:20px;
    font-size:22px;
}

.sidebar button{
    width:100%;
    padding:12px;
    margin-bottom:10px;
    border:none;
    border-radius:6px;
    background:#1e293b;
    color:white;
    cursor:pointer;
    text-align:left;
    transition:.3s;
}

.sidebar button:hover{
    background:#2563eb;
}

/* =========================
   CONTENIDO
========================= */

.main{
    flex:1;
    padding:20px;
    overflow:auto;
}

.tab{
    display:none;
}

.tab.active{
    display:block;
}

/* =========================
   FORMULARIOS
========================= */

.container{
    background:white;
    padding:20px;
    border-radius:10px;
}

.section{
    background:#f8fafc;
    padding:15px;
    margin-bottom:15px;
    border-radius:8px;
}

input{
    width:100%;
    padding:10px;
    margin-bottom:10px;
    border:1px solid #cbd5e1;
    border-radius:6px;
}

button{
    padding:10px;
}

.btn-add{
    background:green;
    color:white;
}

.btn-remove{
    background:red;
    color:white;
}

.btn-submit{
    background:#2563eb;
    color:white;
    width:100%;
    border:none;
    border-radius:6px;
    padding:12px;
}

/* =========================
   TABLAS
========================= */

.tabla{
    width:100%;
    border-collapse:collapse;
    margin-top:20px;
    background:white;
}

.tabla th{
    background:#1e293b;
    color:white;
    padding:10px;
}

.tabla td{
    border:1px solid #cbd5e1;
    padding:8px;
}

.tabla tr:nth-child(even){
    background:#f8fafc;
}



.acciones{
    display:flex;
    gap:5px;
}

.btn-editar{
    background:#f59e0b;
    color:white;
    border:none;
    padding:6px 10px;
    border-radius:5px;
    cursor:pointer;
}

.btn-eliminar{
    background:#dc2626;
    color:white;
    border:none;
    padding:6px 10px;
    border-radius:5px;
    cursor:pointer;
}

.buscador{
    width:300px;
    padding:10px;
    margin-bottom:15px;
    border:1px solid #cbd5e1;
    border-radius:6px;
}


</style>
</head>

<body>

<!-- =========================
     SIDEBAR
========================= -->

<div class="sidebar">

    <h2>Sistema</h2>

    <button onclick="mostrarTab('registro')">
        🏗 Registro
    </button>

    <button onclick="mostrarTab('empresas')">
        🏢 Empresas
    </button>

    <button onclick="mostrarTab('desarrollos')">
        📁 Desarrollos
    </button>

    <button onclick="mostrarTab('reportes')">
        📊 Reportes
    </button>

      <a href="../index.php"><button>Volver</button></a>
    </button>
</div>

<!-- =========================
     CONTENIDO
========================= -->

<div class="main">

    <!-- =====================
         REGISTRO
    ====================== -->

    <div id="registro" class="tab active">

        <div class="container">

            <h2>Registro de Desarrollador</h2>

            <form action="alta_desarrollo/guardar.php" method="POST">

                <div class="section">

                    <input type="text" 
                           name="nombre_empresa" 
                           placeholder="Nombre empresa">

                    <input type="text" 
                           name="nombre_comercial" 
                           placeholder="Nombre comercial">

                    <input type="text" 
                           name="representante_legal" 
                           placeholder="Representante legal">

                    <input type="email" 
                           name="correo" 
                           placeholder="Correo">

                    <input type="text" 
                           name="usuario" 
                           placeholder="Usuario">

                    <input type="password" 
                           name="contrasena" 
                           placeholder="Contraseña">

                </div>

                <div class="section">

                    <h3>Desarrollos</h3>

                    <div id="contenedor">

                        <div>

                            <input type="text" 
                                   name="desarrollo[0][nombre]" 
                                   placeholder="Nombre desarrollo">

                            <input type="number" 
                                   name="desarrollo[0][viviendas]" 
                                   placeholder="Viviendas">

                            <input type="text" 
                                   name="desarrollo[0][municipio]" 
                                   placeholder="Municipio">

                            <input type="text" 
                                   name="desarrollo[0][localidad]" 
                                   placeholder="Localidad">

                        </div>

                    </div>

                    <button type="button"
                            class="btn-add"
                            onclick="agregar()">

                        + Desarrollo

                    </button>

                </div>

                <button class="btn-submit">
                    Guardar
                </button>

            </form>

        </div>

    </div>

    <!-- =====================
         EMPRESAS
    ====================== -->
<div id="empresas" class="tab">

    <div class="container">

        <h2>Empresas Registradas</h2>

        <!-- BUSCADOR -->

        <input type="text"
               id="buscarEmpresa"
               class="buscador"
               placeholder="Buscar empresa..."
               onkeyup="filtrarEmpresas()">

        <table class="tabla" id="tablaEmpresas">

            <thead>

                <tr>
                    <th>Empresa</th>
                    <th>Nombre Comercial</th>
                    <th>Representante</th>
                    <th>Correo</th>
                    <th>Desarrollos</th>
                    <th>Total</th>
                    <th>Acciones</th>
                </tr>

            </thead>

            <tbody>

            <?php

            $sql = "

                SELECT

                    d.id,
                    d.nombre_empresa,
                    d.nombre_comercial,
                    d.representante_legal,
                    d.correo_electronico,

                    COALESCE(
                        STRING_AGG(ds.nombre_desarrollo, ', '),
                        'Sin desarrollos'
                    ) AS desarrollos,

                    COUNT(ds.id) AS total_desarrollos

                FROM dexterno_ap.desarrolladores d

                LEFT JOIN dexterno_ap.desarrollos ds
                    ON ds.desarrollador_id = d.id

                GROUP BY
                    d.id,
                    d.nombre_empresa,
                    d.nombre_comercial,
                    d.representante_legal,
                    d.correo_electronico

                ORDER BY d.nombre_empresa

            ";

            $stmt = $pdo->query($sql);

            while($row = $stmt->fetch()):
            ?>

                <tr>

                    <td>
                        <?= htmlspecialchars($row['nombre_empresa']) ?>
                    </td>

                    <td>
                        <?= htmlspecialchars($row['nombre_comercial']) ?>
                    </td>

                    <td>
                        <?= htmlspecialchars($row['representante_legal']) ?>
                    </td>

                    <td>
                        <?= htmlspecialchars($row['correo_electronico']) ?>
                    </td>

                    <td>
                        <?= htmlspecialchars($row['desarrollos']) ?>
                    </td>

                    <td style="text-align:center; font-weight:bold;">
                        <?= $row['total_desarrollos'] ?>
                    </td>

                    <td>

                        <div class="acciones">

                            <!-- EDITAR -->

                            <button class="btn-editar"
                                    onclick="editarEmpresa(<?= $row['id'] ?>)">

                                ✏ Editar

                            </button>

                            <!-- ELIMINAR -->

                            <button class="btn-eliminar"
                                    onclick="eliminarEmpresa(<?= $row['id'] ?>)">

                                🗑 Eliminar

                            </button>

                        </div>

                    </td>

                </tr>

            <?php endwhile; ?>

            </tbody>

        </table>

    </div>

</div>

    <!-- =====================
         DESARROLLOS
    ====================== -->

    <div id="desarrollos" class="tab">

    <div class="container">

        <h2>Desarrollos</h2>

        <!-- BUSCADOR -->

        <input type="text"
               id="buscarDesarrollo"
               class="buscador"
               placeholder="Buscar empresa o desarrollo..."
               onkeyup="filtrarDesarrollos()">

        <table class="tabla"
               id="tablaDesarrollos">

            <thead>

                <tr>

                    <th>Empresa</th>
                    <th>Desarrollo</th>
                    <th>Viviendas</th>
                    <th>Municipio</th>
                    <th>Localidad</th>
                    <th>Acciones</th>

                </tr>

            </thead>

            <tbody>

            <?php

            $sql = "

                SELECT

                    ds.id,
                    ds.nombre_desarrollo,
                    ds.num_viviendas,
                    ds.municipio,
                    ds.localidad,
                    ds.ruta_archivos,

                    de.nombre_empresa

                FROM dexterno_ap.desarrollos ds

                INNER JOIN dexterno_ap.desarrolladores de
                    ON de.id = ds.desarrollador_id

                ORDER BY
                    de.nombre_empresa,
                    ds.nombre_desarrollo

            ";

            $stmt = $pdo->query($sql);

            while($row = $stmt->fetch()):
            ?>

                <tr>

                    <td>
                        <?= htmlspecialchars($row['nombre_empresa']) ?>
                    </td>

                    <td>
                        <?= htmlspecialchars($row['nombre_desarrollo']) ?>
                    </td>

                    <td style="text-align:center;">
                        <?= htmlspecialchars($row['num_viviendas']) ?>
                    </td>

                    <td>
                        <?= htmlspecialchars($row['municipio']) ?>
                    </td>

                    <td>
                        <?= htmlspecialchars($row['localidad']) ?>
                    </td>
                   
                    <td>

                        <div class="acciones">

                            <!-- EDITAR -->

                            <button class="btn-editar"
                                    onclick="editarDesarrollo(<?= $row['id'] ?>)">

                                ✏ Editar

                            </button>

                            <!-- ELIMINAR -->

                            <button class="btn-eliminar"
                                    onclick="eliminarDesarrollo(<?= $row['id'] ?>)">

                                🗑 Eliminar

                            </button>

                        </div>

                    </td>

                </tr>

            <?php endwhile; ?>

            </tbody>

        </table>

    </div>

</div>

    <!-- =====================
         REPORTES
    ====================== -->

    <div id="reportes" class="tab">

        <div class="container">

            <h2>Reportes</h2>

            <p>    </p>

        </div>

    </div>

</div>

<script>

let i = 1;

function agregar(){

    let div = document.createElement('div');

    div.innerHTML = `
        <hr>

        <button type="button"
                class="btn-remove"
                onclick="this.parentElement.remove()">

            X

        </button>

        <input type="text"
               name="desarrollo[${i}][nombre]"
               placeholder="Nombre desarrollo">

        <input type="number"
               name="desarrollo[${i}][viviendas]"
               placeholder="Viviendas">

        <input type="text"
               name="desarrollo[${i}][municipio]"
               placeholder="Municipio">

        <input type="text"
               name="desarrollo[${i}][localidad]"
               placeholder="Localidad">
    `;

    document.getElementById('contenedor').appendChild(div);

    i++;
}

/* =========================
   CAMBIO DE TABS
========================= */

function mostrarTab(id){

    document.querySelectorAll('.tab')
        .forEach(tab => tab.classList.remove('active'));

    document.getElementById(id)
        .classList.add('active');
}


/* =========================
   BUSCADOR
========================= */

function filtrarEmpresas(){

    let input = document.getElementById("buscarEmpresa");

    let filtro = input.value.toLowerCase();

    let tabla = document.getElementById("tablaEmpresas");

    let tr = tabla.getElementsByTagName("tr");

    for(let i=1; i<tr.length; i++){

        let td = tr[i].getElementsByTagName("td")[0];

        if(td){

            let texto = td.textContent || td.innerText;

            tr[i].style.display =
                texto.toLowerCase().includes(filtro)
                ? ""
                : "none";
        }
    }
}

/* =========================
   EDITAR
========================= */

function editarEmpresa(id){

    window.location.href =
        "alta_desarrollo/editar_empresa.php?id=" + id;
}

/* =========================
   ELIMINAR
========================= */

function eliminarEmpresa(id){

    if(confirm("¿Eliminar empresa?")){

        window.location.href =
            "alta_desarrollo/eliminar_empresa.php?id=" + id;
    }
}
//=============

/* =========================
   BUSCAR DESARROLLOS
========================= */

function filtrarDesarrollos(){

    let input =
        document.getElementById("buscarDesarrollo");

    let filtro =
        input.value.toLowerCase();

    let tabla =
        document.getElementById("tablaDesarrollos");

    let tr =
        tabla.getElementsByTagName("tr");

    for(let i=1; i<tr.length; i++){

        let empresa =
            tr[i].getElementsByTagName("td")[0];

        let desarrollo =
            tr[i].getElementsByTagName("td")[1];

        if(empresa && desarrollo){

            let textoEmpresa =
                empresa.textContent.toLowerCase();

            let textoDesarrollo =
                desarrollo.textContent.toLowerCase();

            if(
                textoEmpresa.includes(filtro)
                ||
                textoDesarrollo.includes(filtro)
            ){

                tr[i].style.display = "";

            }else{

                tr[i].style.display = "none";
            }
        }
    }
}

/* =========================
   EDITAR DESARROLLO
========================= */

function editarDesarrollo(id){

    window.location.href =
        "alta_desarrollo/editar_desarrollo.php?id=" + id;
}

/* =========================
   ELIMINAR DESARROLLO
========================= */

function eliminarDesarrollo(id){

    if(confirm("¿alta_desarrollo/Eliminar desarrollo?")){

        window.location.href =
            "eliminar_desarrollo.php?id=" + id;
    }
}

</script>

</body>
</html>