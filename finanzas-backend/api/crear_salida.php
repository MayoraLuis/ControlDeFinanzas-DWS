<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . '/../models/Salida.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $tipo = $_POST['tipo_salida'];
    $monto = $_POST['monto'];
    $fecha = $_POST['fecha'];

    $directorio = "../uploads/salidas/";
    if (!is_dir($directorio)) {
        mkdir($directorio, 0777, true);
    }

    $nombreArchivo = time() . "_" . $_FILES["factura"]["name"];
    $rutaServidor = $directorio . $nombreArchivo;
    $rutaBD = "uploads/salidas/" . $nombreArchivo;

    if (move_uploaded_file($_FILES["factura"]["tmp_name"], $rutaServidor)) {

        $salida = new Salida();
        $ok = $salida->registrar($tipo, $monto, $fecha, $rutaBD);

        echo json_encode([
            "success" => $ok
        ]);

    } else {
        echo json_encode([
            "success" => false,
            "message" => "Error al subir la imagen"
        ]);
    }
}
?>