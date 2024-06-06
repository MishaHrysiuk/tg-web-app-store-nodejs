const { User, Order, OrderProduct, Product, Category } = require("../models");
const bot = require("../bot");

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

    async createUserOrder(req, res) {
        const { chatId } = req.params;
        const { queryId, products, totalPrice } = req.body;

        const user = await User.findOne({ where: { chatId } });

        const order = await Order.create(
            { totalPrice, userId: user.id },
            {
                include: {
                    model: OrderProduct,
                    include: Product,
                },
            },
        );

        await products.forEach(async (product) => {
            await OrderProduct.create({
                orderId: order.id,
                productId: product.id,
                count: product.count,
            });
        });

        await bot.answerWebAppQuery(queryId, {
            type: "article",
            id: queryId,
            title: "Успішна покупка",
            input_message_content: {
                message_text: `Вітаю з покупкою, ви купили товару на суму ${totalPrice}`,
            },
        });

        console.log(order);

        return res.json(order);
    }
}

module.exports = new UserController();
