import axios, { AxiosError } from "axios";

const API_URL = "http://localhost:5000/api"; // URL de tu backend

// Función para registrar un usuario
export const registerUser = async (userData: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: string;
}) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Ahora TypeScript sabe que `error` es de tipo `AxiosError`
            throw new Error(error.response?.data?.message || "Error en el registro");
        } else {
            // Si no es un error de Axios, lanzamos un error genérico
            throw new Error("Error inesperado en el registro");
        }
    }
};