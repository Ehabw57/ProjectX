const Category = require("../Models/CategoryModel");
const Product = require("../Models/ProductModel");

//Create Category
const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res
      .status(201)
      .send({ message: "Category created successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//Get All Categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    if (categories.length === 0) {
      return res.status(404).send({ message: "Categories Not Found" });
    }
    res
      .status(200)
      .send({ message: "Categories fetched successfully", categories });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//Update Category
const UpdateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send({ message: "Category Not Found" });
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .send({ message: "Category updated successfully", updatedCategory });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//Delete Category
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send({ message: "Category Not Found" });
    }
    await Product.deleteMany({ categoryId: req.params.id });
    await Category.findByIdAndDelete(req.params.id);
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
