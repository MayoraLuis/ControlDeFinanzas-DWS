<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . '/../config/conexion.php';

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"] ?? null;
$tipo = $data["tipo_salida"] ?? "";
$monto = $data["monto"] ?? "";
$fecha = $data["fecha"] ?? "";

if (!$id) {
    echo json_encode(["success" => false, "message" => "ID requerido"]);
    exit;
}

$db = new Conexion();
$conn = $db->conectar();

$sql = "UPDATE salidas 
        SET tipo_salida = :tipo, monto = :monto, fecha = :fecha
        WHERE id = :id";

$stmt = $conn->prepare($sql);
$stmt->bindParam(":tipo", $tipo);
$stmt->bindParam(":monto", $monto);
$stmt->bindParam(":fecha", $fecha);
$stmt->bindParam(":id", $id);

echo json_encode(["success" => $stmt->execute()]);
?>