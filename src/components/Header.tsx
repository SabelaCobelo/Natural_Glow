import React from "react";
import { Link } from "react-router-dom"; // Para redirigir a la página de login

const Header: React.FC = () => {
    return (
        <header className="bg-gradient-to-r from-[#F9E5A4] to-[#F1D0A4] text-gray-800 shadow-md py-6">
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Título */}
                <h1 className="text-4xl font-extrabold text-primary">Natural Glow - cosmética natural</h1>

                {/* Menú de navegación */}
                <nav>
                    <ul className="flex space-x-8 text-lg font-medium">
                        <li>
                            <a href="/" className="hover:text-[#6F6134] transition-colors">Inicio</a>
                        </li>
                        <li>
                            <a href="/productos" className="hover:text-[#6F6134] transition-colors">Productos</a>
                        </li>
                        <li>
                            <a href="/contacto" className="hover:text-[#6F6134] transition-colors">Contacto</a>
                        </li>
                    </ul>
                </nav>

                {/* Icono de Login */}
                <Link to="/login"> {/* Aquí se corrige el path */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 text-primary cursor-pointer hover:text-[#6F6134]"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 17l5-5m0 0l-5-5m5 5H10M21 12H3"
                        />
                    </svg>
                </Link>
            </div>
        </header>
    );
};

export default Header;
