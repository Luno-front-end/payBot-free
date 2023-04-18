const TelegramBot = require("node-telegram-bot-api");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");
const axios = require("axios");

const { text, btnText, paymentTilte } = require("./constantsUK");
const { textRu, btnTextRu, paymentTilteRu } = require("./constantsRU");

const {
  requestData,
  resData,
  paymentInfo,
  recurringData,
} = require("./payment/dataReq");
const {
  keyboardDefault,
  keyboardDefaultReplay,
  keyboardGeneral,
  subscription,
  pay_btn,
  cancelPayment,
  btnIsPayment,
  cancelSecurityPayment,
} = require("./components/buttons");
const {
  keyboardDefaultRu,
  keyboardDefaultReplayRu,
  keyboardGeneralRu,
  subscriptionRu,
  pay_btnRu,
  btnIsPaymentRu,
  cancelPaymentRu,
  cancelSecurityPaymentRu,
} = require("./components/buttonsRu");
const {
  createUser,
  updateUser,
  getOneUserById,
  getAllUsers,
  deletePayUser,
  recurringPayResponseDB,
  updateUserLang,
} = require("./mongoDb/index");
const { reqFondy, recurringPay } = require("./payment/paymentsFondy");
const {
  addInfoUserDB,
  priceConverter,
  timePay,
  acceptedMySubscription,
  recurringPayHelp,
} = require("./helper");
const {
  createShaPost,
  createShaRes,
  createShaRecurring,
} = require("./payment/sha");
const server = require("./server");

require("dotenv").config();

server();

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, async (msg) => {
  try {
    lang = msg.from.language_code;
    pic = "src/img/prev.jpg";
    chat_id = msg.chat.id;
    await bot.sendPhoto(chat_id, pic, {
      caption: lang === "uk" ? text.caption : textRu.caption,
      reply_markup: lang === "uk" ? keyboardGeneral : keyboardGeneralRu,
    });

    await bot.sendMessage(
      chat_id,
      lang === "uk" ? text.choice : textRu.choice,
      lang === "uk" ? { ...keyboardDefault } : { ...keyboardDefaultRu }
    );
  } catch (error) {
    console.error(error);
  }
});

