var secret = require('./secrets.json');
var scrim_scrape = require('./scrim_scrape.js');
const Discord = require('discord.js');
const bot = new Discord.Client();
const botname = 'zordon';

function findZordon(users) {
  return users.filter(function(user) {
    return user.username === 'zordon'
  });
}

function parseScrim(scrims) {
  var output = [];
  scrims.forEach(function(scrim) {
   output.push(scrim.name + " wants to scrim on " + scrim.month + " " + scrim.day + " at " + scrim.time + " their rating is " + scrim.rating + ". Link to the scrim: " + scrim.link); 
  });
  return output;
}

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.on('message', message => {
  var zordon = findZordon(bot.users).find('username', 'zordon'); 
  if (message.content === 'ping') {
    message.reply('pong');
  }

  // see if Zordon is mentioned before checking the sentence
  if (message.mentions && message.mentions.users.find('id', zordon.id)) {
    if(message.content.includes('scrim') || message.content.includes('scrims')) {
      scrim_scrape(function(scrims) {
        if (scrims) {
          console.log(scrims);
          var parsedScrims = parseScrim(scrims);
          parsedScrims.forEach(function(scrim) {
            message.reply(scrim);
          });
        } else {
          message.reply('There are no scrims');
        }
      });
    } else {
      message.reply("What is it, ranger?");
    }
  }

});

bot.login(secret.email, secret.password);
