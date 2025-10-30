const Category = require("../Models/CategoryModel");
const Product = require("../Models/ProductModel");
const { uploadImage, deleteImage } = require("../Utils/cloudinary");

const createCategory = async (req, res) => {
  try {
    let { name } = req.body;

    if (!req.file) {
      return res.status(400).send({ message: "Image is required" });
    }

    const { imageUrl, publicId } = await uploadImage(
      req.file.path,
      "categories"
    );

    const category = new Category({
      name,
      imageUrl,
      publicId,
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    if (categories.length === 0) {
      return res.status(404).send({ message: "Categories Not Found" });
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const UpdateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).send({ message: "Category Not Found" });
    }

    if (req.file) {
      const { imageUrl, publicId } = await uploadImage(
        req.file.path,
        "categories"
      );
      req.body.imageUrl = imageUrl;
      req.body.publicId = publicId;
      await deleteImage(category.publicId);
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      req.body,
      { new: true }
    );
    res.status(200).send(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).send({ message: "Category Not Found" });

    const products = await Product.find({ categoryId: req.params.id });
    products.forEach(async (element) => {
      await deleteImage(element.publicId);
    });
    await Product.deleteMany({ categoryId: req.params.id });
    await Category.findByIdAndDelete(req.params.id);
    await deleteImage(category.publicId);
    res.status(200).send({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  UpdateCategory,
  deleteCategory,
};
