const CategoryModel = require("../Models/CategoryModel");
const ProductModel = require("../Models/ProductModel");
const renderCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find({});
    res.render("home", {
      title: "Home",
      categories: categories.map((cat) => cat.toObject()),
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      title: "Error",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const renderProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await CategoryModel.findById(categoryId);

    if (!category) {
      return res.status(404).render("error", {
        title: "Category Not Found",
        message: "The selected category does not exist.",
      });
    }

    const products = await ProductModel.find({ categoryId });

    res.render("products", {
      title: `Products in ${category.name}`,
      category: category.toObject(),
      products: products.map((p) => p.toObject()),
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", {
      title: "Error",
      message: "Something went wrong while loading products.",
      error: error.message,
    });
  }
};
module.exports = {
  renderCategory,
  renderProductsByCategory,
};
