import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import BotonRegresar from "../components/BotonRegresar";

function VerEntradas() {
  const [entradas, setEntradas] = useState([]);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    cargarEntradas();
  }, []);

  const usuario = JSON.parse(localStorage.getItem("usuario"));

const cargarEntradas = async () => {
  const res = await api.get(`/obtener_entradas.php?usuario_id=${usuario.id}`);
  setEntradas(res.data);
};

  const eliminarEntrada = async (id) => {
    if (!confirm("¿Deseas eliminar esta entrada?")) return;

    const res = await api.post("/eliminar_entrada.php", { id });

    if (res.data.success) {
      cargarEntradas();
    }
  };

  const guardarEdicion = async () => {
    const res = await api.post("/editar_entrada.php", editando);

    if (res.data.success) {
      setEditando(null);
      cargarEntradas();
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <BotonRegresar />

        <div className="section-card">
          <h2 className="mb-4">Entradas</h2>

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
              {entradas.map((e) => (
                <tr key={e.id}>
                  <td>{e.tipo_entrada}</td>
                  <td>${e.monto}</td>
                  <td>{e.fecha}</td>
                  <td>
                    {e.factura && (
                      <img
                        src={`http://localhost/controlFinanzas/finanzas-backend/${e.factura}`}
                        alt="Factura"
                        className="img-factura"
                        onClick={() =>
                          setImagenSeleccionada(
                            `http://localhost/controlFinanzas/finanzas-backend/${e.factura}`
                          )
                        }
                      />
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => setEditando({ ...e })}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarEntrada(e.id)}
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
                <h5>Editar entrada</h5>
                <button className="btn btn-danger btn-sm" onClick={() => setEditando(null)}>
                  Cerrar
                </button>
              </div>

              <input
                className="form-control mb-2"
                value={editando.tipo_entrada}
                onChange={(e) =>
                  setEditando({ ...editando, tipo_entrada: e.target.value })
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

export default VerEntradas;