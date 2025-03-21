import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { auth, googleProvider, signInWithPopup } from "../../firebase.js";

const Register: React.FC = () => {
    const { register, login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Validaciones
    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password: string) => {
        return password.length >= 6; // Longitud mínima de 6 caracteres
    };

    const validateBirthdate = (birthdate: string) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1 >= 18; // Verifica si el usuario es mayor de edad
        }
        return age >= 18;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validaciones
        if (!username.trim()) {
            setError("El nombre de usuario es obligatorio.");
            return;
        }

        if (!name.trim()) {
            setError("El nombre es obligatorio.");
            return;
        }

        if (!surname.trim()) {
            setError("Los apellidos son obligatorios.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Por favor, introduce un correo electrónico válido.");
            return;
        }

        if (!validatePassword(password)) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        if (!birthdate || !validateBirthdate(birthdate)) {
            setError("Debes ser mayor de edad para registrarte.");
            return;
        }

        setLoading(true);

        try {
            // Registrar al usuario
            await register(email, password, username, name, surname, birthdate);

            // Iniciar sesión automáticamente
            await login(email, password);

            // Redirigir al carrito
            navigate("/cart");
        } catch (error: any) {
            if (error.code === "auth/email-already-in-use") {
                setError("El correo electrónico ya está en uso.");
            } else if (error.code === "auth/weak-password") {
                setError("La contraseña es demasiado débil.");
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
            console.log("Usuario registrado con Google:", user);
            navigate("/cart"); // Redirige al carrito después del registro
        } catch (error: any) {
            setError("Error al registrarse con Google.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#F9E5A4] to-[#F1D0A4]">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-[#6F6134] mb-6">
                    Regístrate
                </h1>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Nombre de usuario
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Nombre de usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9E5A4]"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9E5A4]"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
                            Apellidos
                        </label>
                        <input
                            id="surname"
                            type="text"
                            placeholder="Apellidos"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9E5A4]"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirmar contraseña
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirmar contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9E5A4]"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">
                            Fecha de nacimiento
                        </label>
                        <input
                            id="birthdate"
                            type="date"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9E5A4]"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 bg-[#6F6134] text-white font-semibold rounded-md hover:bg-[#5A4D2B] transition-colors flex items-center justify-center ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {loading ? (
                            <div className="w-8 h-8 border-4 border-white border-t-4 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Registrarse"
                        )}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm">
                        ¿Ya tienes una cuenta?{" "}
                        <Link to="/login" className="text-[#6F6134] hover:underline">
                            Inicia sesión
                        </Link>
                    </p>
                </div>

                <div className="mt-6">
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className={`w-full py-3 bg-white text-gray-800 font-semibold rounded-md border border-gray-300 hover:border-gray-400 hover:shadow-md transition-all flex items-center justify-center ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
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
                                Registrarse con Google
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;