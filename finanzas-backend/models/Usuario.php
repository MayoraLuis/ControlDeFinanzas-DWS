<?php
require_once __DIR__ . '/../config/conexion.php';

class Usuario {
    private $conn;

    public function __construct() {
        $db = new Conexion();
        $this->conn = $db->conectar();
    }

    public function login($usuario, $clave) {
        $sql = "SELECT * FROM usuarios WHERE usuario = :usuario LIMIT 1";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":usuario", $usuario);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $data = $stmt->fetch(PDO::FETCH_ASSOC);

            if (password_verify($clave, $data["clave"])) {
                return [
                    "success" => true,
                    "usuario" => [
                        "id" => $data["id"],
                        "nombre_completo" => $data["nombre_completo"],
                        "usuario" => $data["usuario"]
                    ]
                ];
            }
        }

        return [
            "success" => false,
            "message" => "Usuario o contraseña incorrectos"
        ];
    }

    public function registrar($usuario, $clave, $nombre_completo) {
    $claveHash = password_hash($clave, PASSWORD_DEFAULT);

    $sql = "INSERT INTO usuarios (usuario, clave, nombre_completo)
            VALUES (:usuario, :clave, :nombre_completo)";

    $stmt = $this->conn->prepare($sql);
    $stmt->bindParam(":usuario", $usuario);
    $stmt->bindParam(":clave", $claveHash);
    $stmt->bindParam(":nombre_completo", $nombre_completo);

    return $stmt->execute();
}
}
?>