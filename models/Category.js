const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Category = sequelize.define(
    "category",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false,
    },
);

module.exports = Category;
