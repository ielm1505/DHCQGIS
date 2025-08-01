<?php
include('conexion.php');

try {
    $stmt = $pdo->prepare("
        UPDATE sesiones 
        SET activo = FALSE, hora_fin = NOW()
        WHERE activo = TRUE 
        AND hora_inicio < NOW() - INTERVAL '1 hour'
    ");
    $stmt->execute();
    echo "Sesiones inactivas cerradas.";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
