require("dotenv").config();

const requestData = {
  request: {
    order_id: "",
    order_desc: "",
    currency: "USD",
    amount: "",
    signature: "",
    merchant_id: process.env.MERCHANT_ID,
    required_rectoken: "Y",
    subscription: "Y",
    subscription_callback_url: process.env.CALL_BACK_URL,
    server_callback_url: process.env.CALL_BACK_URL,
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

// const paymentInfoUserSubs = {
//   order_id: "",
//   order_status: "",
//   rectoken: "",
//   order_status: "",
// };

module.exports = { requestData, resData, paymentInfo };
