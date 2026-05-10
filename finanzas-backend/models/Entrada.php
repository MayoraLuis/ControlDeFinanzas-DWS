<?php
require_once __DIR__ . '/../config/conexion.php';

class Entrada {
    private $conn;

    public function __construct() {
        $db = new Conexion();
        $this->conn = $db->conectar();
    }

    public function registrar($usuario_id, $tipo, $monto, $fecha, $factura) {
        $sql = "INSERT INTO entradas (usuario_id, tipo_entrada, monto, fecha, factura)
                VALUES (:usuario_id, :tipo, :monto, :fecha, :factura)";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":usuario_id", $usuario_id);
        $stmt->bindParam(":tipo", $tipo);
        $stmt->bindParam(":monto", $monto);
        $stmt->bindParam(":fecha", $fecha);
        $stmt->bindParam(":factura", $factura);

        return $stmt->execute();
    }
}
?>