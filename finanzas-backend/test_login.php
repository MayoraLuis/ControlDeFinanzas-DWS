<?php
$data = [
    "usuario" => "admin",
    "clave" => "admin123"
];

$options = [
    "http" => [
        "header"  => "Content-type: application/json",
        "method"  => "POST",
        "content" => json_encode($data),
    ]
];

$context  = stream_context_create($options);
$result = file_get_contents("http://localhost/finanzas-backend/api/login.php", false, $context);

echo $result;
?>