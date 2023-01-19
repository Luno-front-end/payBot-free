const { json } = require("express");
const express = require("express");
const { updateUserForPay } = require("./mongoDb/index");
const { paymentInfo } = require("./payment/dataReq");
const {
  paymentStatus,
  dateSubs,
  timeEditPay,
  alertPrePay,
} = require("./helper");
// const userInfo = require("./mongoDb/addUserObj");

const app = express();

const userInfo = {
  first_name: "Макс",
  last_name: "Ткачук",
  username: "ingener2k17",
  user_id: "382298066",
  pay: 250,
  subscribe: 1,
  order_id: "b4359e57-7890-4682-851a-128acc3408f8",
  payment_id: "547288641",
  title: "Підписка на абонимент. 6 місяців Standart 250$",
  payment: {
    sender_email: "makcimys001@gmail.com",
    order_id: "b4359e57-7890-4682-851a-128acc3408f8",
    order_status: "approved",
    rectoken: "a41087ed7ce6d8a3e659549d0e1978393ddc266",
    datePay: "18/01/2023",
    dateEnd: "18/07/2023",
  },
};

require("dotenv").config();
app.use(express.json());
const server = () => {
  // const generalPage = "index";

  app.set("view engine", "ejs");
  // app.set("view", "./templates");

  app.use(express.static(__dirname + "/templates/public"));

  app.get("/", (req, res) => {
    res.render(__dirname + "/templates/index", { ...userInfo });
  });

  app.all("/fondyPay", async (req, res) => {
    const response = await req.body;
    if (response.order_status === "approved") {
      console.log(response.order_time);

      // console.log(userInfo.user_id);
      await updateUserForPay(
        response.payment_id,
        response.sender_email,
        response.order_id,
        response.order_status,
        response.rectoken,
        timeEditPay(response.order_time),
        dateSubs(),
        response.amount
      );
      res.status(200).send("HTTP 200 OK");
      res.end();
    }
  });

  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
  });
};
// server();
module.exports = server;
