const { Category } = require("../models");

class CategoryController {
    async getAllCategories(req, res) {
        const categories = await Category.findAll();
        return res.json(categories);
    }
}

module.exports = new CategoryController();
