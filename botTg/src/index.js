const TelegramBot = require("node-telegram-bot-api");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");

const { text, btnText, paymentTilte } = require("./constants");
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
  createUser,
  updateUser,
  getOneUserById,
  getAllUsers,
  deletePayUser,
  recurringPayResponseDB,
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

    if (nameBtn === "st_btn") {
      await bot.answerCallbackQuery(id);

      requestData.request.amount = 5000;
      requestData.request.order_id = generateId;
      requestData.request.order_desc = paymentTilte.titleStandart;
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
        paymentTilte.titleStandart
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
            paymentTilte.titleStandart
          );
        }
        setTimeout(async () => {
          await bot.editMessageText(text.priceDays, {
            chat_id,
            message_id: message_id,
            reply_markup: { ...pay_btn() },
          });
        }, 500);
      } else {
        setTimeout(async () => {
          await bot.editMessageText(text.priceDays, {
            chat_id,
            message_id: message_id,
            reply_markup: { ...btnIsPayment() },
          });
        }, 500);
      }
    }

    if (nameBtn === "vip_btn") {
      await bot.answerCallbackQuery(id);

      requestData.request.amount = 15000;
      requestData.request.order_id = generateId;
      requestData.request.order_desc = paymentTilte.titleVIP;
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
        paymentTilte.titleVIP
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
            paymentTilte.titleVIP
          );
        }
        setTimeout(async () => {
          await bot.editMessageText(text.priceVip, {
            chat_id,
            message_id: message_id,
            reply_markup: { ...pay_btn() },
          });
        }, 500);
      } else {
        setTimeout(async () => {
          await bot.editMessageText(text.priceVip, {
            chat_id,
            message_id: message_id,
            reply_markup: { ...btnIsPayment() },
          });
        }, 500);
      }
    }

    if (nameBtn === "back") {
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
      bot.sendMessage(chat_id, btnText.acceptCencelPayment);
    }
  } catch (error) {
    console.error(error);
  }
});

bot.on("message", async (msg) => {
  try {
    const msgText = msg.text;
    const chatId = msg.chat.id;

    const user = await getOneUserById(chatId);

    switch (msgText) {
      case btnText.tariff:
        bot.sendMessage(chatId, text.choice, { ...keyboardDefault });
        break;
      case btnText.mySubscription:
        if (!user[0]?.payment.order_id) {
          bot.sendMessage(chatId, text.mySubscription, { ...subscription });
        } else {
          bot.sendMessage(chatId, acceptedMySubscription(user), {
            ...cancelPayment,
          });
        }

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
      const errorMessage = () => bot.sendMessage(user.user_id, text.errorRePay);
      recurringPay().then((res) => {
        if (res.response.error_code) {
          return errorMessage();
        } else {
          recurringPayResponseDB(res.response, user.user_id, errorMessage);
          return bot.sendMessage(user.user_id, "Підписка була продовжена!🫡 🎉");
        }
      });
    }
  });
}, 10000);
