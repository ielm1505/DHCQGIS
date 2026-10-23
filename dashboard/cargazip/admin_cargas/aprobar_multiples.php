<?php

require '../../conexion.php';
require '../../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$ids = $_POST['carga'] ?? [];

if(empty($ids)){
    die("❌ Nada seleccionado");
}

foreach($ids as $id){

    try{

        /*=========================================================
        INICIAR TRANSACCIÓN
        =========================================================*/
        $pdo->beginTransaction();

        /*=========================================================
        ACTUALIZAR CONTROL_CARGAS
        =========================================================*/
        $stmt = $pdo->prepare("
            UPDATE dexterno_ap.control_cargas
            SET estado_aprobacion='APROBADO',
                fecha_aprobacion=NOW(),
                aprobado_por='ADMINISTRADOR',
                estado='VALIDADO'
            WHERE id=?
            RETURNING empresa, desarrollo, archivo, fecha_aprobacion
        ");
        $stmt->execute([$id]);
        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        if(!$data){
            $pdo->rollBack();
            continue;
        }

        $empresa    = trim($data['empresa']);
        $desarrollo = trim($data['desarrollo']);
        $archivo    = trim($data['archivo']);
        $fechaAprob = $data['fecha_aprobacion'];

        /*=========================================================
        OBTENER TABLAS AFECTADAS (ÚNICAS)
        =========================================================*/
        $stmtDet = $pdo->prepare("
            SELECT DISTINCT LOWER(TRIM(tabla_afectada)) AS tabla
            FROM dexterno_ap.detalle_cargas
            WHERE id_carga=?
        ");
        $stmtDet->execute([$id]);
        
        $tablas = $stmtDet->fetchAll(PDO::FETCH_COLUMN);

        if(empty($tablas)){
            error_log("⚠ No hay tablas para id_carga=$id");
        }

        $totalActualizados = 0;

        /*=========================================================
        ACTUALIZAR CADA TABLA
        =========================================================*/
        foreach($tablas as $tabla){

            if(!$tabla) continue;

            $tablaCompleta = "dexterno_ap.$tabla";

            // Validar que exista la tabla
            $check = $pdo->query("
                SELECT to_regclass('$tablaCompleta')
            ")->fetchColumn();

            if(!$check){
                error_log("❌ Tabla no existe: $tablaCompleta");
                continue;
            }

            // Ver cuántos registros hay
            $countStmt = $pdo->prepare("
                SELECT COUNT(*) 
                FROM $tablaCompleta
                WHERE id_carga=?
            ");
            $countStmt->execute([$id]);
            $total = $countStmt->fetchColumn();

            if($total == 0){
                error_log("⚠ Sin registros en $tablaCompleta para id_carga=$id");
                continue;
            }

            // Actualizar
            $updateStmt = $pdo->prepare("
                UPDATE $tablaCompleta
                SET estatus_validacion='APROBADO',
                    fecha_validacion=NOW()
                WHERE id_carga=?
            ");
            $updateStmt->execute([$id]);

            $afectados = $updateStmt->rowCount();
            $totalActualizados += $afectados;

            error_log("✔ $tablaCompleta → $afectados registros actualizados");
        }

        /*=========================================================
        CONFIRMAR TRANSACCIÓN
        =========================================================*/
        $pdo->commit();

        /*=========================================================
        OBTENER CORREO DESARROLLADOR
        =========================================================*/
        $sqlDev = $pdo->prepare("
            SELECT representante_legal, correo_electronico
            FROM dexterno_ap.desarrolladores
            WHERE TRIM(nombre_empresa)=TRIM(?)
            LIMIT 1
        ");
        $sqlDev->execute([$empresa]);
        $dev = $sqlDev->fetch(PDO::FETCH_ASSOC);

        if(!$dev){
            continue;
        }

        $repLegal = $dev['representante_legal'];
        $correo   = $dev['correo_electronico'];

        /*=========================================================
        ENVIAR CORREO
        =========================================================*/
        try{

            $mail = new PHPMailer(true);

            $mail->isSMTP();
            $mail->Host       = 'zmbagk01.aguakan.com.mx';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'notificaciongis@aguakan.com.mx';
            $mail->Password   = 'Agu4k4n.#2026';
            $mail->Port       = 587;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->CharSet    = 'UTF-8';

            $mail->SMTPOptions = [
                'ssl'=>[
                    'verify_peer'=>false,
                    'verify_peer_name'=>false,
                    'allow_self_signed'=>true
                ]
            ];

            $mail->setFrom('notificaciongis@aguakan.com.mx','Sistema GIS Aguakan');
            $mail->addAddress($correo,$repLegal);

            $mail->Subject = "Aprobación de información GIS - {$desarrollo}";

            $mail->Body = "
Estimado {$repLegal}:

La información GIS ha sido APROBADA.

Desarrollo: {$desarrollo}
Empresa: {$empresa}
Archivo: {$archivo}
Fecha: {$fechaAprob}

Registros actualizados: {$totalActualizados}

Sistema GIS Aguakan
";

            $mail->send();

        }catch(Exception $e){
            error_log("Error correo: ".$mail->ErrorInfo);
        }

    }catch(Exception $e){

        $pdo->rollBack();
        error_log("❌ Error en aprobación ID $id: ".$e->getMessage());
    }
}

header('Location: admin_cargas.php');
exit;