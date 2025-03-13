import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

// Define el tipo de datos del producto (ajusta según tu base de datos)
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Obtén el ID del producto desde la URL
    const { isLoggedIn } = useAuth(); // Estado de autenticación desde el contexto
    const { addToCart } = useCart(); // Función para añadir productos al carrito

    const [product, setProduct] = useState<Product | null>(null); // Estado para almacenar los detalles del producto
    const [loading, setLoading] = useState<boolean>(true); // Estado para manejar la carga
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores

    // Obtén los detalles del producto desde la API
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`); // Ajusta la URL de la API
                if (!response.ok) {
                    throw new Error("Producto no encontrado");
                }
                const data: Product = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error al cargar el producto");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    // Función para manejar la adición al carrito
    const handleAddToCart = () => {
        if (!product) return;

        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1, // Cantidad inicial
            image: product.image,
        };

        addToCart(cartItem); // Añade el producto al carrito
        console.log("Producto añadido al carrito:", product.name);
        alert(`${product.name} ha sido añadido al carrito.`); // Mensaje de confirmación
    };

    // Muestra un mensaje de carga mientras se obtienen los datos
    if (loading) {
        return <div className="text-center py-8">Cargando...</div>;
    }

    // Muestra un mensaje de error si algo falla
    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>;
    }

    // Si no hay producto, muestra un mensaje
    if (!product) {
        return <div className="text-center py-8">Producto no encontrado</div>;
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Imagen del producto */}
                <div className="w-full">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto rounded-lg shadow-lg"
                    />
                </div>

                {/* Detalles del producto */}
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold text-[#6F6134]">{product.name}</h1>
                    <p className="text-lg text-[#5A4D2B]">{product.description}</p>
                    <p className="text-2xl font-bold text-[#6F6134]">${product.price.toFixed(2)}</p>

                    {/* Campos adicionales del producto */}
                    <div className="space-y-2">
                        <p>
                            <span className="font-semibold">Categoría:</span> {product.category}
                        </p>
                        <p>
                            <span className="font-semibold">Stock:</span> {product.stock}
                        </p>
                        {product.brand && (
                            <p>
                                <span className="font-semibold">Marca:</span> {product.brand}
                            </p>
                        )}
                    </div>

                    {/* Mostrar opción de iniciar sesión o añadir al carrito */}
                    {isLoggedIn ? (
                        <button
                            className="bg-[#6F6134] text-white px-8 py-3 rounded-lg hover:bg-[#5A4D2B] transition-colors"
                            onClick={handleAddToCart}
                        >
                            Añadir al Carrito
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-[#E1C68F] text-[#6F6134] px-8 py-3 rounded-lg hover:bg-[#D4B57D] transition-colors"
                        >
                            Iniciar Sesión para Comprar
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;