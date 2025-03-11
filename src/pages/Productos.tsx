import React, { useState } from 'react';
import './Productos.css'; // Importamos el archivo de estilos

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
            price: 15.99,
            image: '/img/cosmetic1.jpg',
        },
        {
            id: '2',
            name: 'Jabón Natural',
            description: 'Limpieza suave con aceites esenciales y manteca de karité.',
            price: 5.99,
            image: '/img/cosmetic2.jpg',
        },
        {
            id: '3',
            name: 'Serum Facial',
            description: 'Revitaliza tu piel con vitamina C y ácido hialurónico.',
            price: 25.99,
            image: '/img/cosmetic3.jpg',
        },
        {
            id: '4',
            name: 'Aceite Corporal',
            description: 'Nutrición intensiva con aceite de argán y rosa mosqueta.',
            price: 18.99,
            image: '/img/cosmetic4.jpg',
        },
        {
            id: '5',
            name: 'Mascarilla Facial',
            description: 'Purifica y rejuvenece con arcilla verde y té matcha.',
            price: 12.99,
            image: '/img/cosmetic5.jpg',
        },
        {
            id: '6',
            name: 'Exfoliante Corporal',
            description: 'Elimina células muertas con azúcar de caña y aceite de almendras.',
            price: 9.99,
            image: '/img/cosmetic6.jpg',
        },
    ];

    return (
        <div className="productos-container">
            <h2>Nuestros Productos</h2>
            <p>Explora nuestra gama de productos naturales.</p>
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} className="product-image" />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p className="product-price">${product.price.toFixed(2)}</p>
                        <div className="quantity-selector">
                            <button
                                onClick={() =>
                                    handleQuantityChange(
                                        product.id,
                                        Math.max(1, (quantities[product.id] || 1) - 1)
                                    )
                                }
                            >
                                -
                            </button>
                            <span>{quantities[product.id] || 1}</span>
                            <button
                                onClick={() =>
                                    handleQuantityChange(
                                        product.id,
                                        (quantities[product.id] || 1) + 1
                                    )
                                }
                            >
                                +
                            </button>
                        </div>
                        <button className="buy-button">Comprar</button>
                        <button
                            className={`favorite-button ${favorites[product.id] ? 'active' : ''}`}
                            onClick={() => toggleFavorite(product.id)}
                        >
                            {favorites[product.id] ? '❤️' : '♡'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Productos;