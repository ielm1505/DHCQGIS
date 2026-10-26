<!-- ============================================ -->
<!-- BUSCADOR POR FOLIO - AGREGADO AQUÍ -->
<!-- ============================================ -->
<div class="card mb-4" style="border: 1px solid #0b7d91;width:620px;">
    <div class="card-header bg-primary text-white">
        <strong>🔍 Búsqueda Formato de Prueba por Folio</strong>
    </div>
    <div class="card-body">
        <form method="GET" class="row g-3">
            <div class="col-md-6">
                <label class="form-label">Número de Folio:</label>
                <div class="input-group">
                    <input type="text" name="folio" class="form-control" placeholder="Ej: FOL-202512" value="<?= htmlspecialchars($folio_buscar) ?>">
                   
                  
                    <button type="submit" class="btn btn-primary">🔍 Buscar Ficha</button>
                    <?php if($folio_buscar): ?>
                        
                    <?php endif; ?>

                </div>
            </div>
        </form>
        
        <?php if($folio_buscar): ?>
            <?php if($ficha_encontrada): ?>
                <div class="card-ficha card mt-3 p-3">
                    <div class="row">
                        <div class="col-md-8">
                            <h5><strong>📄 Ficha Encontrada</strong></h5>
                            <table class="table table-sm table-borderless">
                                <tr><td width="120"><strong>Folio:</strong></td><td><?= htmlspecialchars($ficha_encontrada['folio']) ?></td></tr>
                                <tr><td><strong>Fecha:</strong></td><td><?= $ficha_encontrada['fecha'] ?></td></tr>
                                <tr><td><strong>Fraccionamiento:</strong></td><td><?= htmlspecialchars($ficha_encontrada['fraccionamiento']) ?></td></tr>
                                <tr><td><strong>Desarrollador:</strong></td><td><?= htmlspecialchars($ficha_encontrada['desarrollador']) ?></td></tr>
                                <tr><td><strong>Contratista:</strong></td><td><?= htmlspecialchars($ficha_encontrada['contratista']) ?></td></tr>
                                <tr><td><strong>Localización:</strong></td><td><?= htmlspecialchars($ficha_encontrada['localizacion']) ?></td></tr>
                                <tr><td><strong>Estado:</strong></td><td>
                                    <?php if($ficha_encontrada['estado'] == 'BORRADOR'): ?>
                                        <span class="estado-borrador">📝 Borrador</span>
                                    <?php elseif($ficha_encontrada['estado'] == 'EN_VALIDACION'): ?>
                                        <span class="estado-validacion">⏳ En Validación</span>
                                    <?php elseif($ficha_encontrada['estado'] == 'APROBADO'): ?>
                                        <span class="estado-aprobado">✅ Aprobado</span>
                                    <?php elseif($ficha_encontrada['estado'] == 'RECHAZADO'): ?>
                                        <span class="estado-rechazado">❌ Rechazado</span>
                                    <?php endif; ?>
                                </td></tr>
                           <tr>
    <td><strong>Resultado:</strong></td>
    <td>

        <?php if($ficha_encontrada['estado_validacion'] == 'Satisfactoria'){ ?>

            <span class="badge bg-success">
                SATISFACTORIA
            </span>

        <?php }elseif($ficha_encontrada['estado_validacion'] == 'No Satisfactoria' || $ficha_encontrada['estado_validacion'] == 'no_satisfactoria'){ ?>

            <span class="badge bg-danger">
                NO SATISFACTORIA
            </span>

        <?php }elseif($ficha_encontrada['estado_validacion'] == 'No Presentada' || $ficha_encontrada['estado_validacion'] == 'no_presentada'){ ?>

            <span class="badge bg-secondary">
                NO PRESENTADA
            </span>

        <?php }else{ ?>

            <span class="badge bg-warning text-dark">
                PENDIENTE
            </span>

        <?php } ?>

    </td>
</tr>
                            </table>
                        </div>
                      
<div class="col-md-4 text-end">

<?php
$estado = strtoupper(trim($ficha_encontrada['estado'] ?? ''));
$resultado = strtoupper(trim($ficha_encontrada['estado_validacion'] ?? ''));
?>

<div class="col-md-4 text-end">

<?php if($estado == 'APROBADO' && $resultado == 'SATISFACTORIA'): ?>

    <!-- SOLO PDF -->
    <button
        onclick="generarPDF('<?= $ficha_encontrada['folio'] ?>')"
        class="btn btn-info mt-2"
    >
        📄 Descargar PDF
    </button>

<?php else: ?>

    <!-- VER FICHA -->
    <a
        href="../fact3.php?folio=<?= urlencode($ficha_encontrada['folio']) ?>"
        class="btn btn-primary"
        target="_blank"
    >
        👁️ Ver Ficha Completa
    </a>

    <!-- VALIDACIÓN -->
    <?php if($estado == 'EN_VALIDACION'): ?>

        <button
            onclick="aprobarFicha('<?= $ficha_encontrada['folio'] ?>')"
            class="btn btn-success mt-2"
        >
            ✅ Aprobar
        </button>

        <button
            onclick="rechazarFicha('<?= $ficha_encontrada['folio'] ?>')"
            class="btn btn-danger mt-2"
        >
            ❌ Rechazar
        </button>

    <?php endif; ?>

    <!-- GENERAR PDF -->
 

<?php endif; ?>

</div>



                    </div>
                </div>
            <?php else: ?>
                <div class="alert alert-warning mt-3">
                    ⚠️ No se encontró ninguna ficha con el folio: <strong><?= htmlspecialchars($folio_buscar) ?></strong>
                </div>
            <?php endif; ?>
        <?php endif; ?>
    </div>
</div>
