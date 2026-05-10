import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import BotonRegresar from "../components/BotonRegresar";

function RegistrarEntrada() {
  const [tipo, setTipo] = useState("");
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState("");
  const [factura, setFactura] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario || !usuario.id) {
      setMensaje("No se encontró el usuario logueado. Inicia sesión nuevamente.");
      return;
    }

    if (!factura) {
      setMensaje("Debes seleccionar una factura.");
      return;
    }

    const formData = new FormData();
    formData.append("usuario_id", usuario.id);
    formData.append("tipo_entrada", tipo);
    formData.append("monto", monto);
    formData.append("fecha", fecha);
    formData.append("factura", factura);

    try {
      const response = await api.post("/crear_entrada.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setMensaje("Entrada registrada correctamente");
        setTipo("");
        setMonto("");
        setFecha("");
        setFactura(null);
        e.target.reset();
      } else {
        setMensaje(response.data.message || "Error al guardar la entrada");
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error al conectar con el servidor");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <BotonRegresar />

        <div className="section-card">
          <h2 className="mb-4">Registrar Entrada</h2>

          {mensaje && <div className="alert alert-info">{mensaje}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Tipo de entrada</label>
              <input
                type="text"
                className="form-control"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Monto</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Fecha</label>
              <input
                type="date"
                className="form-control"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Factura</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setFactura(e.target.files[0])}
                required
              />
            </div>

            <button className="btn btn-success w-100" type="submit">
              Guardar entrada
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegistrarEntrada;