<?php
require '../../conexion.php';
session_start();

// Obtener parámetros de URL
$folio_cargar = $_GET['folio'] ?? '';
$modo = $_GET['modo'] ?? 'edicion';

$ficha_data = null;
$instalacion_data = [];
$material_data = [];
$resultado_data = null;
$tipo_prueba_valor = null;
$datos_prueba_data = null;
$diametros_data = [];
$pozos_data = [];
$firmas_data = [];
$croquis_data = null;

if($folio_cargar) {
    try {
        // 1. Datos principales
        $stmt = $pdo->prepare("SELECT * FROM dexterno_ap.fac_ficha_prueba WHERE folio = ?");
        $stmt->execute([$folio_cargar]);
        $ficha_data = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if($ficha_data) {
            $ficha_id = $ficha_data['id'];
            
            // 2. Instalación
            $stmt = $pdo->prepare("SELECT tipo FROM dexterno_ap.fac_ficha_instalacion WHERE ficha_id = ?");
            $stmt->execute([$ficha_id]);
            $instalacion_data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // 3. Material
            $stmt = $pdo->prepare("SELECT material, cedula FROM dexterno_ap.fac_ficha_material WHERE ficha_id = ?");
            $stmt->execute([$ficha_id]);
            $material_data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // 4. Resultado
            $stmt = $pdo->prepare("SELECT tipo_prueba, resultado FROM dexterno_ap.fac_ficha_resultado WHERE ficha_id = ?");
            $stmt->execute([$ficha_id]);
            $resultado_data = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // 5. Tipo de prueba
            $stmt = $pdo->prepare("SELECT tipo FROM dexterno_ap.fac_ficha_tipo_prueba WHERE ficha_id = ?");
            $stmt->execute([$ficha_id]);
            $tipo_prueba_row = $stmt->fetch(PDO::FETCH_ASSOC);
            $tipo_prueba_valor = $tipo_prueba_row ? $tipo_prueba_row['tipo'] : null;
            
            // 6. Datos de prueba
            $stmt = $pdo->prepare("SELECT * FROM dexterno_ap.fac_ficha_datos_prueba WHERE ficha_id = ?");
            $stmt->execute([$ficha_id]);
            $datos_prueba_data = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // 7. Diámetros
            $stmt = $pdo->prepare("SELECT * FROM dexterno_ap.fac_ficha_diametros WHERE ficha_id = ?");
            $stmt->execute([$ficha_id]);
            $diametros_data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // 8. Pozos
            $stmt = $pdo->prepare("SELECT * FROM dexterno_ap.fac_ficha_pozos WHERE ficha_id = ?");
            $stmt->execute([$ficha_id]);
            $pozos_data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // 9. Firmas
            $stmt = $pdo->prepare("SELECT tipo, imagen_base64 FROM dexterno_ap.fac_ficha_firmas WHERE ficha_id = ?");
            $stmt->execute([$ficha_id]);
            $firmas_data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // 10. Croquis
            $stmt = $pdo->prepare("SELECT geojson_data FROM dexterno_ap.fac_ficha_croquis WHERE ficha_id = ?");
            $stmt->execute([$ficha_id]);
            $croquis_data = $stmt->fetch(PDO::FETCH_ASSOC);
        }
    } catch(Exception $e) {
        error_log("Error al cargar ficha: " . $e->getMessage());
    }
}

// Convertir datos a JSON para JavaScript
$ficha_json = json_encode($ficha_data);
$instalacion_json = json_encode($instalacion_data);
$material_json = json_encode($material_data);
$resultado_json = json_encode($resultado_data);
$tipo_prueba_json = json_encode($tipo_prueba_valor);
$datos_prueba_json = json_encode($datos_prueba_data);
$diametros_json = json_encode($diametros_data);
$pozos_json = json_encode($pozos_data);
$firmas_json = json_encode($firmas_data);
$croquis_json = json_encode($croquis_data ? $croquis_data['geojson_data'] : null);
$modo_json = json_encode($modo);
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
        <img src="../../Imagen/qroo.png" alt="Logo 1">
        <img src="../../Imagen/logo-de-gobierno.png" alt="Logo 2">
    </div>

    <div class="centro">
        <h2>
            VERIFICACION DE PRUEBAS GENERALES<br>
            REDES DE AGUA POTABLE Y DRENAJE<br>
            SANITARIO
        </h2>
    </div>

    <div class="lado derecho">
        <img src="../../Imagen/logo-aguakan.png" alt="Logo 3">
        <img src="../../Imagen/LogoCapaQ.png" alt="Logo 4">
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
               placeholder="FOL-001">
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
<!-- Botones de acción -->
<div class="btn-group">
    <button type="button" id="btnGuardarPDF2" onclick="guardarpdf()">
        💾Guardar y Generar PDF
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




