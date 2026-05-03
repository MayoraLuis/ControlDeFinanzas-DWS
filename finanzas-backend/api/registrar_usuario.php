<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../models/Usuario.php';

$data = json_decode(file_get_contents("php://input"), true);

if (
    !$data ||
    !isset($data["usuario"]) ||
    !isset($data["clave"]) ||
    !isset($data["nombre_completo"])
) {
    echo json_encode([
        "success" => false,
        "message" => "Datos incompletos"
    ]);
    exit;
}

$usuario = trim($data["usuario"]);
$clave = trim($data["clave"]);
$nombre_completo = trim($data["nombre_completo"]);

try {
    $model = new Usuario();
    $ok = $model->registrar($usuario, $clave, $nombre_completo);

    echo json_encode([
        "success" => $ok,
        "message" => $ok ? "Usuario registrado correctamente" : "No se pudo registrar"
    ]);
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "El usuario ya existe o ocurrió un error"
    ]);
}
?>