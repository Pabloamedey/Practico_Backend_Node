import { Routes, Route } from "react-router-dom";
import UserForm from "./UserForm";
import UsersView from "./UsersView";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersView />} />
      <Route path="crear" element={<UserForm />} />
      <Route path="editar/:id" element={<UserForm />} />
    </Routes>
  );
};

export default UserRoutes;
