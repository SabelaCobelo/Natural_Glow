import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ref, onValue, remove } from "firebase/database";
import { db } from "../../firebase";
import { FaTrash, FaCartPlus } from "react-icons/fa"; // Iconos para eliminar y agregar al carrito

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
}

interface Order {
    id: string;
    date: string;
    total: number;
    items: { name: string; quantity: number; price: number }[];
}

interface SavedProduct {
    id: string;
    category: string;
    description: string;
    image: string;
    name: string;
    price: number;
}

const UserProfile: React.FC = () => {
    const { isLoggedIn, user, logout } = useAuth();
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [savedProducts, setSavedProducts] = useState<SavedProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Obtener los productos guardados del usuario desde Firebase (solo si está autenticado)
    useEffect(() => {
        if (user) {
            const savedProductsRef = ref(db, `users/${user.uid}/savedProducts`);
            onValue(savedProductsRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const savedProducts = Object.keys(data).map((key) => ({
                        id: key,
                        ...data[key],
                    }));
                    setSavedProducts(savedProducts);
                } else {
                    setSavedProducts([]);
                }
                setIsLoading(false);
            });
        }
    }, [user]);

    // Simulación de datos de pedidos (solo si está autenticado)
    useEffect(() => {
        if (user) {
            const mockOrders: Order[] = [
                {
                    id: "12345",
                    date: "2023-10-01",
                    total: 75.99,
                    items: [
                        { name: "Crema Facial Hidratante", quantity: 2, price: 25.99 },
                        { name: "Shampoo Natural", quantity: 1, price: 18.99 },
                    ],
                },
            ];
            setOrders(mockOrders);
        }
    }, [user]);

    // Función para eliminar un producto de favoritos
    const handleRemoveFromFavorites = async (productId: string) => {
        if (user) {
            try {
                const productRef = ref(db, `users/${user.uid}/savedProducts/${productId}`);
                await remove(productRef);
                toast.success("Producto eliminado de favoritos.");
            } catch (error) {
                console.error("Error al eliminar el producto de favoritos:", error);
                toast.error("Error al eliminar el producto de favoritos.");
            }
        }
    };

    // Función para mover un producto al carrito
    const handleAddToCart = (product: SavedProduct) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1, // Cantidad por defecto
        });
        toast.success("Producto agregado al carrito.");
    };

    // Función para manejar el logout
    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Sesión cerrada correctamente.");
            navigate("/login");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            toast.error("Error al cerrar sesión.");
        }
    };

    if (isLoading) {
        return <div className="text-center py-8">Cargando...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Botón de Logout (solo si está autenticado) */}
            {isLoggedIn && (
                <div className="flex justify-end mb-4">
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            )}

            <h1 className="text-3xl font-bold text-[#6F6134] mb-8">Mi Perfil</h1>

            {/* Sección de Información del Usuario (solo si está autenticado) */}
            {isLoggedIn && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold text-[#6F6134] mb-4">Información del Usuario</h2>
                    <p className="text-[#5A4D2B]">
                        <strong>Nombre:</strong> {user?.displayName || "Usuario"}
                    </p>
                    <p className="text-[#5A4D2B]">
                        <strong>Email:</strong> {user?.email || "usuario@example.com"}
                    </p>
                </div>
            )}

            {/* Sección de Mis Favoritos (solo si está autenticado) */}
            {isLoggedIn && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-2xl font-semibold text-[#6F6134] mb-4">Mis Favoritos</h2>
                    {savedProducts.length === 0 ? (
                        <p className="text-[#5A4D2B]">No tienes productos favoritos.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {savedProducts.map((product) => (
                                <div key={product.id} className="bg-[#F4E9D6] p-4 rounded-lg shadow-md">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-32 object-cover rounded-lg mb-4"
                                    />
                                    <h3 className="text-xl font-semibold text-[#6F6134]">{product.name}</h3>
                                    <p className="text-[#5A4D2B]">{product.description}</p>
                                    <p className="text-[#6F6134] font-bold mb-4">${product.price.toFixed(2)}</p>
                                    {/* Botones para eliminar de favoritos y agregar al carrito */}
                                    <div className="flex justify-between">
                                        <button
                                            onClick={() => handleRemoveFromFavorites(product.id)}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                            title="Eliminar de favoritos"
                                        >
                                            <FaTrash size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="text-green-500 hover:text-green-700 transition-colors"
                                            title="Agregar al carrito"
                                        >
                                            <FaCartPlus size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Sección de Pedidos Recientes (solo si está autenticado) */}
            {isLoggedIn && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-[#6F6134] mb-4">Pedidos Recientes</h2>
                    {orders.length === 0 ? (
                        <p className="text-[#5A4D2B]">No hay pedidos recientes.</p>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div key={order.id} className="border-b border-[#E1C68F] pb-4">
                                    <p className="text-[#5A4D2B]">
                                        <strong>Fecha:</strong> {order.date}
                                    </p>
                                    <p className="text-[#5A4D2B]">
                                        <strong>Total:</strong> ${order.total.toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserProfile;