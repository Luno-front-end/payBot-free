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
  keyboardGeneral,
  subscription,
} = require("./components/buttons");

const { fondy } = require("./components/paymentsFondy");
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

let payLink = "";

const pay = () => {
  fondy
    .Checkout(requestData)
    .then(async (data) => {
      console.log(data.checkout_url);
      payLink = data.checkout_url;
      console.log(data);

      return payLink;
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
  console.log("Виклик");

  try {
    const name = query.data;
    const id = query.id;
    const chat_id = query.message.chat.id;
    const message_id = query.message.message_id;

    const generateId = uuidv4();

    if (name === "btn_1") {
      requestData.amount = 5000;
      requestData.order_id = generateId;
      requestData.order_desc = text.priceDays;
      pay();
      await bot.answerCallbackQuery(id);
      setTimeout(() => {
        bot.editMessageText(text.priceDays, {
          chat_id,
          message_id: message_id,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: btnText.buy,
                  callback_data: "btn_3",
                  url: payLink,
                },
              ],
              [{ text: btnText.back, callback_data: "btn_4" }],
            ],
          },
        });

        // requestData.amount = optionFn();
      }, 300);
      // if (requestData.order_desc !== "") {
      // }
    }
    if (name === "btn_2") {
      await bot.answerCallbackQuery(id);
      requestData.amount = 25000;
      requestData.order_id = generateId;
      requestData.order_desc = text.priceMonth;
      pay();

      setTimeout(() => {
        bot.editMessageText(text.priceMonth, {
          chat_id,
          message_id: message_id,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: btnText.buy,
                  callback_data: "btn_3",
                  url: payLink,
                },
              ],
              [{ text: btnText.back, callback_data: "btn_4" }],
            ],
          },
        });
      }, 300);
    }

    // if (name === "btn_3") {
    //   await bot.answerCallbackQuery(id);

    //   // setTimeout(() => {

    //   // bot.sendMessage(chat_id, text.done);
    //   // }, 300);
    // }
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
      case btnText.clubRules:
        bot.sendMessage(chatId, text.clubRules);
        break;

      default:
        break;
    }
  } catch (error) {
    console.error(error);
  }
});
