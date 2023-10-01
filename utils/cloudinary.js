const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const uploadImage = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "CRM",
    });
    return result;
  } catch (error) {
    console.error("Error al subir imagen a Cloudinary:", error);
    throw error;
  }
};

const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Error al eliminar imagen de Cloudinary:", error);
    throw error;
  }
};

module.exports = {
  uploadImage,
  deleteImage,
};