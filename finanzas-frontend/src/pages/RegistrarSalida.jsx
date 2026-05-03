import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import BotonRegresar from "../components/BotonRegresar";

function RegistrarSalida() {
  const [tipo, setTipo] = useState("");
  const [monto, setMonto] = useState("");
  const [fecha, setFecha] = useState("");
  const [factura, setFactura] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("tipo_salida", tipo);
    formData.append("monto", monto);
    formData.append("fecha", fecha);
    formData.append("factura", factura);

    await api.post("/crear_salida.php", formData);
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
          <input className="form-control mb-2" placeholder="Tipo"
            value={tipo} onChange={(e) => setTipo(e.target.value)} />

          <input type="number" className="form-control mb-2" placeholder="Monto"
            value={monto} onChange={(e) => setMonto(e.target.value)} />

          <input type="date" className="form-control mb-2"
            value={fecha} onChange={(e) => setFecha(e.target.value)} />

          <input type="file" className="form-control mb-2"
            onChange={(e) => setFactura(e.target.files[0])} />

          <button className="btn btn-warning">Guardar</button>
        </form>
      </div>
    </div>
    </>
  );
}

export default RegistrarSalida;