<h4 class="mb-3">
📋 Pruebas Registradas por Empresa y Desarrollo
</h4>

<div class="table-responsive">

<table class="table table-bordered table-hover bg-white"
       id="tablaPruebasEmpresas">

    <thead class="table-primary">
        <tr>
            <th>Folio</th>
            <th>Fecha</th>
            <th>Fraccionamiento</th>
            <th>Desarrollador</th>
            <th>Contratista</th>
            <th>Estado</th>
            <th>Resultado</th>
            <th>Acciones</th>
        </tr>
    </thead>

    <tbody>

    <?php if(count($pruebas)>0){ ?>

        <?php foreach($pruebas as $p){ ?>

        <tr>

            <td>
                <strong>
                    <?= htmlspecialchars($p['folio']) ?>
                </strong>
            </td>

            <td>
                <?= htmlspecialchars($p['fecha']) ?>
            </td>

            <td>
                <?= htmlspecialchars($p['fraccionamiento']) ?>
            </td>

            <td>
                <?= htmlspecialchars($p['desarrollador']) ?>
            </td>

            <td>
                <?= htmlspecialchars($p['contratista']) ?>
            </td>

            <td>

                <?php if($p['estado']=='BORRADOR'){ ?>

                    <span class="badge bg-warning text-dark">
                        BORRADOR
                    </span>

                <?php }elseif($p['estado']=='EN_VALIDACION'){ ?>

                    <span class="badge bg-info text-dark">
                        VALIDACIÓN
                    </span>

                <?php }elseif($p['estado']=='APROBADO'){ ?>

                    <span class="badge bg-success">
                        APROBADO
                    </span>

                <?php }elseif($p['estado']=='RECHAZADO'){ ?>

                    <span class="badge bg-danger">
                        RECHAZADO
                    </span>

                <?php } ?>

            </td>

            <td>

                <?php if($p['resultado']=='Satisfactoria'){ ?>

                    <span class="badge bg-success">
                        SATISFACTORIA
                    </span>

                <?php }elseif($p['resultado']=='No Satisfactoria'){ ?>

                    <span class="badge bg-danger">
                        NO SATISFACTORIA
                    </span>

                <?php }elseif($p['resultado']=='No Presentada'){ ?>

                    <span class="badge bg-secondary">
                        NO PRESENTADA
                    </span>

                <?php }else{ ?>

                    <span class="badge bg-warning text-dark">
                        PENDIENTE
                    </span>

                <?php } ?>

            </td>

            <td>

                <?php if($p['estado']=='APROBADO'){ ?>

                <a href="../generar_pdf_ficha.php?folio=<?= urlencode($p['folio']) ?>"
                   target="_blank"
                   class="btn btn-success btn-sm">

                   PDF

                </a>

                <?php } ?>

            </td>

        </tr>

        <?php } ?>

    <?php }else{ ?>

        <tr>

            <td colspan="8"
                class="text-center text-muted">

                No existen pruebas registradas

            </td>

        </tr>

    <?php } ?>

    </tbody>

</table>

</div>


<!-- PAGINACIÓN -->
<div id="contenedorPaginasPruebas"
     class="d-flex justify-content-center flex-wrap gap-1 mt-4">
</div>


<!-- INFO -->
<div id="infoPaginaPruebas"
     class="text-center fw-bold mt-2">
</div>


<script>

// ======================================
// CONFIGURACIÓN TABLA PRUEBAS
// ======================================
const tablaPruebasEmpresas =
    document.getElementById(
        "tablaPruebasEmpresas"
    );

const filasTablaPruebas =
    tablaPruebasEmpresas.querySelectorAll(
        "tbody tr"
    );

const registrosPorPaginaPruebas = 5;

const totalRegistrosPruebas =
    filasTablaPruebas.length;

const totalPaginasPruebas =
    Math.ceil(
        totalRegistrosPruebas /
        registrosPorPaginaPruebas
    );

let paginaActualPruebas = 1;


// ======================================
// MOSTRAR PÁGINA
// ======================================
function mostrarPaginaPruebas(numeroPagina){

    paginaActualPruebas = numeroPagina;

    const inicioPagina =
        (numeroPagina - 1) *
        registrosPorPaginaPruebas;

    const finPagina =
        inicioPagina +
        registrosPorPaginaPruebas;

    filasTablaPruebas.forEach(
        (fila,index)=>{

        fila.style.display =
            (index >= inicioPagina &&
             index < finPagina)
            ? ""
            : "none";

    });

    document.getElementById(
        "infoPaginaPruebas"
    ).innerHTML =
    `Página ${paginaActualPruebas} de ${totalPaginasPruebas}`;

    actualizarBotonesPruebas();
}


// ======================================
// CREAR PAGINACIÓN
// ======================================
function crearPaginacionPruebas(){

    const contenedorPaginacion =
        document.getElementById(
            "contenedorPaginasPruebas"
        );

    contenedorPaginacion.innerHTML = "";


    // ==========================
    // BOTÓN ANTERIOR
    // ==========================
    const botonAnteriorPruebas =
        document.createElement("button");

    botonAnteriorPruebas.innerHTML =
        "⬅ Anterior";

    botonAnteriorPruebas.id =
        "botonAnteriorPruebas";

    botonAnteriorPruebas.className =
        "btn btn-primary btn-sm";

    botonAnteriorPruebas.onclick =
    function(){

        if(paginaActualPruebas > 1){

            mostrarPaginaPruebas(
                paginaActualPruebas - 1
            );
        }
    };

    contenedorPaginacion.appendChild(
        botonAnteriorPruebas
    );


    // ==========================
    // NÚMEROS
    // ==========================
    for(let pagina=1;
        pagina<=totalPaginasPruebas;
        pagina++){

        const botonNumero =
            document.createElement(
                "button"
            );

        botonNumero.innerHTML =
            pagina;

        botonNumero.id =
            "botonPaginaPrueba_" + pagina;

        botonNumero.className =
            "btn btn-outline-primary btn-sm";

        botonNumero.onclick =
        function(){

            mostrarPaginaPruebas(
                pagina
            );
        };

        contenedorPaginacion.appendChild(
            botonNumero
        );
    }


    // ==========================
    // BOTÓN SIGUIENTE
    // ==========================
    const botonSiguientePruebas =
        document.createElement("button");

    botonSiguientePruebas.innerHTML =
        "Siguiente ➡";

    botonSiguientePruebas.id =
        "botonSiguientePruebas";

    botonSiguientePruebas.className =
        "btn btn-primary btn-sm";

    botonSiguientePruebas.onclick =
    function(){

        if(paginaActualPruebas <
           totalPaginasPruebas){

            mostrarPaginaPruebas(
                paginaActualPruebas + 1
            );
        }
    };

    contenedorPaginacion.appendChild(
        botonSiguientePruebas
    );
}


// ======================================
// ACTUALIZAR ESTILOS
// ======================================
function actualizarBotonesPruebas(){

    for(let pagina=1;
        pagina<=totalPaginasPruebas;
        pagina++){

        const botonPagina =
            document.getElementById(
                "botonPaginaPrueba_" +
                pagina
            );

        botonPagina.classList.remove(
            "btn-primary"
        );

        botonPagina.classList.remove(
            "btn-outline-primary"
        );

        if(pagina === paginaActualPruebas){

            botonPagina.classList.add(
                "btn-primary"
            );

        }else{

            botonPagina.classList.add(
                "btn-outline-primary"
            );
        }
    }


    // DESHABILITAR BOTONES
    document.getElementById(
        "botonAnteriorPruebas"
    ).disabled =
    (paginaActualPruebas === 1);

    document.getElementById(
        "botonSiguientePruebas"
    ).disabled =
    (paginaActualPruebas === totalPaginasPruebas);
}


// ======================================
// INICIAR
// ======================================
if(totalRegistrosPruebas > 0){

    crearPaginacionPruebas();

    mostrarPaginaPruebas(1);
}

</script>