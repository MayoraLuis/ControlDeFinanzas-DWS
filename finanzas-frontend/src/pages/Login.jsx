import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/login.php", {
        usuario,
        clave,
      });

      if (response.data.success) {
        localStorage.setItem("usuario", JSON.stringify(response.data.usuario));
        navigate("/dashboard");
      } else {
        setError(response.data.message || "Usuario o contraseña incorrectos");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="card auth-card">
        <div className="auth-header">
          <h3>💳 Control de Finanzas</h3>
          <p className="mb-0 mt-2 text-white">
            Inicia sesión para administrar tu información financiera
          </p>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Usuario</label>
              <input
                type="text"
                className="form-control"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                required
              />
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <button type="submit" className="btn btn-primary w-100 btn-lg-modern">
              Ingresar
            </button>

            <button
  type="button"
  className="btn btn-outline-primary w-100 mt-2"
  onClick={() => navigate("/registro")}
>
  Crear nueva cuenta
</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;