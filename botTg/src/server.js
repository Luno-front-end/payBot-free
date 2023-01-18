const { json } = require("express");
const express = require("express");
const { updateUserForPay } = require("./mongoDb/index");
const { paymentInfo } = require("./payment/dataReq");
const { paymentStatus } = require("./helper");
const userInfo = require("./mongoDb/addUserObj");

// const {}

const app = express();

require("dotenv").config();
app.use(express.json());
const server = () => {
  // const generalPage = "index";

  app.set("view engine", "ejs");
  // app.set("view", "./templates");

  app.use(express.static(__dirname + "/templates/public"));

  app.get("/", (req, res) => {
    res.render(__dirname + "/templates/index");
  });

  app.all("/fondyPay", async (req, res) => {
    const response = await req.body;
    if (response.order_status === "approved") {
      // console.log(userInfo.user_id);
      await updateUserForPay(
        response.payment_id,
        response.sender_email,
        response.order_id,
        response.order_status,
        response.rectoken
      );
      res.status(200).send("HTTP 200 OK");
      res.end();
    }
  });

  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
  });
};

module.exports = server;
