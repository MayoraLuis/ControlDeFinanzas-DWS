import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import BotonRegresar from "../components/BotonRegresar";

function VerSalidas() {
  const [salidas, setSalidas] = useState([]);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    cargarSalidas();
  }, []);

  const usuario = JSON.parse(localStorage.getItem("usuario"));

const cargarSalidas = async () => {
  const res = await api.get(`/obtener_salidas.php?usuario_id=${usuario.id}`);
  setSalidas(res.data);
};

  const eliminarSalida = async (id) => {
    if (!confirm("¿Deseas eliminar esta salida?")) return;

    const res = await api.post("/eliminar_salida.php", { id });

    if (res.data.success) {
      cargarSalidas();
    }
  };

  const guardarEdicion = async () => {
    const res = await api.post("/editar_salida.php", editando);

    if (res.data.success) {
      setEditando(null);
      cargarSalidas();
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <BotonRegresar />

        <div className="section-card">
          <h2 className="mb-4">Salidas</h2>

          <table className="table table-bordered text-center">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Monto</th>
                <th>Fecha</th>
                <th>Factura</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {salidas.map((s) => (
                <tr key={s.id}>
                  <td>{s.tipo_salida}</td>
                  <td>${s.monto}</td>
                  <td>{s.fecha}</td>
                  <td>
                    {s.factura && (
                      <img
                        src={`http://localhost/controlFinanzas/finanzas-backend/${s.factura}`}
                        alt="Factura"
                        className="img-factura"
                        onClick={() =>
                          setImagenSeleccionada(
                            `http://localhost/controlFinanzas/finanzas-backend/${s.factura}`
                          )
                        }
                      />
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => setEditando({ ...s })}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarSalida(s.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editando && (
          <div className="modal-factura-overlay">
            <div className="modal-factura-contenido">
              <div className="modal-factura-header">
                <h5>Editar salida</h5>
                <button className="btn btn-danger btn-sm" onClick={() => setEditando(null)}>
                  Cerrar
                </button>
              </div>

              <input
                className="form-control mb-2"
                value={editando.tipo_salida}
                onChange={(e) =>
                  setEditando({ ...editando, tipo_salida: e.target.value })
                }
              />

              <input
                type="number"
                className="form-control mb-2"
                value={editando.monto}
                onChange={(e) =>
                  setEditando({ ...editando, monto: e.target.value })
                }
              />

              <input
                type="date"
                className="form-control mb-3"
                value={editando.fecha}
                onChange={(e) =>
                  setEditando({ ...editando, fecha: e.target.value })
                }
              />

              <button className="btn btn-success w-100" onClick={guardarEdicion}>
                Guardar cambios
              </button>
            </div>
          </div>
        )}

        {imagenSeleccionada && (
          <div className="modal-factura-overlay" onClick={() => setImagenSeleccionada(null)}>
            <div
              className="modal-factura-contenido"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-factura-header">
                <h5>Vista de factura</h5>
                <button className="btn btn-danger btn-sm" onClick={() => setImagenSeleccionada(null)}>
                  Cerrar
                </button>
              </div>

              <img src={imagenSeleccionada} alt="Factura grande" className="modal-factura-img" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default VerSalidas;