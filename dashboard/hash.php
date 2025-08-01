<?php
include('conexion.php'); // Asegúrate de incluir tu archivo de conexión a la base de datos

try {
    // Consulta para obtener todos los usuarios con contraseñas en texto plano
    $query = 'SELECT usuario, pass FROM "Usuario"."Registro" WHERE pass NOT LIKE "$2y$%"'; // No tiene hash
    $stmt = $pdo->prepare($query);
    $stmt->execute();

    // Recorrer los usuarios y actualizar las contraseñas
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $usuario = $row['usuario'];
        $pass = $row['pass'];

        // Generar el hash de la contraseña
        $hash = password_hash($pass, PASSWORD_DEFAULT);

        // Actualizar la contraseña en la base de datos con el hash
        $updateQuery = 'UPDATE "Usuario"."Registro" SET pass = :pass WHERE usuario = :usuario';
        $updateStmt = $pdo->prepare($updateQuery);
        $updateStmt->execute(['usuario' => $usuario, 'pass' => $hash]);

        echo "Contraseña actualizada para el usuario: $usuario\n";
    }

    echo "Todas las contraseñas han sido actualizadas.";

} catch (PDOException $e) {
    echo "Error al actualizar contraseñas: " . $e->getMessage();
}
?>