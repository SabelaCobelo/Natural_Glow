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
        <div className="bg-gradient-to-b from-[#F9F5F0] to-white">
            {/* Sección principal */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Izquierda: Texto de presentación */}
                    <div className="space-y-6">
                        <h1 className="text-5xl font-bold text-[#6F6134]">
                            Natural Glow
                        </h1>
                        <p className="text-lg text-[#5A4D2B] leading-relaxed">
                            En <span className="font-semibold">Natural Glow</span>, creemos que la belleza comienza desde adentro y se refleja en el cuidado que damos a nuestro cuerpo y al planeta. Somos una marca comprometida con ofrecer productos de cosmética natural, ecológica y cruelty-free que cuidan tu piel y el entorno que nos rodea.
                        </p>
                        <p className="text-lg text-[#5A4D2B] leading-relaxed">
                            Nuestra misión es transformar tu rutina de belleza con ingredientes naturales de la más alta calidad, respetuosos con tu piel y con el medio ambiente. No creemos en soluciones temporales, sino en un compromiso a largo plazo con la autenticidad, la sostenibilidad y el bienestar.
                        </p>
                        <button className="bg-[#6F6134] text-white px-8 py-3 rounded-lg hover:bg-[#5A4D2B] transition-colors transform hover:scale-105">
                            Descubre más
                        </button>
                    </div>

                    {/* Derecha: Carrusel de imágenes */}
                    <div className="w-full max-w-lg mx-auto">
                        <Carousel images={images} />
                    </div>
                </div>
            </div>

            {/* Sección de introducción a las líneas */}
            <div className="bg-[#F4E9D6] py-16">
                <div className="container mx-auto px-4">
                    <p className="text-3xl font-semibold text-[#6F6134] text-center mb-16 transition-all duration-500 transform hover:scale-105">
                        Adéntrate en nuestras diferentes gamas de productos
                    </p>

                    {/* Sección de líneas de cosméticos */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Línea Facial */}
                        <div className="text-center flex flex-col items-center justify-center transform transition duration-500 hover:scale-105">
                            <img
                                src="/public/img/lineas/linea1.jpg"
                                alt="Línea Facial"
                                className="w-64 h-64 object-cover rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110 hover:rotate-3"
                            />
                            <h3 className="text-xl font-semibold text-[#6F6134] mt-6 transition-all duration-300 ease-in-out transform hover:text-[#E1C68F]">
                                Cuidado Facial
                            </h3>
                            <p className="text-[#5A4D2B] mt-2">
                                Productos diseñados para revitalizar y nutrir tu piel.
                            </p>
                        </div>

                        {/* Línea Capilar */}
                        <div className="text-center flex flex-col items-center justify-center transform transition duration-500 hover:scale-105">
                            <img
                                src="/public/img/lineas/linea2.jpg"
                                alt="Línea Capilar"
                                className="w-64 h-64 object-cover rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110 hover:rotate-3"
                            />
                            <h3 className="text-xl font-semibold text-[#6F6134] mt-6 transition-all duration-300 ease-in-out transform hover:text-[#E1C68F]">
                                Cuidado Capilar
                            </h3>
                            <p className="text-[#5A4D2B] mt-2">
                                Cuida y fortalece tu cabello de forma natural.
                            </p>
                        </div>

                        {/* Línea Corporal */}
                        <div className="text-center flex flex-col items-center justify-center transform transition duration-500 hover:scale-105">
                            <img
                                src="/public/img/lineas/linea3.jpg"
                                alt="Línea Corporal"
                                className="w-64 h-64 object-cover rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110 hover:rotate-3"
                            />
                            <h3 className="text-xl font-semibold text-[#6F6134] mt-6 transition-all duration-300 ease-in-out transform hover:text-[#E1C68F]">
                                Cuidado Corporal
                            </h3>
                            <p className="text-[#5A4D2B] mt-2">
                                Hidrata y cuida tu cuerpo con ingredientes naturales.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección de testimonios */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-[#6F6134] text-center mb-8">
                    Lo que dicen nuestros clientes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Testimonio 1 */}
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <p className="text-[#5A4D2B] italic">
                            "Los productos de Natural Glow han transformado mi piel. ¡Son increíbles!"
                        </p>
                        <p className="text-[#6F6134] font-semibold mt-4">- María</p>
                    </div>

                    {/* Testimonio 2 */}
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <p className="text-[#5A4D2B] italic">
                            "Me encanta que sean cruelty-free y ecológicos. ¡Totalmente recomendados!"
                        </p>
                        <p className="text-[#6F6134] font-semibold mt-4">- Carlos</p>
                    </div>

                    {/* Testimonio 3 */}
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <p className="text-[#5A4D2B] italic">
                            "Mi cabello nunca había estado tan saludable. ¡Gracias, Natural Glow!"
                        </p>
                        <p className="text-[#6F6134] font-semibold mt-4">- Ana</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;