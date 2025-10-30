const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

async function uploadImage(file, folder) {
  if (!file) {
    throw new Error("No file uploaded");
  }

  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: folder || "uploads",
    });
    return { imageUrl: result.secure_url, publicId: result.public_id };
  } catch (err) {
    throw new Error("Error uploading file: " + err.message);
  }
}

async function deleteImage(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw new Error("Error deleting image: " + error.message);
  }
}

module.exports = { uploadImage, deleteImage };
