const express = require("express");
const router = express.Router();
const categoryController = require("../Controller/CategoryController");

router.post("/", categoryController.createCategory);
router.get("/", categoryController.getAllCategories);
router.put("/:id", categoryController.UpdateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
