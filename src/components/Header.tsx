import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header: React.FC = () => {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleCartClick = () => {
        if (!isLoggedIn) {
            toast.info("Debes iniciar sesión para ver el carrito.");
            navigate("/login");
        } else {
            navigate("/cart");
        }
    };

    const handleProfileClick = () => {
        if (!isLoggedIn) {
            toast.info("Debes iniciar sesión para acceder a tu perfil.");
            navigate("/login");
        } else {
            navigate("/user-profile");
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-gradient-to-r from-[#4A3F35] to-[#6F6134] text-white shadow-2xl py-4 sticky top-0 z-50 animate-fade-in">
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Título y Menú */}
                <h1 className="text-3xl font-extrabold text-[#FDFDFD] hover:text-[#F5F5F5] transition-colors transform hover:scale-105">
                    <Link to="/">Natural Glow</Link>
                </h1>

                {/* Ícono de menú para pantallas pequeñas */}
                <button onClick={toggleMenu} className="lg:hidden text-2xl">
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Menú de navegación */}
                <nav className={`${isMenuOpen ? "block" : "hidden"} lg:block`}>
                    <ul className="flex flex-col lg:flex-row lg:space-x-10 text-xl font-semibold">
                        <li>
                            <Link to="/" className="block py-2 text-[#FDFDFD] hover:text-[#F5F5F5] transition-colors border-b-2 border-transparent hover:border-[#F5F5F5]">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link to="/productos" className="block py-2 text-[#FDFDFD] hover:text-[#F5F5F5] transition-colors border-b-2 border-transparent hover:border-[#F5F5F5]">
                                Productos
                            </Link>
                        </li>
                        <li>
                            <Link to="/contacto" className="block py-2 text-[#FDFDFD] hover:text-[#F5F5F5] transition-colors border-b-2 border-transparent hover:border-[#F5F5F5]">
                                Contacto
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Íconos de Carrito y Perfil */}
                <div className="hidden lg:flex items-center space-x-6">
                    <button onClick={handleCartClick} className="flex items-center hover:text-[#F5F5F5] transition-colors transform hover:scale-110">
                        <FaShoppingCart className="w-8 h-8 text-[#FDFDFD] hover:text-[#F5F5F5]" />
                    </button>
                    <button onClick={handleProfileClick} className="flex items-center hover:text-[#F5F5F5] transition-colors transform hover:scale-110">
                        <FaUserCircle className="w-10 h-10 text-[#FDFDFD] hover:text-[#F5F5F5]" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;