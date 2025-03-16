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
    isLoggedIn: boolean; // Indica si el usuario está autenticado
    isLoading: boolean; // Indica si la autenticación está en proceso
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Estado de carga global

    // Deriva el valor de isLoggedIn del estado user
    const isLoggedIn = !!user;

    // Efecto para verificar el estado de autenticación al cargar la aplicación
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setIsLoading(false); // Finaliza la carga cuando se verifica el estado
        });

        return () => unsubscribe(); // Limpia la suscripción al desmontar el componente
    }, []);

    // Función para iniciar sesión
    const login = async (email: string, password: string) => {
        setIsLoading(true); // Inicia la carga
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            setIsLoading(false); // Finaliza la carga en caso de error
            throw new Error("Error al iniciar sesión. Verifica tus credenciales.");
        } finally {
            setIsLoading(false); // Finaliza la carga en cualquier caso
        }
    };

    // Función para registrarse
    const register = async (email: string, password: string) => {
        setIsLoading(true); // Inicia la carga
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error al registrarse:", error);
            setIsLoading(false); // Finaliza la carga en caso de error
            throw new Error("Error al registrarse. Inténtalo de nuevo.");
        } finally {
            setIsLoading(false); // Finaliza la carga en cualquier caso
        }
    };

    // Función para cerrar sesión
    const logout = async () => {
        setIsLoading(true); // Inicia la carga
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            setIsLoading(false); // Finaliza la carga en caso de error
            throw new Error("Error al cerrar sesión. Inténtalo de nuevo.");
        } finally {
            setIsLoading(false); // Finaliza la carga en cualquier caso
        }
    };

    // Valor proporcionado por el contexto
    const value = {
        user,
        isLoggedIn,
        isLoading,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children} {/* Renderiza los hijos solo cuando no está cargando */}
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