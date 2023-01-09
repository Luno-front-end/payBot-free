const { text, btnText, payUrl } = require("../constants");

const keyboardDefault = {
  reply_markup: {
    resize_keyboard: true,
    inline_keyboard: [
      [
        { text: btnText.days, callback_data: "btn_1" },
        { text: btnText.month, callback_data: "btn_2" },
      ],
    ],
  },
};
const keyboardDefaultReplay = {
  resize_keyboard: true,
  inline_keyboard: [
    [
      { text: btnText.days, callback_data: "btn_1" },
      { text: btnText.month, callback_data: "btn_2" },
    ],
  ],
};

const keyboardBuy = {
  inline_keyboard: [
    [
      {
        text: btnText.buy,
        callback_data: "btn_3",
        url: "https://google.com",
      },
    ],
    [{ text: btnText.back, callback_data: "btn_4" }],
  ],
};

const keyboardGeneral = {
  resize_keyboard: true,
  keyboard: [
    [
      { text: btnText.tariff, callback_data: "btn_g1" },
      { text: btnText.mySubscription, callback_data: "btn_g2" },
    ],
  ],
};
const subscription = {
  reply_markup: {
    resize_keyboard: true,
    inline_keyboard: [
      [{ text: btnText.buySubscription, callback_data: "btn_5" }],
    ],
  },
};

module.exports = {
  keyboardDefault,
  keyboardDefaultReplay,
  keyboardBuy,
  keyboardGeneral,
  subscription,
};
