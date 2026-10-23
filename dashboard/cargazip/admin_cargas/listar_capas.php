<?php

require '../../conexion.php';

header('Content-Type: application/json');

$id = $_GET['id'] ?? 0;

$stmt = $pdo->prepare("
SELECT ruta_archivo
FROM dexterno_ap.control_cargas
WHERE id = ?
");

$stmt->execute([$id]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if(!$row){
echo json_encode([]);
exit;
}

$zipPath = $row['ruta_archivo'];

$tmp = "../../tmp/".uniqid();
mkdir($tmp,0777,true);

$zip = new ZipArchive;

if($zip->open($zipPath) === TRUE){
$zip->extractTo($tmp);
$zip->close();
}

$capas=[];

$rii = new RecursiveIteratorIterator(
new RecursiveDirectoryIterator($tmp)
);

foreach ($rii as $file){

if(!$file->isDir()){

if(strtolower($file->getExtension())=="shp"){

$capas[]=[
"nombre"=>basename($file->getFilename(),".shp"),
"archivo"=>$file->getFilename()
];

}

}

}

echo json_encode($capas);