import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-r from-[#4A3F35] to-[#6F6134] text-[#FAE7C9] py-8 shadow-lg">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Sección izquierda: Contenido */}
                    <div className="text-center md:text-left">
                        <p className="text-lg mb-2">📍 Calle Ficticia 123, Ciudad Imaginaria</p>
                        <p className="flex items-center justify-center md:justify-start gap-2">
                            <FaWhatsapp className="w-6 h-6 text-[#25D366]" />
                            +34 123 456 789
                        </p>
                    </div>

                    {/* Sección derecha: Redes Sociales */}
                    <div className="text-center md:text-right">
                        <div className="flex justify-center md:justify-end gap-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="hover:opacity-80 transition-opacity"
                            >
                                <FaFacebook className="w-8 h-8 text-[#1877F2]" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="hover:opacity-80 transition-opacity"
                            >
                                <FaInstagram className="w-8 h-8 text-[#E4405F]" />
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="YouTube"
                                className="hover:opacity-80 transition-opacity"
                            >
                                <FaYoutube className="w-8 h-8 text-[#FF0000]" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Derechos de autor */}
                <div className="border-t border-[#E1C68F] mt-8 pt-6 text-center">
                    <p className="text-sm">
                        &copy; 2025  Natural Glow - Tienda de Cosmética Natural. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;