<script>
// Datos PHP pasados a JavaScript
const datosFicha = <?= $ficha_json ?: 'null' ?>;
const datosInstalacion = <?= $instalacion_json ?: '[]' ?>;
const datosMaterial = <?= $material_json ?: '[]' ?>;
const datosResultado = <?= $resultado_json ?: 'null' ?>;
const datosTipoPrueba = <?= $tipo_prueba_json ?: 'null' ?>;
const datosPrueba = <?= $datos_prueba_json ?: 'null' ?>;
const datosDiametros = <?= $diametros_json ?: '[]' ?>;
const datosPozos = <?= $pozos_json ?: '[]' ?>;
const datosFirmas = <?= $firmas_json ?: '[]' ?>;
const datosCroquis = <?= $croquis_json ?: 'null' ?>;
const modoActual = <?= $modo_json ?: '"edicion"' ?>;

// Función para cargar todos los datos de la ficha
function cargarDatosFichaExistente() {
    if (!datosFicha) {
        console.log("No hay datos de ficha para cargar - modo creación");
        if(typeof generarFolio === 'function') generarFolio();
        return;
    }
    
    console.log("Cargando ficha:", datosFicha.folio);
    
    // ========== DATOS BÁSICOS ==========
    const folioInput = document.getElementById("inputFolioGenerado");
    if(folioInput) folioInput.value = datosFicha.folio || '';
    
    const fechaInput = document.getElementById("inputFechaHoy");
    if(fechaInput) fechaInput.value = datosFicha.fecha || '';
    
    // ========== DATOS DE OBRA ==========
    const fraccionamientoInput = document.querySelector('input[placeholder="Ingrese fraccionamiento"]');
    if(fraccionamientoInput) fraccionamientoInput.value = datosFicha.fraccionamiento || '';
    
    const desarrolladorInput = document.querySelector('input[placeholder="Ingrese desarrollador"]');
    if(desarrolladorInput) desarrolladorInput.value = datosFicha.desarrollador || '';
    
    const contratistaInput = document.querySelector('input[placeholder="Ingrese contratista"]');
    if(contratistaInput) contratistaInput.value = datosFicha.contratista || '';
    
    const localizacionInput = document.querySelector('input[placeholder="Ingrese localización"]');
    if(localizacionInput) localizacionInput.value = datosFicha.localizacion || '';
    
    const instalacionInput = document.querySelector('input[placeholder="Ingrese instalación"]');
    if(instalacionInput) instalacionInput.value = datosFicha.instalacion || '';
    
    const entreInput = document.querySelector('input[placeholder="Ingrese entre calles"]');
    if(entreInput) entreInput.value = datosFicha.entre_calles || '';
    
    const manzanaInput = document.querySelector('input[placeholder="Ingrese manzana"]');
    if(manzanaInput) manzanaInput.value = datosFicha.manzana || '';
    
    const parcelaInput = document.querySelector('input[placeholder="Ingrese parc"]');
    if(parcelaInput) parcelaInput.value = datosFicha.parcela || '';
    
    const localidadInput = document.querySelector('input[placeholder="Ingrese LOCALIDAD"]');
    if(localidadInput) localidadInput.value = datosFicha.localidad || '';
    
    const observacionesTextarea = document.querySelector("textarea");
    if(observacionesTextarea) observacionesTextarea.value = datosFicha.observaciones || '';
    
    // ========== TIPO DE INSTALACIÓN ==========
 // ========== TIPO DE INSTALACIÓN ==========
console.log("=== DATOS DE INSTALACIÓN ===");
console.log("datosInstalacion:", datosInstalacion);

if(datosInstalacion && datosInstalacion.length > 0) {
    // Mapeo de textos de BD a IDs de HTML
    const mapa = {
        'Línea de Conducción': 'conduccion',
        'Emisor': 'emisor',
        'Red de Agua Potable': 'aguaPotable',
        'Red de atarjeas': 'atarjeas',
        'Tomas Domiciliarias': 'tomas',
        'Descarga Domiciliarias': 'descargas',
        'Colector': 'colector',
        'Pozo de Visita/Registro': 'pozo'
    };
    
    // Desmarcar todos
    Object.values(mapa).forEach(id => {
        const el = document.getElementById(id);
        if(el) el.checked = false;
    });
    
    // Marcar los que están en BD
    datosInstalacion.forEach(item => {
        const idCheckbox = mapa[item.tipo];
        if(idCheckbox) {
            const checkbox = document.getElementById(idCheckbox);
            if(checkbox) {
                checkbox.checked = true;
                console.log(`✓ Marcado: ${item.tipo}`);
            }
        } else {
            console.log(`✗ Sin mapeo: "${item.tipo}"`);
        }
    });
} else {
    console.log("No hay datos de instalación");
}

//    datosInstalacion.forEach(item => {
//        const checkbox = document.getElementById(item.tipo);
//        if(checkbox && (item.valor === 'true' || item.valor === '1' || item.valor === 'on')) {
//            checkbox.checked = true;
//        }
//    });
    
    // ========== MATERIAL ==========
    datosMaterial.forEach(item => {
        if(item.material === 'PVC') {
            const chkPVC = document.getElementById("pvc");
            if(chkPVC) {
                chkPVC.checked = true;
                const cedulaPVC = document.getElementById("pvc-cedula");
                if(cedulaPVC) cedulaPVC.value = item.cedula || '';
            }
        } else if(item.material === 'Asbesto-Cemento') {
            const chkAsbesto = document.getElementById("asbesto");
            if(chkAsbesto) {
                chkAsbesto.checked = true;
                const cedulaAsbesto = document.getElementById("asbesto-cedula");
                if(cedulaAsbesto) cedulaAsbesto.value = item.cedula || '';
            }
        } else if(item.material === 'PEAD') {
            const chkPead = document.getElementById("pead");
            if(chkPead) {
                chkPead.checked = true;
                const cedulaPead = document.getElementById("pead-cedula");
                if(cedulaPead) cedulaPead.value = item.cedula || '';
            }
        }
    });
    
    // ========== TIPO Y RESULTADO DE PRUEBA ==========
    if(datosResultado) {
        // Tipo de prueba física
        if(datosResultado.tipo_prueba === 'Hidrostatica') document.getElementById("hidrostatica").checked = true;
        if(datosResultado.tipo_prueba === 'Neumatica') document.getElementById("neumatica").checked = true;
        if(datosResultado.tipo_prueba === 'Escurrimiento') document.getElementById("escurrimiento").checked = true;
        if(datosResultado.tipo_prueba === 'Estanquidad') document.getElementById("estanquidad").checked = true;
        
        // Resultado
        if(datosResultado.resultado === 'satisfactoria') document.getElementById("satisfactoria").checked = true;
        if(datosResultado.resultado === 'No Satisfactoria') document.getElementById("noSatisfactoria").checked = true;
        if(datosResultado.resultado === 'No Presentada') document.getElementById("noPresentada").checked = true;
    }
    
    // ========== TIPO DE PRUEBA (PARCIAL/GENERAL) ==========
    if(datosTipoPrueba) {
        // Desmarcar todos primero
        document.getElementById("parcialAgua").checked = false;
        document.getElementById("parcialDrenaje").checked = false;
        document.getElementById("generalAgua").checked = false;
        document.getElementById("generalDrenaje").checked = false;
        
        // Marcar el que corresponde
        if(datosTipoPrueba === 'PARCIAL AGUA POTABLE') {
            document.getElementById("parcialAgua").checked = true;
        } else if(datosTipoPrueba === 'PARCIAL DRENAJE SANITARIO') {
            document.getElementById("parcialDrenaje").checked = true;
        } else if(datosTipoPrueba === 'GENERAL AGUA POTABLE') {
            document.getElementById("generalAgua").checked = true;
        } else if(datosTipoPrueba === 'GENERAL DRENAJE SANITARIO') {
            document.getElementById("generalDrenaje").checked = true;
        }
    }
    
    // ========== DATOS DE PRUEBA (PRESIÓN, HORAS) ==========
    if(datosPrueba) {
        // Presión de trabajo
        if(datosPrueba.presion_trabajo === '1' || datosPrueba.presion_trabajo === true) {
            document.getElementById("presionTrabajo").checked = true;
            const row = document.getElementById("presionTrabajo").closest('.material-row');
            if(row) {
                const inputs = row.querySelectorAll('input[type="text"]');
                if(inputs[0]) inputs[0].value = datosPrueba.presion_trabajo_valor || '';
            }
        }
        
        // Presión de prueba
        if(datosPrueba.presion_prueba === '1' || datosPrueba.presion_prueba === true) {
            document.getElementById("presionPrueba").checked = true;
            const row = document.getElementById("presionPrueba").closest('.material-row');
            if(row) {
                const inputs = row.querySelectorAll('input[type="text"]');
                if(inputs[0]) inputs[0].value = datosPrueba.presion_prueba_valor || '';
                const unidadInput = row.querySelector('input[placeholder="Unidad"]');
                if(unidadInput && datosPrueba.unidad) {
                    unidadInput.value = datosPrueba.unidad;
                }
            }
        }
        
        // Hora de inicio
        if(datosPrueba.hora_inicio === '1' || datosPrueba.hora_inicio === true) {
            document.getElementById("horaInicio").checked = true;
            const row = document.getElementById("horaInicio").closest('.material-row');
            if(row) {
                const inputs = row.querySelectorAll('input[type="text"]');
                if(inputs[0]) inputs[0].value = datosPrueba.hora_inicio_valor || '';
                if(inputs[1]) inputs[1].value = datosPrueba.duracion_inicio || '';
            }
        }
        
        // Hora de término
        if(datosPrueba.hora_termino === '1' || datosPrueba.hora_termino === true) {
            document.getElementById("horaTermino").checked = true;
            const row = document.getElementById("horaTermino").closest('.material-row');
            if(row) {
                const inputs = row.querySelectorAll('input[type="text"]');
                if(inputs[0]) inputs[0].value = datosPrueba.hora_termino_valor || '';
                if(inputs[1]) inputs[1].value = datosPrueba.duracion_termino || '';
            }
        }
    }
    
    // ========== DIÁMETROS ==========
    datosDiametros.forEach(diametro => {
        const checkboxes = document.querySelectorAll('.material-grid .material-row input[type="checkbox"]');
        const diametroCheck = Array.from(checkboxes).find(
            ch => ch.nextElementSibling?.innerText?.trim() === diametro.diametro
        );
        if(diametroCheck) {
            diametroCheck.checked = true;
            const row = diametroCheck.closest('.material-row');
            const inputs = row.querySelectorAll('input[type="text"]');
            if(inputs[0]) inputs[0].value = diametro.longitud || '';
            if(inputs[1]) inputs[1].value = diametro.descargas || '';
            if(inputs[2]) inputs[2].value = diametro.tomas || '';
        }
    });
    
    // ========== POZOS ==========
    const filasPozos = document.querySelectorAll("#tablaPozos tbody tr");
    datosPozos.forEach((pozo, index) => {
        if(filasPozos[index]) {
            const inputs = filasPozos[index].querySelectorAll("input");
            if(inputs[0]) inputs[0].value = pozo.no_pozo || '';
            if(inputs[1]) inputs[1].value = pozo.longitud || '';
            if(inputs[2]) inputs[2].value = pozo.diametro || '';
            if(inputs[3]) inputs[3].value = pozo.registros || '';
            if(inputs[4]) inputs[4].value = pozo.desc_cuadruplex || '';
            if(inputs[5]) inputs[5].value = pozo.viviendas || '';
            if(inputs[6]) inputs[6].value = pozo.calle || '';
        }
    });
    
    // Disparar el cálculo de totales
    if(typeof calcularTotales === 'function') {
        calcularTotales();
    }
    
    // ========== CROQUIS ==========
    if(datosCroquis) {
        localStorage.setItem('croquisSeleccion', datosCroquis);
        console.log("Croquis cargado en localStorage");
        
        // Cargar en el mapa si ya está inicializado
        setTimeout(function() {
            cargarCroquisEnMapa(datosCroquis);
        }, 500);
    }
    
    // ========== FIRMAS ==========
    datosFirmas.forEach(firma => {
        let firmaId = '';
        switch(firma.tipo) {
            case 'POR LA CONTRATISTA': firmaId = 'firma-contratista'; break;
            case 'POR EL DESARROLLADOR': firmaId = 'firma-desarrollador'; break;
            case 'POR LA UNIDAD VERIFICADORA': firmaId = 'firma-verificadora'; break;
            case 'POR AGUAKAN': firmaId = 'firma-aguakan'; break;
        }
        
        if(firmaId && firma.imagen_base64) {
            const canvasFirma = document.querySelector('#' + firmaId + ' canvas');
            if(canvasFirma) {
                const img = new Image();
                img.onload = function() {
                    const ctx = canvasFirma.getContext('2d');
                    canvasFirma.width = img.width;
                    canvasFirma.height = img.height;
                    ctx.drawImage(img, 0, 0);
                };
                img.src = firma.imagen_base64;
            }
        }
    });
    
    // ========== MODO LECTURA ==========
    if(modoActual === 'lectura') {
        if(typeof bloquearFormulario === 'function') bloquearFormulario();
        const btnGuardar = document.getElementById("btnGuardarPDF2");
        if(btnGuardar) btnGuardar.style.display = "none";
    }
    
    console.log("✅ Ficha cargada correctamente");
}

