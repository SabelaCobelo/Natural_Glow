import mongoose from 'mongoose';

// Define el esquema del producto
const productSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    price: Number,
    image: String,
    category: String,
});

// Crea el modelo de Producto
const Product = mongoose.model('Product', productSchema);

// Conecta a MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('MONGO_URI', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error conectando a MongoDB:', error);
    }
};

// Obtener todos los productos
export const getProducts = async () => {
    await connectDB();
    const products = await Product.find({});
    return products;
};