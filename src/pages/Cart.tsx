import React from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext"; // Contexto del carrito
import { Link } from "react-router-dom";

const Cart: React.FC = () => {
    const { isLoggedIn } = useAuth(); // Estado de autenticación desde el contexto
    const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart(); // Funciones del carrito

    // Calcular el total del carrito con validación de números
    const total = cartItems.reduce((sum, item) => {
        const price = Number(item.price); // Asegurar que el precio sea un número
        const quantity = Number(item.quantity); // Asegurar que la cantidad sea un número
        if (isNaN(price)) {
            console.error(`Precio no válido para el producto: ${item.name}`);
            return sum;
        }
        if (isNaN(quantity)) {
            console.error(`Cantidad no válida para el producto: ${item.name}`);
            return sum;
        }
        return sum + price * quantity;
    }, 0);

    // Si el carrito está vacío, mostrar un mensaje
    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 min-h-screen flex flex-col justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[#6F6134] mb-8">Carrito de Compras</h1>
                    <div className="text-center">
                        <p className="text-[#5A4D2B] text-lg">Tu carrito está vacío.</p>
                        <Link
                            to="/productos"
                            className="mt-4 inline-block bg-[#6F6134] text-white px-6 py-2 rounded-lg hover:bg-[#5A4D2B] transition-colors"
                        >
                            Explorar Productos
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16 min-h-screen flex flex-col justify-between">
            <div>
                <h1 className="text-3xl font-bold text-[#6F6134] mb-8">Carrito de Compras</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Lista de productos en el carrito */}
                    <div className="md:col-span-2">
                        {cartItems.map((item) => {
                            const quantity = Number(item.quantity); // Asegurar que quantity sea un número
                            if (isNaN(quantity)) {
                                console.error(`Cantidad no válida para el producto: ${item.name}`);
                                return null; // Omitir este producto si la cantidad no es válida
                            }

                            return (
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
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => decreaseQuantity(item.id)} // Disminuir cantidad
                                                className="bg-[#E1C68F] text-[#6F6134] px-3 py-1 rounded-full hover:bg-[#D4B57D] transition-colors"
                                            >
                                                -
                                            </button>
                                            <p className="text-[#5A4D2B]">Cantidad: {quantity}</p>
                                            <button
                                                onClick={() => increaseQuantity(item.id)} // Aumentar cantidad
                                                className="bg-[#E1C68F] text-[#6F6134] px-3 py-1 rounded-full hover:bg-[#D4B57D] transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                        onClick={() => removeFromCart(item.id)} // Lógica para eliminar producto
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            );
                        })}

                        {/* Botones debajo de la lista de productos */}
                        <div className="flex justify-between mt-4">
                            <Link
                                to="/productos"
                                className="bg-white border border-[#6F6134] text-[#6F6134] px-6 py-2 rounded-lg hover:bg-[#6F6134] hover:text-white transition-colors"
                            >
                                Seguir Comprando
                            </Link>
                            <button
                                className="bg-white border border-red-500 text-red-500 px-6 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                                onClick={() => {
                                    if (window.confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
                                        clearCart(); // Vacía el carrito
                                    }
                                }}
                            >
                                Vaciar Carrito
                            </button>
                        </div>
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
            </div>
        </div>
    );
};

export default Cart;