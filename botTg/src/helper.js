const moment = require("moment");

const userInfo = require("./mongoDb/addUserObj");

const dateSubs = () => {
  const date = {
    datePay: moment().format("L"),
    dateEndOne: moment().add(31, "days").calendar(),
    dateEndTwo: moment().add(6, "month").calendar(),
  };
  return date;
};

const priceConverter = (pay) => {
  if (pay === 5000) return 50;
  if (pay === 25000) return 250;
};

const addInfoUserDB = (
  userId,
  firstName,
  lastName,
  userName,
  subscribe,
  order_id,
  payId,
  ammount
) => {
  userInfo.first_name = firstName;
  userInfo.last_name = lastName;
  userInfo.username = userName;
  userInfo.user_id = userId;
  userInfo.pay = priceConverter(ammount);
  subscribe === "btn_1"
    ? (userInfo.subscribe = "1 month")
    : (userInfo.subscribe = "6 month");
  userInfo.order_id = order_id;
  userInfo.datePay = dateSubs().datePay;
  userInfo.dateEnd =
    subscribe === "btn_1" ? dateSubs().dateEndOne : dateSubs().dateEndTwo;
  userInfo.payment_id = payId;
};

const paymentStatus = (mail, orderId, status, rectoken) => {
  userInfo.payment.sender_email = mail;
  userInfo.payment.order_id = orderId;
  userInfo.payment.order_status = status;
  userInfo.payment.rectoken = rectoken;
};
module.exports = { addInfoUserDB, dateSubs, priceConverter, paymentStatus };
