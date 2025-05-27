import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useProducts } from "../context/ProductsContext";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import { toast } from "react-toastify";

const ProductsView = () => {
  const navigate = useNavigate();
  const { products, deleteProduct, getAllProducts } = useProducts();

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro de eliminar este producto?");
    if (confirm) {
      await deleteProduct(id);
      toast.info("Producto eliminado");
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(167, 139, 250);
    doc.text("Listado de productos", 105, 20, { align: "center" });

    const tableData = products.map((p) => [p.name, p.price]);

    autoTable(doc, {
      startY: 30,
      head: [["Nombre", "Precio"]],
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
    });

    doc.save("productos.pdf");
  };

  return (
    <div className="section fade-in">
      <h2>Gestión de Productos</h2>
      <div className="mb-4 flex gap-2">
        <Button label="Crear Producto" icon="pi pi-plus" onClick={() => navigate("/productos/crear")} />
        <Button label="Exportar PDF" icon="pi pi-file-pdf" onClick={exportPDF} severity="info" />
      </div>
      <DataTable value={products} paginator rows={5} emptyMessage="No hay productos.">
        <Column field="name" header="Nombre" />
        <Column field="price" header="Precio" />
        <Column
          header="Acciones"
          body={(rowData) => (
            <div className="flex gap-2">
              <Button icon="pi pi-pencil" className="p-button-warning p-button-sm" onClick={() => navigate(`/productos/editar/${rowData.id}`)} />
              <Button icon="pi pi-trash" className="p-button-danger p-button-sm" onClick={() => handleDelete(rowData.id)} />
            </div>
          )}
        />
      </DataTable>
    </div>
  );
};

export default ProductsView;
