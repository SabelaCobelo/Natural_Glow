import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from 'react-toastify'; // Importa ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos de react-toastify
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Productos from './components/Productos';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          {/* Encabezado de la aplicación */}
          <Header />

          {/* Definición de rutas */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
          </Routes>

          {/* Pie de página de la aplicación */}
          <Footer />

          {/* Contenedor de notificaciones */}
          <ToastContainer
            position="bottom-right" // Posición de las notificaciones
            autoClose={3000} // Duración de las notificaciones (3 segundos)
            hideProgressBar={false} // Muestra la barra de progreso
            newestOnTop={false} // Las notificaciones nuevas aparecen debajo
            closeOnClick // Cierra la notificación al hacer clic
            rtl={false} // Dirección del texto (izquierda a derecha)
            pauseOnFocusLoss // Pausa las notificaciones cuando la ventana no está enfocada
            draggable // Permite arrastrar las notificaciones
            pauseOnHover // Pausa las notificaciones al pasar el ratón
          />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;