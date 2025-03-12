import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Ícono de usuario de react-icons

const Header: React.FC = () => {
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

                {/* Ícono de Login */}
                <Link
                    to="/login"
                    className="flex items-center space-x-2 hover:text-[#F5F5F5] transition-colors transform hover:scale-110"
                >
                    <FaUserCircle className="w-10 h-10 text-[#FDFDFD] hover:text-[#F5F5F5]" />
                </Link>
            </div>
        </header>
    );
};

export default Header;