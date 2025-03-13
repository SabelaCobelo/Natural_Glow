import React from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext"; // Contexto del carrito
import { Link } from "react-router-dom";

const Cart: React.FC = () => {
    const { isLoggedIn } = useAuth(); // Estado de autenticación desde el contexto
    const { cartItems, removeFromCart, clearCart } = useCart(); // Funciones del carrito

    // Calcular el total del carrito
    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold text-[#6F6134] mb-8">Carrito de Compras</h1>

            {/* Mostrar mensaje si el carrito está vacío */}
            {cartItems.length === 0 ? (
                <div className="text-center">
                    <p className="text-[#5A4D2B] text-lg">Tu carrito está vacío.</p>
                    <Link
                        to="/productos"
                        className="mt-4 inline-block bg-[#6F6134] text-white px-6 py-2 rounded-lg hover:bg-[#5A4D2B] transition-colors"
                    >
                        Explorar Productos
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Lista de productos en el carrito */}
                    <div className="md:col-span-2">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white p-6 rounded-lg shadow-md mb-4 flex items-center"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover rounded-lg mr-6"
                                />
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold text-[#6F6134]">
                                        {item.name}
                                    </h2>
                                    <p className="text-[#5A4D2B]">Precio: ${item.price.toFixed(2)}</p>
                                    <p className="text-[#5A4D2B]">Cantidad: {item.quantity}</p>
                                </div>
                                <button
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                    onClick={() => removeFromCart(item.id)} // Lógica para eliminar producto
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Resumen del pedido */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-[#6F6134] mb-4">
                            Resumen del Pedido
                        </h2>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <p className="text-[#5A4D2B]">Subtotal</p>
                                <p className="text-[#6F6134] font-semibold">${total.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-[#5A4D2B]">Envío</p>
                                <p className="text-[#6F6134] font-semibold">Gratis</p>
                            </div>
                            <div className="flex justify-between border-t pt-4">
                                <p className="text-[#5A4D2B] font-semibold">Total</p>
                                <p className="text-[#6F6134] font-bold">${total.toFixed(2)}</p>
                            </div>
                            <button
                                className="w-full bg-[#6F6134] text-white px-6 py-2 rounded-lg hover:bg-[#5A4D2B] transition-colors"
                                onClick={() => {
                                    console.log("Proceder al pago");
                                    clearCart(); // Vacía el carrito después del pago
                                }}
                            >
                                Proceder al Pago
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;