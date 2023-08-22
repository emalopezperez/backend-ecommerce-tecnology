const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

async function uploadImage(filePath) {
  return await cloudinary.uploader.upload(filePath, {
    folder: "CRM"
  });
}

module.exports = {
  uploadImage: uploadImage
};
