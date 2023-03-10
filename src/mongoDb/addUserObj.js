const userInfo = {
  first_name: String,
  last_name: String,
  username: String,
  user_id: Number,
  pay: Number,
  subscribe: String,
  order_id: String,
  order_desc: String,
  payment_id: Number,
  title: String,
  deleteDate: null,
  payment: {
    amount: null,
    sender_email: null,
    order_id: null,
    order_status: null,
    rectoken: null,
    datePay: null,
    dateEnd: null,
    payment_system: null,
    card_type: null,
  },
};

module.exports = userInfo;
