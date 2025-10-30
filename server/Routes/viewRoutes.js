const express = require("express");
const { renderCategory } = require("../Controller/viewController");
const router = express.Router();

router.get("/", renderCategory);
module.exports = router;
