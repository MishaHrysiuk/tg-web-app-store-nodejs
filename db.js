const { Sequelize } = require("sequelize");

module.exports = new Sequelize(process.env.DB_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: (...msg) =>
        console.log(
            "\x1b[34m",
            `PostgreSQL => ${msg}`.slice(0, 80) + "...",
            "\x1b[37m",
        ),
});
