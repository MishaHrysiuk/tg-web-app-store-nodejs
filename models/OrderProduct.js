const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const OrderProduct = sequelize.define(
    "orderproduct",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    },
);

module.exports = OrderProduct;
