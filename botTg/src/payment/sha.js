sha1 = require("js-sha1");

const { requestData } = require("../payment/dataReq");

require("dotenv").config();

const createShaPost = () => {
  const shaKey = sha1(
    `${process.env.SECRET_KEY}|${requestData.request.amount}|${requestData.request.currency}|${process.env.MERCHANT_ID}|${requestData.request.order_desc}|${requestData.request.order_id}|${requestData.request.required_rectoken}|${requestData.request.server_callback_url}|${requestData.request.subscription}|${requestData.request.subscription_callback_url}`
  );

  return shaKey;
};
const createShaRes = () => {
  const shaKey = sha1(
    `${process.env.SECRET_KEY}|${process.env.MERCHANT_ID}|${requestData.request.order_id}`
  );
  console.log(shaKey);

  return shaKey;
};

module.exports = { createShaPost, createShaRes };
