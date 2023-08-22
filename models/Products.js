const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ProductsSchema = Schema({
  titulo: { type: String, required: false },
  slug: { type: String, required: false },
  contenido: { type: String, required: false },
  categoria: { type: String, required: false },
  precio: { type: Number, required: false },
  descripcion: { type: String, required: false },
  stock: { type: Number, default: 0, required: false },
  str_variedad: { type: String, required: false },
  estado: { type: Boolean, required: false },
  descuento: { type: Boolean, required: false },
  rating: { type: Number, required: false },
  imagenes: [{ type: String }],
  updatedAt: { type: Date, required: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('products', ProductsSchema);
