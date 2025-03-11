import React from "react";

const Header: React.FC = () => {
    return (
    <header>
        <h1>Tienda de Cosmética Natural</h1>
        <nav>
        <ul>
            <li>
            <a href="/">Inicio</a>
            </li>
            <li>
            <a href="/productos">Productos</a>
            </li>
            <li>
            <a href="/contacto">Contacto</a>
            </li>
        </ul>
        </nav>
    </header>
    );
};

export default Header;
