const TelegramBot = require("node-telegram-bot-api");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");
const opn = require("better-opn");

// В КОМЕНТИ КРАЩЕ ВПИСАТИ МІСЯЦЬ АБО 6 МІСЯЦІВ ДЛЯ ВІДСЛІДКОВУВАННЯ ПІДПИСКИ.

// const { optionFn } = require("./helper");

const { text, btnText, requestData } = require("./constants");
require("dotenv").config();
const {
  keyboardDefault,
  keyboardDefaultReplay,
  keyboardBuy,
  keyboardGeneral,
  subscription,
} = require("./components/buttons");

const { fondy } = require("./components/paymentsFondy");
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const pay = () => {
  fondy
    .Checkout(requestData)
    .then((data) => {
      console.log(data.checkout_url);
      opn(data.checkout_url);
    })
    .catch((error) => {
      console.log(error);
    });
};

bot.onText(/\/start/, async (msg) => {
  try {
    pic = "src/img/prev.jpg";
    chat_id = msg.chat.id;
    await bot.sendPhoto(chat_id, pic, {
      caption: text.caption,
      reply_markup: keyboardGeneral,
    });

    await bot.sendMessage(chat_id, text.choice, { ...keyboardDefault });
  } catch (error) {
    console.error(error);
  }
});

bot.on("callback_query", async (query) => {
  try {
    const name = query.data;
    const id = query.id;
    const chat_id = query.message.chat.id;
    const message_id = query.message.message_id;

    const generateId = uuidv4();

    if (name === "btn_1") {
      await bot.answerCallbackQuery(id);
      setTimeout(() => {
        bot.editMessageText(text.priceDays, {
          chat_id,
          message_id: message_id,
          reply_markup: keyboardBuy,
        });
        requestData.amount = 5000;
        requestData.order_id = generateId;
        requestData.order_desc = text.priceDays;
        // requestData.amount = optionFn();
      }, 300);
    }
    if (name === "btn_2") {
      await bot.answerCallbackQuery(id);
      requestData.amount = 25000;
      requestData.order_id = generateId;
      requestData.order_desc = text.priceMonth;
      setTimeout(() => {
        bot.editMessageText(text.priceMonth, {
          chat_id,
          message_id: message_id,
          reply_markup: keyboardBuy,
        });
      }, 300);
    }
    if (name === "btn_3") {
      await bot.answerCallbackQuery(id);

      setTimeout(() => {
        pay();

        // bot.sendMessage(chat_id, text.done);
      }, 300);
    }
    if (name === "btn_4") {
      await bot.answerCallbackQuery(id);
      bot.editMessageText(text.choice, {
        chat_id,
        message_id: message_id,
        reply_markup: keyboardDefaultReplay,
      });
    }
    if (name === "btn_5") {
      await bot.answerCallbackQuery(id);
      bot.editMessageText(text.choice, {
        chat_id,
        message_id: message_id,
        reply_markup: keyboardDefaultReplay,
      });
    }
  } catch (error) {
    console.error(error);
  }
});
bot.on("message", async (msg) => {
  try {
    const msgText = msg.text;
    const chatId = msg.chat.id;

    switch (msgText) {
      case btnText.tariff:
        bot.sendMessage(chatId, text.choice, { ...keyboardDefault });

        break;
      case btnText.mySubscription:
        bot.sendMessage(chatId, text.mySubscription, { ...subscription });
        break;

      default:
        break;
    }
  } catch (error) {
    console.error(error);
  }
});
