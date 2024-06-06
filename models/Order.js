const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Order = sequelize.define(
    "order",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        updatedAt: false,
    },
);

module.exports = Order;
