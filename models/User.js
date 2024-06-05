const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
    "user",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        chatId: {
            type: DataTypes.INTEGER,
            unique: true,
        },
        phone: {
            type: DataTypes.STRING,
            validate: {
                is: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i,
            },
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false,
    },
);

module.exports = User;
