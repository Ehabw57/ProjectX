const fs = require("fs");
const Products = require("../Models/ProductModel");
const Categories = require("../Models/CategoryModel");
const { uploadImage, deleteImage } = require("../Utils/cloudinary");
const { request } = require("http");
const resizeImage = require("../Utils/imageProcess");

async function getAllProducts(req, res) {
  try {
    const products = await Products.find().populate("categoryId", "name");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//get product by id
async function getProductById(req, res) {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function createProduct(req, res) {
  try {
    const { name, categoryId } = req.body;

    if (!(await Categories.findById(categoryId))) {
      return res.status(400).json({ message: "Invalid categoryId" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    await resizeImage(req.file.path, 500, 500);
    const { imageUrl, publicId } = await uploadImage(req.file.path, "products");
    fs.unlinkSync(req.file.path);

    const product = new Products({ name, imageUrl, publicId, categoryId });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (req.file) {
      await resizeImage(req.file.path, 500, 500);
      const { imageUrl, publicId } = await uploadImage(
        req.file.path,
        "products"
      );
      fs.unlinkSync(req.file.path);
      await deleteImage(product.publicId);
      req.body.imageUrl = imageUrl;
      req.body.publicId = publicId;
    }
    Object.assign(product, req.body);
    await product.save();

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
