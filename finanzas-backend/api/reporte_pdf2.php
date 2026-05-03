<?php
require_once __DIR__ . '/../dompdf/autoload.inc.php';

use Dompdf\Dompdf;

require_once __DIR__ . '/../config/conexion.php';

$db = new Conexion();
$conn = $db->conectar();

$entradas = $conn->query("SELECT SUM(monto) AS total FROM entradas")->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;
$salidas = $conn->query("SELECT SUM(monto) AS total FROM salidas")->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;
$balance = $entradas - $salidas;

$html = "
<style>
body { font-family: Arial, sans-serif; }
h1 { text-align: center; color: #222; }
.resumen { margin-bottom: 20px; }
table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
th { background-color: #f2f2f2; }
th, td { border: 1px solid #999; padding: 8px; text-align: left; }
</style>

<h1>Reporte de Finanzas</h1>

<div class='resumen'>
<p><strong>Total Entradas:</strong> $$entradas</p>
<p><strong>Total Salidas:</strong> $$salidas</p>
<p><strong>Balance:</strong> $$balance</p>
</div>

<h3>Entradas</h3>
<table>
<tr>
<th>Tipo</th>
<th>Monto</th>
<th>Fecha</th>
</tr>
";

$result = $conn->query("SELECT * FROM entradas");

foreach ($result as $row) {
    $html .= "
    <tr>
        <td>{$row['tipo_entrada']}</td>
        <td>{$row['monto']}</td>
        <td>{$row['fecha']}</td>
    </tr>";
}

$html .= "
</table>

<h3>Salidas</h3>
<table>
<tr>
<th>Tipo</th>
<th>Monto</th>
<th>Fecha</th>
</tr>
";

$result2 = $conn->query("SELECT * FROM salidas");

foreach ($result2 as $row) {
    $html .= "
    <tr>
        <td>{$row['tipo_salida']}</td>
        <td>{$row['monto']}</td>
        <td>{$row['fecha']}</td>
    </tr>";
}

$html .= "</table>";

$dompdf = new Dompdf();
$dompdf->loadHtml($html);
$dompdf->setPaper("A4", "portrait");
$dompdf->render();
$dompdf->stream("reporte_finanzas.pdf", ["Attachment" => false]);
?>