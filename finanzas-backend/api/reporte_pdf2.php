<?php
require_once __DIR__ . '/../dompdf/autoload.inc.php';

use Dompdf\Dompdf;

require_once __DIR__ . '/../config/conexion.php';

$db = new Conexion();
$conn = $db->conectar();

$totalEntradas = $conn->query("SELECT SUM(monto) AS total FROM entradas")
    ->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;

$totalSalidas = $conn->query("SELECT SUM(monto) AS total FROM salidas")
    ->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;

$balance = $totalEntradas - $totalSalidas;

$entradas = $conn->query("SELECT * FROM entradas ORDER BY fecha DESC");
$salidas = $conn->query("SELECT * FROM salidas ORDER BY fecha DESC");

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
                </tr>";

foreach ($entradas as $row) {
    $html .= "
                <tr>
                    <td>{$row['tipo_entrada']}</td>
                    <td>$" . number_format($row['monto'], 2) . "</td>
                </tr>";
}

$html .= "
                <tr>
                    <th>TOTAL</th>
                    <th>$" . number_format($totalEntradas, 2) . "</th>
                </tr>
            </table>
        </div>

        <div class='col'>
            <h3>Salidas</h3>
            <table>
                <tr>
                    <th>Tipo</th>
                    <th>Monto</th>
                </tr>";

foreach ($salidas as $row) {
    $html .= "
                <tr>
                    <td>{$row['tipo_salida']}</td>
                    <td>$" . number_format($row['monto'], 2) . "</td>
                </tr>";
}

$html .= "
                <tr>
                    <th>TOTAL</th>
                    <th>$" . number_format($totalSalidas, 2) . "</th>
                </tr>
            </table>
        </div>
    </div>

    <p class='balance'>Balance Mensual: $" . number_format($balance, 2) . "</p>
</div>

<div class='contenedor'>
    <h2>Gráfico de balance mensual Entradas vs Salidas</h2>
    <p style='text-align:center;'>
        Entradas: $" . number_format($totalEntradas, 2) . " |
        Salidas: $" . number_format($totalSalidas, 2) . "
    </p>
    <p style='text-align:center;'>
        El gráfico de pastel se visualiza dentro del sistema web en la sección Balance.
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