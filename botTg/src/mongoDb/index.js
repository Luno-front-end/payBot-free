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
        throw err;
      }
      console.log("Connected!");
    }
  );
  return mongoose.connection;
};

const subsUsersPost = mongoose.model("subsUsers", subsUsersSchema);

const createUser = () => {
  connectDb();
  const addUsersSubs = new subsUsersPost(userInfo);
  addUsersSubs.save((err, post) => {
    // return err ? console.error(err) : console.log(post);
    if (err) {
      console.log(err);
      throw err;
    }
  });
  connectDb().on("error", console.log).on("disconnect", connectDb);
};
const updateUser = (userId, pay, date, nameBtn) => {
  connectDb();
  subsUsersPost.updateOne(
    { user_id: userId },
    {
      $set: {
        pay: pay,
        subscribe: nameBtn === "btn_1" ? "1 month" : "6 month",
        datePay: date().datePay,
        dateEnd: nameBtn === "btn_1" ? date().dateEndOne : date().dateEndTwo,
      },
    },
    (err, result) => {
      if (err) {
        console.log("Unable update user: ", err);
        throw err;
      }
    }
  );
  connectDb().on("error", console.log).on("disconnect", connectDb);
};
const getAllUsers = async () => {
  connectDb();

  const allUsers = await subsUsersPost.find();
  connectDb().on("error", console.log).on("disconnect", connectDb);

  return allUsers;
};
const getOneUsers = async (userId) => {
  connectDb();
  const user = await subsUsersPost.find({ user_id: userId });
  connectDb().on("error", console.log).on("disconnect", connectDb);
  return user;
};

module.exports = {
  createUser,
  updateUser,
  getAllUsers,
  getOneUsers,
};
