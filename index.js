const TelegramBot = require('node-telegram-bot-api');

const token = "7433782665:AAGORAILXX4wdcrD3D5KclCq5twtkwABQSQ";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

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

bot.onText(/\/play/, (msg) => {
  const chatId = msg.chat.id;
  const gameUrl = 'https://your-web-hosting-url.com'; // Add game URL

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Play the Game', url: gameUrl }]
      ]
    }
  };

  bot.sendMessage(chatId, 'Click the button below to play the game:', options);
});