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
//  recurring_data: {
//     amount: 5000,
//     end_time: "2026-11-14",
//     every: 1,
//     period: "month",
//     start_time: "2023-01-21",
//   },
// subscription: "Y",

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

// const paymentInfoUserSubs = {
//   order_id: "",
//   order_status: "",
//   rectoken: "",
//   order_status: "",
// };

module.exports = { requestData, resData, paymentInfo, recurringData };
// {
// "request": {
// "merchant_id": 1396424,
// "order_id": "test3195692233.5",
// "action": "stop",
// "signature": "d1544545b8fe2820bdf78006571694cbea81430d"
// }
// }

// "response": {
// "response_status": "success",
// "merchant_id": 1396424,
// "order_id": "test3195692233.5",
// "status": "disabled",
// "signature": "d1544545b8fe2820bdf78006571694cbea81430d"
// }
// }
