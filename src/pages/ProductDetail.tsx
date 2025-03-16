import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category?: string;
    stock?: number;
    brand?: string;
    ingredients?: string[];
    benefits?: string[];
}

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { isLoggedIn } = useAuth();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`);
                if (!response.ok) throw new Error("Producto no encontrado");
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

    const handleAddToCart = () => {
        if (!product) return;

        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
        };

        addToCart(cartItem);
        alert(`${product.name} ha sido añadido al carrito.`);
    };

    if (loading) return <div className="text-center py-8">Cargando...</div>;
    if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
    if (!product) return <div className="text-center py-8">Producto no encontrado</div>;

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="w-full">
                    <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-lg" />
                </div>
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold text-[#6F6134]">{product.name}</h1>
                    <p className="text-lg text-[#5A4D2B]">{product.description}</p>
                    <p className="text-2xl font-bold text-[#6F6134]">{product.price.toFixed(2)} €</p>
                    <div className="space-y-2">
                        {product.category && <p><span className="font-semibold">Categoría:</span> {product.category}</p>}
                        {product.stock && <p><span className="font-semibold">Stock:</span> {product.stock}</p>}
                        {product.brand && <p><span className="font-semibold">Marca:</span> {product.brand}</p>}
                        {product.ingredients && <p><span className="font-semibold">Ingredientes:</span> {product.ingredients.join(", ")}</p>}
                        {product.benefits && <p><span className="font-semibold">Beneficios:</span> {product.benefits.join(", ")}</p>}
                    </div>
                    {isLoggedIn ? (
                        <button
                            className="bg-[#6F6134] text-white px-8 py-3 rounded-lg hover:bg-[#5A4D2B] transition-colors"
                            onClick={handleAddToCart}
                        >
                            Añadir al Carrito
                        </button>
                    ) : (
                        <button
                            className="bg-[#E1C68F] text-[#6F6134] px-8 py-3 rounded-lg hover:bg-[#D4B57D] transition-colors"
                            onClick={() => navigate("/login")}
                        >
                            Iniciar Sesión para Comprar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;