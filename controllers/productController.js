const { Product } = require("../models");

class ProductController {
    async getProduct(req, res) {
        const { id } = req.params;
        const product = await Product.findOne({ where: { id } });
        return res.json(product);
    }

    async getAllProducts(req, res) {
        const products = await Product.findAll();
        return res.json(products);
    }
}

module.exports = new ProductController();
