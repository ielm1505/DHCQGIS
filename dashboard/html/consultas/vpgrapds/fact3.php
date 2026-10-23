<?php
// Incluir auth.php para proteger la página
include '../../../authh.php'; // Ajusta la ruta según tu estructura

// Verificar que solo el rol admin pueda acceder
checkRole(['Admin','Editor']);
?>


<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Formato de Prueba Hidraulicas</title>
<!-- Librerías necesarias -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<link rel="stylesheet" href="g_vpgrapds.css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@7.5.2/ol.css">
<script src="https://cdn.jsdelivr.net/npm/ol@7.5.2/dist/ol.js"></script>


<meta name="viewport" content="width=device-width, initial-scale=1.0">


</head>
<body>

<div class="container" id="pdf-content">

   <div class="logos">

    <div class="lado izquierdo">
        <img src="../../../Imagen/qroo.png" alt="Logo 1">
        <img src="../../../Imagen/logo-de-gobierno.png" alt="Logo 2">
    </div>

    <div class="centro">
        <h2>
            VERIFICACION DE PRUEBAS GENERALES<br>
            REDES DE AGUA POTABLE Y DRENAJE<br>
            SANITARIO
        </h2>
    </div>

    <div class="lado derecho">
        <img src="../../../Imagen/logo-aguakan.png" alt="Logo 3">
        <img src="../../../Imagen/LogoCapaQ.png" alt="Logo 4">
    </div>

</div>

<!-- ================= MAIN 2 COLUMNAS ================= -->
    <div class="main-row">
        <!-- COLUMNA IZQUIERDA -->
        <div class="column">
            <!-- DATOS OBRA -->
            <div class="section">
                <div class="section-title">DATOS DE LA OBRA</div>
                <div class="section-body">
                        <div class="material-row4">
                            <label>FRACCIONAMIENTO:</label>
                            <div class="valor"><input type="text" class="input-txt" placeholder="Ingrese fraccionamiento"></div>
                        </div>
                        <div class="material-row4">
                            <label>DESARROLLADOR:</label>
                           <div class="valor"><input type="text" class="input-txt" placeholder="Ingrese desarrollador"></div>
                        </div>
                        <div class="material-row4">
                            <label>CONTRATISTA:</label>
                            <div class="valor"><input type="text" class="input-txt" placeholder="Ingrese contratista"></div>
                        </div>
                        <div class="material-row4">
                            <label>LOCALIZACIÓN:</label>
                           <div class="valor"><input type="text" class="input-txt" placeholder="Ingrese localización"></div>
                        </div>
                        <div class="material-row4">
                            <label>INSTALACION A PROBAR:</label>
                            <div class="valor">
                                <input type="text" class="input-txt" placeholder="Ingrese instalación"></div>
                        </div>
                        <div class="material-row4">
                            <label>ENTRE:</label>
                            <div class="valor">
                                <input type="text" class="input-txt" placeholder="Ingrese entre calles">
                            </div>
                        </div>
                        <div class="material-row-mz-parc">
    <label>MANZANA:</label>
    <div class="valor">
        <input type="text" class="input-txt" placeholder="Ingrese manzana">
    </div>

    <label>PARC:</label>
    <div class="valor">
        <input type="text" class="input-txt" placeholder="Ingrese parc">
    </div>
