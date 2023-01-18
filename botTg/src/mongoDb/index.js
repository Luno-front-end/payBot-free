const mongoose = require("mongoose");

const subsUsersSchema = require("./schemas");
const userInfo = require("./addUserObj");

const connectDb = () => {
  mongoose.connect(
    "mongodb://127.0.0.1:27017/subsUsers",
    { useNewUrlParser: true },
    (err, client) => {
      if (err) {
        console.log("Connection error", err);
      }
      // console.log("Connected!");
    }
  );
  return mongoose.connection;
};

const subsUsersPost = mongoose.model("subsUsers", subsUsersSchema);

const createUser = () => {
  connectDb();
  console.log("create user");

  const addUsersSubs = new subsUsersPost(userInfo);
  addUsersSubs.save((err, post) => {
    // return err ? console.error(err) : console.log(post);
    if (err) {
      console.log(err);
    }
  });
  connectDb().on("error", console.log).on("disconnect", connectDb);
};
const updateUser = (userId, pay, date, nameBtn, order_id, payment_id) => {
  connectDb();
  console.log("update user");
  subsUsersPost.updateOne(
    { user_id: userId },
    {
      $set: {
        pay: pay,
        subscribe: nameBtn === "btn_1" ? "1 month" : "6 month",
        datePay: date().datePay,
        dateEnd: nameBtn === "btn_1" ? date().dateEndOne : date().dateEndTwo,
        order_id,
        payment_id,
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

const updateUserForPay = async (pay_id, mail, orderId, status, rectoken) => {
  try {
    connectDb();
    console.log("pay_id", pay_id);
    console.log("update user pay");
    // const user = await subsUsersPost.find(
    //   { payment_id: pay_id },
    //   (err, result) => {
    //     if (err) {
    //       console.log("Unable update user: ", err);
    //     }
    //   }
    // );
    const user = await getOneUsersByPayId(pay_id);
    console.log(user);
    pay_id === user[0].payment_id
      ? subsUsersPost.updateOne(
          { payment_id: pay_id },
          {
            $set: {
              payment: {
                sender_email: mail,
                order_id: orderId,
                order_status: status,
                rectoken: rectoken,
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

  const allUsers = await subsUsersPost.find();
  connectDb().on("error", console.log).on("disconnect", connectDb);

  return allUsers;
};
const getOneUsersByPayId = async (pay_id) => {
  connectDb();
  const user = await subsUsersPost.find({ payment_id: pay_id });
  connectDb().on("error", console.log).on("disconnect", connectDb);
  return user;
};
const getOneUserById = async (user_id) => {
  connectDb();
  const user = await subsUsersPost.find({ user_id: user_id });
  connectDb().on("error", console.log).on("disconnect", connectDb);
  return user;
};

module.exports = {
  createUser,
  updateUser,
  getAllUsers,
  getOneUserById,
  updateUserForPay,
};
