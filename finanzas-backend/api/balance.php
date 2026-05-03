<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . '/../config/conexion.php';

$db = new Conexion();
$conn = $db->conectar();

// Total entradas
$sql1 = "SELECT SUM(monto) as total_entradas FROM entradas";
$stmt1 = $conn->prepare($sql1);
$stmt1->execute();
$entradas = $stmt1->fetch(PDO::FETCH_ASSOC);

// Total salidas
$sql2 = "SELECT SUM(monto) as total_salidas FROM salidas";
$stmt2 = $conn->prepare($sql2);
$stmt2->execute();
$salidas = $stmt2->fetch(PDO::FETCH_ASSOC);

$totalEntradas = $entradas['total_entradas'] ?? 0;
$totalSalidas = $salidas['total_salidas'] ?? 0;
$balance = $totalEntradas - $totalSalidas;

echo json_encode([
    "total_entradas" => $totalEntradas,
    "total_salidas" => $totalSalidas,
    "balance" => $balance
]);
?>