import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Register from './pages/Register'; // Importa el componente Register

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} /> {/* Ruta para login */}
        <Route path="/register" element={<Register />} /> {/* Ruta para registro */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
