<?php

require '../../../conexion.php';

$id = $_GET['id'];

$stmt = $pdo->prepare("

    SELECT *
    FROM dexterno_ap.desarrollos
    WHERE id = :id

");

$stmt->execute([':id'=>$id]);

$row = $stmt->fetch();

?>

<form action="update_desarrollo.php"
      method="POST">

    <input type="hidden"
           name="id"
           value="<?= $row['id'] ?>">

    <input type="text"
           name="nombre_desarrollo"
           value="<?= $row['nombre_desarrollo'] ?>">

    <input type="number"
           name="num_viviendas"
           value="<?= $row['num_viviendas'] ?>">

    <input type="text"
           name="municipio"
           value="<?= $row['municipio'] ?>">

    <input type="text"
           name="localidad"
           value="<?= $row['localidad'] ?>">

    <button>
        Guardar cambios
    </button>

</form>