import fs from 'fs/promises';
const path = './data/productos.json';

export async function getProductos(_, res) {
  const data = JSON.parse(await fs.readFile(path));
  res.json(data);
}

export async function getProductoById(req, res) {
  const data = JSON.parse(await fs.readFile(path));
  const item = data.find(p => p.id === +req.params.id);
  if (!item) return res.status(404).json({ error: 'No encontrado' });
  res.json(item);
}

export async function createProducto(req, res) {
  const data = JSON.parse(await fs.readFile(path));
  const nuevo = { id: Date.now(), ...req.body };
  data.push(nuevo);
  await fs.writeFile(path, JSON.stringify(data, null, 2));
  res.status(201).json(nuevo);
}

export async function updateProducto(req, res) {
  const data = JSON.parse(await fs.readFile(path));
  const index = data.findIndex(p => p.id === +req.params.id);
  if (index === -1) return res.status(404).json({ error: 'No encontrado' });
  data[index] = { id: data[index].id, ...req.body };
  await fs.writeFile(path, JSON.stringify(data, null, 2));
  res.json(data[index]);
}

export async function deleteProducto(req, res) {
  let data = JSON.parse(await fs.readFile(path));
  data = data.filter(p => p.id !== +req.params.id);
  await fs.writeFile(path, JSON.stringify(data, null, 2));
  res.json({ mensaje: 'Eliminado' });
}