import React from "react";
import Carousel from "../components/Carousel";

const images = [
    "/img/Natural_Glow_Models/model1.jpg",
    "/img/Natural_Glow_Models/model2.jpg",
    "/img/Natural_Glow_Models/model4.jpg",
    "/img/Natural_Glow_Models/model6.jpg",
    "/img/Natural_Glow_Models/model8.jpg",
];

const Home: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Sección principal dividida en dos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Izquierda: Texto de presentación */}
                <div>
                    <h1 className="text-4xl font-bold text-primary">Natural Glow</h1>
                    <p className="mt-4 text-lg text-secondary">
                    En Natural Glow, creemos que la belleza comienza desde adentro y se refleja en el cuidado que damos a nuestro cuerpo y al planeta. Somos una marca comprometida con ofrecer productos de cosmética natural, ecológica y cruelty-free que cuidan tu piel y el entorno que nos rodea.
                    Nuestra misión es transformar tu rutina de belleza con ingredientes naturales de la más alta calidad, respetuosos con tu piel y con el medio ambiente. No creemos en soluciones temporales, sino en un compromiso a largo plazo con la autenticidad, la sostenibilidad y el bienestar.
                    Cada uno de nuestros productos está formulado con ingredientes orgánicos que brindan resultados visibles sin comprometer la salud ni el planeta. Además, todos nuestros productos son cruelty-free, porque entendemos que la verdadera belleza no debería causar daño a ningún ser vivo.
                    Nos apasiona la cosmética consciente, la que no solo mejora la apariencia, sino que también promueve el cuidado de ti misma y del entorno. Únete a nosotros y descubre el poder de la belleza natural.


                    </p>
                </div>

                {/* Derecha: Carrusel de imágenes */}
                <div className="w-full max-w-xs mx-auto">
                    <Carousel images={images} />
                </div>
            </div>

{/* Texto de introducción a las líneas */}
<p className="text-2xl font-semibold text-primary text-center my-32 transition-all duration-500 transform hover:text-[#E1C68F] hover:scale-105">
    Adéntrate en nuestras diferentes gamas de productos.
</p>


{/* Sección de líneas de cosméticos con efectos */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="text-center flex flex-col items-center justify-center transform transition duration-500 hover:scale-105">
        <img
            src="/public/img/lineas/linea1.jpg"
            alt="Línea Facial"
            className="w-48 h-48 object-cover rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-110 hover:rotate-3"
        />
        <h3 className="text-lg font-semibold text-primary mt-4 transition-all duration-300 ease-in-out transform hover:text-[#E1C68F]">
            Cuidado Facial
        </h3>
    </div>
    <div className="text-center flex flex-col items-center justify-center transform transition duration-500 hover:scale-105">
        <img
            src="/public/img/lineas/linea2.jpg"
            alt="Línea Capilar"
            className="w-48 h-48 object-cover rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-110 hover:rotate-3"
        />
        <h3 className="text-lg font-semibold text-primary mt-4 transition-all duration-300 ease-in-out transform hover:text-[#E1C68F]">
            Cuidado Capilar
        </h3>
    </div>
    <div className="text-center flex flex-col items-center justify-center transform transition duration-500 hover:scale-105">
        <img
            src="/public/img/lineas/linea3.jpg"
            alt="Línea Corporal"
            className="w-48 h-48 object-cover rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-110 hover:rotate-3"
        />
        <h3 className="text-lg font-semibold text-primary mt-4 transition-all duration-300 ease-in-out transform hover:text-[#E1C68F]">
            Cuidado Corporal
        </h3>
    </div>
</div>
</div>
);
};

export default Home;