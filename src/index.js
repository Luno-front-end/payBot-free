const { Telegraf, Markup } = require("telegraf");
const { Keyboard, Key } = require("telegram-keyboard");

const text = require("./constants");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);
let massageId = "";

const keyboard = Keyboard.make([
  [
    Key.callback("Beginner 50$ (1 month)", "btn_1"),
    Key.callback("Advanced 250$ (6 months)", "btn_2"),
  ],
]);

const keyboardMenu = Keyboard.reply([["💵 Тарифи", "⌛️ Моя підписка"]]);
const subKeyboardMenu = Keyboard.make([
  [Key.callback("Оплатити", "btn_3")],
  [Key.callback("Назад", "btn_4")],
]);

bot.start(async (ctx) => {
  try {
    await ctx.replyWithPhoto(
      {
        source: "src/img/prev.jpg",
      },
      {
        caption: `Mind & Body Online Health Club 
Вітаю тебе у нашій команді 💪🏻

Правила клубу 🚩
( там файл будет)`,
      }
    );
    // await ctx.reply("текст заглушка", keyboardMenu);
    const { message_id } = await ctx.reply(text[4], keyboard.inline());
    massageId = message_id;
  } catch (error) {
    console.error(error);
  }
});

const activeButton = async (name, onText) => {
  bot.action(name, async (ctx) => {
    try {
      console.log(ctx.inlineQuery);
      await ctx.answerCbQuery();
      if (name === "btn_1" || name === "btn_2") {
        await ctx.telegram.editMessageText(
          ctx.chat.id,
          massageId,
          0,
          onText,
          subKeyboardMenu.inline()
        );
        return;
      }
      if (name === "btn_4") {
        await ctx.telegram.editMessageText(
          ctx.chat.id,
          massageId,
          0,
          onText,
          keyboard.inline()
        );
        return;
      }
      await ctx.reply(onText);
    } catch (e) {
      console.error(e);
    }
  });
};
activeButton("btn_1", text[0]);
activeButton("btn_2", text[1]);
activeButton("btn_3", text[3]);
activeButton("btn_4", text[4]);

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
