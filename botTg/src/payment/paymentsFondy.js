const fetch = require("node-fetch");
const axios = require("axios");
const { resData, requestData } = require("../payment/dataReq");

require("dotenv").config();

const postUrl = "https://pay.fondy.eu/api/checkout/url/";
const resUrl = "https://pay.fondy.eu/api/status/order_id";

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
    .post(resUrl, requestData)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { reqFondy, resPayment };
