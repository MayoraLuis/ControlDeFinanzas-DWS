import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    total_entradas: 0,
    total_salidas: 0,
    balance: 0,
    entradas: [],
    salidas: []
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const response = await api.get("/balance.php");
      setDatos(response.data);
    } catch (error) {
      console.error("Error al cargar dashboard:", error);
    }
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

  const ultimasEntradas = datos.entradas.slice(0, 3);
  const ultimasSalidas = datos.salidas.slice(0, 3);

  return (
    <>
      <Navbar />

      <div className="home-dashboard">
        <section className="home-hero">
          <div>
            <span className="home-badge">Panel principal</span>
            <h1>Bienvenido, {usuario?.nombre_completo}</h1>
            <p>
              Gestiona tus entradas, salidas, facturas y reportes financieros
              desde un solo lugar.
            </p>
          </div>

          <button
            className="btn btn-light btn-lg-modern"
            onClick={() => navigate("/balance")}
          >
            Ver reporte completo
          </button>
        </section>

        <section className="home-kpi-grid">
          <div className="home-kpi-card kpi-income">
            <span>Total entradas</span>
            <h2>${Number(datos.total_entradas).toFixed(2)}</h2>
            <p>Ingresos registrados</p>
          </div>

          <div className="home-kpi-card kpi-expense">
            <span>Total salidas</span>
            <h2>${Number(datos.total_salidas).toFixed(2)}</h2>
            <p>Gastos registrados</p>
          </div>

          <div className="home-kpi-card kpi-final">
            <span>Balance actual</span>
            <h2>${Number(datos.balance).toFixed(2)}</h2>
            <p>Entradas menos salidas</p>
          </div>
        </section>

        <section className="home-main-grid">
          <div className="home-panel">
            <h4>Acciones rápidas</h4>

            <div className="quick-actions">
              <button
                className="quick-btn green"
                onClick={() => navigate("/entrada")}
              >
                <span>＋</span>
                Registrar entrada
              </button>

              <button
                className="quick-btn red"
                onClick={() => navigate("/salida")}
              >
                <span>－</span>
                Registrar salida
              </button>

              <button
                className="quick-btn blue"
                onClick={() => navigate("/ver-entradas")}
              >
                <span>↗</span>
                Ver entradas
              </button>

              <button
                className="quick-btn orange"
                onClick={() => navigate("/ver-salidas")}
              >
                <span>↘</span>
                Ver salidas
              </button>

              <button
                className="quick-btn dark"
                onClick={() => navigate("/balance")}
              >
                <span>📊</span>
                Mostrar balance
              </button>
            </div>
          </div>

          <div className="home-panel">
            <h4>Entradas vs Salidas</h4>

            <div className="home-chart">
              <Pie data={dataChart} />
            </div>
          </div>
        </section>

        <section className="home-main-grid">
          <div className="home-panel">
            <h4>Últimas entradas</h4>

            {ultimasEntradas.length === 0 ? (
              <p className="text-muted">No hay entradas registradas.</p>
            ) : (
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Monto</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {ultimasEntradas.map((e) => (
                    <tr key={e.id}>
                      <td>{e.tipo_entrada}</td>
                      <td>${Number(e.monto).toFixed(2)}</td>
                      <td>{e.fecha}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="home-panel">
            <h4>Últimas salidas</h4>

            {ultimasSalidas.length === 0 ? (
              <p className="text-muted">No hay salidas registradas.</p>
            ) : (
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Monto</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {ultimasSalidas.map((s) => (
                    <tr key={s.id}>
                      <td>{s.tipo_salida}</td>
                      <td>${Number(s.monto).toFixed(2)}</td>
                      <td>{s.fecha}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default Dashboard;