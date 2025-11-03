const express = require("express");
const router = express.Router();
const {
  createCategory,
  deleteCategory,
  UpdateCategory,
  getAllCategories,
  getCategoryById,
} = require("../Controller/CategoryController");
const upload = require("../Middleware/Multer");
const adminAuth = require("../Middleware/authorMiddle");

router.post("/", adminAuth, upload.single("image"), createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.put("/:id", adminAuth, upload.single("image"), UpdateCategory);
router.delete("/:id", adminAuth, deleteCategory);

module.exports = router;
