<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . '/../config/conexion.php';

$usuario_id = $_GET["usuario_id"] ?? null;

if (!$usuario_id) {
    echo json_encode([
        "total_entradas" => 0,
        "total_salidas" => 0,
        "balance" => 0,
        "entradas" => [],
        "salidas" => []
    ]);
    exit;
}

$db = new Conexion();
$conn = $db->conectar();

$sqlEntradas = "SELECT * FROM entradas WHERE usuario_id = :usuario_id ORDER BY fecha DESC";
$stmtEntradas = $conn->prepare($sqlEntradas);
$stmtEntradas->bindParam(":usuario_id", $usuario_id);
$stmtEntradas->execute();
$entradas = $stmtEntradas->fetchAll(PDO::FETCH_ASSOC);

$sqlSalidas = "SELECT * FROM salidas WHERE usuario_id = :usuario_id ORDER BY fecha DESC";
$stmtSalidas = $conn->prepare($sqlSalidas);
$stmtSalidas->bindParam(":usuario_id", $usuario_id);
$stmtSalidas->execute();
$salidas = $stmtSalidas->fetchAll(PDO::FETCH_ASSOC);

$sqlTotalEntradas = "SELECT SUM(monto) AS total FROM entradas WHERE usuario_id = :usuario_id";
$stmtTotalEntradas = $conn->prepare($sqlTotalEntradas);
$stmtTotalEntradas->bindParam(":usuario_id", $usuario_id);
$stmtTotalEntradas->execute();
$totalEntradas = $stmtTotalEntradas->fetch(PDO::FETCH_ASSOC)["total"] ?? 0;

$sqlTotalSalidas = "SELECT SUM(monto) AS total FROM salidas WHERE usuario_id = :usuario_id";
$stmtTotalSalidas = $conn->prepare($sqlTotalSalidas);
$stmtTotalSalidas->bindParam(":usuario_id", $usuario_id);
$stmtTotalSalidas->execute();
$totalSalidas = $stmtTotalSalidas->fetch(PDO::FETCH_ASSOC)["total"] ?? 0;

$balance = $totalEntradas - $totalSalidas;

echo json_encode([
    "total_entradas" => $totalEntradas,
    "total_salidas" => $totalSalidas,
    "balance" => $balance,
    "entradas" => $entradas,
    "salidas" => $salidas
]);
?>