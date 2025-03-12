import React, { useState } from "react";

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

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Título de la página */}
            <h1 className="text-4xl font-bold text-center text-primary mb-12">
                Contáctanos
            </h1>

            {/* Información de contacto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                        ¿Tienes alguna pregunta?
                    </h2>
                    <p className="text-lg text-secondary mb-8">
                        Estamos aquí para ayudarte. Si tienes alguna consulta, no dudes en ponerte en contacto con nosotros. ¡Te responderemos lo más pronto posible!
                    </p>
                    <p className="text-lg text-primary">
                        <strong>Dirección:</strong> Calle Ficticia, 123, Ciudad, País
                    </p>
                    <p className="text-lg text-primary">
                        <strong>Teléfono:</strong> +123 456 789
                    </p>
                    <p className="text-lg text-primary">
                        <strong>Correo:</strong> contacto@naturalglow.com
                    </p>
                </div>

                {/* Formulario de contacto */}
                <div>
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-lg text-primary mb-2">
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Tu nombre"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-lg text-primary mb-2">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Tu correo electrónico"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="message" className="block text-lg text-primary mb-2">
                                Mensaje
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Escribe tu mensaje aquí..."
                                rows={5}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-[#E1C68F] transition-all duration-300"
                        >
                            Enviar Mensaje
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
