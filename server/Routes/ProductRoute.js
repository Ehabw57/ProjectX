const express = require("express");
const {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../Controller/ProductController");

const ProductRouter = express.Router();

ProductRouter.get("/", getAllProducts);
ProductRouter.post("/", createProduct);
ProductRouter.put("/:id", updateProduct);
ProductRouter.delete("/:id", deleteProduct);

module.exports = ProductRouter;
