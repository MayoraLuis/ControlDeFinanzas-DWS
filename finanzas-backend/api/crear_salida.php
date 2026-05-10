<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../models/Salida.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (
        !isset($_POST['usuario_id']) ||
        !isset($_POST['tipo_salida']) ||
        !isset($_POST['monto']) ||
        !isset($_POST['fecha']) ||
        !isset($_FILES['factura'])
    ) {
        echo json_encode([
            "success" => false,
            "message" => "Datos incompletos"
        ]);
        exit;
    }

    $usuario_id = $_POST['usuario_id'];
    $tipo = $_POST['tipo_salida'];
    $monto = $_POST['monto'];
    $fecha = $_POST['fecha'];

    $directorio = __DIR__ . "/../uploads/salidas/";

    if (!is_dir($directorio)) {
        mkdir($directorio, 0777, true);
    }

    $nombreArchivo = time() . "_" . basename($_FILES["factura"]["name"]);
    $rutaServidor = $directorio . $nombreArchivo;
    $rutaBD = "uploads/salidas/" . $nombreArchivo;

    if (move_uploaded_file($_FILES["factura"]["tmp_name"], $rutaServidor)) {
        $salida = new Salida();
        $ok = $salida->registrar($usuario_id, $tipo, $monto, $fecha, $rutaBD);

        echo json_encode([
            "success" => $ok,
            "message" => $ok ? "Salida registrada correctamente" : "No se pudo registrar"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Error al subir la imagen"
        ]);
    }
}
?>