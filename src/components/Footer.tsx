import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer>
            <div className="footer-content">
                {/* Sección izquierda: Contenido */}
                <div className="footer-left">
                    <p>📍 Calle Ficticia 123, Ciudad Imaginaria</p>
                    
                    <p>
                        <img src="/public/img/rrss/whatsapp.png" alt="Instagram" className="social-icon" />
                        +34 123 456 789
                    </p>
                    
                </div>

                {/* Sección derecha: Redes Sociales */}
                <div className="footer-right">
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <img src="/public/img/rrss/facebook.png" alt="Facebook" className="social-icon" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <img src="/public/img/rrss/instagram.png" alt="Instagram" className="social-icon" />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                            <img src="/public/img/rrss/youtube.png" alt="Twitter" className="social-icon" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Derechos de autor */}
            <p className="footer-bottom">
                &copy; 2023 Tienda de Cosmética Natural. Todos los derechos reservados.
            </p>
        </footer>
    );
};

export default Footer;