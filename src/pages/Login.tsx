import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { auth, googleProvider, signInWithPopup } from "../../firebase.js";

const Login: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!validateEmail(email)) {
            setError("Por favor, introduce un correo electrónico válido.");
            return;
        }

        setLoading(true);

        try {
            await login(email, password);
            navigate("/cart");
        } catch (error: any) {
            if (error.code === "auth/user-not-found") {
                setError("El usuario no existe.");
            } else if (error.code === "auth/wrong-password") {
                setError("Contraseña incorrecta.");
            } else {
                setError("Ocurrió un error. Inténtalo de nuevo.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError("");
        setLoading(true);

        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log("Usuario autenticado con Google:", user);
            navigate("/cart"); // Redirige al carrito después del inicio de sesión
        } catch (error: any) {
            setError("Error al iniciar sesión con Google.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#F9E5A4] to-[#F1D0A4]">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-3xl font-bold text-center text-[#6F6134] mb-6">
                    Iniciar Sesión
                </h1>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9E5A4]"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9E5A4]"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 bg-[#6F6134] text-white font-semibold rounded-md hover:bg-[#5A4D2B] transition-colors flex items-center justify-center ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {loading ? (
                            <div className="w-8 h-8 border-4 border-white border-t-4 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Iniciar sesión"
                        )}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm">
                        ¿No tienes cuenta?{" "}
                        <Link to="/register" className="text-[#6F6134] hover:underline">
                            Regístrate
                        </Link>
                    </p>
                </div>

                <div className="mt-6">
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className={`w-full py-3 bg-white text-gray-800 font-semibold rounded-md border border-gray-300 hover:border-gray-400 hover:shadow-md transition-all flex items-center justify-center ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {loading ? (
                            <div className="flex items-center">
                                <div className="w-6 h-6 border-4 border-gray-800 border-t-4 border-t-transparent rounded-full animate-spin"></div>
                                <span className="ml-2">Cargando...</span>
                            </div>
                        ) : (
                            <>
                                <img
                                    src="/img/rrss/google.png"
                                    alt="Google Logo"
                                    className="w-6 h-6 mr-2"
                                />
                                Iniciar sesión con Google
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
