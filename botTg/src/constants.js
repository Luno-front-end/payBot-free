require("dotenv").config();

const text = {
  priceDays: `Тариф: Standart
Вартість: 50.00 💵USD
Термін дії: 1 місяць

✅ Ви отримаєте доступ до наступних ресурсів:
Mind & Body Online Club`,

  priceVip: `Тариф: VIP 👑
Вартість: 150.00 💵USD
Термін дії: 1 місяців

✅4 персональні online тренування на місяць для найкращого результату

✅Ви отримаєте доступ до наступних ресурсів:
Mind & Body online club`,

  choice: `Обери свій абонемент 🤝`,
  caption: `Mind & Body Online \nHealth Club
Вітаю тебе у нашій команді 💪🏻

Обов'язково прочитай "Правила клубу 🚩"`,
  mySubscription: `⌛️ У Вас відсутня підписка.
  

Ознайомтесь з тарифами, натиснувши на відповідну кнопку.`,

  clubRules: `Правила групи: 
❗️2 рази на тиждень селфі звіт після тренування 
❗️Закрита група для своїх. Вся інформація та матеріали всередині групи конфіденційні та не розголошуються 
❗️1 раз на тиждень відео чат-спілкування з будь-яких питань з учасником групи по черзі (розбір: методів зняття стресу, техніки вправ, практик, харчування та будь-які інші питання) 
❗️Мінімальний термін підписки – 1 міс. Гарантія повернення грошей, якщо протягом 1 тижня вам щось не підходить 
❗️Підписка продовжується автоматично, відповідно до обраного тарифу
❗️ Організатор може виключити із групи учасника з частковою компенсацією вартості абонементу.`,
  descriptionClub: `MIND & BODY ONLINE 
HEALTH CLUB 

Закрита група в Telegram для: навчання, підтримки, мотивації, спілкування, спільних тренувань та практик. 
Мій особистий коучинг у чаті 24/7

Абонемент включає: 

✅ 2 Тренування/практики зі мною щотижня (можна виконувати в записі) 
✅ 4 персональні тренування
(у абонементі vip) 
✅ Особиста сесія в загальному чаті 1 раз на тиждень (спілкування, питання ,постановка запиту та завдань) для кожного учасника 
✅ Домашні завдання та додаткові матеріали
✅ Моя підтримка та спілкування online 24/7 
✅ Сучасну дієтологію та рекомендації щодо добавки і superfoods 
✅ Зняття стресу та емоційний баланс 
✅ Мотивацію та відповідальність до занять у загальному полі 
✅ Підтримка та взаємодопомога учасників групи 
✅ Community відкритих та успішних людей`,
  errorRePay: `Упс, відбулася якась помилка з продовженням підписки. Будь ласка перевірьте свій баланс, 
або зверністься до адміністратора. Якщо не бажаєте далі оплачувати підписку, натисніть на "⌛️ Моя підписка" та відпишіться`,
};

const btnText = {
  days: "💪 Standart 50$",
  vip: "👑 VIP 150$",
  tariff: "💵 Тарифи",
  mySubscription: "⌛️ Моя підписка",
  buy: "Оплатити",
  back: "Назад",
  buySubscription: "☑️ КУПИТИ ПІДПИСКУ",
  clubRules: `Правила клубу 🚩`,
  descriptionClub: "Опис клубу 🧾",
  errPaymentBtn: "Щось пішло не так. Натисніть на цю нопку для повернення",
  acceptPayment: "У вас вже куплена підписка. Назад",
  cencelProtectionPayment: "Ви впевнені що хочете відписатися? ❌",
  cencelPayment: "Припинити оплачувати, та відписатися.",
  acceptCencelPayment:
    "Ви були відписані від автотсписання коштів. По завршенню дати підписки ви автоматично будете видалені з групи.",
};

const paymentTilte = {
  titleStandart: "Підписка на абонимент 1 місяць Standart 50$",
  titleVIP: "Підписка на абонимент 1 місяців VIP 150$",
};

module.exports = { text, btnText, paymentTilte };
