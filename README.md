# 🧑‍💻 Mundo Usuarios y Productos

Este proyecto implementa un sistema CRUD (Crear, Leer, Actualizar y Eliminar) de usuarios, utilizando:

- **Backend:** Node.js + Express (API REST)
- **Frontend:** React + Vite + PrimeReact
- **Validaciones:** Yup + Formik

---

## 🚀 Tecnologías

### 🖥️ Frontend
- React + Vite
- React Router DOM
- PrimeReact
- Axios
- React Toastify
- jsPDF + AutoTable

### 🔧 Backend
- Node.js
- Express
- CORS
- JSON (como persistencia de datos)

---

## 📂 Estructura del Proyecto

```bash
.
├── backend/
│   ├── controllers/
│   │   ├── productos.controller.js
│   │   └── usuarios.controller.js
│   ├── data/
│   │   ├── productos.json
│   │   └── usuarios.json
│   ├── routes/
│   │   ├── productos.routes.js
│   │   └── usuarios.routes.js
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── context/
│   │   │   ├── ProductsContext.jsx
│   │   │   └── UserContext.jsx
│   │   ├── products/
│   │   │   ├── ProductForm.jsx
│   │   │   ├── ProductsView.jsx
│   │   │   └── productsData.js
│   │   ├── users/
│   │   │   ├── UserForm.jsx
│   │   │   ├── UsersView.jsx
│   │   │   ├── UsersContainer.jsx
│   │   │   └── useUserForm.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
```

---

## ⚙️ Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/Pabloamedey/Practico_Integral
cd Practico_Integral
```

### 2. Configura el Backend

```bash
cd backend
npm install
npm start
```

Servidor corriendo en `http://localhost:3000`

### 3. Configura el Frontend

En una terminal aparte:

```bash
cd frontend
npm install
npm run dev
```

Abre la app en `http://localhost:5173`

---

## ✅ Funcionalidades

- Crear, editar y eliminar **usuarios**
- Crear, editar y eliminar **productos**
- Exportar usuarios o productos a **PDF**
- Tabla con paginación y selección
- Alerta con notificación (toast) para acciones exitosas
- Diseño oscuro moderno y responsive

---

## 📄 Uso

Desde la pantalla de inicio podés:
- Ir a la vista de usuarios 👥
- Ir a la vista de productos 🛒

---

## 👨‍💻 Autor

**Pablo Aldo Amedey Dilena**  

---

## 📝 Licencia

Este proyecto es solo para fines educativos.