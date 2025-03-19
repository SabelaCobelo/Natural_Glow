import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../firebase.js";
import {
    User,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    AuthError,
    sendEmailVerification,
} from "firebase/auth";

interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (
        email: string,
        password: string,
        username: string,
        name: string,
        surname: string,
        birthdate: string
    ) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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
            const authError = error as AuthError;
            console.error("Error al iniciar sesión:", authError.message);
            setIsLoading(false); // Finaliza la carga en caso de error
            throw new Error(authError.message || "Error al iniciar sesión. Verifica tus credenciales.");
        } finally {
            setIsLoading(false); // Finaliza la carga en cualquier caso
        }
    };

    // Función para registrarse
    const register = async (
        email: string,
        password: string,
        username: string,
        name: string,
        surname: string,
        birthdate: string
    ) => {
        setIsLoading(true); // Inicia la carga

        // Validar que el usuario sea mayor de edad
        const today = new Date();
        const birthDate = new Date(birthdate);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            if (age - 1 < 18) {
                setIsLoading(false);
                throw new Error("Debes ser mayor de edad para registrarte.");
            }
        } else if (age < 18) {
            setIsLoading(false);
            throw new Error("Debes ser mayor de edad para registrarte.");
        }

        try {
            // Crear el usuario en Firebase
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Enviar correo de verificación
            await sendEmailVerification(user);
            console.log("Correo de verificación enviado.");

            // Iniciar sesión automáticamente
            await login(email, password);

            // Aquí podrías guardar los datos adicionales (username, name, surname, birthdate) en una base de datos externa
            console.log("Usuario registrado:", { email, username, name, surname, birthdate });
        } catch (error) {
            const authError = error as AuthError;
            console.error("Error al registrarse:", authError.message);
            setIsLoading(false); // Finaliza la carga en caso de error
            throw new Error(authError.message || "Error al registrarse. Inténtalo de nuevo.");
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
            const authError = error as AuthError;
            console.error("Error al cerrar sesión:", authError.message);
            setIsLoading(false); // Finaliza la carga en caso de error
            throw new Error(authError.message || "Error al cerrar sesión. Inténtalo de nuevo.");
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
            {isLoading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <p>Cargando...</p>
                </div>
            ) : (
                children
            )}
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