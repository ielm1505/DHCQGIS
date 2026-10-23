<?php 
require '../../../conexion.php'; 

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["success" => false, "error" => "No se recibieron datos"]);
    exit;
}

// Funciones helper
function nullIfEmpty($value) {
    if ($value === null) return null;
    if (is_string($value) && trim($value) === '') return null;
    if ($value === '') return null;
    return $value;
}

function toDecimal($value) {
    if ($value === null || $value === '') return null;
    $value = str_replace(',', '.', $value);
    return is_numeric($value) ? floatval($value) : null;
}

function toInt($value) {
    if ($value === null || $value === '') return null;
    return is_numeric($value) ? intval($value) : null;
}

try {
    $pdo->beginTransaction();

    $datosObra = $data['datos_obra'] ?? [];
    $folioValue = nullIfEmpty($data['folio'] ?? null);
    
    if (!$folioValue) {
        throw new Exception("Folio requerido");
    }
    
    // =========================================
    // OBTENER REGISTRO ACTUAL (VALORES ORIGINALES)
    // =========================================
    $stmtActual = $pdo->prepare("
        SELECT id, estado, fraccionamiento, desarrollador, 
               desarrollador_id, desarrollo_id 
        FROM dexterno_ap.fac_ficha_prueba 
        WHERE folio = ?
    ");
    $stmtActual->execute([$folioValue]);
    $actual = $stmtActual->fetch(PDO::FETCH_ASSOC);
    
    $existingId = $actual['id'] ?? null;
    $estadoActual = $actual['estado'] ?? null;
    
    // VALORES ORIGINALES (NO SE DEBEN MODIFICAR NUNCA)
    $desarrolladorIdOriginal = $actual['desarrollador_id'] ?? null;
    $desarrolloIdOriginal = $actual['desarrollo_id'] ?? null;
    
    error_log("=== guardar_ficha.php - VALORES PROTEGIDOS ===");
    error_log("Folio: " . $folioValue);
    error_log("Estado actual (NO SE MODIFICA): " . ($estadoActual ?? 'NULL'));
    error_log("desarrollador_id original (NO SE MODIFICA): " . ($desarrolladorIdOriginal ?? 'NULL'));
    error_log("desarrollo_id original (NO SE MODIFICA): " . ($desarrolloIdOriginal ?? 'NULL'));
    
    // =========================================
    // PREPARAR VALORES NUEVOS (SOLO CAMPOS EDITABLES)
    // =========================================
    
    // Campos que SÍ se pueden modificar
    $nuevoFraccionamiento = null;
    if (isset($datosObra['fraccionamiento']) && $datosObra['fraccionamiento'] !== '' && $datosObra['fraccionamiento'] !== null) {
        $nuevoFraccionamiento = $datosObra['fraccionamiento'];
    }
    
    $nuevoDesarrollador = null;
    if (isset($datosObra['desarrollador']) && $datosObra['desarrollador'] !== '' && $datosObra['desarrollador'] !== null) {
        $nuevoDesarrollador = $datosObra['desarrollador'];
    }
    
    // =========================================
    // CONSTRUIR UPDATE - SOLO CAMPOS EDITABLES
    // =========================================
    
    if ($existingId) {
        $camposActualizar = [];
        $params = [];
        
        // Fraccionamiento - solo si viene y es diferente
        if ($nuevoFraccionamiento !== null && $nuevoFraccionamiento != ($actual['fraccionamiento'] ?? null)) {
            $camposActualizar[] = 'fraccionamiento = ?';
            $params[] = $nuevoFraccionamiento;
            error_log("Actualizando fraccionamiento: " . $nuevoFraccionamiento);
        }
        
        // Desarrollador - solo si viene y es diferente
        if ($nuevoDesarrollador !== null && $nuevoDesarrollador != ($actual['desarrollador'] ?? null)) {
            $camposActualizar[] = 'desarrollador = ?';
            $params[] = $nuevoDesarrollador;
            error_log("Actualizando desarrollador: " . $nuevoDesarrollador);
        }
        
        // NUNCA actualizar desarrollador_id - se mantiene el original
        // NUNCA actualizar desarrollo_id - se mantiene el original
        // NUNCA actualizar estado - se mantiene el original
        
        // Otros campos editables
        if (isset($datosObra['contratista'])) {
            $camposActualizar[] = 'contratista = ?';
            $params[] = nullIfEmpty($datosObra['contratista']);
        }
        
        if (isset($datosObra['localizacion'])) {
            $camposActualizar[] = 'localizacion = ?';
            $params[] = nullIfEmpty($datosObra['localizacion']);
        }
        
        if (isset($datosObra['instalacion'])) {
            $camposActualizar[] = 'instalacion = ?';
            $params[] = nullIfEmpty($datosObra['instalacion']);
        }
        
        if (isset($datosObra['entre'])) {
            $camposActualizar[] = 'entre_calles = ?';
            $params[] = nullIfEmpty($datosObra['entre']);
        }
        
        if (isset($datosObra['manzana'])) {
            $camposActualizar[] = 'manzana = ?';
            $params[] = nullIfEmpty($datosObra['manzana']);
        }
        
        if (isset($datosObra['parcela'])) {
            $camposActualizar[] = 'parcela = ?';
            $params[] = nullIfEmpty($datosObra['parcela']);
        }
        
        if (isset($datosObra['localidad'])) {
            $camposActualizar[] = 'localidad = ?';
            $params[] = nullIfEmpty($datosObra['localidad']);
        }
        
        if (isset($data['observaciones'])) {
            $camposActualizar[] = 'observaciones = ?';
            $params[] = $data['observaciones'];
        }
        
        if (isset($data['fecha'])) {
            $camposActualizar[] = 'fecha = ?';
            $params[] = $data['fecha'];
        }
        
        // Siempre actualizar updated_at
        $camposActualizar[] = 'updated_at = CURRENT_TIMESTAMP';
        
        if (!empty($camposActualizar)) {
            $sql = "UPDATE dexterno_ap.fac_ficha_prueba SET " . implode(', ', $camposActualizar) . " WHERE folio = ?";
            $params[] = $folioValue;
            
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            
            error_log("UPDATE ejecutado - Campos actualizados: " . count($camposActualizar));
        } else {
            error_log("No hay campos para actualizar");
        }
        
        $ficha_id = $existingId;
        
    } else {
        // =========================================
        // INSERT - Nueva ficha (solo aquí se asignan los IDs)
        // =========================================
        $nuevoDesarrolladorId = toInt($data['desarrollador_id'] ?? null);
        $nuevoDesarrolloId = toInt($data['desarrollo_id'] ?? null);
        
        error_log("INSERT - Nueva ficha");
        error_log("  desarrollador_id nuevo: " . ($nuevoDesarrolladorId ?? 'NULL'));
        error_log("  desarrollo_id nuevo: " . ($nuevoDesarrolloId ?? 'NULL'));
        
        $stmt = $pdo->prepare("
            INSERT INTO dexterno_ap.fac_ficha_prueba
            (folio, fecha, fraccionamiento, desarrollador, contratista, localizacion,
             instalacion, entre_calles, manzana, parcela, localidad, observaciones, estado,
             desarrollador_id, desarrollo_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'BORRADOR', ?, ?)
            RETURNING id
        ");
        
        $stmt->execute([
            $folioValue,
            $data['fecha'] ?? date("Y-m-d"),
            $datosObra['fraccionamiento'] ?? null,
            $datosObra['desarrollador'] ?? null,
            nullIfEmpty($datosObra['contratista'] ?? null),
            nullIfEmpty($datosObra['localizacion'] ?? null),
            nullIfEmpty($datosObra['instalacion'] ?? null),
            nullIfEmpty($datosObra['entre'] ?? null),
            nullIfEmpty($datosObra['manzana'] ?? null),
            nullIfEmpty($datosObra['parcela'] ?? null),
            nullIfEmpty($datosObra['localidad'] ?? null),
            $data['observaciones'] ?? null,
            $nuevoDesarrolladorId,
            $nuevoDesarrolloId
        ]);
        
        $ficha_id = $stmt->fetchColumn();
        error_log("INSERT ejecutado - ID: " . $ficha_id);
    }
    
    if (!$ficha_id) {
        throw new Exception("No se pudo obtener el ID de la ficha");
    }

    // =========================================
    // TABLAS RELACIONADAS (siempre se actualizan con los datos actuales)
    // =========================================
    
    // Tipos de instalación
    $pdo->prepare("DELETE FROM dexterno_ap.fac_ficha_instalacion WHERE ficha_id = ?")->execute([$ficha_id]);
    $tiposInstalacion = $data['tipos_instalacion'] ?? [];
    if (!empty($tiposInstalacion)) {
        $stmt = $pdo->prepare("INSERT INTO dexterno_ap.fac_ficha_instalacion (ficha_id, tipo, valor) VALUES (?, ?, ?)");
        foreach ($tiposInstalacion as $item) {
            $stmt->execute([$ficha_id, $item['tipo'] ?? '', $item['valor'] ?? '']);
        }
    }

    // Materiales
    $pdo->prepare("DELETE FROM dexterno_ap.fac_ficha_material WHERE ficha_id = ?")->execute([$ficha_id]);
    $materiales = $data['materiales'] ?? [];
    if (!empty($materiales)) {
        $stmt = $pdo->prepare("INSERT INTO dexterno_ap.fac_ficha_material (ficha_id, material, cedula) VALUES (?, ?, ?)");
        foreach ($materiales as $item) {
            $stmt->execute([$ficha_id, $item['material'] ?? '', $item['cedula'] ?? '']);
        }
    }

    // Resultado
    $pdo->prepare("DELETE FROM dexterno_ap.fac_ficha_resultado WHERE ficha_id = ?")->execute([$ficha_id]);
    $tipo_prueba_realizada = $data['tipo_prueba_realizada'] ?? null;
    $resultado_prueba = $data['resultado_prueba'] ?? null;
    if ($tipo_prueba_realizada || $resultado_prueba) {
        $stmt = $pdo->prepare("INSERT INTO dexterno_ap.fac_ficha_resultado (ficha_id, tipo_prueba, resultado) VALUES (?, ?, ?)");
        $stmt->execute([$ficha_id, $tipo_prueba_realizada, $resultado_prueba]);
    }

    // Tipo prueba general
    $pdo->prepare("DELETE FROM dexterno_ap.fac_ficha_tipo_prueba WHERE ficha_id = ?")->execute([$ficha_id]);
    $tipo_prueba_general = $data['tipo_prueba_general'] ?? null;
    if ($tipo_prueba_general) {
        $stmt = $pdo->prepare("INSERT INTO dexterno_ap.fac_ficha_tipo_prueba (ficha_id, tipo) VALUES (?, ?)");
        $stmt->execute([$ficha_id, $tipo_prueba_general]);
    }

    // Diámetros
    $pdo->prepare("DELETE FROM dexterno_ap.fac_ficha_diametros WHERE ficha_id = ?")->execute([$ficha_id]);
    $diametros = $data['diametros'] ?? [];
    if (!empty($diametros)) {
        $stmt = $pdo->prepare("
            INSERT INTO dexterno_ap.fac_ficha_diametros 
            (ficha_id, diametro, longitud, descargas, tomas) 
            VALUES (?, ?, ?, ?, ?)
        ");
        foreach ($diametros as $d) {
            $stmt->execute([
                $ficha_id,
                $d['diametro'] ?? '',
                toDecimal($d['longitud'] ?? 0),
                toInt($d['descargas'] ?? 0),
                toInt($d['tomas'] ?? 0)
            ]);
        }
    }

    // Datos de prueba
    $pdo->prepare("DELETE FROM dexterno_ap.fac_ficha_datos_prueba WHERE ficha_id = ?")->execute([$ficha_id]);
    $datosPrueba = $data['datos_prueba'] ?? [];
    if (!empty($datosPrueba)) {
        $stmt = $pdo->prepare("
            INSERT INTO dexterno_ap.fac_ficha_datos_prueba 
            (ficha_id, tipo, valor, unidad, duracion) 
            VALUES (?, ?, ?, ?, ?)
        ");
        foreach ($datosPrueba as $d) {
            $stmt->execute([
                $ficha_id,
                $d['tipo'] ?? '',
                nullIfEmpty($d['valor'] ?? null),
                nullIfEmpty($d['unidad'] ?? null),
                toDecimal($d['duracion'] ?? null)
            ]);
        }
    }

    // Pozos
    $pdo->prepare("DELETE FROM dexterno_ap.fac_ficha_pozos WHERE ficha_id = ?")->execute([$ficha_id]);
    $pozos = $data['pozos'] ?? [];
    if (!empty($pozos)) {
        $stmt = $pdo->prepare("
            INSERT INTO dexterno_ap.fac_ficha_pozos 
            (ficha_id, no_pozo, longitud, diametro, registros, desc_cuadruplex, viviendas, calle) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ");
        foreach ($pozos as $p) {
            $stmt->execute([
                $ficha_id,
                nullIfEmpty($p['no_pozo'] ?? null),
                toDecimal($p['longitud'] ?? 0),
                nullIfEmpty($p['diametro'] ?? null),
                toInt($p['registros'] ?? 0),
                toInt($p['descargas'] ?? 0),
                toInt($p['viviendas'] ?? 0),
                nullIfEmpty($p['calle'] ?? null)
            ]);
        }
    }

    // Croquis
    $croquis = $data['croquis'] ?? null;
    if (!empty($croquis) && $croquis !== 'null') {
        $pdo->prepare("DELETE FROM dexterno_ap.fac_ficha_croquis WHERE ficha_id = ?")->execute([$ficha_id]);
        $stmt = $pdo->prepare("INSERT INTO dexterno_ap.fac_ficha_croquis (ficha_id, geojson_data) VALUES (?, ?)");
        $stmt->execute([$ficha_id, $croquis]);
    }

    $pdo->commit();

    // Obtener valores finales para debug
    $verify = $pdo->prepare("
        SELECT fraccionamiento, desarrollador, estado, desarrollador_id, desarrollo_id 
        FROM dexterno_ap.fac_ficha_prueba WHERE folio = ?
    ");
    $verify->execute([$folioValue]);
    $verificado = $verify->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "ficha_id" => $ficha_id,
        "message" => "Ficha guardada correctamente",
        "debug" => [
            "estado_final" => $verificado['estado'] ?? 'NULL',
            "desarrollador_id_final" => $verificado['desarrollador_id'] ?? 'NULL',
            "desarrollo_id_final" => $verificado['desarrollo_id'] ?? 'NULL'
        ]
    ]);

} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}
?>