import { useState, useEffect } from "react";
import UsersView from "./UsersView";

const API_URL = "https://crudcrud.com/api/88692d7ba89d4008b5f44ad1751eb499/unicorns";

const UsersContainer = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        handleGetUsers();
    }, []);

    const handleGetUsers = () => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => {
                console.error("Error al obtener usuarios", error);
                alert("Error al obtener los usuarios.");
            });
    };

    const handleAddUser = ({ name, color, age, power }) => {
        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                data: {
                    color,
                    age: Number(age),
                    power,
                },
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setUsers([...users, data]);
            })
            .catch((error) => {
                console.error("Error al añadir el usuario", error);
                alert("Error al añadir el usuario.");
            });
    };

    const handleEditUser = ({ id, name, color, age, power }) => {
        fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                data: {
                    color,
                    age: Number(age),
                    power,
                },
            }),
        })
            .then(() => {
                const updated = users.map((us) =>
                    us._id === id
                        ? { ...us, name, data: { color, age, power } }
                        : us
                );
                setUsers(updated);
            })
            .catch((error) => {
                console.error("Error al editar el usuario", error);
                alert("Error al editar el usuario.");
            });
    };

    const handleDeleteUser = (id) => {
        fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                setUsers(users.filter((us) => us._id !== id));
            })
            .catch((error) => {
                console.error("Error al eliminar el usuario", error);
                alert("Error al eliminar el usuario.");
            });
    };

    return (
        <UsersView
            Users={users}
            handleAddUser={handleAddUser}
            handleEditUser={handleEditUser}
            handleDeleteUser={handleDeleteUser}
            handleGetUsers={handleGetUsers}
        />
    );
};

export default UsersContainer;
