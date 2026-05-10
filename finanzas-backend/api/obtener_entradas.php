<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . '/../config/conexion.php';

$usuario_id = $_GET["usuario_id"] ?? null;

if (!$usuario_id) {
    echo json_encode([]);
    exit;
}

$db = new Conexion();
$conn = $db->conectar();

$sql = "SELECT * FROM entradas WHERE usuario_id = :usuario_id ORDER BY fecha DESC";
$stmt = $conn->prepare($sql);
$stmt->bindParam(":usuario_id", $usuario_id);
$stmt->execute();

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
?>