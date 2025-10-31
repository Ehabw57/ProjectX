const express = require("express");
const {
  renderCategory,
  renderProductsByCategory,
} = require("../Controller/viewController");
const router = express.Router();

router.get("/", renderCategory);
router.get("/category/:id/products", renderProductsByCategory);
module.exports = router;
