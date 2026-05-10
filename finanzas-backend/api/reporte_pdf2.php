<?php
require_once __DIR__ . '/../dompdf/autoload.inc.php';

use Dompdf\Dompdf;

require_once __DIR__ . '/../config/conexion.php';

$usuario_id = $_GET["usuario_id"] ?? null;

if (!$usuario_id) {
    die("Usuario no recibido");
}

$db = new Conexion();
$conn = $db->conectar();

$stmtEntradas = $conn->prepare("SELECT * FROM entradas WHERE usuario_id = :usuario_id ORDER BY fecha DESC");
$stmtEntradas->bindParam(":usuario_id", $usuario_id);
$stmtEntradas->execute();
$entradas = $stmtEntradas->fetchAll(PDO::FETCH_ASSOC);

$stmtSalidas = $conn->prepare("SELECT * FROM salidas WHERE usuario_id = :usuario_id ORDER BY fecha DESC");
$stmtSalidas->bindParam(":usuario_id", $usuario_id);
$stmtSalidas->execute();
$salidas = $stmtSalidas->fetchAll(PDO::FETCH_ASSOC);

$stmtTotalEntradas = $conn->prepare("SELECT SUM(monto) AS total FROM entradas WHERE usuario_id = :usuario_id");
$stmtTotalEntradas->bindParam(":usuario_id", $usuario_id);
$stmtTotalEntradas->execute();
$totalEntradas = $stmtTotalEntradas->fetch(PDO::FETCH_ASSOC)["total"] ?? 0;

$stmtTotalSalidas = $conn->prepare("SELECT SUM(monto) AS total FROM salidas WHERE usuario_id = :usuario_id");
$stmtTotalSalidas->bindParam(":usuario_id", $usuario_id);
$stmtTotalSalidas->execute();
$totalSalidas = $stmtTotalSalidas->fetch(PDO::FETCH_ASSOC)["total"] ?? 0;

$balance = $totalEntradas - $totalSalidas;
$fechaActual = date("d/m/Y");

$html = "
<style>
body {
    font-family: Arial, sans-serif;
    color: #333;
}

.contenedor {
    border: 2px solid #9ec5fe;
    padding: 15px;
    margin-bottom: 15px;
}

h1, h2, h3 {
    text-align: center;
}

table {
    border-collapse: collapse;
    width: 100%;
    font-size: 12px;
}

th, td {
    border: 1px solid #999;
    padding: 6px;
}

th {
    background-color: #f2f2f2;
}

.columnas {
    width: 100%;
}

.col {
    width: 49%;
    vertical-align: top;
    display: inline-block;
}

.balance {
    text-align: center;
    font-weight: bold;
    margin-top: 15px;
}

.resumen {
    text-align: center;
    margin-bottom: 10px;
}
</style>

<div class='contenedor'>
    <h2>Reporte Mensual de Finanzas</h2>
    <p class='resumen'><strong>Fecha del reporte:</strong> $fechaActual</p>

    <div class='columnas'>
        <div class='col'>
            <h3>Entradas</h3>
            <table>
                <tr>
                    <th>Tipo</th>
                    <th>Monto</th>
                    <th>Fecha</th>
                </tr>";

foreach ($entradas as $row) {
    $html .= "
                <tr>
                    <td>{$row['tipo_entrada']}</td>
                    <td>$" . number_format($row['monto'], 2) . "</td>
                    <td>{$row['fecha']}</td>
                </tr>";
}

$html .= "
                <tr>
                    <th>TOTAL</th>
                    <th colspan='2'>$" . number_format($totalEntradas, 2) . "</th>
                </tr>
            </table>
        </div>

        <div class='col'>
            <h3>Salidas</h3>
            <table>
                <tr>
                    <th>Tipo</th>
                    <th>Monto</th>
                    <th>Fecha</th>
                </tr>";

foreach ($salidas as $row) {
    $html .= "
                <tr>
                    <td>{$row['tipo_salida']}</td>
                    <td>$" . number_format($row['monto'], 2) . "</td>
                    <td>{$row['fecha']}</td>
                </tr>";
}

$html .= "
                <tr>
                    <th>TOTAL</th>
                    <th colspan='2'>$" . number_format($totalSalidas, 2) . "</th>
                </tr>
            </table>
        </div>
    </div>

    <p class='balance'>Balance Mensual: $" . number_format($balance, 2) . "</p>
</div>

<div class='contenedor'>
    <h2>Resumen</h2>
    <p style='text-align:center;'>
        Total entradas: $" . number_format($totalEntradas, 2) . " |
        Total salidas: $" . number_format($totalSalidas, 2) . "
    </p>
</div>
";

$dompdf = new Dompdf();
$dompdf->loadHtml($html);
$dompdf->setPaper("A4", "portrait");
$dompdf->render();

$fecha = date("Y-m-d");
$dompdf->stream("reporte_finanzas_$fecha.pdf", ["Attachment" => false]);
?>