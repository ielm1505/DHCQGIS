<?php


session_start();

require_once "../../../conexion.php";

header('Content-Type: application/json');

try {

    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        throw new Exception("No se recibieron datos JSON válidos.");
    }

    /* =====================================================
       SOLO GENERAR FOLIO
    ====================================================== */
    if (isset($data['solicitar_folio'])) {

        $pdo->beginTransaction();
        $usuario = $_SESSION['usuario'] ?? 'sistema';
        $sql = "
            INSERT INTO \"FACTIBILIDAD\".\"pruebas_instalacion\"
            (fecha,usuario)
            VALUES (:fecha, :usuario)
            RETURNING id, folio
        ";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':fecha' => date('Y-m-d'),
            ':usuario'=>$usuario
        ]);

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) {
            throw new Exception("No se pudo generar el folio.");
        }

        $pdo->commit();

        echo json_encode([
            "success" => true,
            "folio"  => $row['folio'],
            "id"     => $row['id']
        ]);

        exit;
    }

    /* =====================================================
       GUARDAR PDF
    ====================================================== */
    if (isset($data['guardar_pdf'])) {

        $pdo->beginTransaction();

        if (!isset($data['folio']) || !isset($data['pdf_base64'])) {
            throw new Exception("Datos incompletos para guardar PDF.");
        }

        $folio = $data['folio'];

        // Limpiar encabezado base64 si existe
        $pdfBase64 = preg_replace('#^data:application/pdf.*?base64,#', '', $data['pdf_base64']);
        $pdfBase64 = str_replace(' ', '+', $pdfBase64);

        $pdfData = base64_decode($pdfBase64);

        if ($pdfData === false) {
            throw new Exception("Error al decodificar PDF.");
        }

        $rutaCarpeta = "D:/SISTEMA_AGUAKAN/pdf/";

        if (!file_exists($rutaCarpeta)) {
            mkdir($rutaCarpeta, 0755, true);
        }

        $nombreArchivo = $folio . ".pdf";
        $rutaCompletaServidor = $rutaCarpeta . $nombreArchivo;

        file_put_contents($rutaCompletaServidor, $pdfData);

        $rutaBD = "pdf/" . $nombreArchivo;

        $update = "
            UPDATE \"FACTIBILIDAD\".\"pruebas_instalacion\"
            SET ruta_pdf = :ruta
            WHERE folio = :folio
        ";

        $stmtUpdate = $pdo->prepare($update);
        $stmtUpdate->execute([
            ':ruta'  => $rutaBD,
            ':folio' => $folio
        ]);

        $pdo->commit();

        echo json_encode([
            "success" => true,
            "ruta"    => $rutaBD
        ]);

        exit;
    }

    throw new Exception("Petición no válida.");

} catch (Exception $e) {

    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    echo json_encode([
        "success" => false,
        "error"   => $e->getMessage()
    ]);
}

exit;