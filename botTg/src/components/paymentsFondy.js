const CloudIpsp = require("cloudipsp-node-js-sdk");

require("dotenv").config();

const fondy = new CloudIpsp({
  merchantId: process.env.MERCHANT_ID,
  secretKey: process.env.SECRET_KEY,
});

module.exports = { fondy };
