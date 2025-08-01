<?php
$host="10.70.2.88";
$port="5432";
$user="postgres";
$pass="Aguakan";
$dbname="postgres";

$dsn = "pgsql:host=$host;port=$port;dbname=$dbname;";

try {
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    return $pdo;
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}
