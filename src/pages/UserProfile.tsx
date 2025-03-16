import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ref, onValue, remove } from "firebase/database";
import { db } from "../../firebase";

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
    const { isLoggedIn, user, logout } = useAuth(); // Asegúrate de que logout esté en tu contexto
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [savedProducts, setSavedProducts] = useState<SavedProduct[]>([]);

    // Obtener los productos guardados del usuario desde Firebase
    const fetchSavedProducts = async () => {
        if (!user) return; // Verifica que el usuario esté autenticado
        try {
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
                    setSavedProducts([]); // Si no hay datos, establece un arreglo vacío
                }
            });
        } catch (error) {
            console.error("Error al obtener los productos guardados:", error);
            toast.error("Error al obtener los productos guardados.");
        }
    };

    // Eliminar un producto guardado de Firebase
    const removeSavedProduct = async (productId: string) => {
        if (!user) return; // Verifica que el usuario esté autenticado
        try {
            const productRef = ref(db, `users/${user.uid}/savedProducts/${productId}`);
            await remove(productRef); // Elimina el producto
            setSavedProducts((prev) => prev.filter((product) => product.id !== productId)); // Actualiza el estado local
            toast.success("Producto eliminado de guardados.");
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            toast.error("Error al eliminar el producto.");
        }
    };

    // Simulación de datos de pedidos (deberías obtenerlos de tu backend)
    const fetchOrders = async () => {
        try {
            // Aquí harías una llamada a tu API para obtener los pedidos del usuario
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
                {
                    id: "67890",
                    date: "2023-09-15",
                    total: 45.98,
                    items: [
                        { name: "Aceite Corporal", quantity: 1, price: 22.99 },
                        { name: "Crema Facial Hidratante", quantity: 1, price: 25.99 },
                    ],
                },
            ];
            setOrders(mockOrders);
        } catch (error) {
            console.error("Error al obtener los pedidos:", error);
            toast.error("Error al obtener los pedidos.");
        }
    };

    // Función para manejar el logout
    const handleLogout = async () => {
        try {
            await logout(); // Llama a la función de logout del contexto
            toast.success("Sesión cerrada correctamente.");
            navigate("/login"); // Redirige al usuario a la página de login
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            toast.error("Error al cerrar sesión.");
        }
    };

    useEffect(() => {
        if (!isLoggedIn) {
            toast.info("Debes iniciar sesión para acceder a esta página.");
            navigate("/login");
        } else {
            fetchOrders(); // Obtén los pedidos del usuario
            fetchSavedProducts(); // Obtén los productos guardados del usuario
        }
    }, [isLoggedIn, navigate, user]);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Botón de Logout */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                    Cerrar Sesión
                </button>
            </div>

            <h1 className="text-3xl font-bold text-[#6F6134] mb-8">Mi Perfil</h1>

            {/* Sección de Información del Usuario */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold text-[#6F6134] mb-4">Información del Usuario</h2>
                <p className="text-[#5A4D2B]">
                    <strong>Nombre:</strong> {user?.displayName || "Usuario"}
                </p>
                <p className="text-[#5A4D2B]">
                    <strong>Email:</strong> {user?.email || "usuario@example.com"}
                </p>
            </div>

            {/* Sección de Productos Guardados */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold text-[#6F6134] mb-4">Productos Guardados</h2>
                {savedProducts.length === 0 ? (
                    <p className="text-[#5A4D2B]">No tienes productos guardados.</p>
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

                                {/* Botones debajo del precio */}
                                <div className="flex justify-between">
                                    {/* Botón para añadir al carrito */}
                                    <button
                                        className="text-green-500 hover:text-green-700 transition-colors"
                                        onClick={() => addToCart(product)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                    </button>

                                    {/* Botón para eliminar el producto */}
                                    <button
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                        onClick={() => removeSavedProduct(product.id)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Sección de Pedidos Recientes */}
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
                                <div className="mt-2">
                                    <h3 className="text-lg font-semibold text-[#6F6134]">Productos:</h3>
                                    <ul className="list-disc list-inside">
                                        {order.items.map((item, index) => (
                                            <li key={index} className="text-[#5A4D2B]">
                                                {item.name} - {item.quantity} x ${item.price.toFixed(2)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;