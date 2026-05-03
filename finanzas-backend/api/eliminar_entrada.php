<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . '/../config/conexion.php';

$data = json_decode(file_get_contents("php://input"), true);
$id = $data["id"] ?? null;

if (!$id) {
    echo json_encode(["success" => false, "message" => "ID requerido"]);
    exit;
}

$db = new Conexion();
$conn = $db->conectar();

$stmt = $conn->prepare("DELETE FROM entradas WHERE id = :id");
$stmt->bindParam(":id", $id);

echo json_encode(["success" => $stmt->execute()]);
?>