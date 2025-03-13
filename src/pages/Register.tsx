import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register: React.FC = () => {
    const { login } = useAuth(); // Función de inicio de sesión desde el contexto
    const navigate = useNavigate(); // Hook para navegación programática

    // Estados para los campos del formulario
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");

    // Estados para manejar errores
    const [error, setError] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Validar si el usuario es mayor de edad
    const isAdult = (date: string): boolean => {
        const birthDate = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1 >= 18;
        }
        return age >= 18;
    };

    // Validar el formulario
    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!username) newErrors.username = "El nombre de usuario es obligatorio.";
        if (!password) newErrors.password = "La contraseña es obligatoria.";
        if (!firstName) newErrors.firstName = "El nombre es obligatorio.";
        if (!lastName) newErrors.lastName = "Los apellidos son obligatorios.";
        if (!email) {
            newErrors.email = "El correo electrónico es obligatorio.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "El correo electrónico no es válido.";
        }
        if (!birthDate) {
            newErrors.birthDate = "La fecha de nacimiento es obligatoria.";
        } else if (!isAdult(birthDate)) {
            newErrors.birthDate = "Debes ser mayor de edad para registrarte.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
    };

    // Manejar el envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            // Simulación de registro (puedes reemplazar con una llamada a la API)
            const userData = {
                username,
                password,
                firstName,
                lastName,
                email,
                birthDate,
            };

            console.log("Registro exitoso:", userData);

            // Simula el inicio de sesión automático después del registro
            login(); // Cambia el estado de autenticación a true
            navigate("/cart"); // Redirige al carrito

            // Opcional: Enviar un correo de confirmación
            // sendConfirmationEmail(email);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#F9E5A4] to-[#F1D0A4]">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                {/* Título del formulario */}
                <h1 className="text-3xl font-bold text-center text-[#6F6134] mb-6">
                    Regístrate
                </h1>

                {/* Mostrar mensaje de error general */}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {/* Formulario de registro */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Campo de nombre de usuario */}
                    <div>
                        <input
                            type="text"
                            placeholder="Nombre de usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9E5A4]"
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                        )}
                    </div>

                    {/* Campo de contraseña */}
                    <div>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9E5A4]"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Campo de nombre */}
                    <div>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9E5A4]"
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                        )}
                    </div>

                    {/* Campo de apellidos */}
                    <div>
                        <input
                            type="text"
                            placeholder="Apellidos"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9E5A4]"
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                        )}
                    </div>

                    {/* Campo de correo electrónico */}
                    <div>
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9E5A4]"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Campo de fecha de nacimiento */}
                    <div>
                        <input
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9E5A4]"
                        />
                        {errors.birthDate && (
                            <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>
                        )}
                    </div>

                    {/* Botón de registro */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-[#6F6134] text-white font-semibold rounded-md hover:bg-[#5A4D2B] transition-colors"
                    >
                        Registrarse
                    </button>
                </form>

                {/* Enlace para iniciar sesión */}
                <div className="text-center mt-4">
                    <p className="text-sm">
                        ¿Ya tienes una cuenta?{" "}
                        <Link
                            to="/login"
                            className="text-[#6F6134] hover:underline"
                        >
                            Inicia sesión
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;