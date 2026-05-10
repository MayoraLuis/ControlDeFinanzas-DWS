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

if (!isset($data["id"], $data["tipo_entrada"], $data["monto"], $data["fecha"])) {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
    exit;
}

$db = new Conexion();
$conn = $db->conectar();

$sql = "UPDATE entradas 
        SET tipo_entrada = :tipo, monto = :monto, fecha = :fecha 
        WHERE id = :id";

$stmt = $conn->prepare($sql);
$stmt->bindParam(":tipo", $data["tipo_entrada"]);
$stmt->bindParam(":monto", $data["monto"]);
$stmt->bindParam(":fecha", $data["fecha"]);
$stmt->bindParam(":id", $data["id"]);

echo json_encode(["success" => $stmt->execute()]);
?>