import React, { createContext, useContext, useState } from "react";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: CartItem) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Función para añadir un producto al carrito
    const addToCart = (product: CartItem) => {
        const existingItem = cartItems.find((item) => item.id === product.id);

        if (existingItem) {
            // Si el producto ya está en el carrito, incrementa la cantidad
            setCartItems(
                cartItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            // Si el producto no está en el carrito, lo añade con cantidad 1
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    // Función para eliminar un producto del carrito
    const removeFromCart = (productId: number) => {
        setCartItems(cartItems.filter((item) => item.id !== productId));
    };

    // Función para vaciar el carrito
    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook personalizado para usar el contexto del carrito
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe usarse dentro de un CartProvider");
    }
    return context;
};