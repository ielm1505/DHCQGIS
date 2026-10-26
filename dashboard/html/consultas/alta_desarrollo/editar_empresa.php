<?php

require '../../../conexion.php';

$id = $_GET['id'];

$stmt = $pdo->prepare("
    SELECT *
    FROM dexterno_ap.desarrolladores
    WHERE id = :id
");

$stmt->execute([':id'=>$id]);

$empresa = $stmt->fetch();

?>

<form action="update_empresa.php" method="POST">

    <input type="hidden"
           name="id"
           value="<?= $empresa['id'] ?>">

    <input type="text"
           name="nombre_empresa"
           value="<?= $empresa['nombre_empresa'] ?>">

    <input type="text"
           name="nombre_comercial"
           value="<?= $empresa['nombre_comercial'] ?>">

    <input type="text"
           name="representante_legal"
           value="<?= $empresa['representante_legal'] ?>">

    <input type="email"
           name="correo_electronico"
           value="<?= $empresa['correo_electronico'] ?>">

    <button>
        Guardar cambios
    </button>

</form>