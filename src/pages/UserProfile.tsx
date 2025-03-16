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

const UserProfile: React.FC = () => {
    const { isLoggedIn, user } = useAuth(); // Obtén el estado de autenticación y los datos del usuario
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]); // Estado para almacenar los pedidos

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

    useEffect(() => {
        if (!isLoggedIn) {
            toast.info("Debes iniciar sesión para acceder a esta página.");
            navigate("/login");
        } else {
            fetchOrders(); // Obtén los pedidos del usuario
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