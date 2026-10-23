<?php
require '../../../conexion.php';

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if(!$data || empty($data['folio'])){
    echo json_encode(["success"=>false,"error"=>"Folio no proporcionado"]);
    exit;
}

try {
    $folio = trim($data['folio']);
    
    if(empty($folio)) {
        echo json_encode(["success"=>false,"error"=>"Folio vacío"]);
        exit;
    }
    
    // Verificar si la ficha existe
    $stmt = $pdo->prepare("SELECT id, estado FROM dexterno_ap.fac_ficha_prueba WHERE folio = ?");
    $stmt->execute([$folio]);
    $ficha = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if(!$ficha){
        echo json_encode(["success"=>false,"error"=>"Ficha no encontrada"]);
        exit;
    }
    
    if($ficha['estado'] !== 'BORRADOR'){
        echo json_encode(["success"=>false,"error"=>"La ficha ya fue enviada a validación"]);
        exit;
    }
    
    // Actualizar estado
    $stmt = $pdo->prepare("UPDATE dexterno_ap.fac_ficha_prueba SET estado = 'EN_VALIDACION' WHERE folio = ?");
    $stmt->execute([$folio]);
    
    echo json_encode(["success"=>true, "message"=>"Ficha enviada a validación"]);
    
} catch (Exception $e){
    echo json_encode(["success"=>false,"error"=>$e->getMessage()]);
}
?>