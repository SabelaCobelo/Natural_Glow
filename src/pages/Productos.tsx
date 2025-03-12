import React, { useState } from 'react';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

const Productos: React.FC = () => {
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

    const handleQuantityChange = (productId: string, quantity: number) => {
        setQuantities((prev) => ({ ...prev, [productId]: quantity }));
    };

    const toggleFavorite = (productId: string) => {
        setFavorites((prev) => ({
            ...prev,
            [productId]: !prev[productId], // Alternar entre true y false
        }));
    };

    const products: Product[] = [
        {
            id: '1',
            name: 'Crema Hidratante',
            description: 'Hidratación profunda con aloe vera y aceite de coco.',
            price: 39.99,
            image: '/img/cosmetic1.jpg',
        },
        {
            id: '2',
            name: 'Jabón Natural',
            description: 'Limpieza suave con aceites esenciales y manteca de karité.',
            price: 15.99,
            image: '/img/cosmetic2.jpg',
        },
        {
            id: '3',
            name: 'Serum Facial',
            description: 'Revitaliza tu piel con vitamina C y ácido hialurónico.',
            price: 45.99,
            image: '/img/cosmetic3.jpg',
        },
        {
            id: '4',
            name: 'Serum de péptidos',
            description: 'Nutrición intensiva con aceite de argán y rosa mosqueta.',
            price: 29.99,
            image: '/img/cosmetic4.jpg',
        },
        {
            id: '5',
            name: 'Mascarilla Facial',
            description: 'Purifica y rejuvenece con arcilla verde y té matcha.',
            price: 22.99,
            image: '/img/cosmetic5.jpg',
        },
        {
            id: '6',
            name: 'Aceites esenciales',
            description: 'Elimina células muertas con azúcar de caña y aceite de almendras.',
            price: 99.99,
            image: '/img/cosmetic6.jpg',
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center text-[#6F6134] mb-8">Nuestra línea de productos orgánicos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                        <h3 className="text-xl font-semibold text-[#6F6134] mb-2">{product.name}</h3>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <p className="text-2xl font-bold text-[#6F6134] mb-4">${product.price.toFixed(2)}</p>
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
                                className={`text-2xl ${favorites[product.id] ? "text-red-500" : "text-gray-400"} hover:text-red-500 transition-colors`}
                            >
                                {favorites[product.id] ? "❤️" : "♡"}
                            </button>
                        </div>
                        <button className="w-full bg-[#6F6134] text-white py-2 rounded-md hover:bg-[#5A4D2B] transition-colors">
                            Comprar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Productos;