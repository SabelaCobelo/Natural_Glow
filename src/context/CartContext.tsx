import React, { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number; // Nuevo campo para la cantidad
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
            // Si el producto ya está en el carrito, actualiza la cantidad
            setCart(
                cart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                        : cartItem
                )
            );
        } else {
            // Si el producto no está en el carrito, añádelo
            setCart([...cart, item]);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe usarse dentro de un CartProvider");
    }
    return context;
};