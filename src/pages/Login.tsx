import React, { useState } from "react";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [attempts, setAttempts] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validación básica
        if (username === "" || password === "") {
            setErrorMessage("Por favor, complete todos los campos.");
            return;
        }

        // Simulación de autenticación (reemplazar con lógica real)
        if (username === "usuario" && password === "contraseña") {
            setErrorMessage("");
            console.log("Usuario autenticado:", username);
            // Redirigir al home o dashboard
        } else {
            setAttempts(attempts + 1);
            if (attempts >= 2) {
                setErrorMessage("Demasiados intentos fallidos. Intente nuevamente en 5 minutos.");
                // Bloquear temporalmente (opcional)
            } else {
                setErrorMessage("Usuario o contraseña incorrectos.");
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#F9E5A4] to-[#F1D0A4]">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-3xl font-bold text-center text-primary mb-6">Iniciar Sesión</h1>

                {/* Mensaje de error */}
                {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9E5A4]"
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9E5A4]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-primary text-white font-semibold rounded-md hover:bg-[#6F6134] transition-colors"
                    >
                        Iniciar sesión
                    </button>
                </form>

                {/* Opción para autenticación con Google */}
                <div className="text-center mt-4">
                    <button
                        onClick={() => console.log("Autenticación con Google")}
                        className="w-full py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
                    >
                        Iniciar sesión con Google
                    </button>
                </div>

                <div className="text-center mt-4">
                    <p className="text-sm">
                        ¿No tienes cuenta?{" "}
                        <a href="/register" className="text-primary hover:underline">
                            Regístrate
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;