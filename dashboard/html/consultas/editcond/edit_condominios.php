<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once('../../../conexion.php');

// ============================================================
// FUNCIÓN PARA LOG DE ERRORES
// ============================================================
function logError($message, $data = null) {
    $logFile = __DIR__ . '/edit_errors.log';
    $timestamp = date('Y-m-d H:i:s');
    $logMessage = "[$timestamp] $message";
    if ($data !== null) {
        $logMessage .= " - Data: " . json_encode($data, JSON_UNESCAPED_UNICODE);
    }
    $logMessage .= "\n";
    @file_put_contents($logFile, $logMessage, FILE_APPEND);
}

// ============================================================
// FUNCIÓN PARA OBTENER DATOS POST
// ============================================================
function getPostData() {
    $result = [];
    
    if (!empty($_POST)) {
        $result['action'] = $_POST['action'] ?? null;
        $result['id_1'] = $_POST['id_1'] ?? null;
        
        if (isset($_POST['data'])) {
            $decodedData = json_decode($_POST['data'], true);
            if ($decodedData !== null) {
                $result['data'] = $decodedData;
            } else {
                $result['data'] = $_POST['data'];
            }
        }
        
        logError("Datos recibidos vía POST", $result);
        return $result;
    }
    
    $rawData = file_get_contents('php://input');
    if (!empty($rawData)) {
        $jsonData = json_decode($rawData, true);
        if ($jsonData !== null) {
            logError("Datos recibidos vía JSON", $jsonData);
            return $jsonData;
        }
    }
    
    logError("No se recibieron datos");
    return $result;
}

// ============================================================
// FUNCIÓN PARA EXTRAER EL ID NUMÉRICO DEL FID
// ============================================================
function extractNumericId($fid) {
    if (empty($fid)) {
        return null;
    }
    
    // Si ya es numérico, retornarlo
    if (is_numeric($fid)) {
        return intval($fid);
    }
    
    // Si es un string como "DHC_AGUAKAN.condominios.1", extraer el número
    if (is_string($fid) && strpos($fid, '.') !== false) {
        $parts = explode('.', $fid);
        $lastPart = end($parts);
        if (is_numeric($lastPart)) {
            return intval($lastPart);
        }
    }
    
    // Si es un string numérico, convertirlo
    if (is_string($fid) && is_numeric($fid)) {
        return intval($fid);
    }
    
    return null;
}

// ============================================================
// FUNCIÓN PARA CONVERTIR GEOMETRÍA
// ============================================================
function convertGeometryToWKT($geometry) {
    if (is_string($geometry)) {
        return $geometry;
    }
    
    if (is_array($geometry) && isset($geometry['type'])) {
        $type = $geometry['type'];
        $coordinates = $geometry['coordinates'];
        
        switch ($type) {
            case 'Polygon':
                $rings = [];
                foreach ($coordinates as $ring) {
                    $points = [];
                    foreach ($ring as $point) {
                        $points[] = $point[0] . ' ' . $point[1];
                    }
                    $rings[] = '(' . implode(',', $points) . ')';
                }
                return 'POLYGON(' . implode(',', $rings) . ')';
                
            case 'MultiPolygon':
                $polygons = [];
                foreach ($coordinates as $polygon) {
                    $rings = [];
                    foreach ($polygon as $ring) {
                        $points = [];
                        foreach ($ring as $point) {
                            $points[] = $point[0] . ' ' . $point[1];
                        }
                        $rings[] = '(' . implode(',', $points) . ')';
                    }
                    $polygons[] = '(' . implode(',', $rings) . ')';
                }
                return 'MULTIPOLYGON(' . implode(',', $polygons) . ')';
                
            default:
                throw new Exception("Tipo de geometría no soportado: $type");
        }
    }
    
    throw new Exception('Formato de geometría inválido');
}

// ============================================================
// CLASE EDITOR
// ============================================================
class CondominiosEditor {
    private $pdo;
    
    public function __construct($pdo) {
        $this->pdo = $pdo;
    }
    
