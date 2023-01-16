const TelegramBot = require("node-telegram-bot-api");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");

const { text, btnText, requestData } = require("./constants");
const {
  keyboardDefault,
  keyboardDefaultReplay,
  keyboardGeneral,
  subscription,
} = require("./components/buttons");
const { createUser, updateUser, getOneUsers } = require("./mongoDb/index");
const { fondy } = require("./components/paymentsFondy");
const { addInfoUserDB, dateSubs, priceConverter } = require("./helper");

require("dotenv").config();

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

let payLink = "";

const payFn = () => {
  fondy
    .Checkout(requestData)
    .then(async (data) => {
      // console.log(data.checkout_url);
      payLink = data.checkout_url;
      // console.log(data);

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
    throw error;
  }
});

bot.on("callback_query", async (query) => {
  try {
    //chat info
    const nameBtn = query.data;
    const id = query.id;
    const chat_id = query.message.chat.id;
    const message_id = query.message.message_id;

    // userInfo
    const userId = query.from.id;
    const userFirstName = query.from.first_name;
    const userLastName = query.from.last_name;
    const username = query.from.username;

    const generateId = uuidv4();
    const user = await getOneUsers(userId);

    if (nameBtn === "btn_1") {
      await bot.answerCallbackQuery(id);

      requestData.amount = 5000;
      requestData.order_id = generateId;
      requestData.order_desc = text.priceDays;

      payFn();
      addInfoUserDB(userId, userFirstName, userLastName, username, nameBtn);

      if (user.length === 0) {
        createUser();
      } else {
        updateUser(
          userId,
          priceConverter(requestData.amount),
          dateSubs,
          nameBtn
        );
      }

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
      }, 500);
    }

    if (nameBtn === "btn_2") {
      await bot.answerCallbackQuery(id);

      requestData.amount = 25000;
      requestData.order_id = generateId;
      requestData.order_desc = text.priceMonth;

      payFn();
      addInfoUserDB(userId, userFirstName, userLastName, username, nameBtn);

      if (user.length === 0) {
        createUser();
      } else {
        updateUser(
          userId,
          priceConverter(requestData.amount),
          dateSubs,
          nameBtn
        );
      }

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
      }, 500);
    }

    // if (nameBtn === "btn_3") {
    // }

    if (nameBtn === "btn_4") {
      await bot.answerCallbackQuery(id);
      bot.editMessageText(text.choice, {
        chat_id,
        message_id: message_id,
        reply_markup: keyboardDefaultReplay,
      });
    }

    if (nameBtn === "btn_5") {
      await bot.answerCallbackQuery(id);
      bot.editMessageText(text.choice, {
        chat_id,
        message_id: message_id,
        reply_markup: keyboardDefaultReplay,
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
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

// const { Api, TelegramClient
// } = require("telegram")
// const { StringSession } = require("telegram/sessions");

// В КОМЕНТИ КРАЩЕ ВПИСАТИ МІСЯЦЬ АБО 6 МІСЯЦІВ ДЛЯ ВІДСЛІДКОВУВАННЯ ПІДПИСКИ.

// const { optionFn } = require("./helper");

// const session = new StringSession("");
// const client = new TelegramClient(session, apiId, apiHash, {});
