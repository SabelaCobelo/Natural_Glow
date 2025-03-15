import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../firebase.js";
import {
    User,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";

interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean; // Nuevo campo para verificar si el usuario está autenticado
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Deriva el valor de isLoggedIn del estado user
    const isLoggedIn = !!user;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            throw new Error("Error al iniciar sesión. Verifica tus credenciales.");
        }
    };

    const register = async (email: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error al registrarse:", error);
            throw new Error("Error al registrarse. Inténtalo de nuevo.");
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            throw new Error("Error al cerrar sesión. Inténtalo de nuevo.");
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};