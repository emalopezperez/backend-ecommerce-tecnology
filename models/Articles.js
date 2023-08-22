const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ArticlesShema = Schema({
  titulo: {
    type: String,
    required: true
  },
  autor: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  markdown: {
    type: String,
    required: true
  },

  contenido: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now()
  },
  imagen: {
    type: String,
  },
  likes: [
    {
      usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
})

module.exports = model('articles', ArticlesShema)