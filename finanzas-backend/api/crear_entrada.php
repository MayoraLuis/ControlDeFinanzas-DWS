<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once("../config/conexion.php");

try {

    $usuario_id = $_POST["usuario_id"] ?? null;
    $tipo = $_POST["tipo_entrada"] ?? "";
    $monto = $_POST["monto"] ?? "";
    $fecha = $_POST["fecha"] ?? "";

    if (!$usuario_id) {
        echo json_encode([
            "success" => false,
            "message" => "Usuario no recibido"
        ]);
        exit;
    }

    if (!isset($_FILES["factura"])) {
        echo json_encode([
            "success" => false,
            "message" => "Factura no recibida"
        ]);
        exit;
    }

    $db = new Conexion();
    $conn = $db->conectar();

    $directorio = "../uploads/entradas/";

    if (!file_exists($directorio)) {
        mkdir($directorio, 0777, true);
    }

    $nombreArchivo = time() . "_" . basename($_FILES["factura"]["name"]);

    $rutaServidor = $directorio . $nombreArchivo;
    $rutaBD = "uploads/entradas/" . $nombreArchivo;

    move_uploaded_file($_FILES["factura"]["tmp_name"], $rutaServidor);

    $sql = "INSERT INTO entradas 
            (usuario_id, tipo_entrada, monto, fecha, factura)
            VALUES
            (:usuario_id, :tipo, :monto, :fecha, :factura)";

    $stmt = $conn->prepare($sql);

    $stmt->bindParam(":usuario_id", $usuario_id);
    $stmt->bindParam(":tipo", $tipo);
    $stmt->bindParam(":monto", $monto);
    $stmt->bindParam(":fecha", $fecha);
    $stmt->bindParam(":factura", $rutaBD);

    $ok = $stmt->execute();

    echo json_encode([
        "success" => $ok
    ]);

} catch (Exception $e) {

    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>