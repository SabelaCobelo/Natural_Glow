import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login: React.FC = () => {
    const { login } = useAuth(); // Función de inicio de sesión desde el contexto
    const navigate = useNavigate(); // Hook para navegación programática
    const [username, setUsername] = useState(""); // Estado para el nombre de usuario
    const [password, setPassword] = useState(""); // Estado para la contraseña
    const [error, setError] = useState(""); // Estado para manejar errores

    // Manejar el envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simulación de autenticación
        if (username === "usuario" && password === "contraseña") {
            login(); // Cambia el estado de autenticación a true
            navigate("/cart"); // Redirige al carrito
        } else {
            setError("Usuario o contraseña incorrectos"); // Muestra un mensaje de error
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#F9E5A4] to-[#F1D0A4]">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                {/* Título del formulario */}
                <h1 className="text-3xl font-bold text-center text-[#6F6134] mb-6">
                    Iniciar Sesión
                </h1>

                {/* Mostrar mensaje de error si existe */}
                {error && (
                    <p className="text-red-500 text-center mb-4">{error}</p>
                )}

                {/* Formulario de inicio de sesión */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Campo de nombre de usuario */}
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9E5A4]"
                        required
                    />

                    {/* Campo de contraseña */}
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9E5A4]"
                        required
                    />

                    {/* Botón de inicio de sesión */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-[#6F6134] text-white font-semibold rounded-md hover:bg-[#5A4D2B] transition-colors"
                    >
                        Iniciar sesión
                    </button>
                </form>

                {/* Enlace para registrarse */}
                <div className="text-center mt-4">
                    <p className="text-sm">
                        ¿No tienes cuenta?{" "}
                        <Link
                            to="/register"
                            className="text-[#6F6134] hover:underline"
                        >
                            Regístrate
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;