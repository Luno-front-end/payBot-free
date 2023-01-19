const TelegramBot = require("node-telegram-bot-api");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");

const { text, btnText, paymentTilte } = require("./constants");
const { requestData, resData, paymentInfo } = require("./payment/dataReq");
const {
  keyboardDefault,
  keyboardDefaultReplay,
  keyboardGeneral,
  subscription,
} = require("./components/buttons");
const {
  createUser,
  updateUser,
  getOneUserById,
  getAllUsers,
} = require("./mongoDb/index");
const { reqFondy, resPayment } = require("./payment/paymentsFondy");
const { addInfoUserDB, priceConverter, timePay } = require("./helper");
const { createShaPost, createShaRes } = require("./payment/sha");
const server = require("./server");

require("dotenv").config();
server();

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// let payLink = "";

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
    const user = await getOneUserById(userId);

    if (nameBtn === "btn_1") {
      await bot.answerCallbackQuery(id);

      requestData.request.amount = 5000;
      requestData.request.order_id = generateId;
      requestData.request.order_desc = paymentTilte.titleStandart;
      requestData.request.signature = createShaPost();

      await reqFondy().then((res) => {
        console.log(res);
        paymentInfo.pay_id = res.response.payment_id;
        paymentInfo.pay_link = res.response.checkout_url;
      });

      addInfoUserDB(
        userId,
        userFirstName,
        userLastName,
        username,
        nameBtn,
        generateId,
        paymentInfo.pay_id,
        requestData.request.amount,
        paymentTilte.titleStandart
      );

      if (user.length === 0) {
        createUser();
      } else {
        updateUser(
          userId,
          priceConverter(requestData.amount),
          nameBtn,
          generateId,
          paymentInfo.pay_id
        );
      }
      // console.log("paymentInfo.pay_idBOT", paymentInfo.pay_id);
      resData.request.order_id = generateId;
      resData.request.signature = createShaRes();

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
                  url: paymentInfo.pay_link,
                },
              ],
              [{ text: btnText.back, callback_data: "btn_4" }],
            ],
          },
        });
      }, 500);
      // setInterval(() => {
      //   resPayment();
      // }, 25000);

      // function timer(flag) {
      //     var intervalId = setInterval (function(){...}
      //     if (flag == 'false') {
      //                 clearInterval(intervalId);
      //              }
      // }
    }

    if (nameBtn === "btn_2") {
      await bot.answerCallbackQuery(id);

      requestData.request.amount = 25000;
      requestData.request.order_id = generateId;
      requestData.request.order_desc = paymentTilte.titleAdvanced;
      requestData.request.signature = createShaPost();

      await reqFondy().then((res) => {
        paymentInfo.pay_id = res.response.payment_id;
        paymentInfo.pay_link = res.response.checkout_url;
      });

      // createPay();
      addInfoUserDB(
        userId,
        userFirstName,
        userLastName,
        username,
        nameBtn,
        generateId,
        paymentInfo.pay_id,
        requestData.request.amount,
        paymentTilte.titleAdvanced
      );

      if (user.length === 0) {
        createUser();
      } else {
        updateUser(
          userId,
          priceConverter(requestData.amount),
          nameBtn,
          generateId,
          paymentInfo.pay_id
        );
      }

      resData.request.order_id = generateId;
      resData.request.signature = createShaRes();

      setTimeout(async () => {
        await bot.editMessageText(text.priceMonth, {
          chat_id,
          message_id: message_id,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: btnText.buy,
                  callback_data: "btn_3",

                  url: paymentInfo.pay_link,
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
  }
});

bot.on("message", async (msg) => {
  try {
    const msgText = msg.text;
    const chatId = msg.chat.id;

    console.log(chatId);

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
      case btnText.descriptionClub:
        bot.sendMessage(chatId, text.descriptionClub);
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(error);
  }
});

// setInterval(async () => {
//   const date = timePay();
//   const users = await getAllUsers();
//   console.log("object");
//   users.forEach((user) => {
//     if (user.payment.datePay === date) {
//       bot.sendMessage(user.user_id, "Підписка була продовжена!🫡 🎉");
//     }
//   });
// }, 30000);

// const { Api, TelegramClient
// } = require("telegram")
// const { StringSession } = require("telegram/sessions");

// В КОМЕНТИ КРАЩЕ ВПИСАТИ МІСЯЦЬ АБО 6 МІСЯЦІВ ДЛЯ ВІДСЛІДКОВУВАННЯ ПІДПИСКИ.

// const { optionFn } = require("./helper");

// const session = new StringSession("");
// const client = new TelegramClient(session, apiId, apiHash, {});
