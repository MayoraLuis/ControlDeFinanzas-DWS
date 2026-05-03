import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import BotonRegresar from "../components/BotonRegresar";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Balance() {
  const [datos, setDatos] = useState({
    total_entradas: 0,
    total_salidas: 0,
    balance: 0
  });

  useEffect(() => {
    cargarBalance();
  }, []);

  const cargarBalance = async () => {
    try {
      const response = await api.get("/balance.php");
      setDatos(response.data);
    } catch (error) {
      console.error("Error al cargar balance:", error);
    }
  };

  const dataChart = {
    labels: ["Entradas", "Salidas"],
    datasets: [
      {
        data: [Number(datos.total_entradas), Number(datos.total_salidas)],
        backgroundColor: ["#198754", "#dc3545"],
        borderWidth: 1
      }
    ]
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <BotonRegresar />

        <h2 className="mb-4">Balance General</h2>

        <div className="row g-3">
          <div className="col-md-4">
            <div className="alert alert-success shadow-sm">
              <strong>Entradas:</strong> ${datos.total_entradas}
            </div>
          </div>

          <div className="col-md-4">
            <div className="alert alert-danger shadow-sm">
              <strong>Salidas:</strong> ${datos.total_salidas}
            </div>
          </div>

          <div className="col-md-4">
            <div className="alert alert-primary shadow-sm">
              <strong>Balance:</strong> ${datos.balance}
            </div>
          </div>
        </div>

        <div className="card shadow mt-4 p-4">
          <h4 className="text-center mb-4">Relación Entradas vs Salidas</h4>

          <div style={{ maxWidth: "420px", margin: "0 auto" }}>
            <Pie data={dataChart} />
          </div>

          <div className="text-center mt-4">
            <a
              href="http://localhost/finanzas-backend/api/reporte_pdf2.php"
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark"
            >
              Exportar a PDF
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Balance;