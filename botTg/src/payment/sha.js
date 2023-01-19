sha1 = require("js-sha1");

const { requestData, recurringData } = require("../payment/dataReq");

require("dotenv").config();

const createShaPost = () => {
  console.log(requestData);
  // `${process.env.SECRET_KEY}|${requestData.request.amount}|${requestData.request.currency}|${process.env.MERCHANT_ID}|${requestData.request.order_desc}|${requestData.request.order_id}|${requestData.request.required_rectoken}|${requestData.request.server_callback_url}|${requestData.request.subscription}|${requestData.request.subscription_callback_url}`;
  // amount currency every merchant_id order_desc order_id period required_rectoken server_callback_url subscription subscription_callback_url
  // `${process.env.SECRET_KEY}|${requestData.request.amount}|${requestData.request.currency}|${process.env.MERCHANT_ID}|${requestData.request.order_desc}|${requestData.request.order_id}|${requestData.request.recurring_data}|${requestData.request.server_callback_url}|${requestData.request.subscription_callback_url}`;
  const shaKey = sha1(
    `${process.env.SECRET_KEY}|${requestData.request.amount}|${requestData.request.currency}|${process.env.MERCHANT_ID}|${requestData.request.order_desc}|${requestData.request.order_id}|${requestData.request.required_rectoken}|${requestData.request.server_callback_url}|${requestData.request.subscription_callback_url}`
  );

  return shaKey;
};

const createShaRes = () => {
  const shaKey = sha1(
    `${process.env.SECRET_KEY}|${process.env.MERCHANT_ID}|${requestData.request.order_id}`
  );
  // console.log(shaKey);

  return shaKey;
};

const createShaRecurring = () => {
  const shaKey = sha1(
    `${process.env.SECRET_KEY}|${recurringData.request.amount}|${recurringData.request.currency}|${process.env.MERCHANT_ID}|${recurringData.request.order_desc}|${recurringData.request.order_id}|${recurringData.request.rectoken}`
  );
  // console.log(shaKey);

  return shaKey;
};

module.exports = { createShaPost, createShaRes, createShaRecurring };
