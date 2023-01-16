const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subsUsers = new Schema({
  first_name: String,
  last_name: String,
  username: String,
  user_id: Number,
  pay: Number,
  subscribe: String,
  datePay: String,
  dateEnd: String,
});

module.exports = subsUsers;
