const User = require("./User");
const Product = require("./Product");
const Order = require("./Order");
const Category = require("./Category");
const OrderProduct = require("./OrderProduct");

User.hasMany(Order);
Order.belongsTo(User);

Category.hasMany(Product);
Product.belongsTo(Category);

Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });
Order.hasMany(OrderProduct);
OrderProduct.belongsTo(Order);
Product.hasMany(OrderProduct);
OrderProduct.belongsTo(Product);

module.exports = {
    User,
    Product,
    Order,
    Category,
    OrderProduct,
};
