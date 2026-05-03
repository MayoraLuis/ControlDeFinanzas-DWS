import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Registro() {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const response = await api.post("/registrar_usuario.php", {
        nombre_completo: nombreCompleto,
        usuario,
        clave,
      });

      if (response.data.success) {
        setMensaje("Usuario registrado correctamente. Ya puedes iniciar sesión.");
        setNombreCompleto("");
        setUsuario("");
        setClave("");
      } else {
        setMensaje(response.data.message);
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="card auth-card">
        <div className="auth-header">
          <h3>Crear cuenta</h3>
          <p className="mb-0 mt-2 text-white">
            Registra un nuevo usuario para el sistema
          </p>
        </div>

        <div className="card-body p-4">
          {mensaje && <div className="alert alert-info">{mensaje}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre completo</label>
              <input
                type="text"
                className="form-control"
                value={nombreCompleto}
                onChange={(e) => setNombreCompleto(e.target.value)}
                required
              />
            </div>

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

            <button className="btn btn-primary w-100 btn-lg-modern">
              Registrar usuario
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary w-100 mt-2"
              onClick={() => navigate("/")}
            >
              Volver al login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registro;