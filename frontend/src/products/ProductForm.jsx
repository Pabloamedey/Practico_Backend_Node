import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { InputNumber } from "primereact/inputnumber";
import { toast } from "react-toastify";

const ProductForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { createProduct, editProduct, products } = useProducts();

  const [product, setProduct] = useState({ name: "", price: 0 });

  const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.id) {
      await editProduct({ ...product, id: parseInt(params.id) });
      toast.success("Producto actualizado correctamente");
    } else {
      await createProduct(product);
      toast.success("Producto creado correctamente");
    }
    navigate("/productos");
  };

  useEffect(() => {
    if (params.id) {
      const existing = products.find((p) => p.id === parseInt(params.id));
      if (existing) setProduct(existing);
    }
  }, [params.id, products]);

  return (
    <div className="section fade-in">
      <h1>{params.id ? "Editar Producto" : "Crear Producto"}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre</label>
        <input id="name" name="name" value={product.name} onChange={handleChange} required />

        <label>Precio</label>
        <InputNumber id="price" name="price" value={product.price} onValueChange={(e) => setProduct({ ...product, price: e.value })} />

        <button type="submit">{params.id ? "Guardar Cambios" : "Crear"}</button>
      </form>
    </div>
  );
};

export default ProductForm;
