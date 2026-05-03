import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3">
      <span
        className="navbar-brand"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/dashboard")}
      >
        💳 Control de Finanzas
      </span>

      <div className="ms-auto">
        <button className="btn btn-danger" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;