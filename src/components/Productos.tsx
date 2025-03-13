import React, { useState } from 'react';

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

    const handleQuantityChange = (productId: string, quantity: number) => {
        setQuantities((prev) => ({ ...prev, [productId]: quantity }));
    };

    const toggleFavorite = (productId: string) => {
        setFavorites((prev) => ({
            ...prev,
            [productId]: !prev[productId],
        }));
    };

    const products: Product[] = [
        {
            id: '1',
            name: 'Crema Hidratante',
            description: 'Hidratación profunda con aloe vera y aceite de coco.',
            price: 39.99,
            image: '/img/cosmetic1.jpg',
            category: 'Cuidado Facial',
        },
        {
            id: '2',
            name: 'Jabón Natural',
            description: 'Limpieza suave con aceites esenciales y manteca de karité.',
            price: 15.99,
            image: '/img/cosmetic2.jpg',
            category: 'Cuidado Corporal',
        },
        {
            id: '3',
            name: 'Serum Facial',
            description: 'Revitaliza tu piel con vitamina C y ácido hialurónico.',
            price: 45.99,
            image: '/img/cosmetic3.jpg',
            category: 'Cuidado Facial',
        },
        {
            id: '4',
            name: 'Serum de péptidos',
            description: 'Nutrición intensiva con aceite de argán y rosa mosqueta.',
            price: 29.99,
            image: '/img/cosmetic4.jpg',
            category: 'Cuidado Facial',
        },
        {
            id: '5',
            name: 'Mascarilla Facial',
            description: 'Purifica y rejuvenece con arcilla verde y té matcha.',
            price: 22.99,
            image: '/img/cosmetic5.jpg',
            category: 'Cuidado Facial',
        },
        {
            id: '6',
            name: 'Aceites esenciales',
            description: 'Elimina células muertas con azúcar de caña y aceite de almendras.',
            price: 99.99,
            image: '/img/cosmetic6.jpg',
            category: 'Aceites',
        },
        {
            id: '7',
            name: 'Tónico Facial',
            description: 'Equilibra y refresca tu piel con extractos naturales de té verde y manzanilla.',
            price: 19.99,
            image: '/img/cosmetic7.jpg',
            category: 'Cuidado Facial',
        },
        {
            id: '8',
            name: 'Aceite Corporal',
            description: 'Hidratación intensiva con aceite de almendras dulces y vitamina E.',
            price: 34.99,
            image: '/img/cosmetic8.jpg',
            category: 'Cuidado Corporal',
        },
        {
            id: '9',
            name: 'Limpiador Facial',
            description: 'Limpia profundamente sin resecar, ideal para todo tipo de piel.',
            price: 27.99,
            image: '/img/cosmetic9.jpg',
            category: 'Cuidado Facial',
        },
        {
            id: '10',
            name: 'Jabón Corporal',
            description: 'Limpieza suave con aceite de oliva y manteca de karité.',
            price: 12.99,
            image: '/img/cosmetic10.jpg',
            category: 'Cuidado Corporal',
        },
        {
            id: '11',
            name: 'Aceite para el Cabello',
            description: 'Fortalece y nutre tu cabello con aceite de argán y coco.',
            price: 29.99,
            image: '/img/cosmetic11.jpg',
            category: 'Aceites',
        },
        {
            id: '12',
            name: 'Serum Milagroso',
            description: 'Combate los signos del envejecimiento con antioxidantes naturales.',
            price: 49.99,
            image: '/img/cosmetic12.jpg',
            category: 'Cuidado Facial',
        },
    ];

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

    // Identificar los 2 productos con el menor precio para la etiqueta de oferta
    const productsWithOffers = [...sortedProducts]
        .sort((a, b) => a.price - b.price) // Ordenar por precio ascendente
        .slice(0, 2) // Tomar los 2 más baratos
        .map((product) => product.id); // Obtener sus IDs

    // Lógica de paginación
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto px-4 py-8">
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
                            onChange={(e) => setPriceRange({ ...priceRange, min: +e.target.value })}
                            className="w-1/2 px-4 py-2 border border-[#6F6134] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F6134]"
                        />
                        <input
                            type="number"
                            placeholder="Máximo"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange({ ...priceRange, max: +e.target.value })}
                            className="w-1/2 px-4 py-2 border border-[#6F6134] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F6134]"
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
                            {/* Mostrar etiqueta de oferta solo en los 2 productos más baratos */}
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
                                onClick={() => toggleFavorite(product.id)}
                                className={`text-2xl ${favorites[product.id] ? "text-red-500 animate-bounce" : "text-gray-400"} hover:text-red-500 transition-colors`}
                            >
                                {favorites[product.id] ? "❤️" : "♡"}
                            </button>
                        </div>
                        <button className="w-full bg-[#6F6134] text-white py-2 rounded-md hover:bg-[#5A4D2B] transition-colors transform hover:-translate-y-1 transition-transform">
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