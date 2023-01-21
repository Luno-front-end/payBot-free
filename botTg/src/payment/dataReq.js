require("dotenv").config();

const requestData = {
  request: {
    order_id: String,
    order_desc: String,
    currency: "USD",
    amount: Number,
    signature: String,
    merchant_id: process.env.MERCHANT_ID,
    required_rectoken: "Y",
    subscription_callback_url: process.env.CALL_BACK_URL,
    server_callback_url: process.env.CALL_BACK_URL,
  },
};

const recurringData = {
  request: {
    order_id: String,
    order_desc: String,
    currency: "USD",
    amount: Number,
    rectoken: String,
    signature: String,
    merchant_id: process.env.MERCHANT_ID,
  },
};

const resData = {
  request: {
    order_id: "",
    merchant_id: process.env.MERCHANT_ID,
    signature: "",
  },
};

const paymentInfo = {
  pay_link: "",
  pay_id: "",
};

module.exports = { requestData, resData, paymentInfo, recurringData };
