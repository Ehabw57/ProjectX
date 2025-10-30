const express = require("express");
const {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../Controller/ProductController");
const upload = require("../Middleware/Multer");

const ProductRouter = express.Router();

ProductRouter.get("/", getAllProducts);
ProductRouter.post("/", upload.single("image"), createProduct);
ProductRouter.put("/:id", upload.single("image"), updateProduct);
ProductRouter.delete("/:id", deleteProduct);

module.exports = ProductRouter;
