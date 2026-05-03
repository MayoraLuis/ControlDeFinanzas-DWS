import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import BotonRegresar from "../components/BotonRegresar";

function VerEntradas() {
  const [entradas, setEntradas] = useState([]);

  useEffect(() => {
    api.get("/obtener_entradas.php").then(res => setEntradas(res.data));
  }, []);

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <BotonRegresar />

        <h2>Entradas</h2>

        <table className="table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Factura</th>
            </tr>
          </thead>

          <tbody>
            {entradas.map(e => (
              <tr key={e.id}>
                <td>{e.tipo_entrada}</td>
                <td>{e.monto}</td>
                <td>{e.fecha}</td>
                <td>
                  <img src={`http://localhost/finanzas-backend/${e.factura}`} width="50" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default VerEntradas;