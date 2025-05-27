import express from 'express';

const app = express();
app.use(express.json());

let usuarios = [];
let nextId = 1;

// 🟢 Ruta raíz para comprobar funcionamiento
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>API de Usuarios</title>
        <style>
          body {
            font-family: sans-serif;
            padding: 2rem;
            background: #f9f9f9;
            color: #333;
          }
          code {
            background: #eee;
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <h1>✅ API de Usuarios funcionando correctamente 🚀</h1>
        <p>Usá <code>/usuarios</code> para consultar la API.</p>
        <p>Ejemplo de endpoints:</p>
        <ul>
          <li><code>GET /usuarios</code></li>
          <li><code>POST /usuarios</code></li>
          <li><code>GET /usuarios/:id</code></li>
          <li><code>PUT /usuarios/:id</code></li>
          <li><code>DELETE /usuarios/:id</code></li>
        </ul>
      </body>
    </html>
  `);
});



// 📄 GET /usuarios - listar todos los usuarios
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

// 📄 GET /usuarios/:id - obtener un usuario por ID
app.get('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  res.json(usuario);
});

// 🆕 POST /usuarios - crear un nuevo usuario
app.post('/usuarios', (req, res) => {
  const { nombre, email, edad } = req.body;

  if (!nombre || !email || !edad) {
    return res.status(400).json({ error: 'Faltan datos obligatorios: nombre, email, edad' });
  }

  const emailExistente = usuarios.find(u => u.email === email);
  if (emailExistente) {
    return res.status(400).json({ error: 'El email ya está registrado' });
  }

  const nuevoUsuario = {
    id: nextId++,
    nombre,
    email,
    edad: parseInt(edad),
  };

  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});

// 📝 PUT /usuarios/:id - actualizar un usuario
app.put('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const { nombre, email, edad } = req.body;

  if (!nombre || !email || !edad) {
    return res.status(400).json({ error: 'Faltan datos obligatorios: nombre, email, edad' });
  }

  usuario.nombre = nombre;
  usuario.email = email;
  usuario.edad = parseInt(edad);

  res.json(usuario);
});

// ❌ DELETE /usuarios/:id - eliminar un usuario
app.delete('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  usuarios = usuarios.filter(u => u.id !== usuario.id);
  res.json({ mensaje: `Usuario con ID ${usuario.id} eliminado.` });
});

// 🚀 Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor arrancando en http://localhost:${PORT}`);
});