</div>
                         <div class="material-row4">
                            <label>LOCALIDAD:</label>
                            <div class="valor">
                                <input type="text" class="input-txt" placeholder="Ingrese LOCALIDAD">
                            </div>
                        </div><BR>
                </div>
            </div>

            <!-- TIPO INSTALACION -->
            <div class="section">
                <div class="section-title">TIPO DE INSTALACIÓN PROBADA</div>
                <div class="section-body">
                        <div class="material-row3">
                            <div class="check-item">
                                <input type="checkbox" id="conduccion">
                                <label for="conduccion">Línea de Conducción</label>
                            </div>
                            <div class="check-item">
                                <input type="checkbox" id="emisor">
                                <label for="emisor">Emisor</label>
                            </div>
                        </div>
                        <div class="material-row3">
                            <div class="check-item">
                                <input type="checkbox" id="aguaPotable">
                                <label for="aguaPotable">Red de Agua Potable</label>
                            </div>
                            <div class="check-item">
                                <input type="checkbox" id="atarjeas">
                                <label for="atarjeas">Red de atarjeas</label>
                            </div>
                        </div>
                        <div class="material-row3">
                            <div class="check-item">
                                <input type="checkbox" id="tomas">
                                <label for="tomas">Tomas Domiciliarias</label>
                            </div>
                            <div class="check-item">
                                <input type="checkbox" id="descargas">
                                <label for="descargas">Descarga Domiciliarias</label>
                            </div>
                        </div>
                        <div class="material-row3">
                            <div class="check-item">
                                <input type="checkbox" id="colector">
                                <label for="colector">Colector</label>
                            </div>
                            <div class="check-item">
                                <input type="checkbox" id="pozo">
                                <label for="pozo">Pozo de Visita/Registro</label>
                            </div>
                        </div>
                </div>
            </div>

            <!-- MATERIAL -->
            <div class="section">
                <div class="section-title">MATERIAL</div>
                <div class="section-body">
                        <div class="material-row2">
                            <div class="check-item">
                                <input type="checkbox" id="pvc">
                                <label for="pvc">PVC</label>
                            </div>
                            <label for="pvc-cedula">Cédula</label>
                            <div class="valor">
                            <input type="text" id="pvc-cedula" placeholder="Ej: 5">
                        </div>
                        </div>
                        <div class="material-row2">
                            <div class="check-item">
                                <input type="checkbox" id="asbesto">
                                <label for="asbesto">Asbesto-Cemento</label>
                            
                            </div>
                            <label for="asbesto-cedula">Cédula</label>
                            <div class="valor">
                            <input type="text" id="asbesto-cedula" placeholder="Ej: 5">
                            </div>
                        </div>
                        <div class="material-row2">
                            <div class="check-item">
                                <input type="checkbox" id="pead">
                                <label for="pead">PEAD (ramal tomas Dom.)</label>
                            </div>
                            <label for="pead-cedula">Cédula</label>
                            <div class="valor">
                            <input type="text" id="pead-cedula" placeholder="Ej: 5">
                        </div>
                        </div>
                </div>
            </div>
            
            <!-- TIPO Y RESULTADO -->
            <div class="section">
                <div class="section-title">TIPO Y RESULTADO DE PRUEBA</div>
                <div class="section-body">
                        <div class="material-row3">
                            <div class="check-item">
                                <input type="checkbox" id="hidrostatica">
                                <label for="hidrostatica">Hidrostatica</label>
                            </div>
                            <div class="check-item">
                                <input type="checkbox" id="satisfactoria">
                                <label for="satisfactoria">satisfactoria</label>
                            </div>
                        </div>
                        <div class="material-row3">
                            <div class="check-item">
                                <input type="checkbox" id="neumatica">
                                <label for="neumatica">Neumatica</label>
                            </div>
                            <div class="check-item">
                                <input type="checkbox" id="noSatisfactoria">
                                <label for="noSatisfactoria">No Satisfactoria</label>
                            </div>
                        </div>
                        <div class="material-row3">
                            <div class="check-item">
                                <input type="checkbox" id="escurrimiento">
                                <label for="escurrimiento">Escurrimiento</label>
                            </div>
                            <div class="check-item">
                                <input type="checkbox" id="noPresentada">
                                <label for="noPresentada">No Presentada</label>
                            </div>
                        </div>
                        <div class="material-row3">
                            <div class="check-item">
                                <input type="checkbox" id="estanquidad">
                                <label for="estanquidad">Estanquidad</label>
                            </div>
                        </div>
                </div>
            </div>
        </div>

        <!-- COLUMNA DERECHA -->
        <div class="column">
            <!-- DATOS PRUEBA -->
            <div class="section">
                <div class="section-title">DATOS DE LA PRUEBA</div>
                <div class="section-body">
                    <div class="contenido-prueba">
                        <!-- FOLIO -->
                        <div class="fila"> 
    <div class="label">FOLIO:</div>
    <div class="valor">
        <input type="text" 
               id="inputFolioGenerado"
               class="input-folio" 
               placeholder="FOL-001"
               readonly>
    </div>
