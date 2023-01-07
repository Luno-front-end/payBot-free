// const TelegramBot = require("node-telegram-bot-api");
// require("dotenv").config();
// // replace the value below with the Telegram token you receive from @BotFather
// const token = process.env.BOT_TOKEN;

// // Create a bot that uses 'polling' to fetch new updates
// const bot = new TelegramBot(token, { polling: true });

// bot.onText(/\/start/, (msg) => {
//   bot.sendMessage(msg.chat.id, "Welcome", {
//     reply_markup: {
//       resize_keyboard: true,
//       keyboard: [
//         [
//           { text: "Sample text", callback_data: "btn_1" },
//           { text: "Second sample", callback_data: "btn_2" },
//         ],
//       ],
//     },
//   });
// });
// // bot.onText("callback_query", (query) => {
// //   const chatId = query.from.id;
// //   console.log(query);
// //   // if (query.data === "btn_1") {
// //   //   bot.sendMessage(chatId, "нармас");
// //   // } else {
// //   //   bot.sendMessage(chatId, "хуєта");
// //   // }
// // });

// // Matches "/echo [whatever]"
// // bot.onText(/\/echo (.+)/, (msg, match) => {
// //   // 'msg' is the received Message from Telegram
// //   // 'match' is the result of executing the regexp above on the text content
// //   // of the message

// //   const chatId = msg.chat.id;
// //   const resp = match[1]; // the captured "whatever"

// //   // send back the matched "whatever" to the chat
// //   bot.sendMessage(chatId, resp);
// // });

// // Listen for any kind of message. There are different kinds of
// // messages.
// // bot.on("message", (msg) => {
// //   const chatId = msg.chat.id;

// //   // send a message to the chat acknowledging receipt of their message
// //   bot.sendMessage(chatId, "Received your message");
// // });
