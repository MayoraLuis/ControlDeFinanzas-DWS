import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RegistrarEntrada from "./pages/RegistrarEntrada";
import VerEntradas from "./pages/VerEntradas";
import RegistrarSalida from "./pages/RegistrarSalida";
import VerSalidas from "./pages/VerSalidas";
import Balance from "./pages/Balance";
import RutaPrivada from "./components/RutaPrivada";
import Registro from "./pages/Registro";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <RutaPrivada>
              <Dashboard />
            </RutaPrivada>
          }
        />

        <Route
          path="/entrada"
          element={
            <RutaPrivada>
              <RegistrarEntrada />
            </RutaPrivada>
          }
        />

        <Route
          path="/ver-entradas"
          element={
            <RutaPrivada>
              <VerEntradas />
            </RutaPrivada>
          }
        />

        <Route
          path="/salida"
          element={
            <RutaPrivada>
              <RegistrarSalida />
            </RutaPrivada>
          }
        />

        <Route
          path="/ver-salidas"
          element={
            <RutaPrivada>
              <VerSalidas />
            </RutaPrivada>
          }
        />

        <Route
          path="/balance"
          element={
            <RutaPrivada>
              <Balance />
            </RutaPrivada>
          }
        />

        <Route path="/registro" element={<Registro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;