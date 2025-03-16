import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa"; // Íconos de usuario y carrito de react-icons
import { useAuth } from "../context/AuthContext"; // Importa el contexto de autenticación
import { toast } from "react-toastify"; // Importa toast para notificaciones
import "react-toastify/dist/ReactToastify.css"; // Importa los estilos de react-toastify

const Header: React.FC = () => {
    const { isLoggedIn } = useAuth(); // Obtén el estado de autenticación
    const navigate = useNavigate(); // Hook para redirigir al usuario

    // Función para manejar el clic en el ícono del carrito
    const handleCartClick = () => {
        if (!isLoggedIn) {
            toast.info("Debes iniciar sesión para ver el carrito."); // Notificación si no está logueado
            navigate("/login"); // Redirige al login
        } else {
            navigate("/cart"); // Redirige al carrito
        }
    };

    return (
        <header className="bg-gradient-to-r from-[#4A3F35] to-[#6F6134] text-white shadow-2xl py-10 sticky top-0 z-50 animate-fade-in">
            <div className="container mx-auto flex justify-between items-center px-8">
                {/* Título */}
                <h1 className="text-4xl font-extrabold text-[#FDFDFD] hover:text-[#F5F5F5] transition-colors transform hover:scale-105">
                    <Link to="/">Natural Glow</Link>
                </h1>

                {/* Menú de navegación */}
                <nav>
                    <ul className="flex space-x-10 text-xl font-semibold">
                        <li>
                            <Link
                                to="/"
                                className="text-[#FDFDFD] hover:text-[#F5F5F5] transition-colors border-b-2 border-transparent hover:border-[#F5F5F5] pb-1"
                            >
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/productos"
                                className="text-[#FDFDFD] hover:text-[#F5F5F5] transition-colors border-b-2 border-transparent hover:border-[#F5F5F5] pb-1"
                            >
                                Productos
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contacto"
                                className="text-[#FDFDFD] hover:text-[#F5F5F5] transition-colors border-b-2 border-transparent hover:border-[#F5F5F5] pb-1"
                            >
                                Contacto
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Íconos de Carrito y Login */}
                <div className="flex items-center space-x-6">
                    {/* Ícono de Carrito */}
                    <button
                        onClick={handleCartClick}
                        className="flex items-center hover:text-[#F5F5F5] transition-colors transform hover:scale-110"
                    >
                        <FaShoppingCart className="w-8 h-8 text-[#FDFDFD] hover:text-[#F5F5F5]" />
                    </button>

                    {/* Ícono de Login */}
                    <Link
                        to="/login"
                        className="flex items-center hover:text-[#F5F5F5] transition-colors transform hover:scale-110"
                    >
                        <FaUserCircle className="w-10 h-10 text-[#FDFDFD] hover:text-[#F5F5F5]" />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;