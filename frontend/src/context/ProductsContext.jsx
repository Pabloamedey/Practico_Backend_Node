import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductContext = createContext();
const API_URL = "http://localhost:3000/productos";

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        try {
        const { data } = await axios.get(API_URL);
        setProducts(data);
        } catch (error) {
        alert("Error al obtener productos");
        console.error(error);
        }
    };

    const createProduct = async ({ name, price }) => {
        try {
        const { data } = await axios.post(API_URL, {
            name,
            price: Number(price),
        });
        setProducts((prev) => [...prev, data]);
        } catch (error) {
        alert("Error al crear producto");
        console.error(error);
        }
    };

    const editProduct = async ({ id, name, price }) => {
        try {
        await axios.put(`${API_URL}/${id}`, {
            name,
            price: Number(price),
        });
        setProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, name, price } : p))
        );
        } catch (error) {
        alert("Error al editar producto");
        console.error(error);
        }
    };

    const deleteProduct = async (id) => {
        try {
        await axios.delete(`${API_URL}/${id}`);
        setProducts((prev) => prev.filter((p) => p.id !== id));
        } catch (error) {
        alert("Error al eliminar producto");
        console.error(error);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <ProductContext.Provider
        value={{
            products,
            createProduct,
            editProduct,
            deleteProduct,
            getAllProducts,
        }}
        >
        {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
