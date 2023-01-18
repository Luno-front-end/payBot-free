const userInfo = {
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
    sender_email: null,
    order_id: null,
    order_status: null,
    rectoken: null,
  },
};

module.exports = userInfo;
