<?php
$host="10.70.2.88";
$port="5432";
$user="imontalvo";
$pass="Agu4k4n2026";
$dbname="postgres";

$dsn = "pgsql:host=$host;port=$port;dbname=$dbname;";

try {
    global $pdo;
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    die("❌ Error de conexión a Postgres: " . $e->getMessage());
}
