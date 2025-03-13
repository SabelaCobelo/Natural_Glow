import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa"; // Íconos para la información de contacto
import { motion } from "framer-motion"; // Para animaciones avanzadas

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Lógica para enviar el formulario (puedes integrar una API aquí)
        alert("Formulario enviado!");
    };

    // Animaciones con Framer Motion
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const stagger = {
        visible: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    return (
        <div className="bg-gradient-to-b from-[#FAE7C9] to-white min-h-screen py-12">
            <div className="container mx-auto px-4">
                {/* Título de la página */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl font-bold text-center text-[#6F6134] mb-12"
                >
                    Contáctanos
                </motion.h1>

                {/* Información de contacto y formulario */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-12"
                >
                    {/* Información de contacto */}
                    <motion.div
                        variants={fadeInUp}
                        className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <h2 className="text-3xl font-semibold text-[#6F6134] mb-8">
                            ¿Tienes alguna pregunta?
                        </h2>
                        <p className="text-lg text-[#5A4D2B] mb-8">
                            Estamos aquí para ayudarte. Si tienes alguna consulta, no dudes en ponerte en contacto con nosotros. ¡Te responderemos lo más pronto posible!
                        </p>

                        {/* Detalles de contacto con íconos */}
                        <div className="space-y-6">
                            <motion.div
                                variants={fadeInUp}
                                className="flex items-center space-x-4"
                            >
                                <FaMapMarkerAlt className="w-8 h-8 text-[#6F6134]" />
                                <p className="text-lg text-[#5A4D2B]">
                                    <strong>Dirección:</strong> Calle Ficticia, 123, Ciudad, País
                                </p>
                            </motion.div>
                            <motion.div
                                variants={fadeInUp}
                                className="flex items-center space-x-4"
                            >
                                <FaPhone className="w-8 h-8 text-[#6F6134]" />
                                <p className="text-lg text-[#5A4D2B]">
                                    <strong>Teléfono:</strong> +123 456 789
                                </p>
                            </motion.div>
                            <motion.div
                                variants={fadeInUp}
                                className="flex items-center space-x-4"
                            >
                                <FaEnvelope className="w-8 h-8 text-[#6F6134]" />
                                <p className="text-lg text-[#5A4D2B]">
                                    <strong>Correo:</strong> contacto@naturalglow.com
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Formulario de contacto */}
                    <motion.div
                        variants={fadeInUp}
                        className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <motion.div variants={fadeInUp}>
                                <label htmlFor="name" className="block text-lg text-[#6F6134] mb-2">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-[#E1C68F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F6134]"
                                    placeholder="Tu nombre"
                                    required
                                    aria-required="true"
                                />
                            </motion.div>
                            <motion.div variants={fadeInUp}>
                                <label htmlFor="email" className="block text-lg text-[#6F6134] mb-2">
                                    Correo Electrónico
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-[#E1C68F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F6134]"
                                    placeholder="Tu correo electrónico"
                                    required
                                    aria-required="true"
                                />
                            </motion.div>
                            <motion.div variants={fadeInUp}>
                                <label htmlFor="message" className="block text-lg text-[#6F6134] mb-2">
                                    Mensaje
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-[#E1C68F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F6134]"
                                    placeholder="Escribe tu mensaje aquí..."
                                    rows={5}
                                    required
                                    aria-required="true"
                                />
                            </motion.div>
                            <motion.div variants={fadeInUp}>
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-[#6F6134] text-white font-semibold rounded-lg hover:bg-[#5A4D2B] transition-all duration-300"
                                >
                                    Enviar Mensaje
                                </button>
                            </motion.div>
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;