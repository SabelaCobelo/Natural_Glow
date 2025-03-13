import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext"; // Proveedor de autenticación
import { CartProvider } from "./context/CartContext"; // Proveedor del carrito
import Header from './components/Header'; // Componente del encabezado
import Footer from './components/Footer'; // Componente del pie de página
import Home from './pages/Home'; // Página de inicio
import Productos from './components/Productos'; // Página de productos
import Contacto from './pages/Contacto'; // Página de contacto
import Login from './pages/Login'; // Página de inicio de sesión
import Register from './pages/Register'; // Página de registro
import ProductDetail from './pages/ProductDetail'; // Página de detalles del producto
import Cart from './pages/Cart'; // Página del carrito
import ProtectedRoute from './components/ProtectedRoute'; // Ruta protegida

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          {/* Encabezado de la aplicación */}
          <Header />

          {/* Definición de rutas */}
          <Routes>
            {/* Ruta principal (Home) */}
            <Route path="/" element={<Home />} />

            {/* Ruta para la página de productos */}
            <Route path="/productos" element={<Productos />} />

            {/* Ruta para la página de detalles del producto */}
            <Route path="/product/:id" element={<ProductDetail />} />

            {/* Ruta para la página de contacto */}
            <Route path="/contacto" element={<Contacto />} />

            {/* Ruta para la página de inicio de sesión */}
            <Route path="/login" element={<Login />} />

            {/* Ruta para la página de registro */}
            <Route path="/register" element={<Register />} />

            {/* Ruta protegida para el carrito */}
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
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;