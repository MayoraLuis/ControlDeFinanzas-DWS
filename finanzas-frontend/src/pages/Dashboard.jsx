import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="container py-4">
        <div className="dashboard-hero mb-4">
          <h2>Bienvenido, {usuario?.nombre_completo}</h2>
          <p className="mb-0">
            Administra tus ingresos, gastos y reportes financieros desde un solo lugar.
          </p>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="stat-card bg-income">
              <h5>Gestión de ingresos</h5>
              <h3>Entradas</h3>
            </div>
          </div>

          <div className="col-md-4">
            <div className="stat-card bg-expense">
              <h5>Gestión de gastos</h5>
              <h3>Salidas</h3>
            </div>
          </div>

          <div className="col-md-4">
            <div className="stat-card bg-balance">
              <h5>Resumen financiero</h5>
              <h3>Balance</h3>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card module-card">
              <div className="module-icon icon-income">⬆</div>
              <h5>Entradas</h5>
              <p>Registra y consulta todos los ingresos del sistema.</p>

              <button
                className="btn btn-success btn-lg-modern w-100 mb-2"
                onClick={() => navigate("/entrada")}
              >
                Registrar entrada
              </button>

              <button
                className="btn btn-outline-success btn-lg-modern w-100"
                onClick={() => navigate("/ver-entradas")}
              >
                Ver entradas
              </button>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card module-card">
              <div className="module-icon icon-expense">⬇</div>
              <h5>Salidas</h5>
              <p>Controla los egresos y visualiza sus comprobantes.</p>

              <button
                className="btn btn-warning btn-lg-modern w-100 mb-2"
                onClick={() => navigate("/salida")}
              >
                Registrar salida
              </button>

              <button
                className="btn btn-outline-warning btn-lg-modern w-100"
                onClick={() => navigate("/ver-salidas")}
              >
                Ver salidas
              </button>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card module-card">
              <div className="module-icon icon-report">📊</div>
              <h5>Reportes</h5>
              <p>Consulta el balance general y exporta el reporte a PDF.</p>

              <button
                className="btn btn-dark btn-lg-modern w-100"
                onClick={() => navigate("/balance")}
              >
                Mostrar balance
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;