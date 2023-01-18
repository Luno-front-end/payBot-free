const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subsUsers = new Schema({
  first_name: String,
  last_name: String,
  username: String,
  user_id: Number,
  pay: Number,
  subscribe: String,
  order_id: String,
  payment_id: Number,
  datePay: String,
  dateEnd: String,
  payment: {
    sender_email: String,
    order_id: String,
    order_status: String,
    rectoken: String,
  },
});

module.exports = subsUsers;
