const express = require("express");
const {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
} = require("../Controller/ProductController");
const upload = require("../Middleware/Multer");
const adminAuth = require("../Middleware/authorMiddle");

const ProductRouter = express.Router();

ProductRouter.get("/", getAllProducts);
ProductRouter.get("/:id", getProductById);
ProductRouter.post("/", adminAuth, upload.single("image"), createProduct);
ProductRouter.put("/:id", adminAuth, upload.single("image"), updateProduct);
ProductRouter.delete("/:id", adminAuth, deleteProduct);

module.exports = ProductRouter;
