const mongoose = require("mongoose");

const SubsUsersSchema = require("./schemas");
const userInfo = require("./addUserObj");
const { dateSubs } = require("../helper");

require("dotenv").config();

const connectDb = () => {
  try {
    mongoose.connect(
      process.env.URL_CONNECT,
      {
        useNewUrlParser: true,
      },
      (err, client) => {
        if (err) {
          console.log("Connection error", err);
        }
        // console.log("Connected!");
      }
    );
  } catch (error) {
    console.log(error);
  }
  //docker local conect mongoDb
  // mongoose.connect(
  //   "mongodb://127.0.0.1:27017/subsUsers",
  //   { useNewUrlParser: true },
  // (err, client) => {
  //   if (err) {
  //     console.log("Connection error", err);
  //   }
  //   // console.log("Connected!");
  // }
  // );
  return mongoose.connection;
};

// const subsUsersPost = mongoose.model("subsUsers", subsUsersSchema);

const createUser = () => {
  connectDb();
  console.log("create user");

  const addUsers = new SubsUsersSchema(userInfo);
  addUsers.save((err, post) => {
    // return err ? console.error(err) : console.log(post);
    if (err) {
      console.log(err);
    }
  });
  connectDb().on("error", console.log).on("disconnect", connectDb);
};
const updateUser = (userId, pay, nameBtn, order_id, payment_id, title) => {
  connectDb();
  console.log("update user");
  SubsUsersSchema.updateOne(
    { user_id: userId },
    {
      $set: {
        pay: pay,
        subscribe: nameBtn === "btn_1" ? 1 : 6,
        order_id,
        payment_id,
        order_desc: title,
      },
    },
    (err, result) => {
      if (err) {
        console.log("Unable update user: ", err);
      }
    }
  );
  connectDb().on("error", console.log).on("disconnect", connectDb);
};

//   order_id: "",
//   order_status: "",
//   rectoken: "",
//   order_status: "",

const updateUserForPay = async (
  pay_id,
  mail,
  orderId,
  status,
  rectoken,
  timePay,
  amount
) => {
  try {
    connectDb();
    console.log("update user pay");
    const user = await getOneUsersByPayId(pay_id);
    console.log(user);
    pay_id === user[0].payment_id
      ? SubsUsersSchema.updateOne(
          { payment_id: pay_id },
          {
            $set: {
              payment: {
                sender_email: mail,
                order_id: orderId,
                order_status: status,
                rectoken: rectoken,
                datePay: timePay,
                dateEnd:
                  amount === 5000
                    ? dateSubs().dateEndOne
                    : dateSubs().dateEndTwo,
              },
            },
          },
          (err, result) => {
            if (err) {
              console.log("Unable update user: ", err);
            }
          }
        )
      : console.log("laga");

    connectDb().on("error", console.log).on("disconnect", connectDb);
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async () => {
  connectDb();

  const allUsers = await SubsUsersSchema.find({}).lean();
  connectDb().on("error", console.log).on("disconnect", connectDb);

  return allUsers;
};
const getOneUsersByPayId = async (pay_id) => {
  connectDb();
  const user = await SubsUsersSchema.find({ payment_id: pay_id });
  connectDb().on("error", console.log).on("disconnect", connectDb);
  return user;
};
const getOneUserById = async (user_id) => {
  connectDb();
  const user = await SubsUsersSchema.find({ user_id: user_id });
  connectDb().on("error", console.log).on("disconnect", connectDb);
  return user;
};

const deletePayUser = (userId) => {
  connectDb();
  console.log("delete pay");
  SubsUsersSchema.updateOne(
    { user_id: userId },
    {
      $set: {
        "payment.order_id": null,
        "payment.order_status": "deleted",
        "payment.rectoken": null,
      },
    },
    (err, result) => {
      if (err) {
        console.log("Unable update user: ", err);
      }
    }
  );
  connectDb().on("error", console.log).on("disconnect", connectDb);
};

module.exports = {
  createUser,
  updateUser,
  getAllUsers,
  getOneUserById,
  updateUserForPay,
  deletePayUser,
};
