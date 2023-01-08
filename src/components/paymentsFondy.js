const CloudIpsp = require("cloudipsp-node-js-sdk");
const opn = require("better-opn");

require("dotenv").config();

const { buySubs } = require("../constants");

const fondy = new CloudIpsp({
  merchantId: process.env.MERCHANT_ID,
  secretKey: process.env.SECRET_KEY,
});

// fondy
//   .Checkout(requestData)
//   .then((data) => {
//     console.log(data.checkout_url);
//     // opn(data.checkout_url);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

module.exports = { fondy };
