import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Cargar el carrito desde localStorage al inicializar
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            // Asegurar que quantity sea un número válido
            const validCart = parsedCart.map((item: CartItem) => ({
                ...item,
                quantity: Number(item.quantity) || 1, // Si quantity no es válido, se establece en 1
            }));
            setCartItems(validCart);
        }
    }, []);

    // Guardar el carrito en localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    // Función para añadir un producto al carrito
    const addToCart = (item: CartItem) => {
        // Validar que quantity sea un número válido
        const quantity = Number(item.quantity);
        if (isNaN(quantity) || quantity <= 0) {
            console.error("La cantidad debe ser un número válido y mayor que 0.");
            return;
        }

        const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
            // Si el producto ya está en el carrito, aumenta su cantidad
            setCartItems(
                cartItems.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + quantity }
                        : cartItem
                )
            );
        } else {
            // Si el producto no está en el carrito, lo añade
            setCartItems([...cartItems, { ...item, quantity }]);
        }
    };

    // Función para eliminar un producto del carrito
    const removeFromCart = (id: string) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    // Función para vaciar el carrito
    const clearCart = () => {
        setCartItems([]);
    };

    // Función para aumentar la cantidad de un producto en el carrito
    const increaseQuantity = (id: string) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: Number(item.quantity) + 1 } // Asegurar que quantity sea un número
                    : item
            )
        );
    };

    // Función para disminuir la cantidad de un producto en el carrito
    const decreaseQuantity = (id: string) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id && Number(item.quantity) > 1 // Asegurar que quantity sea un número y mayor que 1
                    ? { ...item, quantity: Number(item.quantity) - 1 }
                    : item
            )
        );
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                increaseQuantity,
                decreaseQuantity,
            }}
        >
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