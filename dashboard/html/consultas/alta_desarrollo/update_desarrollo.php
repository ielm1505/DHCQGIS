<?php

require '../../../conexion.php';

$sql = "

    UPDATE dexterno_ap.desarrollos

    SET

        nombre_desarrollo = :n,
        num_viviendas = :v,
        municipio = :m,
        localidad = :l

    WHERE id = :id

";

$stmt = $pdo->prepare($sql);

$stmt->execute([

    ':n'=>$_POST['nombre_desarrollo'],
    ':v'=>$_POST['num_viviendas'],
    ':m'=>$_POST['municipio'],
    ':l'=>$_POST['localidad'],
    ':id'=>$_POST['id']

]);

header("Location:../altadesarrollo.php");