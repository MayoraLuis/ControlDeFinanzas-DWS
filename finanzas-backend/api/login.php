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

if (!$data || !isset($data["usuario"]) || !isset($data["clave"])) {
    echo json_encode([
        "success" => false,
        "message" => "Datos incompletos"
    ]);
    exit;
}

$usuario = trim($data["usuario"]);
$clave = trim($data["clave"]);

$model = new Usuario();
$resultado = $model->login($usuario, $clave);

echo json_encode($resultado);
?>