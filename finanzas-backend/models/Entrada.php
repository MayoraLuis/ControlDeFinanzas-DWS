<?php
require_once __DIR__ . '/../config/conexion.php';

class Entrada {
    private $conn;

    public function __construct() {
        $db = new Conexion();
        $this->conn = $db->conectar();
    }

    public function registrar($tipo, $monto, $fecha, $factura) {
        $sql = "INSERT INTO entradas (tipo_entrada, monto, fecha, factura)
                VALUES (:tipo, :monto, :fecha, :factura)";
        
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":tipo", $tipo);
        $stmt->bindParam(":monto", $monto);
        $stmt->bindParam(":fecha", $fecha);
        $stmt->bindParam(":factura", $factura);

        return $stmt->execute();
    }
}
?>