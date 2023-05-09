const axios = require("axios");
const https = require("https");
const { resData, requestData, recurringData } = require("../payment/dataReq");

require("dotenv").config();

// const postUrl = "https://pay.fondy.eu/api/checkout/url/";
// const resUrl = "https://pay.fondy.eu/api/status/order_id";
// const recurringUrl = "https://pay.fondy.eu/api/recurring";

const baseURL = "https://pay.fondy.eu/api";

const axiosInstance = axios.create({
  timeout: 60000, //optional
  httpsAgent: new https.Agent({ keepAlive: true }),
  maxRedirects: 5, // Задати максимальну кількість перенаправлень
});

const reqFondy = async () => {
  return await axiosInstance
    .post(`${baseURL}/checkout/url/`, requestData)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

const resPayment = async () => {
  return await axiosInstance
    .post(`${baseURL}/status/order_id`, resData)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

const recurringPay = async () => {
  return await axiosInstance
    .post(`${baseURL}/api/recurring`, recurringData)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { reqFondy, resPayment, recurringPay };
