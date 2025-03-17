import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'; // Ajusta la ruta según la ubicación del archivo
import { ref, onValue, set, remove } from 'firebase/database';
import { useCart } from '../context/CartContext'; // Importa el contexto del carrito
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir
import { toast } from 'react-toastify'; // Importa toast
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos de react-toastify

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
}

const Productos: React.FC = () => {
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshKey, setRefreshKey] = useState(0); // Estado adicional para forzar re-renderizado

    const { addToCart } = useCart(); // Obtén la función addToCart del contexto del carrito
    const { user, isLoggedIn } = useAuth(); // Obtén el usuario y el estado de autenticación
    const navigate = useNavigate(); // Hook para redirigir al usuario

    // Obtener los productos desde Realtime Database
    useEffect(() => {
        const productsRef = ref(db, 'Producto');

        console.log("Iniciando la recuperación de datos..."); // Verifica que el useEffect se ejecuta

        onValue(productsRef, (snapshot) => {
            const data = snapshot.val();
            console.log("Datos recuperados de Firebase:", data); // Verifica los datos crudos

            if (data) {
                const productsData = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                })) as Product[];
                console.log("Datos convertidos a array:", productsData); // Verifica los datos convertidos
                setProducts(productsData);
            } else {
                console.log("No se encontraron productos en Firebase."); // Verifica si no hay datos
                setError('No se encontraron productos.');
            }
            setLoading(false);
            // Forzar re-renderizado actualizando el estado refreshKey
            setRefreshKey((prev) => prev + 1);
        }, (err) => {
            console.error("Error al cargar productos:", err); // Verifica si hay errores
            setError('Error cargando productos');
            setLoading(false);
        });
    }, []);

    // Obtener los favoritos del usuario desde Firebase
    useEffect(() => {
        if (user) {
            const favoritesRef = ref(db, `users/${user.uid}/savedProducts`);
            onValue(favoritesRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const favoritesData = Object.keys(data).reduce((acc, key) => {
                        acc[key] = true; // Marcar como favorito
                        return acc;
                    }, {} as { [key: string]: boolean });
                    setFavorites(favoritesData);
                } else {
                    setFavorites({}); // Si no hay favoritos, establecer un objeto vacío
                }
                // Forzar re-renderizado actualizando el estado refreshKey
                setRefreshKey((prev) => prev + 1);
            });
        }
    }, [user]);

    const handleQuantityChange = (productId: string, quantity: number) => {
        setQuantities((prev) => ({ ...prev, [productId]: quantity }));
    };

    // Función para manejar favoritos
    const toggleFavorite = async (product: Product) => {
        if (!user) {
            toast.info("Debes iniciar sesión para guardar productos en favoritos.");
            navigate("/login");
            return;
        }

        if (!isLoggedIn) {
            toast.info("Debes iniciar sesión para guardar productos en favoritos.");
            navigate("/login");
            return;
        }

        const favoriteRef = ref(db, `users/${user.uid}/savedProducts/${product.id}`);

        if (favorites[product.id]) {
            // Si ya es favorito, eliminarlo
            await remove(favoriteRef);
            toast.success("Producto eliminado de favoritos.");
        } else {
            // Si no es favorito, agregarlo
            await set(favoriteRef, product);
            toast.success("Producto añadido a favoritos.");
        }

        // Actualizar el estado local
        setFavorites((prev) => ({
            ...prev,
            [product.id]: !prev[product.id],
        }));

        // Forzar re-renderizado
        setRefreshKey((prev) => prev + 1);
    };

    // Función para manejar la compra
    const handleBuy = (product: Product) => {
        if (!isLoggedIn) {
            toast.info("Debes iniciar sesión para comprar productos.");
            navigate("/login");
            return;
        }

        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantities[product.id] || 1, // Usa la cantidad seleccionada
            image: product.image,
        };

        addToCart(cartItem); // Agrega el producto al carrito
        toast.success(`${cartItem.quantity} ${product.name}(s) se ha(n) añadido al carrito.`); // Muestra una notificación
        navigate("/cart"); // Redirige al usuario a la página del carrito
    };

    // Filtrar productos por término de búsqueda, categoría y rango de precios
    const filteredProducts = products.filter(
        (product) =>
            (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (selectedCategory ? product.category === selectedCategory : true) &&
            product.price >= priceRange.min &&
            product.price <= priceRange.max
    );

    // Ordenar productos por precio (ascendente o descendente)
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });

    // Identificar los 2 productos con el menor precio para la etiqueta de oferta (usando la lista completa de productos)
    const productsWithOffers = [...products]
        .sort((a, b) => a.price - b.price) // Ordenar por precio ascendente
        .slice(0, 2) // Tomar los 2 más baratos
        .map((product) => product.id); // Obtener sus IDs

    // Lógica de paginación
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Mostrar mensaje de carga o error
    if (loading) {
        return <div className="text-center py-8">Cargando productos...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>;
    }

    return (
        <div key={refreshKey} className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center text-[#6F6134] mb-8">Nuestra línea de productos orgánicos</h2>

            {/* Filtros con diseño mejorado */}
            <div className="bg-[#F4E9D6] p-6 rounded-lg shadow-md mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Campo de búsqueda */}
                    <div>
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-[#6F6134] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F6134]"
                        />
                    </div>

                    {/* Filtro por categoría */}
                    <div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-4 py-2 border border-[#6F6134] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F6134]"
                        >
                            <option value="">Todas las categorías</option>
                            <option value="Cuidado Facial">Cuidado Facial</option>
                            <option value="Cuidado Corporal">Cuidado Corporal</option>
                            <option value="Aceites">Aceites</option>
                        </select>
                    </div>

                    {/* Filtro por rango de precios */}
                    <div className="flex gap-4">
                        <input
                            type="number"
                            placeholder="Mínimo"
                            value={priceRange.min}
                            onChange={(e) => {
                                const value = +e.target.value; // Convertir a número
                                if (value >= 0) { // Validar que no sea negativo
                                    setPriceRange({ ...priceRange, min: value });
                                }
                            }}
                            className="w-1/2 px-4 py-2 border border-[#6F6134] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F6134]"
                            min="0" // Asegurar que el valor mínimo sea 0
                        />
                        <input
                            type="number"
                            placeholder="Máximo"
                            value={priceRange.max}
                            onChange={(e) => {
                                const value = +e.target.value; // Convertir a número
                                if (value >= 0) { // Validar que no sea negativo
                                    setPriceRange({ ...priceRange, max: value });
                                }
                            }}
                            className="w-1/2 px-4 py-2 border border-[#6F6134] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F6134]"
                            min="0" // Asegurar que el valor mínimo sea 0
                        />
                    </div>

                    {/* Ordenar por precio */}
                    <div>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                            className="w-full px-4 py-2 border border-[#6F6134] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F6134]"
                        >
                            <option value="asc">Precio: Menor a Mayor</option>
                            <option value="desc">Precio: Mayor a Menor</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Lista de productos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform border-2 border-transparent hover:border-[#6F6134] bg-opacity-90 backdrop-blur-sm"
                    >
                        <div className="relative">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-lg mb-4 transform hover:scale-110 transition-transform"
                            />
                            {/* Mostrar etiqueta de oferta solo en los 2 productos más baratos de la lista completa */}
                            {productsWithOffers.includes(product.id) && (
                                <span className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                                    Oferta
                                </span>
                            )}
                        </div>
                        <h3 className="text-xl font-semibold text-[#6F6134] mb-2">{product.name}</h3>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <p className="text-2xl font-bold text-[#6F6134] mb-4 drop-shadow-md">
                            ${product.price.toFixed(2)}
                        </p>
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
                        <button
                            className="w-full bg-[#6F6134] text-white py-2 rounded-md hover:bg-[#5A4D2B] transition-colors transform hover:-translate-y-1 transition-transform"
                            onClick={() => handleBuy(product)} // Llama a handleBuy al hacer clic
                        >
                            Comprar
                        </button>
                        <div className="flex justify-end space-x-2 mt-2">
                            <span className="text-sm text-[#6F6134] bg-[#F4E9D6] px-2 py-1 rounded-full">Orgánico</span>
                            <span className="text-sm text-[#6F6134] bg-[#F4E9D6] px-2 py-1 rounded-full">Vegano</span>
                            <span className="text-sm text-[#6F6134] bg-[#F4E9D6] px-2 py-1 rounded-full">Cruelty Free</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Paginación */}
            <div className="flex justify-center mt-8">
                {Array.from({ length: Math.ceil(sortedProducts.length / productsPerPage) }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={`mx-1 px-4 py-2 rounded-full ${currentPage === i + 1 ? 'bg-[#6F6134] text-white' : 'bg-gray-200 text-[#6F6134]'}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Productos;