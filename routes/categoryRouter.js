const Router = require("express");
const router = new Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.getAllCategories);

module.exports = router;
