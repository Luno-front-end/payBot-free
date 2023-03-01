const axios = require("axios");
const { resData, requestData, recurringData } = require("../payment/dataReq");

require("dotenv").config();

const postUrl = "https://pay.fondy.eu/api/checkout/url/";
const resUrl = "https://pay.fondy.eu/api/status/order_id";
const recurringUrl = "https://pay.fondy.eu/api/recurring";

const reqFondy = async () => {
  return await axios
    .post(postUrl, requestData)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

const resPayment = async () => {
  return await axios
    .post(resUrl, resData)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

const recurringPay = async () => {
  return await axios
    .post(recurringUrl, recurringData)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { reqFondy, resPayment, recurringPay };
