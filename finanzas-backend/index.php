<?php
require_once "config/conexion.php";

$conexion = new Conexion();
$conn = $conexion->conectar();

echo "Conexión exitosa a la base de datos";
?>