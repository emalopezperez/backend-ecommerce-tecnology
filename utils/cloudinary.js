const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'CRM'
  })
}

const deleteImage = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId)
}

module.exports = {
  uploadImage,
  deleteImage
};