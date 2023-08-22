const { validationResult, body } = require('express-validator');
const Products = require('../models/Products')
const fs = require('fs');
const path = require('path')

const cloudinary = require('../utils/cloudinary');
const uploadImage = cloudinary.uploadImage;


const createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { titulo, slug, contenido, categoria, precio, descripcion, stock, str_variedad, estado, descuento, imagenes } = req.body;


    
    const product = new Products({ titulo, slug, contenido, categoria, precio, descripcion, stock, str_variedad, estado, descuento, imagenes });

    if (req.files?.imagen) {
      const result = await uploadImage(req.files.imagen.tempFilePath);

      product.imagenes.push(result.secure_url);
    }

    const savedProduct = await product.save();
    return res.status(201).json({ msg: "El artículo ha sido creado correctamente", article: savedProduct });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Ha ocurrido un error al crear el artículo" });
  }
}


const listProducts = async (req, res) => {
  try {
    let items = await Products.find({});

    return res.status(200).send({
      status: "success",
      items
    });
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: err.message
    });
  }
};

const listProductsLimit = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const items = await Products.find({}).limit(limit);

    return res.status(200).send({
      status: "success",
      items
    });
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: err.message
    });
  }
};

const listProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const items = await Products.find({ categoria: category });

    return res.status(200).send({
      status: "success",
      items
    });
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: err.message
    });
  }
};


const deleteProduct = async (req, res) => {
  try {
    let id = req.params.id
    let item = await Products.findByIdAndDelete({ _id: id })

    return res.status(200).send({
      status: "success",
      item
    });
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: err.message
    });
  }
}

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const newImages = req.files?.nuevasImagenes;

    const updatedProduct = await Products.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    if (newImages && newImages.length > 0) {
      for (const image of newImages) {
        const result = await uploadImage(image.tempFilePath);
        updatedProduct.imagenes.push(result.secure_url);
      }
      await updatedProduct.save(); 
    }

    return res.status(200).json({
      message: 'Producto actualizado exitosamente',
      product: updatedProduct
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar el producto' });
  }
};



module.exports = {
  listProducts,
  listProductsLimit,
  listProductsByCategory,
  createProduct,
  deleteProduct,
  updateProduct
}