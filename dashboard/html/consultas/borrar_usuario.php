<?php  
session_start();
require '../../conexion.php';

// Verificar sesión activa
if (!isset($_SESSION['usuario']) || !isset($_SESSION['rol'])) {
    echo "<script>alert('⚠️ No hay sesión activa. Inicie sesión nuevamente.');window.location='../../index.php';</script>";
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = trim($_POST['usuario']);
    $admin = $_SESSION['usuario']; 

 // --- Buscar si el usuario existe en ldap_usuario (local) ---
    
    $stmtLocal = $pdo->prepare('SELECT usuario FROM "Usuario"."usuario_externo" WHERE usuario = :usuario');
    $stmtLocal->execute(['usuario' => $usuario]);
    $existeLocal = $stmtLocal->fetch();

// --- Buscar si el usuario(ldap:dominio aguakan) ---
   
    $stmtLdap = $pdo->prepare('SELECT usuario FROM "Usuario"."ldap_registro" WHERE usuario = :usuario');
    $stmtLdap->execute(['usuario' => $usuario]);
    $existeLdap = $stmtLdap->fetch();

    if (!$existeLocal && !$existeLdap) {
        echo "<script>alert('⚠️ Usuario \"$usuario\" no encontrado en ninguna tabla.');window.history.back();</script>";
        exit;
    }

    $tipo = $existeLocal ? 'LOCAL' : 'LDAP';
    $tabla = $existeLocal ? '"Usuario"."usuario_externo"' : '"Usuario"."ldap_registro"';

    // --- Eliminar de la tabla correspondiente ---
    $stmtDel = $pdo->prepare("DELETE FROM $tabla WHERE usuario = :usuario");
    $stmtDel->execute(['usuario' => $usuario]);

    if ($stmtDel->rowCount() > 0) {
        // --- Registrar cambio en auditoría ---
        $stmtAud = $pdo->prepare('
            INSERT INTO "Usuario"."ldap_auditoria" (accion, usuario_afectado, ejecutado_por, tipo_usuario, fecha)
            VALUES (:accion, :usuario_afectado, :ejecutado_por, :tipo_usuario, NOW())
        ');
        $stmtAud->execute([
            'accion' => 'ELIMINAR_USUARIO',
            'usuario_afectado' => $usuario,
            'ejecutado_por' => $admin,
            'tipo_usuario' => $tipo
        ]);

        echo "<script>alert('✅ Usuario \"$usuario\" ($tipo) eliminado correctamente por $admin');window.location='usuario_nuevo.php';</script>";
        exit;
    } else {
        echo "<script>alert('⚠️ No se pudo eliminar al usuario \"$usuario\".');window.history.back();</script>";
        exit;
    }
}
?>
