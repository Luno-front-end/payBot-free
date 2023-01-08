const CloudIpsp = require("cloudipsp-node-js-sdk");

const fondy = new CloudIpsp({
  merchantId: 1396424,
  secretKey: "test",
});
const requestData = {
  order_id: "Your Order Id",
  order_desc: "test order",
  currency: "USD",
  amount: "1000",
};
fondy
  .Checkout(requestData)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = fondy;
