const TelegramBot = require('node-telegram-bot-api');

const token = 'your-token';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Handle the '/start' command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Hello! I am your bot. How can I help you today?');
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

// Log any errors
bot.on('polling_error', (error) => {
  console.log(error);
});
