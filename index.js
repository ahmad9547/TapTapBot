const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');

const token = process.env.TELEGRAM_API_KEY; // Store API Key in environment variables
const bot = new TelegramBot(token);

// Express setup
const app = express();
app.use(bodyParser.json());

// Set webhook
bot.setWebHook(`${process.env.VERCEL_URL}/bot${token}`);

// Webhook endpoint to receive updates from Telegram
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Handle the '/start' command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Hello! I am your bot. How can I help you today?');
});

// Handle the '/play' command
bot.onText(/\/play/, (msg) => {
  const chatId = msg.chat.id;
  const gameUrl = 'https://tap-tap-bot.netlify.app/'; // Add your game URL

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Play the Game', url: gameUrl }]
      ]
    }
  };

  bot.sendMessage(chatId, 'Click the button below to play the game:', options);
});

// Handle any other text message
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const receivedMessage = msg.text;

  // Echo the received message back to the user
  if (receivedMessage !== '/start') {
    bot.sendMessage(chatId, receivedMessage);
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Telegram bot is listening on port 3000');
});
