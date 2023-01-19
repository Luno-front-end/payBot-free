const { Schema, model } = require("mongoose");

const subsUsers = new Schema({
  first_name: String,
  last_name: String,
  username: String,
  user_id: Number,
  pay: Number,
  subscribe: String,
  order_id: String,
  payment_id: Number,
  title: String,
  payment: {
    sender_email: String,
    order_id: String,
    order_status: String,
    rectoken: String,
    datePay: String,
    dateEnd: String,
  },
});

module.exports = model("subsUsers", subsUsers);
