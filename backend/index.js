import cors from 'cors';
import express from 'express';
import usuariosRoutes from "./routes/usuarios.routes.js";
import productosRoutes from "./routes/productos.routes.js"; // ✅ solo si usás productos

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Usa rutas organizadas
app.use("/usuarios", usuariosRoutes);
app.use("/productos", productosRoutes); // ✅ asegurate de tener este archivo creado

app.get('/', (req, res) => {
  res.send(`
    <h2>✅ API funcionando correctamente 🚀</h2>
    <p>Usá <code>/usuarios</code> o <code>/productos</code></p>
  `);
});

app.listen(3000, () => {
  console.log('🔌 Backend escuchando en http://localhost:3000');
});