</div>

                        <!-- FECHA -->
                        <div class="fila">
                            <div class="label">FECHA:</div>
                            <div class="valor">
                                <input type="text" id="inputFechaHoy" class="input-fecha" readonly>
                            </div>
                        </div>

                        <!-- TIPO DE PRUEBA -->
                        <div class="subheader">TIPO DE PRUEBA</div>

                        <div class="tipo-prueba">
                            <div class="check-item">
                                <input type="checkbox" id="parcialAgua" name="tipoPrueba">
                                <label for="parcialAgua">PARCIAL AGUA POTABLE</label>
                            </div>
                            <div class="check-item">
                                <input type="checkbox" id="parcialDrenaje" name="tipoPrueba">
                                <label for="parcialDrenaje">PARCIAL DRENAJE SANITARIO</label>
                            </div>
                            <div class="check-item">
                                <input type="checkbox" id="generalAgua" name="tipoPrueba">
                                <label for="generalAgua">GENERAL AGUA POTABLE</label>
                            </div>
                            <div class="check-item">
                                <input type="checkbox" id="generalDrenaje" name="tipoPrueba">
                                <label for="generalDrenaje">GENERAL DRENAJE SANITARIO</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- DIAMETRO / LONGITUD -->
            <div class="section">
                <div class="section-title">DIÁMETRO / LONGITUD</div>
                <div class="section-body">
                    <div class="material-grid">
                        <div class="material-row" style="font-weight:bold; border-bottom:1px solid #000; margin-bottom:10px;">
                            <span>Diámetro</span>
                            <span>Longitud</span>
                            <span>Descargas</span>
                            <span>Tomas</span>
                        </div>
                        
                        <div class="material-row">
                            <div class="check-item">
                                <input type="checkbox" id="d64">
                                <label for="d64">64 mm (2 1/2")</label>
                            </div>
                            <input type="text" placeholder="longitud">
                            <input type="text" placeholder="descripción">
                            <input type="text" placeholder="tomas">
                        </div>
                        <div class="material-row">
                            <div class="check-item">
                                <input type="checkbox" id="d75">
                                <label for="d75">75 mm (3")</label>
                            </div>
                            <input type="text" placeholder="longitud">
                            <input type="text" placeholder="descripción">
                            <input type="text" placeholder="tomas">
                        </div>
                        <div class="material-row">
                            <div class="check-item">
                                <input type="checkbox" id="d100">
                                <label for="d100">100 mm (4")</label>
                            </div>
                            <input type="text" placeholder="longitud">
                            <input type="text" placeholder="descripción">
                            <input type="text" placeholder="tomas">
                        </div>
                        <div class="material-row">
                            <div class="check-item">
                                <input type="checkbox" id="d150">
                                <label for="d150">150 mm (6")</label>
                            </div>
                            <input type="text" placeholder="longitud">
                            <input type="text" placeholder="descripción">
                            <input type="text" placeholder="tomas">
                        </div>
                        <div class="material-row">
                            <div class="check-item">
                                <input type="checkbox" id="d200">
                                <label for="d200">200 mm (8")</label>
                            </div>
                            <input type="text" placeholder="longitud">
                            <input type="text" placeholder="descripción">
                            <input type="text" placeholder="tomas">
                        </div>
                        <div class="material-row">
                            <div class="check-item">
                                <input type="checkbox" id="d250">
                                <label for="d250">250 mm (10")</label>
                            </div>
                            <input type="text" placeholder="longitud">
                            <input type="text" placeholder="descripción">
                            <input type="text" placeholder="tomas">
                        </div>
                        <div class="material-row">
                            <div class="check-item">
                                <input type="checkbox" id="d300">
                                <label for="d300">300 mm (12")</label>
                            </div>
                            <input type="text" placeholder="longitud">
                            <input type="text" placeholder="descripción">
                            <input type="text" placeholder="tomas">
                        </div>
                        <div class="material-row">
                            <div class="check-item">
                                <input type="checkbox" id="d455">
                                <label for="d455">455 mm (18")</label>
                            </div>
                            <input type="text" placeholder="longitud">
                            <input type="text" placeholder="descripción">
                            <input type="text" placeholder="tomas">
                        </div>
                    </div>
                </div>
            </div>

            <!-- DATOS DE PRUEBA -->
            <div class="section">
                <div class="section-title">DATOS DE PRUEBA</div>
                <div class="section-body">
                    <div class="material-row">
                        <div class="check-item">
                            <input type="checkbox" id="presionTrabajo">
                            <label for="presionTrabajo">Presion de trabajo</label>
                        </div>
                        <input type="text" placeholder="Valor">
                    </div>
                    <div class="material-row">
                        <div class="check-item">
                            <input type="checkbox" id="presionPrueba">
                            <label for="presionPrueba">Presión de Prueba</label>
                        </div>
                        <input type="text" placeholder="Valor">
                        <label for="presionUnidad">Km/cm2</label>
                        <input type="text" placeholder="Unidad" style="max-width:60px;">
                    </div>
                    <div class="material-row">
                        <div class="check-item">
                            <input type="checkbox" id="horaInicio">
                            <label for="horaInicio">Hora de Inicio</label>
                        </div>
                        <input type="text" placeholder="HH:MM">
                        <label for="inicioHrs">hrs</label>
                        <input type="text" placeholder="Duración" style="max-width:60px;">
                    </div>
                    <div class="material-row">
                        <div class="check-item">
                            <input type="checkbox" id="horaTermino">
                            <label for="horaTermino">Hora de Termino</label>
                        </div>
                        <input type="text" placeholder="HH:MM">
                        <label for="terminoHrs">hrs</label>
                        <input type="text" placeholder="Duración" style="max-width:60px;">
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ================= OBSERVACIONES ================= -->
    <div class="section full-width">
        <div class="section-title">OBSERVACIONES</div>
        <div class="section-body">
            <textarea placeholder="Escriba observaciones aquí..."></textarea>
        </div>
    </div>
    
    <!-- ================= NOTAS IMPORTANTES ================= -->
    
        <div class= "label2" readonly>Notas importantes: 
1. Este documento avala que la prueba se realizo conforme a los procedimiento señalados por las Normas Oficiales NOM-001-CNA-1995, NOM-002-CNA-1995 y las Normas Tecnicas Nt-001-CNA-2001, NT-006-CNA-2001 o NT-007-CNA-2001 segun corresponda al tipo de instalacion.
2. Este documento debera incluirse en el expediente requerido para realizar tramites de contratacion ante desarrollo Hidraulicos de Canucún, S.A de C.V (DHC).
3. Este documento en ningun caso implica la recepcion de la (s) instalacion (es) aprobadas por parte de DHC.
4. Esta prueba no implica el cotejo entre el proyecto aprobado y la instalacion fisica ejecutada, cualquier modificacion a la misma es responsabilidad del desarrollador y debera ser presentada previamente por las instancias correspondientes.
5. El Desarrollador es totalmente responsable por la calidad de los materiales empleados, asi como del proceso constructivo y de la observancia de las normas y especificaciones de construccion dictadas por las dependencias oficiales asi como las particulares señaladas en el proyecto ejecutivo.</div>


    <!-- ================= FIRMAS DIGITALES ================= -->
    <div class="firmas">
        <!-- Firma 1 -->
        <div class="firma" id="firma-contratista">
            <div class="firma-title">POR LA CONTRATISTA</div>
            <div class="firma-body">
                <canvas class="firma-canvas" ></canvas>
                <div class="firma-actions">
                    <button class="limpiar-firma">Limpiar</button>
                </div>
            </div>
        </div>
        <!-- Firma 2 -->
        <div class="firma" id="firma-desarrollador">
            <div class="firma-title">POR EL DESARROLLADOR</div>
            <div class="firma-body">
                <canvas class="firma-canvas" ></canvas>
                <div class="firma-actions">
                    <button class="limpiar-firma">Limpiar</button>
                </div>
            </div>
        </div>
        <!-- Firma 3 -->
        <div class="firma" id="firma-verificadora">
            <div class="firma-title">POR LA UNIDAD VERIFICADORA</div>
            <div class="firma-body">
                <canvas class="firma-canvas" ></canvas>
                <div class="firma-actions">
                    <button class="limpiar-firma">Limpiar</button>
                </div>
            </div>
        </div>
        <!-- Firma 4 -->
        <div class="firma" id="firma-aguakan">
            <div class="firma-title">POR AGUAKAN</div>
            <div class="firma-body">
                <canvas class="firma-canvas"></canvas>
                <div class="firma-actions">
                    <button class="limpiar-firma">Limpiar</button>
                </div>
            </div>
        </div>
    </div>

</div>

<div class="page-break"></div>


    
<div class="segunda-hoja" id="segunda-hoja">

    <!-- FILA SUPERIOR -->
    <div class="fila-superior">

        <!-- CROQUIS IZQUIERDA -->
        <div class="croquis-box">
            <div class="section-title">CROQUIS DE RED PROBADA:</div>
            <div class="croquis-body">
                <div id="mapa-ubicacion" ></div>
            </div>
        </div>

        <!-- CALIDAD DERECHA -->
        <div class="calidad-box">
            <div class="section-title">CALIDAD DE OBRA:</div>
            <div class="calidad-body">

             <table class="tabla-calidad">

                <!-- ===== SECCION 1 ===== -->
                        <tr class="titulo-seccion">
                                <td colspan="5">CONCEPTOS GENERALES:</td>
                            </tr>
                                            <tr class="titulo-seccion2">    
                                                <td colspan="5">ETAPAS CONSTRUCTIVAS PREVIAS:</td>
                                            </tr>
                                                
                                                    <tr>
                                                            <!-- Descripción ocupa dos filas -->
                                                            <td class="descripcion" rowspan="2">
                                                                BASE PARA PAVIMENTO
                                                            </td>

                                                            <!-- Columna 1 -->
                                                            <td class="check">
                                                                <input type="checkbox">
                                                            </td>
                                                            <td class="opcion">
                                                                SIN INICIAR
                                                            </td>

                                                            <!-- Columna 2 -->
                                                            <td class="check">
                                                                <input type="checkbox">
                                                            </td>
                                                            <td class="opcion">
                                                                EN PROCESO
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <!-- Segunda fila -->
                                                            <td class="check">
                                                                <input type="checkbox">
                                                            </td>
                                                            <td class="opcion">
                                                                CONCLUIDA
                                                            </td>

                                                            <!-- Espacio vacío para mantener estructura -->
                                                            <td colspan="2"></td>
                                                        </tr>

                                            <tr class="titulo-seccion2">
                                                <td colspan="5">ZANJAS Y RELLENOS RED PRINCIPAL:
                                            </tr>
                                                            <tr>
                                                            <td class="descripcion">DIMENSIONES ZANJA NORMA CNA</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">SI</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">NO</td>
                                                            </tr>
                                                            <tr>
                                                            <td class="descripcion">PLANTILLAS NORMAS CNA</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">SI</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">NO</td>
                                                            </tr>
                                                            <tr>
                                                            <td class="descripcion">ESPESOR SOBRE RELLENO ACOSTILLADO SOBRE LOMO: 30 cm.</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">SI</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">NO</td>
                                                            </tr>
                                                            <tr>
                                                            <td class="descripcion">ESPESOR RELLENO TOTAL ≥ 80 cm. SOBRE LOMO</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">SI</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">NO</td>
                                                            </tr>

                                            <tr class="titulo-seccion2">
                                                <td colspan="5">SEPARACION HORIZONTAL:
                                            </tr>

                                                            <tr>
                                                            <td class="descripcion">ENTRE LINEAS DE AP Y DRENAJE</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">SI</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">NO</td>
                                                            </tr>
                                                            <tr>
                                                            <td class="descripcion">ENTRE LINEAS DE AP O DRENAJE Y OTRAS</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">SI</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">NO</td>
                                                            </tr>
                                                            <tr>
                                            <tr class="titulo-seccion2">
                                                <td colspan="5">SEPARACION VERTICAL:
                                            </tr>

                                                            <tr>
                                                            <td class="descripcion">ENTRE LINEAS DE AP Y DRENAJE</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">SI</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">NO</td>
                                                            </tr>
                                                            <tr>
                                                            <td class="descripcion">ENTRE LINEAS DE AP O DRENAJE Y OTRAS</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">SI</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">NO</td>
                                                            </tr>
                                                            <tr>
                                             <tr class="titulo-seccion2">
                                                <td colspan="5">MATERIALES UTILIZADOS:
                                            </tr>

                                                            <tr>
                                                            <td class="descripcion">TUBERÍA Y CONEXIONES PVC</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">SI</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">NO</td>
                                                            </tr>
                                                            <tr>
                                                            <td class="descripcion">TUBERÍA PHDE</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">SI</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">NO</td>
                                                            </tr>
                                                         


        <!-- ===== SECCION 2 ===== -->
        <tr class="titulo-seccion">
            <td colspan="5">CONCEPTOS DE AGUA POTABLE:</td>
        </tr>
                                          <tr class="titulo-seccion2">
                                                <td colspan="5">TOMAS DOMICILIARIAS:
                                            </tr>

                                                            <tr>
                                                            <td class="descripcion">ZANJAS Y RELLENOS NORMAS CNA</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">SI</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">NO</td>
                                                            </tr>
                                                            <tr>
                                                            <td class="descripcion">CUADROS DE MEDICION</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">SI</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">NO</td>
                                                            </tr>
                                                            <tr>
                                                            <td class="descripcion">MURETES</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">SI</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">NO</td>
                                                            </tr>
                                                        

              <!-- ===== SECCION 3 ===== -->
        <tr class="titulo-seccion">
            <td colspan="5">CONCEPTOS DE DRENAJE SANITARIO:</td>
        </tr>
        <tr class="titulo-seccion2">
             <td colspan="5">DESCRAGAS DOMICILIARIAS:</td>
        </tr>

                                        
                                                            <tr>
                                                            <td class="descripcion">ZANJAS Y RELLENOS CNA</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">SI</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">NO</td>
                                                            </tr>
                                                            <tr>
                                                            <td class="descripcion">REGISTRO</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">SI</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">NO</td>
                                                            </tr>
                                                            <tr>
                                                            <td class="descripcion">MEDIAS CAÑAS</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">SI</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">NO</td>
                                                            </tr>
                                                            <tr>
                                                            <td class="descripcion">TAPAS CON MARCO Y JALADERA</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">SI</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">NO</td>
                                                            </tr>
                                                        </td>

                                     <tr class="titulo-seccion2">                    
            <td colspan="5">POZOS DE VISITA:</td>
                                     </tr>
                                        
                                                            <tr>
                                                            <td class="descripcion">MEDIAS CAÑAS</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">SI</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">NO</td>
                                                            </tr>
                                                            <tr>
                                                            <td class="descripcion">BROCALES Y TAPAS</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">SI</td>
                                                            <td class="check"><input type="checkbox"></td>
                                                            <td class="opcion">NO</td>
                                                            </tr>
                                                        </td>
 
    </table>

</div>     
        </div>       

        </div>
    <!-- TABLA INFERIOR -->
    <div class="tabla-inferior">
        <table id="tablaPozos">
            <thead>
                <tr>
                    <th>No. POZO</th>
                    <th>LONGITUD</th>
                    <th>DIAM.</th>
                    <th># REGISTROS</th>
                    <th># DESC. CUADRUPLEX</th>
                    <th>VIV. SERVIDAS</th>
                    <th>CALLE</th>
                </tr>
            </thead>
            <tbody>
               <tr>          
                       <td> <input type="text" placeholder="NO. pozo"></td>
                       <td> <input type="text" placeholder="LONGITUD"></td>
                       <td> <input type="text" placeholder="DIAM"></td>
                       <td> <input type="text" placeholder="# REGISTROS"></td>
                       <td> <input type="text" placeholder="# DESC. CUADRUPLEX"></td>
                       <td> <input type="text" placeholder="VIV. SERVIDAS"></td>
                       <td> <input type="text" placeholder="CALLE"></td>
            </tr>
             <tr>          
                       <td> <input type="text" placeholder="NO. pozo"></td>
                       <td> <input type="text" placeholder="LONGITUD"></td>
                       <td> <input type="text" placeholder="DIAM"></td>
                       <td> <input type="text" placeholder="# REGISTROS"></td>
                       <td> <input type="text" placeholder="# DESC. CUADRUPLEX"></td>
                       <td> <input type="text" placeholder="VIV. SERVIDAS"></td>
                       <td> <input type="text" placeholder="CALLE"></td>
            </tr>
             <tr>          
                       <td> <input type="text" placeholder="NO. pozo"></td>
                       <td> <input type="text" placeholder="LONGITUD"></td>
                       <td> <input type="text" placeholder="DIAM"></td>
                       <td> <input type="text" placeholder="# REGISTROS"></td>
                       <td> <input type="text" placeholder="# DESC. CUADRUPLEX"></td>
                       <td> <input type="text" placeholder="VIV. SERVIDAS"></td>
                       <td> <input type="text" placeholder="CALLE"></td>
            </tr>
             <tr>          
                       <td> <input type="text" placeholder="NO. pozo"></td>
                       <td> <input type="text" placeholder="LONGITUD"></td>
                       <td> <input type="text" placeholder="DIAM"></td>
                       <td> <input type="text" placeholder="# REGISTROS"></td>
                       <td> <input type="text" placeholder="# DESC. CUADRUPLEX"></td>
                       <td> <input type="text" placeholder="VIV. SERVIDAS"></td>
                       <td> <input type="text" placeholder="CALLE"></td>
            </tr>
             <tr>          
                       <td> <input type="text" placeholder="NO. pozo"></td>
                       <td> <input type="text" placeholder="LONGITUD"></td>
                       <td> <input type="text" placeholder="DIAM"></td>
                       <td> <input type="text" placeholder="# REGISTROS"></td>
                       <td> <input type="text" placeholder="# DESC. CUADRUPLEX"></td>
                       <td> <input type="text" placeholder="VIV. SERVIDAS"></td>
                       <td> <input type="text" placeholder="CALLE"></td>
            </tr>
             <tr>          
                       <td> <input type="text" placeholder="NO. pozo"></td>
                       <td> <input type="text" placeholder="LONGITUD"></td>
                       <td> <input type="text" placeholder="DIAM"></td>
                       <td> <input type="text" placeholder="# REGISTROS"></td>
                       <td> <input type="text" placeholder="# DESC. CUADRUPLEX"></td>
                       <td> <input type="text" placeholder="VIV. SERVIDAS"></td>
                       <td> <input type="text" placeholder="CALLE"></td>
            </tr>
             <tr>          
                       <td> <input type="text" placeholder="NO. pozo"></td>
                       <td> <input type="text" placeholder="LONGITUD"></td>
                       <td> <input type="text" placeholder="DIAM"></td>
                       <td> <input type="text" placeholder="# REGISTROS"></td>
                       <td> <input type="text" placeholder="# DESC. CUADRUPLEX"></td>
                       <td> <input type="text" placeholder="VIV. SERVIDAS"></td>
                       <td> <input type="text" placeholder="CALLE"></td>
            </tr>
             <tr>          
                       <td> <input type="text" placeholder="NO. pozo"></td>
                       <td> <input type="text" placeholder="LONGITUD"></td>
                       <td> <input type="text" placeholder="DIAM"></td>
                       <td> <input type="text" placeholder="# REGISTROS"></td>
                       <td> <input type="text" placeholder="# DESC. CUADRUPLEX"></td>
                       <td> <input type="text" placeholder="VIV. SERVIDAS"></td>
                       <td> <input type="text" placeholder="CALLE"></td>
            </tr>
             <tr>          
                       <td> <input type="text" placeholder="NO. pozo"></td>
                       <td> <input type="text" placeholder="LONGITUD"></td>
                       <td> <input type="text" placeholder="DIAM"></td>
                       <td> <input type="text" placeholder="# REGISTROS"></td>
                       <td> <input type="text" placeholder="# DESC. CUADRUPLEX"></td>
                       <td> <input type="text" placeholder="VIV. SERVIDAS"></td>
                       <td> <input type="text" placeholder="CALLE"></td>
            </tr>
            </tbody>
        <tfoot>
    <tr>
        <td><strong>TOTAL</strong></td>
        <td id="totalLongitud">0.00</td>
        <td></td>
        <td id="totalRegistros">0</td>
        <td></td>
        <td id="totalViviendas">0</td>
        <td></td>
    </tr>
</tfoot>
        </table>
    </div>

</div>






<!-- Botones de acción -->
<div class="btn-group">
    <button type="button" id="btnGuardarPDF" onclick="guardar()">
        Guardar y Generar PDF
    </button>
</div>

<script>
document.addEventListener("DOMContentLoaded", function() {

    const tabla = document.getElementById("tablaPozos");
    const tbody = tabla.querySelector("tbody");

    function calcularTotales() {

        let totalLongitud = 0;
        let totalRegistros = 0;
        let totalViviendas = 0;

        const filas = tbody.querySelectorAll("tr");

        filas.forEach(fila => {

            const inputs = fila.querySelectorAll("input");

            let longitud = parseFloat(inputs[1].value.replace(",", ".")) || 0;
            let registros = parseInt(inputs[3].value) || 0;
            let viviendas = parseInt(inputs[5].value) || 0;

            totalLongitud += longitud;
            totalRegistros += registros;
            totalViviendas += viviendas;
        });

        document.getElementById("totalLongitud").textContent = totalLongitud.toFixed(2);
        document.getElementById("totalRegistros").textContent = totalRegistros;
        document.getElementById("totalViviendas").textContent = totalViviendas;
    }

    tbody.addEventListener("input", calcularTotales);

});
</script>
<script src="g_vpgrapds.js"></script>
</body>
</html>