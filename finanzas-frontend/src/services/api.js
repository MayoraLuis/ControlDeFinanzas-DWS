import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/controlFinanzas/finanzas-backend/api"
});

export default api;