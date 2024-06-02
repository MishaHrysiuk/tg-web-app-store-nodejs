const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

require('dotenv').config()

const token = process.env.TOKEN;
const webAppUrl = process.env.WEB_URL;

const bot = new TelegramBot(token, {polling: true});
const app = express();

app.use(express.json());
app.use(cors());

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if(text === '/start') {
        await bot.sendMessage(chatId, 'Нижче появиться кнопка, заповніть форму', {
            reply_markup: {
                keyboard: [
                    [{text: 'Заповніть форму', web_app: {url: webAppUrl + '/form'}}]
                ]
            }
        })

        await bot.sendMessage(chatId, 'Заходьте в наш інтернет по кнопці нижче', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Зробити заказ', web_app: {url: webAppUrl}}]
                ]
            }
        })
    }

    if(msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg?.web_app_data?.data)
            console.log(data)
            await bot.sendMessage(chatId, "Дякую за зворотній звя'зок")
            await bot.sendMessage(chatId, 'Ваша країна: ' + data?.country);
            await bot.sendMessage(chatId, 'Ваша вулиця: ' + data?.street);

            setTimeout(async () => {
                await bot.sendMessage(chatId, 'Всю інформацію ви отрмаєте у цьому чаті');
            }, 3000)
        } catch (e) {
            console.log(e);
        }
    }
});

app.post('/web-data', async (req, res) => {
    const {queryId, products = [], totalPrice} = req.body;
    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Успішна покупка',
            input_message_content: {
                message_text: `Вітаю з покупкою, ви купили товару на суму ${totalPrice}, ${products.map(item => item.title).join(', ')}`
            }
        })
        return res.status(200).json({});
    } catch (e) {
        return res.status(500).json({})
    }
})

const PORT = process.env.PORT;

app.listen(PORT, () => console.log('Server started on PORT ' + PORT))