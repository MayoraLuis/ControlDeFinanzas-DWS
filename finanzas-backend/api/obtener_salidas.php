<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . '/../config/conexion.php';

$db = new Conexion();
$conn = $db->conectar();

$sql = "SELECT * FROM salidas ORDER BY fecha DESC";
$stmt = $conn->prepare($sql);
$stmt->execute();

$salidas = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($salidas);
?>