const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Product = sequelize.define(
    "product",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true,
            },
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    },
);

module.exports = Product;
