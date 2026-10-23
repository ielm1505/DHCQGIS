<?php 
require '../../conexion.php';





try {
    // ---- USUARIOS LOCALES ----
    $stmtLocal = $pdo->query('
        SELECT id, usuario, rol, html 
        FROM "Usuario"."ldap_registro"
        ORDER BY rol ASC
    ');

    echo '<h3>Usuarios Internos</h3>';
    echo '<table class="tabla-usuarios">';
    echo '<thead>
            <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Rol</th>
                <th>HTML</th>
            </tr>
          </thead><tbody>';

    if ($stmtLocal->rowCount() > 0) {
        while ($row = $stmtLocal->fetch(PDO::FETCH_ASSOC)) {
            echo "<tr>
                    <td>{$row['id']}</td>
                    <td>{$row['usuario']}</td>
                    <td>{$row['rol']}</td>
                    <td>{$row['html']}</td>
                  </tr>";
        }
    } else {
        echo '<tr><td colspan="4">No hay usuarios locales registrados.</td></tr>';
    }

    echo '</tbody></table><br>';

    // ---- USUARIOS LDAP ----
    $stmtLdap = $pdo->query('
        SELECT id, usuario, rol, html 
        FROM "Usuario"."usuario_externo"
        ORDER BY rol ASC
    ');

    echo '<h3>Usuarios Externos</h3>';
    echo '<table class="tabla-usuarios">';
    echo '<thead>
            <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Rol</th>
                <th>html</th>
            </tr>
          </thead><tbody>';

    if ($stmtLdap->rowCount() > 0) {
        while ($row = $stmtLdap->fetch(PDO::FETCH_ASSOC)) {
            echo "<tr>
                    <td>{$row['id']}</td>
                    <td>{$row['usuario']}</td>
                    <td>{$row['rol']}</td>
                    <td>{$row['html']}</td>
                  </tr>";
        }
    } else {
        echo '<tr><td colspan="4">No hay usuarios LDAP registrados.</td></tr>';
    }

    echo '</tbody></table>';

} catch (PDOException $e) {
    echo '<div class="error">Error al cargar usuarios: ' . htmlspecialchars($e->getMessage()) . '</div>';
}
?>
