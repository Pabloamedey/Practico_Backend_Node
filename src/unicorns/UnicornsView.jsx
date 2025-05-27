import { useNavigate } from "react-router-dom";
import { useUnicorns } from "../context/UnicornContext";
import { useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const UnicornsView = () => {
  const navigate = useNavigate();
  const { unicorns, deleteUnicorn } = useUnicorns();
  const [selectedUnicorn, setSelectedUnicorn] = useState(null);

  const handleEdit = () => {
    if (!selectedUnicorn) return alert("Selecciona un unicornio");
    navigate(`/unicornios/editar/${selectedUnicorn._id}`);
  };

  const handleDelete = () => {
    if (!selectedUnicorn) return alert("Selecciona un unicornio");
    const confirm = window.confirm("¿Estás seguro de eliminar este unicornio?");
    if (confirm) {
      deleteUnicorn(selectedUnicorn._id);
      setSelectedUnicorn(null);
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
  
    // Título
    doc.setFontSize(18);
    doc.setTextColor(167, 139, 250); // lila
    doc.text("Gestión de Unicornios", 105, 20, { align: "center" });
  
    // Tabla
    const tableData = unicorns.map((u) => [
      u.name,
      u.data?.color || "-",
      u.data?.age || "-",
      u.data?.power || "-",
      u.data?.status || "-",
    ]);
  
    autoTable(doc, {
      startY: 30,
      head: [["Nombre", "Color", "Edad", "Poder", "Estado"]],
      body: tableData,
      theme: "grid",
      headStyles: {
        fillColor: [244, 114, 182], // rosa
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
      margin: { top: 30 },
      styles: {
        fontSize: 10,
        font: "helvetica",
      },
    });
  
    // Fecha y autor al final
    const fecha = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.setTextColor(156, 163, 175); // gris suave
    doc.text(`Generado el ${fecha}`, 14, doc.internal.pageSize.height - 20);
    doc.text("Hecho por Pablo Aldo Amedey Dilena — 2025", 14, doc.internal.pageSize.height - 14);
  
    doc.save("unicornios.pdf");
  };
    

  return (
    <div className="section fade-in">
      <h2>Gestión de Unicornios</h2>

      <div className="mb-4 flex gap-2">
        <Button label="Crear Unicornio" icon="pi pi-plus" onClick={() => navigate("/unicornios/crear")} />
        <Button label="Editar" icon="pi pi-pencil" severity="warning" onClick={handleEdit} disabled={!selectedUnicorn} />
        <Button label="Eliminar" icon="pi pi-trash" severity="danger" onClick={handleDelete} disabled={!selectedUnicorn} />
        <Button label="Exportar PDF" icon="pi pi-file-pdf" severity="info" onClick={handleExportPDF}/>
      </div>

      <DataTable
        value={unicorns}
        selectionMode="single"
        dataKey="_id"
        selection={selectedUnicorn}
        onSelectionChange={(e) => setSelectedUnicorn(e.value)}
        paginator
        rows={5}
        responsiveLayout="scroll"
        emptyMessage="No hay unicornios aún."
      >
        <Column field="name" header="Nombre" />
        <Column field="data.color" header="Color" />
        <Column field="data.age" header="Edad" />
        <Column field="data.power" header="Poder" />
        <Column
          header="Estado"
          body={(rowData) => {
            const estado = rowData.data?.status || "Desconocido";
            const clase =
              estado === "Activo"
                ? "estado-activo"
                : estado === "Inactivo"
                ? "estado-inactivo"
                : estado === "En misión"
                ? "estado-en-mision"
                : "estado-herido";
            return <span className={clase}>{estado}</span>;
          }}
        />
      </DataTable>
    </div>
  );
};

export default UnicornsView;
