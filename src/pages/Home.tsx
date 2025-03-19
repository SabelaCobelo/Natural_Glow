import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Asegúrate de importar Link
import Carousel from "../components/Carousel";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ref, onValue, set, remove } from "firebase/database";
import { db } from "../../firebase";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa"; // Ícono de estrella

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
    category: string;
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

    // Reseñas ficticias
    const reviews = [
        {
            id: 1,
            name: "María G.",
            comment: "Los productos de Natural Glow han transformado mi piel. ¡Son increíbles!",
            rating: 5,
        },
        {
            id: 2,
            name: "Carlos R.",
            comment: "Me encanta que sean naturales y respetuosos con el medio ambiente.",
            rating: 4,
        },
        {
            id: 3,
            name: "Sofía L.",
            comment: "La mejor decisión que he tomado para mi rutina de belleza.",
            rating: 5,
        },
        {
            id: 4,
            name: "Ana M.",
            comment: "Mi piel nunca había estado tan hidratada. ¡Recomiendo al 100%!",
            rating: 5,
        },
    ];

    // Función para renderizar las estrellas de valoración
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <FaStar
                key={index}
                className={index < rating ? "text-yellow-400" : "text-gray-300"}
            />
        ));
    };

    return (
        <div key={refreshKey} className="bg-gradient-to-b from-[#F9F5F0] to-white">
            {/* Sección principal */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Izquierda: Texto de presentación */}
                    <div className="space-y-8 text-center md:text-left">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl font-bold text-[#6F6134] drop-shadow-md"
                        >
                            La Cosmética Natural que merece tu piel
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg text-[#5A4D2B] leading-relaxed"
                        >
                            En <span className="font-semibold text-[#6F6134]">Natural Glow</span>, creemos que la belleza comienza desde adentro y se refleja en el cuidado que damos a nuestro cuerpo y al planeta.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="text-lg text-[#5A4D2B] leading-relaxed"
                        >
                            Nuestra misión es transformar tu rutina de belleza con ingredientes naturales de la más alta calidad.
                        </motion.p>

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
                            {/* Enlace a la página de detalles del producto */}
                            <Link to={`/product/${product.id}`}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-xl font-semibold text-[#6F6134]">{product.name}</h3>
                                <p className="text-[#5A4D2B] mt-2">{product.description}</p>
                                <p className="text-[#6F6134] font-bold mt-2">{product.price.toFixed(2)} €</p>
                            </Link>

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

            {/* Sección de Líneas de Producto */}
            <div className="bg-[#F4E9D6] py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-[#6F6134] text-center mb-8">
                        Nuestras Líneas de Producto
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Cuidado Facial */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-white p-6 rounded-lg shadow-md text-center"
                        >
                            <div className="flex justify-center">
                                <motion.img
                                    src="/img/lineas/linea3.jpg" // Ruta de la imagen
                                    alt="Cuidado Facial"
                                    className="w-48 h-48 object-cover rounded-full mb-4 border-4 border-[#6F6134]"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-[#6F6134] mb-4">Cuidado Facial</h3>
                            <p className="text-[#5A4D2B]">
                                Productos diseñados para limpiar, hidratar y proteger tu piel, manteniéndola radiante y saludable.
                            </p>
                            <Link
                                to="/productos?category=Cuidado Facial"
                                className="mt-4 inline-block bg-[#6F6134] text-white px-6 py-2 rounded-lg hover:bg-[#5A4D2B] transition-colors"
                            >
                                Ver Productos
                            </Link>
                        </motion.div>

                        {/* Cuidado Corporal */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="bg-white p-6 rounded-lg shadow-md text-center"
                        >
                            <div className="flex justify-center">
                                <motion.img
                                    src="/img/lineas/linea1.jpg" // Ruta de la imagen
                                    alt="Cuidado Corporal"
                                    className="w-48 h-48 object-cover rounded-full mb-4 border-4 border-[#6F6134]"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-[#6F6134] mb-4">Cuidado Corporal</h3>
                            <p className="text-[#5A4D2B]">
                                Hidrata y nutre tu cuerpo con nuestros productos naturales, ideales para todo tipo de piel.
                            </p>
                            <Link
                                to="/productos?category=Cuidado Corporal"
                                className="mt-4 inline-block bg-[#6F6134] text-white px-6 py-2 rounded-lg hover:bg-[#5A4D2B] transition-colors"
                            >
                                Ver Productos
                            </Link>
                        </motion.div>

                        {/* Cuidado Capilar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="bg-white p-6 rounded-lg shadow-md text-center"
                        >
                            <div className="flex justify-center">
                                <motion.img
                                    src="/img/lineas/linea2.jpg" // Ruta de la imagen
                                    alt="Cuidado Capilar"
                                    className="w-48 h-48 object-cover rounded-full mb-4 border-4 border-[#6F6134]"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-[#6F6134] mb-4">Cuidado Capilar</h3>
                            <p className="text-[#5A4D2B]">
                                Cuida y fortalece tu cabello con productos naturales que respetan su equilibrio natural.
                            </p>
                            <Link
                                to="/productos?category=Cuidado Capilar"
                                className="mt-4 inline-block bg-[#6F6134] text-white px-6 py-2 rounded-lg hover:bg-[#5A4D2B] transition-colors"
                            >
                                Ver Productos
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Sección de Reseñas de Clientes */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-[#6F6134] text-center mb-8">
                    La Opinión de Nuestros Clientes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {reviews.map((review) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="bg-white p-6 rounded-lg shadow-md text-center"
                        >
                            <div className="flex justify-center mb-4">
                                <div className="flex space-x-1">
                                    {renderStars(review.rating)}
                                </div>
                            </div>
                            <p className="text-[#5A4D2B] italic mb-4">"{review.comment}"</p>
                            <p className="text-[#6F6134] font-semibold">- {review.name}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;