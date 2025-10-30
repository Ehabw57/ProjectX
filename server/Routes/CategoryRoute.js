const express = require("express");
const router = express.Router();
const {
  createCategory,
  deleteCategory,
  UpdateCategory,
  getAllCategories,
} = require("../Controller/CategoryController");
const upload = require("../Middleware/Multer")

router.post("/", upload.single("image"), createCategory);
router.get("/", getAllCategories);
router.put("/:id", upload.single("image"), UpdateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
