import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import BotonRegresar from "../components/BotonRegresar";

function VerSalidas() {
  const [salidas, setSalidas] = useState([]);

  useEffect(() => {
    api.get("/obtener_salidas.php").then(res => setSalidas(res.data));
  }, []);

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <BotonRegresar />

        <h2>Salidas</h2>

        <table className="table">
          <tbody>
            {salidas.map(s => (
              <tr key={s.id}>
                <td>{s.tipo_salida}</td>
                <td>{s.monto}</td>
                <td>{s.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default VerSalidas;