import fs from 'fs/promises';

const path = './data/usuarios.json';

// Obtener todos los usuarios
export async function getUsuarios(req, res) {
  try {
    const data = await fs.readFile(path, 'utf-8');
    const usuarios = JSON.parse(data);
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
}

// Obtener un usuario por ID
export async function getUsuarioById(req, res) {
  try {
    const data = await fs.readFile(path, 'utf-8');
    const usuarios = JSON.parse(data);
    const usuario = usuarios.find(u => u.id === +req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar el usuario', error: error.message });
  }
}

// Crear un nuevo usuario
export async function createUsuario(req, res) {
  try {
    const data = await fs.readFile(path, 'utf-8');
    const usuarios = JSON.parse(data);
    const nuevo = { id: Date.now(), ...req.body };
    usuarios.push(nuevo);
    await fs.writeFile(path, JSON.stringify(usuarios, null, 2));
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear usuario', error: error.message });
  }
}

// Actualizar un usuario
export async function updateUsuario(req, res) {
  try {
    const data = await fs.readFile(path, 'utf-8');
    const usuarios = JSON.parse(data);
    const index = usuarios.findIndex(u => u.id === +req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Usuario no encontrado' });
    usuarios[index] = { id: usuarios[index].id, ...req.body };
    await fs.writeFile(path, JSON.stringify(usuarios, null, 2));
    res.json(usuarios[index]);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
  }
}

// Eliminar un usuario
export async function deleteUsuario(req, res) {
  try {
    const data = await fs.readFile(path, 'utf-8');
    let usuarios = JSON.parse(data);
    usuarios = usuarios.filter(u => u.id !== +req.params.id);
    await fs.writeFile(path, JSON.stringify(usuarios, null, 2));
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
  }
}