bot.on("callback_query", async (query) => {
  try {
    lang = query.from.language_code;

    //chat info
    const nameBtn = query.data;
    const id = query.id;
    const chat_id = query.message.chat.id;
    const message_id = query.message.message_id;

    const userId = query.from.id;
    const userFirstName = query.from.first_name;
    const userLastName = query.from.last_name;
    const username = query.from.username;

    updateUserLang(userId, lang);
    const generateId = uuidv4();
    const user = await getOneUserById(userId);

    if (nameBtn === "st_btn") {
      await bot.answerCallbackQuery(id);

      requestData.request.amount = 5000;
      requestData.request.order_id = generateId;
      requestData.request.order_desc =
        lang === "uk"
          ? paymentTilte.titleStandart
          : paymentTilteRu.titleStandart;
      requestData.request.signature = createShaPost();

      await reqFondy().then((res) => {
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
        lang === "uk"
          ? paymentTilte.titleStandart
          : paymentTilteRu.titleStandart,
        lang
      );

      resData.request.order_id = generateId;
      resData.request.signature = createShaRes();

      if (!user[0]?.payment.order_id) {
        if (user.length === 0) {
          createUser();
        } else {
          updateUser(
            userId,
            priceConverter(requestData.request.amount),
            nameBtn,
            generateId,
            paymentInfo.pay_id,
            lang === "uk"
              ? paymentTilte.titleStandart
              : paymentTilteRu.titleStandart,
            lang
          );
        }

        setTimeout(async () => {
          await bot.editMessageText(
            lang === "uk" ? text.priceDays : textRu.priceDays,
            {
              chat_id,
              message_id: message_id,
              reply_markup:
                lang === "uk" ? { ...pay_btn() } : { ...pay_btnRu() },
            }
          );
        }, 500);
      } else {
        setTimeout(async () => {
          await bot.editMessageText(
            lang === "uk" ? text.priceDays : textRu.priceDays,
            {
              chat_id,
              message_id: message_id,
              reply_markup:
                lang === "uk" ? { ...btnIsPayment() } : { ...btnIsPaymentRu() },
            }
          );
        }, 500);
      }
    }

    if (nameBtn === "vip_btn") {
      await bot.answerCallbackQuery(id);

      requestData.request.amount = 15000;
      requestData.request.order_id = generateId;
      requestData.request.order_desc =
        lang === "uk" ? paymentTilte.titleVIP : paymentTilteRu.titleVIP;
      requestData.request.signature = createShaPost();

      await reqFondy().then((res) => {
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
        lang === "uk" ? paymentTilte.titleVIP : paymentTilteRu.titleVIP,
        lang
      );

      resData.request.order_id = generateId;
      resData.request.signature = createShaRes();

      if (!user[0]?.payment.order_id) {
        if (user.length === 0) {
          createUser();
        } else {
          updateUser(
            userId,
            priceConverter(requestData.request.amount),
            nameBtn,
            generateId,
            paymentInfo.pay_id,
            lang === "uk" ? paymentTilte.titleVIP : paymentTilteRu.titleVIP,
            lang
          );
        }
        setTimeout(async () => {
          await bot.editMessageText(
            lang === "uk" ? text.priceVip : textRu.priceVip,
            {
              chat_id,
              message_id: message_id,
              reply_markup: { ...pay_btn() },
            }
          );
        }, 500);
      } else {
        setTimeout(async () => {
          await bot.editMessageText(
            lang === "uk" ? text.priceVip : textRu.priceVip,
            {
              chat_id,
              message_id: message_id,
              reply_markup: { ...btnIsPayment() },
            }
          );
        }, 500);
      }
    }

    if (nameBtn === "back") {
      await bot.answerCallbackQuery(id);
      bot.editMessageText(lang === "uk" ? text.choice : textRu.choice, {
        chat_id,
        message_id: message_id,
        reply_markup:
          lang === "uk" ? keyboardDefaultReplay : keyboardDefaultReplayRu,
      });
    }
    if (nameBtn === "btn_5") {
      await bot.answerCallbackQuery(id);
      bot.editMessageText(lang === "uk" ? text.choice : textRu.choice, {
        chat_id,
        message_id: message_id,
        reply_markup:
          lang === "uk" ? keyboardDefaultReplay : keyboardDefaultReplayRu,
      });
    }
    if (nameBtn === "cancelP") {
      await bot.answerCallbackQuery(id);
      const user = await getOneUserById(userId);

      bot.editMessageText(acceptedMySubscription(user), {
        chat_id,
        message_id: message_id,
        reply_markup: cancelSecurityPayment,
      });
    }
    if (nameBtn === "cancelSP") {
      await bot.answerCallbackQuery(id);
      deletePayUser(userId);
      bot.sendMessage(
        chat_id,
        lang === "uk"
          ? btnText.acceptCencelPayment
          : btnTextRu.acceptCencelPayment
      );
    }
  } catch (error) {
    console.error(error);
  }
});

bot.on("message", async (msg) => {
  try {
    lang = msg.from.language_code;

    const msgText = msg.text;
    const chatId = msg.chat.id;

    updateUserLang(chatId, lang);

    const user = await getOneUserById(chatId);

    switch (msgText) {
      case lang === "uk" ? btnText.tariff : btnTextRu.tariff:
        bot.sendMessage(
          chatId,
          lang === "uk" ? text.choice : textRu.choice,
          lang === "uk"
            ? {
                ...keyboardDefault,
              }
            : {
                ...keyboardDefaultRu,
              }
        );
        break;
      case lang === "uk" ? btnText.mySubscription : btnTextRu.mySubscription:
        if (!user[0]?.payment.order_id) {
          bot.sendMessage(
            chatId,
            lang === "uk" ? text.mySubscription : textRu.mySubscription,
            lang === "uk" ? { ...subscription } : { ...subscriptionRu }
          );
        } else {
          bot.sendMessage(
            chatId,
            acceptedMySubscription(user),
            lang === "uk"
              ? {
                  ...cancelPayment,
                }
              : {
                  ...cancelPaymentRu,
                }
          );
        }

        break;
      case lang === "uk" ? btnText.clubRules : btnTextRu.clubRules:
        bot.sendMessage(
          chatId,
          lang === "uk" ? text.clubRules : textRu.clubRules
        );
        break;
      case lang === "uk" ? btnText.descriptionClub : btnTextRu.descriptionClub:
        bot.sendMessage(
          chatId,
          lang === "uk" ? text.descriptionClub : textRu.descriptionClub
        );
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(error);
  }
});

setInterval(async () => {
  const date = timePay();
  const users = await getAllUsers();

  users.forEach((user) => {
    if (user.payment.dateEnd === date && user.payment.rectoken) {
      const generateId = uuidv4();
      recurringPayHelp(
        user.payment.rectoken,
        generateId,
        user.order_desc,
        user.payment.amount
      );

      recurringData.request.signature = createShaRecurring();
      const errorMessage = () =>
        bot.sendMessage(
          user.user_id,
          user.lang === "uk" ? text.errorRePay : textRu.errorRePay
        );
      recurringPay().then((res) => {
        if (
          res.response.order_status === "declined" ||
          res.response.order_status === "processing"
        ) {
          return errorMessage();
        }
        if (res.response.error_code) {
          return errorMessage();
        } else {
          recurringPayResponseDB(res.response, user.user_id, errorMessage);
          return bot.sendMessage(
            user.user_id,
            user.lang === "uk" ? text.goodSub : textRu.goodSub
          );
        }
      });
    }
  });
}, 10000);
// 10800000
