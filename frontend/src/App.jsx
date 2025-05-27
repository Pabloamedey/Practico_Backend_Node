import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { ProductProvider } from "./context/ProductsContext";
import ProductsRoutes from "./products";
import UserRoutes from "./users";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="container fade-in">
      <ToastContainer />
      {!isHome && (
        <nav>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            ⬅️ Volver al Home
          </NavLink>
          <NavLink to="/usuarios" className={({ isActive }) => (isActive ? "active" : "")}>
            🦄 Usuarios
          </NavLink>
          <NavLink to="/productos" className={({ isActive }) => (isActive ? "active" : "")}>
            🛒 Productos
          </NavLink>
        </nav>
      )}
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <div className="home-page">
                <div className="home-overlay">
                  <h1>Bienvenido a Mundo Usuarios 🦄</h1>
                  <div className="buttons" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem' }}>
                    <NavLink to="/usuarios" className="btn btn-unicorn">🦄 Ver Usuarios</NavLink>
                    <NavLink to="/productos" className="btn btn-products">🛒 Ver Productos</NavLink>
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/usuarios/*" element={<UserProvider><UserRoutes /></UserProvider>} />
          <Route path="/productos/*" element={<ProductProvider><ProductsRoutes /></ProductProvider>} />
        </Routes>
      </main>
      <footer>Hecho por Pablo Aldo Amedey Dilena — 2025</footer>
    </div>
  );
}

export default App;
