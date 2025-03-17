import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ref, onValue, set, remove } from "firebase/database";
import { db } from "../../firebase";
import { motion } from "framer-motion"; // Importar motion desde framer-motion

const images = [
    "/img/Natural_Glow_Models/model1.jpg",
    "/img/Natural_Glow_Models/model2.jpg",
    "/img/Natural_Glow_Models/model4.jpg",
    "/img/Natural_Glow_Models/model6.jpg",
    "/img/Natural_Glow_Models/model8.jpg",
];

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

const Home: React.FC = () => {
    const { isLoggedIn, user } = useAuth();
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
    const [refreshKey, setRefreshKey] = useState(0);

    // Obtener productos desde Firebase
    useEffect(() => {
        const productsRef = ref(db, "Producto");
        onValue(productsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const productsData = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                })) as Product[];
                const featuredProducts = productsData.slice(0, 6);
                setProducts(featuredProducts);
            }
        });
    }, []);

    // Obtener favoritos desde Firebase
    useEffect(() => {
        if (user) {
            const favoritesRef = ref(db, `users/${user.uid}/savedProducts`);
            onValue(favoritesRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const favoritesData = Object.keys(data).reduce((acc, key) => {
                        acc[key] = true;
                        return acc;
                    }, {} as { [key: string]: boolean });
                    setFavorites(favoritesData);
                } else {
                    setFavorites({});
                }
                setRefreshKey((prev) => prev + 1);
            });
        }
    }, [user]);

    // Función para manejar la adición al carrito
    const handleAddToCart = (product: Product) => {
        if (!isLoggedIn) {
            toast.info("Debes iniciar sesión para añadir productos al carrito.");
            navigate("/login");
            return;
        }

        const quantity = quantities[product.id] || 1;
        addToCart({ ...product, quantity });
        toast.success(`${quantity} ${product.name}(s) se ha(n) añadido al carrito.`);
    };

    // Función para actualizar la cantidad
    const handleQuantityChange = (productId: string, quantity: number) => {
        setQuantities((prev) => ({ ...prev, [productId]: quantity }));
    };

    // Función para alternar favoritos
    const toggleFavorite = async (product: Product) => {
        if (!isLoggedIn) {
            toast.info("Debes iniciar sesión para guardar productos en favoritos.");
            navigate("/login");
            return;
        }

        const favoriteRef = ref(db, `users/${user?.uid}/savedProducts/${product.id}`);
        if (favorites[product.id]) {
            await remove(favoriteRef);
            toast.success("Producto eliminado de favoritos.");
        } else {
            await set(favoriteRef, product);
            toast.success("Producto añadido a favoritos.");
        }

        setFavorites((prev) => ({
            ...prev,
            [product.id]: !prev[product.id],
        }));
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <div key={refreshKey} className="bg-gradient-to-b from-[#F9F5F0] to-white">
            {/* Sección principal */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Izquierda: Texto de presentación */}
                    <div className="space-y-8 text-center md:text-left">
                        {/* Título con animación */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl font-bold text-[#6F6134] drop-shadow-md"
                        >
                            La Cosmética Natural que merece tu piel
                        </motion.h1>

                        {/* Texto descriptivo */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg text-[#5A4D2B] leading-relaxed"
                        >
                            En <span className="font-semibold text-[#6F6134]">Natural Glow</span>, creemos que la belleza comienza desde adentro y se refleja en el cuidado que damos a nuestro cuerpo y al planeta. Somos una marca comprometida con ofrecer productos de cosmética natural, ecológica y cruelty-free que cuidan tu piel y el entorno que nos rodea.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="text-lg text-[#5A4D2B] leading-relaxed"
                        >
                            Nuestra misión es transformar tu rutina de belleza con ingredientes naturales de la más alta calidad, respetuosos con tu piel y con el medio ambiente. No creemos en soluciones temporales, sino en un compromiso a largo plazo con la autenticidad, la sostenibilidad y el bienestar.
                        </motion.p>

                        {/* Botones con animación */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="flex justify-center md:justify-start gap-4"
                        >
                            <Link
                                to="/productos"
                                className="bg-[#6F6134] text-white px-8 py-3 rounded-lg hover:bg-[#5A4D2B] transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                Descubre más
                            </Link>
                            {isLoggedIn && (
                                <Link
                                    to="/cart"
                                    className="bg-[#E1C68F] text-[#6F6134] px-8 py-3 rounded-lg hover:bg-[#D4B57D] transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    Ver Carrito
                                </Link>
                            )}
                        </motion.div>
                    </div>

                    {/* Derecha: Carrusel de imágenes */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="w-full max-w-lg mx-auto"
                    >
                        <Carousel images={images} />
                    </motion.div>
                </div>
            </div>

            {/* Sección de productos destacados */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-[#6F6134] text-center mb-8">
                    Descubre nuestros productos destacados
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="bg-white p-6 rounded-lg shadow-md text-center transform transition duration-500 hover:scale-105"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-semibold text-[#6F6134]">{product.name}</h3>
                            <p className="text-[#5A4D2B] mt-2">{product.description}</p>
                            <p className="text-[#6F6134] font-bold mt-2">${product.price.toFixed(2)}</p>

                            {/* Selector de cantidad y botón de favoritos */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleQuantityChange(product.id, Math.max(1, (quantities[product.id] || 1) - 1))}
                                        className="bg-[#E1C68F] text-[#6F6134] px-3 py-1 rounded-full hover:bg-[#D4B57D] transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="text-lg text-[#6F6134]">{quantities[product.id] || 1}</span>
                                    <button
                                        onClick={() => handleQuantityChange(product.id, (quantities[product.id] || 1) + 1)}
                                        className="bg-[#E1C68F] text-[#6F6134] px-3 py-1 rounded-full hover:bg-[#D4B57D] transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={() => toggleFavorite(product)}
                                    className={`text-2xl ${favorites[product.id] ? "text-red-500" : "text-gray-400"} hover:text-red-500 transition-colors`}
                                >
                                    {favorites[product.id] ? "❤️" : "♡"}
                                </button>
                            </div>

                            {/* Botón "Añadir al carrito" */}
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="w-full bg-[#6F6134] text-white px-6 py-2 rounded-lg mt-4 hover:bg-[#5A4D2B] transition-colors"
                            >
                                Añadir al Carrito
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Sección de introducción a las líneas */}
            <div className="bg-[#F4E9D6] py-16">
                <div className="container mx-auto px-4">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl font-semibold text-[#6F6134] text-center mb-16 transition-all duration-500 transform hover:scale-105"
                    >
                        Adéntrate en nuestras diferentes gamas de productos
                    </motion.p>

                    {/* Sección de líneas de cosméticos */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Línea Facial */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-center flex flex-col items-center justify-center transform transition duration-500 hover:scale-105"
                        >
                            <img
                                src="/img/lineas/linea1.jpg"
                                alt="Línea Facial"
                                className="w-64 h-64 object-cover rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110 hover:rotate-3"
                            />
                            <h3 className="text-xl font-semibold text-[#6F6134] mt-6 transition-all duration-300 ease-in-out transform hover:text-[#E1C68F]">
                                Cuidado Facial
                            </h3>
                            <p className="text-[#5A4D2B] mt-2">
                                Productos diseñados para revitalizar y nutrir tu piel.
                            </p>
                        </motion.div>

                        {/* Línea Capilar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-center flex flex-col items-center justify-center transform transition duration-500 hover:scale-105"
                        >
                            <img
                                src="/img/lineas/linea2.jpg"
                                alt="Línea Capilar"
                                className="w-64 h-64 object-cover rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110 hover:rotate-3"
                            />
                            <h3 className="text-xl font-semibold text-[#6F6134] mt-6 transition-all duration-300 ease-in-out transform hover:text-[#E1C68F]">
                                Cuidado Capilar
                            </h3>
                            <p className="text-[#5A4D2B] mt-2">
                                Cuida y fortalece tu cabello de forma natural.
                            </p>
                        </motion.div>

                        {/* Línea Corporal */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="text-center flex flex-col items-center justify-center transform transition duration-500 hover:scale-105"
                        >
                            <img
                                src="/img/lineas/linea3.jpg"
                                alt="Línea Corporal"
                                className="w-64 h-64 object-cover rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110 hover:rotate-3"
                            />
                            <h3 className="text-xl font-semibold text-[#6F6134] mt-6 transition-all duration-300 ease-in-out transform hover:text-[#E1C68F]">
                                Cuidado Corporal
                            </h3>
                            <p className="text-[#5A4D2B] mt-2">
                                Hidrata y cuida tu cuerpo con ingredientes naturales.
                            </p>
                        </motion.div>
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
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-[#FAF7F2] p-6 rounded-lg shadow-md text-center"
                    >
                        <p className="text-[#5A4D2B] italic">
                            "Los productos de Natural Glow han transformado mi piel. ¡Son increíbles!"
                        </p>
                        <p className="text-[#6F6134] font-semibold mt-4">- María</p>
                    </motion.div>

                    {/* Testimonio 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="bg-[#FAF7F2] p-6 rounded-lg shadow-md text-center"
                    >
                        <p className="text-[#5A4D2B] italic">
                            "Me encanta que sean cruelty-free y ecológicos. ¡Totalmente recomendados!"
                        </p>
                        <p className="text-[#6F6134] font-semibold mt-4">- Carlos</p>
                    </motion.div>

                    {/* Testimonio 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="bg-[#FAF7F2] p-6 rounded-lg shadow-md text-center"
                    >
                        <p className="text-[#5A4D2B] italic">
                            "Mi cabello nunca había estado tan saludable. ¡Gracias, Natural Glow!"
                        </p>
                        <p className="text-[#6F6134] font-semibold mt-4">- Ana</p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Home;