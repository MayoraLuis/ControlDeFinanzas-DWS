<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . '/../config/conexion.php';

$db = new Conexion();
$conn = $db->conectar();

$entradasStmt = $conn->query("SELECT * FROM entradas ORDER BY fecha DESC");
$entradas = $entradasStmt->fetchAll(PDO::FETCH_ASSOC);

$salidasStmt = $conn->query("SELECT * FROM salidas ORDER BY fecha DESC");
$salidas = $salidasStmt->fetchAll(PDO::FETCH_ASSOC);

$totalEntradas = $conn->query("SELECT SUM(monto) AS total FROM entradas")
    ->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;

$totalSalidas = $conn->query("SELECT SUM(monto) AS total FROM salidas")
    ->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;

$balance = $totalEntradas - $totalSalidas;

echo json_encode([
    "total_entradas" => $totalEntradas,
    "total_salidas" => $totalSalidas,
    "balance" => $balance,
    "entradas" => $entradas,
    "salidas" => $salidas
]);
?>