# 💰 Control de Finanzas

Aplicación web fullstack para el control de finanzas personales, desarrollada con React, PHP y MySQL. Permite registrar entradas y salidas, subir facturas, visualizar reportes, generar gráficos y exportar información a PDF.

## 🚀 Funcionalidades

- Inicio de sesión
- Registro de nuevos usuarios
- Registro de entradas
- Registro de salidas
- Subida de facturas en imagen
- Visualización de facturas con zoom y modal
- Edición y eliminación de entradas y salidas
- Dashboard tipo Power BI
- Reporte de balance financiero
- Gráfico de entradas vs salidas
- Exportación de reporte a PDF

## 🛠️ Tecnologías utilizadas

### Frontend
- React
- Vite
- Bootstrap
- Axios
- React Router DOM
- Chart.js

### Backend
- PHP
- MySQL
- PDO
- Dompdf

### Herramientas
- XAMPP
- MySQL Workbench
- Git & GitHub

## 📂 Estructura del proyecto

```text
controlFinanzas/
├── finanzas-frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── finanzas-backend/
│   ├── api/
│   ├── config/
│   ├── models/
│   ├── uploads/
│   └── dompdf/
│
├── README.md
└── .gitignore

# 📊 Módulos principales
Login y registro de usuarios
Dashboard financiero
Gestión de entradas
Gestión de salidas
Reporte de balance
Exportación PDF