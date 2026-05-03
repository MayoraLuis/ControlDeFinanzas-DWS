import { useNavigate } from "react-router-dom";

function BotonRegresar() {
  const navigate = useNavigate();

  return (
    <button
      className="btn btn-outline-secondary back-button mb-3"
      onClick={() => navigate(-1)}
    >
      ← Regresar
    </button>
  );
}

export default BotonRegresar;