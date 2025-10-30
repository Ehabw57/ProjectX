const CategoryModel = require("../Models/CategoryModel");

const renderCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find({});
    res.render("home", {
      title: "Home",
      categories,
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

module.exports = {
  renderCategory,
};
