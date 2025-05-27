import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUsers } from "../context/UserContext";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import { toast } from "react-toastify";

const UsersView = () => {
  const navigate = useNavigate();
  const { users, deleteUser, getUsers } = useUsers();

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro de eliminar este usuario?");
    if (confirm) {
      await deleteUser(id);
      toast.info("Usuario eliminado");
    }
  };

  const handleEdit = (id) => {
    navigate(`/usuarios/editar/${id}`);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(167, 139, 250);
    doc.text("Listado de usuarios", 105, 20, { align: "center" });

    const tableData = users.map((u) => [u.nombre || "-", u.email || "-", u.edad || "-"]);

    autoTable(doc, {
      startY: 30,
      head: [["Nombre", "Email", "Edad"]],
      body: tableData,
      theme: "grid",
      headStyles: {
        fillColor: [244, 114, 182],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        halign: "center",
      },
      bodyStyles: {
        fillColor: [42, 42, 64],
        textColor: [255, 255, 255],
        halign: "center",
      },
      alternateRowStyles: {
        fillColor: [58, 58, 90],
      },
      styles: {
        fontSize: 10,
      },
    });

    const fecha = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.setTextColor(156, 163, 175);
    doc.text(`Generado el ${fecha}`, 14, doc.internal.pageSize.height - 20);
    doc.text("Hecho por Pablo Aldo Amedey Dilena — 2025", 14, doc.internal.pageSize.height - 14);

    doc.save("usuarios.pdf");
  };

  return (
    <div className="section fade-in">
      <h2>Gestión de usuarios</h2>

      <div className="mb-4 flex gap-2">
        <Button label="Crear usuario" icon="pi pi-plus" onClick={() => navigate("/usuarios/crear")} />
        <Button label="Exportar PDF" icon="pi pi-file-pdf" severity="info" onClick={handleExportPDF} />
      </div>

      <DataTable value={users} paginator rows={5} responsiveLayout="scroll" emptyMessage="No hay usuarios aún.">
        <Column field="nombre" header="Nombre" />
        <Column field="email" header="Email" />
        <Column field="edad" header="Edad" />
        <Column
          header="Acciones"
          body={(rowData) => (
            <div className="flex gap-2">
              <Button icon="pi pi-pencil" className="p-button-warning p-button-sm" onClick={() => handleEdit(rowData.id)} />
              <Button icon="pi pi-trash" className="p-button-danger p-button-sm" onClick={() => handleDelete(rowData.id)} />
            </div>
          )}
        />
      </DataTable>
    </div>
  );
};

export default UsersView;
