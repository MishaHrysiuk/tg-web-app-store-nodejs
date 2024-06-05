const { User, Order, OrderProduct, Product, Category } = require("../models");

class UserController {
    async getUser(req, res) {
        const { chatId } = req.params;
        const user = await User.findOne({ where: { chatId } });
        return res.json(user);
    }

    async getUserOrder(req, res) {
        const { chatId } = req.params;
        const user = await User.findOne({
            where: { chatId },
            // attributes: ["id", "chatId"],
            include: {
                model: Order,
                attributes: {
                    exclude: ["userId"],
                },
                include: {
                    model: OrderProduct,
                    attributes: {
                        exclude: ["orderId", "productId"],
                    },
                    include: {
                        model: Product,
                        attributes: {
                            exclude: ["categoryId"],
                        },
                        include: Category,
                    },
                },
            },
        });
        return res.json(user);
    }

    async updateUser(req, res) {
        const { chatId } = req.params;
        const { country, city, phone } = req.body;
        const user = await User.findOne({ where: { chatId } });
        await user.update({ country, city, phone });
        return res.json(user);
    }
}

module.exports = new UserController();
