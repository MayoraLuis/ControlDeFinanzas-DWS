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
    balance: 0,
    entradas: [],
    salidas: []
  });

  useEffect(() => {
    cargarBalance();
  }, []);

  const cargarBalance = async () => {
    const response = await api.get("/balance.php");
    setDatos(response.data);
  };

  const dataChart = {
    labels: ["Entradas", "Salidas"],
    datasets: [
      {
        data: [Number(datos.total_entradas), Number(datos.total_salidas)],
        backgroundColor: ["#0d6efd", "#dc3545"],
        borderWidth: 1
      }
    ]
  };

  return (
    <>
      <Navbar />

      <div className="powerbi-layout">
        <aside className="powerbi-sidebar">
          <h4>📊 Reportes</h4>

          <div className="sidebar-item active">Balance general</div>
          <div className="sidebar-item">Entradas</div>
          <div className="sidebar-item">Salidas</div>
          <div className="sidebar-item">PDF</div>

          <div className="sidebar-footer">
            <small>Control de Finanzas</small>
          </div>
        </aside>

        <main className="powerbi-content">
          <BotonRegresar />

          <div className="powerbi-header">
            <div>
              <h2>Reporte Financiero</h2>
              <p>Resumen general de entradas, salidas y balance.</p>
            </div>

            <a
              href="http://localhost/controlFinanzas/finanzas-backend/api/reporte_pdf2.php"
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark"
            >
              Exportar PDF
            </a>
          </div>

          <div className="kpi-grid">
            <div className="kpi-card kpi-blue">
              <span>Total Entradas</span>
              <h3>${Number(datos.total_entradas).toFixed(2)}</h3>
            </div>

            <div className="kpi-card kpi-red">
              <span>Total Salidas</span>
              <h3>${Number(datos.total_salidas).toFixed(2)}</h3>
            </div>

            <div className="kpi-card kpi-green">
              <span>Balance Final</span>
              <h3>${Number(datos.balance).toFixed(2)}</h3>
            </div>
          </div>

          <div className="report-grid">
            <div className="report-card chart-card">
              <h5>Entradas vs Salidas</h5>
              <div style={{ maxWidth: "360px", margin: "0 auto" }}>
                <Pie data={dataChart} />
              </div>
            </div>

            <div className="report-card">
              <h5>Resumen del Balance</h5>
              <p className="balance-text">
                El balance actual es de:
              </p>
              <h2 className={datos.balance >= 0 ? "text-success" : "text-danger"}>
                ${Number(datos.balance).toFixed(2)}
              </h2>
              <p className="text-muted">
                Calculado como total de entradas menos total de salidas.
              </p>
            </div>
          </div>

          <div className="tables-grid">
            <div className="report-card">
              <h5>Entradas</h5>
              <table className="table table-sm table-bordered">
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {datos.entradas.map((e) => (
                    <tr key={e.id}>
                      <td>{e.tipo_entrada}</td>
                      <td>${Number(e.monto).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="report-card">
              <h5>Salidas</h5>
              <table className="table table-sm table-bordered">
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {datos.salidas.map((s) => (
                    <tr key={s.id}>
                      <td>{s.tipo_salida}</td>
                      <td>${Number(s.monto).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Balance;