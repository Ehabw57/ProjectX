const express = require("express");
const {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
} = require("../Controller/ProductController");
const upload = require("../Middleware/Multer");

const ProductRouter = express.Router();

ProductRouter.get("/", getAllProducts);
ProductRouter.get("/:id", getProductById);
ProductRouter.post("/", upload.single("image"), createProduct);
ProductRouter.put("/:id", upload.single("image"), updateProduct);
ProductRouter.delete("/:id", deleteProduct);

module.exports = ProductRouter;