    public function handleRequest() {
        try {
            $input = getPostData();
            
            logError("Input completo", $input);
            
            $action = $input['action'] ?? null;
            $data = $input['data'] ?? null;
            $id = $input['id_1'] ?? null;
            
            // Extraer el ID numérico del fid de GeoServer
            $numericId = extractNumericId($id);
            
            logError("Procesando acción: $action - ID original: $id - ID numérico: $numericId", ['data' => $data]);
            
            if (empty($action)) {
                throw new Exception('Acción no especificada');
            }
            
            // Si no se pudo extraer un ID numérico, usar el original
            $idToUse = $numericId !== null ? $numericId : $id;
            
            switch ($action) {
                case 'create':
                    return $this->create($data);
                case 'update':
                    return $this->update($data, $idToUse);
                case 'delete':
                    return $this->delete($idToUse);
                case 'move':
                    return $this->move($data, $idToUse);
                default:
                    throw new Exception("Acción no válida: $action");
            }
            
        } catch (Exception $e) {
            logError("Error en handleRequest: " . $e->getMessage());
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // ===== CREAR =====
    private function create($data) {
        try {
            logError("CREATE - Data recibida", $data);
            
            if (empty($data['geometry'])) {
                throw new Exception('Geometría no proporcionada');
            }
            
            if (empty($data['properties']['condominio'])) {
                throw new Exception('Nombre del condominio requerido');
            }
            
            $geomWKT = convertGeometryToWKT($data['geometry']);
            $props = $data['properties'];
            
            logError("CREATE - Geometría WKT: " . substr($geomWKT, 0, 200));
            
            $sql = "INSERT INTO \"BENITO_JUAREZ\".condominios 
                    (geom, id, contrato, condominio, tm, provisional, anexos, 
                     direccion, nivel, fecha, mes) 
                    VALUES (
                        ST_Transform(ST_GeomFromText(:geom, 3857), 32616),
                        :id, :contrato, :condominio, :tm, :provisional, :anexos,
                        :direccion, :nivel, :fecha, :mes
                    ) RETURNING id_1";
            
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
                ':geom' => $geomWKT,
                ':id' => $props['id'] ?? null,
                ':contrato' => $props['contrato'] ?? null,
                ':condominio' => $props['condominio'],
                ':tm' => $props['tm'] ?? null,
                ':provisional' => $props['provisional'] ?? null,
                ':anexos' => $props['anexos'] ?? null,
                ':direccion' => $props['direccion'] ?? '',
                ':nivel' => $props['nivel'] ?? '',
                ':fecha' => $props['fecha'] ?? date('Y-m-d'),
                ':mes' => $props['mes'] ?? date('m')
            ]);
            
            $newId = $stmt->fetchColumn();
            logError("Condominio creado ID (id_1): $newId");
            
            return ['success' => true, 'id' => $newId, 'message' => 'Condominio creado exitosamente'];
            
        } catch (PDOException $e) {
            logError("Error PDO en create: " . $e->getMessage());
            throw new Exception('Error en base de datos: ' . $e->getMessage());
        }
    }
    
    // ===== ACTUALIZAR =====
    private function update($data, $id) {
        try {
            logError("UPDATE - Datos recibidos", ['id' => $id, 'data' => $data]);
            
            if (empty($id)) {
                throw new Exception('ID no proporcionado (id_1)');
            }
            
            if (empty($data['properties']['condominio'])) {
                throw new Exception('Nombre del condominio requerido');
            }
            
            $check = $this->pdo->prepare("SELECT id_1 FROM \"BENITO_JUAREZ\".condominios WHERE id_1 = :id");
            $check->execute([':id' => $id]);
            if (!$check->fetch()) {
                throw new Exception("Registro con ID (id_1) $id no encontrado");
            }
            
            $geomWKT = !empty($data['geometry']) ? convertGeometryToWKT($data['geometry']) : null;
            $props = $data['properties'];
            
            $sql = "UPDATE \"BENITO_JUAREZ\".condominios SET ";
            $params = [];
            $updates = [];
            
            if ($geomWKT) {
                $updates[] = "geom = ST_Transform(ST_GeomFromText(:geom, 3857), 32616)";
                $params[':geom'] = $geomWKT;
            }
            
            $updates[] = "id = :id";
            $params[':id'] = $props['id'] ?? null;
            
            $updates[] = "contrato = :contrato";
            $params[':contrato'] = $props['contrato'] ?? null;
            
            $updates[] = "condominio = :condominio";
            $params[':condominio'] = $props['condominio'];
            
            $updates[] = "tm = :tm";
            $params[':tm'] = $props['tm'] ?? null;
            
            $updates[] = "provisional = :provisional";
            $params[':provisional'] = $props['provisional'] ?? null;
            
            $updates[] = "anexos = :anexos";
            $params[':anexos'] = $props['anexos'] ?? null;
            
            $updates[] = "direccion = :direccion";
            $params[':direccion'] = $props['direccion'] ?? '';
            
            $updates[] = "nivel = :nivel";
            $params[':nivel'] = $props['nivel'] ?? '';
            
            $updates[] = "fecha = :fecha";
            $params[':fecha'] = $props['fecha'] ?? date('Y-m-d');
            
            $updates[] = "mes = :mes";
            $params[':mes'] = $props['mes'] ?? date('m');
            
            $sql .= implode(', ', $updates) . " WHERE id_1 = :id_1";
            $params[':id_1'] = $id;
            
            logError("UPDATE - SQL", ['sql' => $sql, 'params' => $params]);
            
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($params);
            
            $rowCount = $stmt->rowCount();
            logError("Condominio actualizado ID (id_1): $id, Filas afectadas: $rowCount");
            
            return ['success' => true, 'message' => 'Condominio actualizado exitosamente'];
            
        } catch (PDOException $e) {
            logError("Error PDO en update: " . $e->getMessage());
            throw new Exception('Error en base de datos: ' . $e->getMessage());
        }
    }
    
