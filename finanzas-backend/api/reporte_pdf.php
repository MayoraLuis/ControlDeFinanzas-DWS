<?php
require_once __DIR__ . '/../vendor/autoload.php';
use Dompdf\Dompdf;

require_once __DIR__ . '/../config/conexion.php';

$db = new Conexion();
$conn = $db->conectar();

// Totales
$entradas = $conn->query("SELECT SUM(monto) as total FROM entradas")->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;
$salidas = $conn->query("SELECT SUM(monto) as total FROM salidas")->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;
$balance = $entradas - $salidas;

// HTML del reporte
$html = "
<h1 style='text-align:center;'>Reporte de Finanzas</h1>

<p><strong>Total Entradas:</strong> $$entradas</p>
<p><strong>Total Salidas:</strong> $$salidas</p>
<p><strong>Balance:</strong> $$balance</p>

<hr>

<h3>Entradas</h3>
<table border='1' width='100%' cellpadding='5'>
<tr>
<th>Tipo</th>
<th>Monto</th>
<th>Fecha</th>
</tr>";

$result = $conn->query("SELECT * FROM entradas");

foreach ($result as $row) {
    $html .= "<tr>
        <td>{$row['tipo_entrada']}</td>
        <td>{$row['monto']}</td>
        <td>{$row['fecha']}</td>
    </tr>";
}

$html .= "</table><br><h3>Salidas</h3>
<table border='1' width='100%' cellpadding='5'>
<tr>
<th>Tipo</th>
<th>Monto</th>
<th>Fecha</th>
</tr>";

$result2 = $conn->query("SELECT * FROM salidas");

foreach ($result2 as $row) {
    $html .= "<tr>
        <td>{$row['tipo_salida']}</td>
        <td>{$row['monto']}</td>
        <td>{$row['fecha']}</td>
    </tr>";
}

$html .= "</table>";

// Crear PDF
$dompdf = new Dompdf();
$dompdf->loadHtml($html);
$dompdf->setPaper("A4", "portrait");
$dompdf->render();

// Mostrar PDF
$dompdf->stream("reporte_finanzas.pdf", ["Attachment" => false]);
?>