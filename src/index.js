const TelegramBot = require("node-telegram-bot-api");

const { text, btnText } = require("./constants");
require("dotenv").config();
const {
  keyboardDefault,
  keyboardDefaultReplay,
  keyboardBuy,
  keyboardGeneral,
  subscription,
} = require("./components/buttons");
const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

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
    const Id = query.id;
    const chat_id = query.message.chat.id;
    const message_id = query.message.message_id;

    if (name === "btn_1") {
      await bot.answerCallbackQuery(Id);
      bot.editMessageText(text.priceDays, {
        chat_id,
        message_id: message_id,
        reply_markup: keyboardBuy,
      });
    }
    if (name === "btn_2") {
      await bot.answerCallbackQuery(Id);
      bot.editMessageText(text.priceMonth, {
        chat_id,
        message_id: message_id,
        reply_markup: keyboardBuy,
      });
    }
    if (name === "btn_3") {
      await bot.answerCallbackQuery(Id);
      bot.sendMessage(chat_id, text.done);
    }
    if (name === "btn_4") {
      await bot.answerCallbackQuery(Id);
      bot.editMessageText(text.choice, {
        chat_id,
        message_id: message_id,
        reply_markup: keyboardDefaultReplay,
      });
    }
    if (name === "btn_5") {
      await bot.answerCallbackQuery(Id);
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
    // const Id = query.id;
    // const chat_id = query.message.chat.id;
    // const message_id = query.message.message_id;

    // if (name === "btn_1") {
    //   await bot.answerCallbackQuery(Id);
    //   bot.editMessageText(text.priceDays, {
    //     chat_id,
    //     message_id: message_id,
    //     reply_markup: keyboardBuy,
    //   });
    // }

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
    // console.log(query);
    // if (name === "btn_1") {
    //   await bot.answerCallbackQuery(Id);
    //   bot.editMessageText(text.priceDays, {
    //     chat_id,
    //     message_id: message_id,
    //     reply_markup: keyboardBuy,
    //   });
    // }
  } catch (error) {
    console.error(error);
  }
});
