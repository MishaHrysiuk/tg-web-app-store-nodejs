const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TOKEN;

const bot = new TelegramBot(token, {
    polling: true,
    // testEnvironment: true
});

module.exports = bot;
