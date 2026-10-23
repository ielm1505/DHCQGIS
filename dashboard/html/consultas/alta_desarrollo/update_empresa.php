<?php

require '../../../conexion.php';

$sql = "

    UPDATE dexterno_ap.desarrolladores

    SET
        nombre_empresa = :e,
        nombre_comercial = :c,
        representante_legal = :r,
        correo_electronico = :co

    WHERE id = :id

";

$stmt = $pdo->prepare($sql);

$stmt->execute([

    ':e'=>$_POST['nombre_empresa'],
    ':c'=>$_POST['nombre_comercial'],
    ':r'=>$_POST['representante_legal'],
    ':co'=>$_POST['correo_electronico'],
    ':id'=>$_POST['id']

]);

header("Location:../altadesarrollo.php");