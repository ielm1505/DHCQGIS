<?php
// PAGINACIÓN
$porPagina = 5;
$pagina = isset($_GET['pagina']) ? (int)$_GET['pagina'] : 1;

if($pagina < 1){
    $pagina = 1;
}

$totalRegistros = count($cargas);
$totalPaginas = ceil($totalRegistros / $porPagina);

$inicio = ($pagina - 1) * $porPagina;

// Obtener solo los registros de la página actual
$cargasPaginadas = array_slice($cargas, $inicio, $porPagina);
?>
<form method="POST" id="frmAcciones">

    <table class="table table-bordered table-hover bg-white"
           id="tablaCargas">

        <thead class="table-primary">
        <tr>
            <th>
                <input type="checkbox"
                       onclick="seleccionarTodos(this)">
            </th>

            <th>Empresa</th>
            <th>Desarrollo</th>
            <th>Archivo</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Mapa</th>
            <th>Fuente</th>
        </tr>
        </thead>

        <tbody>

        <?php foreach($cargas as $row){ ?>

        <tr>

            <td>

            <?php if($row['estado_aprobacion']=='PENDIENTE'){ ?>

            <input type="checkbox"
                   name="carga[]"
                   value="<?=$row['id']?>">

            <?php } ?>

            </td>

            <td><?=$row['empresa']?></td>

            <td><?=$row['desarrollo']?></td>

            <td><?=$row['archivo']?></td>

            <td><?=$row['tipo_archivo']?></td>

            <td>

            <?php if($row['estado_aprobacion']=='APROBADO'){ ?>

                <span class="badge bg-success">
                    APROBADO
                </span>

            <?php }elseif($row['estado_aprobacion']=='RECHAZADO'){ ?>

                <span class="badge bg-danger">
                    RECHAZADO
                </span>

            <?php }else{ ?>

                <span class="badge bg-warning text-dark">
                    PENDIENTE
                </span>

            <?php } ?>

            </td>

            <td><?=$row['fecha_carga']?></td>

            <td>

                <button type="button"
                        class="btn btn-info btn-sm"
                        onclick="verMapa(<?=$row['id']?>)">

                    👁️ Ver

                </button>

            </td>

            <td>

                <a href="../descargar_fuente.php?id=<?=$row['id']?>"
                   class="btn btn-secondary btn-sm">

                    Descargar ⤵️

                </a>

            </td>

        </tr>

        <?php } ?>

        </tbody>

    </table>

    <!-- BOTONES -->
    <button formaction="../aprobar_multiples.php"
            class="btn btn-success">

        Aprobar

    </button>

    <button formaction="../rechazar_multiples.php"
            class="btn btn-danger">

        Rechazar

    </button>

    <!-- OBSERVACIONES -->
    <div class="mt-3">

        <label>

            <strong>
                Observación técnica / motivo de rechazo:
            </strong>

        </label>

        <textarea name="observacion_rechazo"
                  class="form-control"
                  rows="3"
                  placeholder="Escriba aquí el motivo técnico del rechazo..."></textarea>

    </div>

</form>


<!-- PAGINACIÓN -->
<div class="d-flex justify-content-center align-items-center flex-wrap mt-4 gap-2">

    <!-- ANTERIOR -->
    <button class="btn btn-primary btn-sm"
            id="btnAnterior">

        ⬅ Anterior

    </button>

    <!-- NÚMEROS -->
    <div id="numerosPaginas"
         class="d-flex flex-wrap gap-1">
    </div>

    <!-- SIGUIENTE -->
    <button class="btn btn-primary btn-sm"
            id="btnSiguiente">

        Siguiente ➡

    </button>

</div>

<!-- INFO -->
<div class="text-center mt-2 fw-bold"
     id="infoPagina">
</div>


<script>

// ============================
// CONFIGURACIÓN
// ============================
const filasPorPagina = 5;

const tabla =
    document.getElementById("tablaCargas");

const filas =
    tabla.querySelectorAll("tbody tr");

const totalFilas = filas.length;

const totalPaginas =
    Math.ceil(totalFilas / filasPorPagina);

let paginaActual = 1;


// ============================
// MOSTRAR PÁGINA
// ============================
function mostrarPagina(pagina){

    paginaActual = pagina;

    const inicio =
        (pagina - 1) * filasPorPagina;

    const fin =
        inicio + filasPorPagina;

    filas.forEach((fila,index)=>{

        if(index >= inicio && index < fin){

            fila.style.display = "";

        }else{

            fila.style.display = "none";
        }

    });

    document.getElementById("infoPagina")
    .innerHTML =
    `Página ${paginaActual} de ${totalPaginas}`;

    document.getElementById("btnAnterior")
    .disabled = (paginaActual === 1);

    document.getElementById("btnSiguiente")
    .disabled = (paginaActual === totalPaginas);

    actualizarBotones();
}


// ============================
// CREAR NÚMEROS
// ============================
function crearNumerosPagina(){

    const contenedor =
        document.getElementById("numerosPaginas");

    contenedor.innerHTML = "";

    for(let i=1; i<=totalPaginas; i++){

        const btn =
            document.createElement("button");

        btn.className =
            "btn btn-sm btn-outline-primary";

        btn.innerText = i;

        btn.id = "pagina_"+i;

        btn.onclick = function(){

            mostrarPagina(i);
        };

        contenedor.appendChild(btn);
    }
}


// ============================
// ACTUALIZAR ESTILO
// ============================
function actualizarBotones(){

    for(let i=1; i<=totalPaginas; i++){

        const btn =
            document.getElementById("pagina_"+i);

        btn.classList.remove(
            "btn-primary"
        );

        btn.classList.remove(
            "btn-outline-primary"
        );

        if(i === paginaActual){

            btn.classList.add(
                "btn-primary"
            );

        }else{

            btn.classList.add(
                "btn-outline-primary"
            );
        }
    }
}


// ============================
// EVENTOS
// ============================
document.getElementById("btnAnterior")
.addEventListener("click",()=>{

    if(paginaActual > 1){

        mostrarPagina(
            paginaActual - 1
        );
    }

});


document.getElementById("btnSiguiente")
.addEventListener("click",()=>{

    if(paginaActual < totalPaginas){

        mostrarPagina(
            paginaActual + 1
        );
    }

});


// ============================
// INICIAR
// ============================
crearNumerosPagina();

mostrarPagina(1);

</script>