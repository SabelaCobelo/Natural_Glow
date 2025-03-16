import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Order {
    id: string;
    date: string;
    total: number;
    items: { name: string; quantity: number; price: number }[];
}

interface SavedProduct {
    id: string;
    name: string;
    price: number;
    image: string;
}

const UserProfile: React.FC = () => {
    const { isLoggedIn, user } = useAuth(); // Obtén el estado de autenticación y los datos del usuario
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]); // Estado para almacenar los pedidos
    const [savedProducts, setSavedProducts] = useState<SavedProduct[]>([]); // Estado para productos guardados

    // Simulación de datos de pedidos (deberías obtenerlos de tu backend)
    const fetchOrders = async () => {
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
    };

    // Simulación de datos de productos guardados (deberías obtenerlos de tu backend)
    const fetchSavedProducts = async () => {
        // Aquí harías una llamada a tu API para obtener los productos guardados del usuario
        const mockSavedProducts: SavedProduct[] = [
            {
                id: "1",
                name: "Crema Facial Hidratante",
                price: 25.99,
                image: "/img/productshome/cream.jpg",
            },
            {
                id: "2",
                name: "Shampoo Natural",
                price: 18.99,
                image: "/img/productshome/shampoo.jpg",
            },
            {
                id: "3",
                name: "Aceite Corporal",
                price: 22.99,
                image: "/img/productshome/oil.jpg",
            },
        ];
        setSavedProducts(mockSavedProducts);
    };

    // Función para eliminar un producto guardado
    const removeSavedProduct = (productId: string) => {
        setSavedProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
        );
        toast.success("Producto eliminado de guardados.");
    };

    useEffect(() => {
        if (!isLoggedIn) {
            toast.info("Debes iniciar sesión para acceder a esta página.");
            navigate("/login");
        } else {
            fetchOrders(); // Obtén los pedidos del usuario
            fetchSavedProducts(); // Obtén los productos guardados del usuario
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-[#6F6134] mb-8">Mi Perfil</h1>

            {/* Sección de Información del Usuario */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold text-[#6F6134] mb-4">Información del Usuario</h2>
                <p className="text-[#5A4D2B]">
                    <strong>Nombre:</strong> {user?.name || "Usuario"}
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
                            <div key={product.id} className="bg-[#F4E9D6] p-4 rounded-lg shadow-md relative">
                                {/* Botón para eliminar el producto */}
                                <button
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
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
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-32 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-xl font-semibold text-[#6F6134]">{product.name}</h3>
                                <p className="text-[#5A4D2B]">Precio: ${product.price.toFixed(2)}</p>
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