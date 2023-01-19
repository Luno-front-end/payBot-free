const userInfo = {
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
    sender_email: null,
    order_id: null,
    order_status: null,
    rectoken: null,
    datePay: null,
    dateEnd: null,
  },
};

module.exports = userInfo;