// Función para cargar croquis en el mapa
function cargarCroquisEnMapa(geojsonData) {
    if (typeof sourceCroquis !== 'undefined' && typeof mapaUbicacion !== 'undefined' && geojsonData) {
        try {
            var formato = new ol.format.GeoJSON();
            var features = formato.readFeatures(geojsonData, {
                dataProjection: 'EPSG:4326',
                featureProjection: mapaUbicacion.getView().getProjection()
            });
            sourceCroquis.clear();
            sourceCroquis.addFeatures(features);
            mapaUbicacion.updateSize();
            
            var extent = sourceCroquis.getExtent();
            if (!ol.extent.isEmpty(extent)) {
                mapaUbicacion.getView().fit(extent, {
                    padding: [20, 20, 20, 20],
                    maxZoom: 19,
                    duration: 500
                });
            }
            console.log("✅ Croquis cargado en el mapa");
        } catch(e) {
            console.error("Error al cargar croquis:", e);
        }
    }
}

// Función para generar folio automático
function generarFolio() {
    const folioInput = document.getElementById("inputFolioGenerado");
    if(folioInput && !folioInput.value) {
        const fecha = new Date();
        const ano = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(fecha.getDate()).padStart(2, '0');
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        folioInput.value = `FOL-${ano}${mes}${dia}-${random}`;
    }
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    cargarDatosFichaExistente();
    
    // Configurar fecha actual si no existe
    const fechaInput = document.getElementById("inputFechaHoy");
    if(fechaInput && !fechaInput.value) {
        const hoy = new Date();
        const yyyy = hoy.getFullYear();
        const mm = String(hoy.getMonth() + 1).padStart(2, '0');
        const dd = String(hoy.getDate()).padStart(2, '0');
        fechaInput.value = `${yyyy}-${mm}-${dd}`;
    }
    
    // Intentar cargar croquis después de que el mapa esté listo (máximo 3 intentos)
    let intentos = 0;
    const intervaloCroquis = setInterval(function() {
        if(datosCroquis && typeof sourceCroquis !== 'undefined' && typeof mapaUbicacion !== 'undefined') {
            cargarCroquisEnMapa(datosCroquis);
            clearInterval(intervaloCroquis);
        }
        intentos++;
        if(intentos > 20) {
            clearInterval(intervaloCroquis);
            console.log("Timeout esperando mapa para croquis");
        }
    }, 500);
});
</script>





<script src="../sppgdes/vpgrapds/g_vpgrapds.js"></script>
</body>
</html>