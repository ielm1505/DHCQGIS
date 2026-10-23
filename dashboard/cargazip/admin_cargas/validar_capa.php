<?php

require '../../conexion.php';

$tabla = $_GET['tabla'];

/* GEOMETRÍAS INVÁLIDAS */

$sql1 = "
SELECT COUNT(*)
FROM dexterno_ap.$tabla
WHERE NOT ST_IsValid(geom)
";

$invalidas = $pdo->query($sql1)->fetchColumn();


/* GEOMETRÍAS DUPLICADAS */

$sql2 = "
SELECT COUNT(*)
FROM (
SELECT geom, COUNT(*)
FROM dexterno_ap.$tabla
GROUP BY geom
HAVING COUNT(*) > 1
)t
";

$duplicados = $pdo->query($sql2)->fetchColumn();


/* ELEMENTOS SIN CONEXIÓN (para redes) */

$sql3 = "
SELECT COUNT(*)
FROM dexterno_ap.$tabla a
WHERE NOT EXISTS (
SELECT 1
FROM dexterno_ap.$tabla b
WHERE ST_Touches(a.geom,b.geom)
AND a.id <> b.id
)
";

$sinConexion = 0;

try{
$sinConexion = $pdo->query($sql3)->fetchColumn();
}catch(Exception $e){}


echo json_encode([
'invalidas'=>$invalidas,
'duplicados'=>$duplicados,
'sin_conexion'=>$sinConexion
]);