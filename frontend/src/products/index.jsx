import { Routes, Route } from "react-router-dom";
import ProductsView from "./ProductsView";
import ProductForm from "./ProductForm";

function ProductsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductsView />} />
      <Route path="/crear" element={<ProductForm />} />
      <Route path="/editar/:id" element={<ProductForm />} />
    </Routes>
  );
}

export default ProductsRoutes;
