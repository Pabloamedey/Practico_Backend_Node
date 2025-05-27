import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUsers } from "../context/UserContext";
import { toast } from "react-toastify";

function UserForm() {
  const navigate = useNavigate();
  const params = useParams();
  const { createUser, editUser, users } = useUsers();

  const [user, setUser] = useState({ nombre: "", email: "", edad: "" });

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (params.id) {
      editUser({ ...user, id: parseInt(params.id) });
      toast.success("Usuario actualizado correctamente");
    } else {
      createUser(user);
      toast.success("Usuario creado correctamente");
    }
    navigate("/usuarios");
  };

  useEffect(() => {
    if (params.id) {
      const userEdit = users.find((u) => u.id === parseInt(params.id));
      if (userEdit) setUser(userEdit);
    }
  }, [params.id, users]);

  return (
    <div className="section fade-in">
      <h1>{params.id ? "Editar Usuario" : "Crear Usuario"}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" name="nombre" value={user.nombre} onChange={handleChange} required />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={user.email} onChange={handleChange} required />
        <label htmlFor="edad">Edad</label>
        <input id="edad" name="edad" type="number" value={user.edad} onChange={handleChange} required />
        <button type="submit">{params.id ? "Guardar Cambios" : "Crear"}</button>
      </form>
    </div>
  );
}

export default UserForm;