    // ===== ELIMINAR =====
    private function delete($id) {
        try {
            logError("DELETE - Datos recibidos", ['id' => $id]);
            
            if (empty($id)) {
                throw new Exception('ID no proporcionado (id_1)');
            }
            
            $check = $this->pdo->prepare("SELECT id_1 FROM \"BENITO_JUAREZ\".condominios WHERE id_1 = :id");
            $check->execute([':id' => $id]);
            if (!$check->fetch()) {
                throw new Exception("Registro con ID (id_1) $id no encontrado");
            }
            
            $sql = "DELETE FROM \"BENITO_JUAREZ\".condominios WHERE id_1 = :id_1";
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([':id_1' => $id]);
            
            $rowCount = $stmt->rowCount();
            logError("Condominio eliminado ID (id_1): $id, Filas afectadas: $rowCount");
            
            return ['success' => true, 'message' => 'Condominio eliminado exitosamente'];
            
        } catch (PDOException $e) {
            logError("Error PDO en delete: " . $e->getMessage());
            throw new Exception('Error en base de datos: ' . $e->getMessage());
        }
    }
    
    // ===== REUBICAR =====
    private function move($data, $id) {
        try {
            logError("MOVE - Datos recibidos", ['id' => $id, 'data' => $data]);
            
            if (empty($id)) {
                throw new Exception('ID no proporcionado (id_1)');
            }
            
            if (empty($data['geometry'])) {
                throw new Exception('Geometría no proporcionada');
            }
            
            $check = $this->pdo->prepare("SELECT id_1 FROM \"BENITO_JUAREZ\".condominios WHERE id_1 = :id");
            $check->execute([':id' => $id]);
            if (!$check->fetch()) {
                throw new Exception("Registro con ID (id_1) $id no encontrado");
            }
            
            $geomWKT = convertGeometryToWKT($data['geometry']);
            
            logError("MOVE - Geometría WKT: " . substr($geomWKT, 0, 200));
            
            $sql = "UPDATE \"BENITO_JUAREZ\".condominios 
                    SET geom = ST_Transform(ST_GeomFromText(:geom, 3857), 32616)
                    WHERE id_1 = :id_1";
            
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
                ':geom' => $geomWKT,
                ':id_1' => $id
            ]);
            
            $rowCount = $stmt->rowCount();
            logError("Condominio reubicado ID (id_1): $id, Filas afectadas: $rowCount");
            
            return ['success' => true, 'message' => 'Condominio reubicado exitosamente'];
            
        } catch (PDOException $e) {
            logError("Error PDO en move: " . $e->getMessage());
            throw new Exception('Error en base de datos: ' . $e->getMessage());
        }
    }
}

// ============================================================
// EJECUTAR
// ============================================================
$editor = new CondominiosEditor($pdo);
$result = $editor->handleRequest();

echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>