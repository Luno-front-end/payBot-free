const moment = require("moment");

const userInfo = require("./mongoDb/addUserObj");
const { text } = require("./constants");

const dateSubs = () => {
  const oneM = moment().add(1, "month").calendar();
  const sixM = moment().add(6, "month").calendar();

  const monthSix = sixM.slice(0, 2);
  const dateSix = sixM.slice(3, 5);
  const yearhSix = sixM.slice(6, 10);

  const monthOne = oneM.slice(0, 2);
  const dateOne = oneM.slice(3, 5);
  const yearhOne = oneM.slice(6, 10);
  const date = {
    // datePay: moment().format("L"),
    dateEndOne: `${dateOne}/${monthOne}/${yearhOne}`,
    dateEndTwo: `${dateSix}/${monthSix}/${yearhSix}`,
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
  ammount,
  title
) => {
  userInfo.first_name = firstName;
  userInfo.last_name = lastName;
  userInfo.username = userName;
  userInfo.user_id = userId;
  userInfo.pay = priceConverter(ammount);
  subscribe === "btn_1" ? (userInfo.subscribe = 1) : (userInfo.subscribe = 6);
  userInfo.order_id = order_id;
  // userInfo.datePay = dateSubs().datePay;
  // userInfo.dateEnd =
  // subscribe === "btn_1" ? dateSubs().dateEndOne : dateSubs().dateEndTwo;
  userInfo.payment_id = payId;
  userInfo.order_desc = title;
};

const paymentStatus = (mail, orderId, status, rectoken) => {
  userInfo.payment.sender_email = mail;
  userInfo.payment.order_id = orderId;
  userInfo.payment.order_status = status;
  userInfo.payment.rectoken = rectoken;
};

const timePay = () => {
  const date = new Date();
  const year = date.getFullYear();

  const month = () => {
    const month = date.getMonth() + 1;
    if (month < 10) {
      return `0${month}`;
    }
    return month;
  };

  const day = () => {
    const day = date.getDate();

    if (day < 10) {
      return `0${day}`;
    }

    return day;
  };

  return `${day()}/${month()}/${year}`;
};

// const alertPrePay = () => {
//   const date = new Date();
//   const year = date.getFullYear();

//   // const dayMilliseconds = 24 * 60 * 60 * 1000;
//   const oneBackDey = 24 * 60 * 60 * 1000;
//   const twoBackDey = 48 * 60 * 60 * 1000;

//   // date.setTime(currentDate.getTime());s

//   const month = () => {
//     const month = date.getMonth() + 1;
//     if (month < 10) {
//       return `0${month}`;
//     }
//     return month;
//   };

//   const day = () => {
//     const day = date.getDate();

//     if (day < 10) {
//       return `0${day}`;
//     }

//     return day;
//   };
//   const www = date.setTime(date.getTime()) - dayMilliseconds;
//   const newDay = new Date(www);
//   console.log(newDay);
//   return `${day()}/${month()}/${year}`;
// };

const timeEditPay = (res) => {
  // const time = res.toString();
  const time = "18.01.2023 21:59:37";
  const timeEdit = time.replace(/[.]/g, "/").slice(0, 10);
  console.log(timeEdit);
  return timeEdit;
};
// const timeEditPay = (res) => {
//   // const time = res.toString();
//   const time = "18.01.2023 21:59:37";
//   const timeEdit = time.slice(0, 10);

//   const month = timeEdit.slice(0, 2);
//   const date = timeEdit.slice(3, 5);
//   const yearh = timeEdit.slice(6, 10);

//   console.log(`${month}/${date}/${yearh}`);

//   return `${month}/${date}/${yearh}`;
// };

const acceptedMySubscription = (subsUser) => {
  console.log(subsUser);
  if (!subsUser[0]?.payment.order_id) {
    return text.mySubscription;
  } else {
    return `⌛️ У вас підписка на ${subsUser[0].subscribe} місяць/мсяців.
Підписалися: ${subsUser[0].payment.datePay} 
Дата закінчення або дата продовження: ${subsUser[0].payment.dateEnd}

Зараз ви можете тільки зупини підписку,
натиснувши кнопку "Припинити оплачувати, та відписатися".
Підписка видалиться, а на слідуючий місяць списання не відбудеться. 🥲`;
  }
};

module.exports = {
  addInfoUserDB,
  dateSubs,
  priceConverter,
  paymentStatus,
  timePay,
  timeEditPay,
  acceptedMySubscription,
};
