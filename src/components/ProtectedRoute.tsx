import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isLoggedIn, isLoading } = useAuth(); // Obtén el estado de autenticación y carga
    const location = useLocation(); // Obtén la ubicación actual

    // Si está cargando, muestra un mensaje de carga
    if (isLoading) {
        return <div className="text-center py-8">Cargando...</div>; // O un spinner
    }

    // Si el usuario no está autenticado, redirige al login con un mensaje
    if (!isLoggedIn) {
        toast.info("Debes iniciar sesión para acceder a esta página."); // Notificación
        return <Navigate to="/login" state={{ from: location }} replace />; // Redirige con estado
    }

    // Si el usuario está autenticado, renderiza el contenido
    return <>{children}</>;
};

export default ProtectedRoute;