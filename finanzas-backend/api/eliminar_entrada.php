<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../config/conexion.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["id"])) {
    echo json_encode(["success" => false, "message" => "ID no recibido"]);
    exit;
}

$db = new Conexion();
$conn = $db->conectar();

$sql = "DELETE FROM entradas WHERE id = :id";
$stmt = $conn->prepare($sql);
$stmt->bindParam(":id", $data["id"]);

echo json_encode(["success" => $stmt->execute()]);
?>