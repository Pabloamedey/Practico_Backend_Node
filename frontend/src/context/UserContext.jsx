import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();
const API_URL = "http://localhost:3000/usuarios";

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setUsers(data);
    } catch (error) {
      alert("Error al obtener usuarios");
      console.error(error);
    }
  };

  const createUser = async ({ nombre, email, edad }) => {
    try {
      const { data } = await axios.post(API_URL, {
        nombre,
        email,
        edad: Number(edad),
      });
      setUsers((prev) => [...prev, data]);
    } catch (error) {
      alert("Error al crear usuario");
      console.error(error);
    }
  };

  const editUser = async ({ id, nombre, email, edad }) => {
    try {
      await axios.put(`${API_URL}/${id}`, {
        nombre,
        email,
        edad: Number(edad),
      });
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, nombre, email, edad } : u))
      );
    } catch (error) {
      alert("Error al editar usuario");
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      alert("Error al eliminar usuario");
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{ users, createUser, editUser, deleteUser, getUsers }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);
