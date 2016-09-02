var config = {}; // DO NOT EDIT

config.discord = {}; // DO NOT EDIT
config.github = {}; // DO NOT EDIT
config.web = {}; // DO NOT EDIT

config.discord.token = 'DISCORD BOT TOKEN'; // This is for discord bot token
config.discord.channelID = 'DISCORD GITHUB CHANNEL ID'; // This is for specific id number for github channel you want to use
config.github.token = 'GITHUB SECRET (WEBHOOK)'; // This is the secret word/token that you create when making a webhook.
config.web.cname = 'localhost'; // Should be fine as localhost
config.web.url = 'http://' + config.web.cname + '/ping'; // This is the web url to ping your web
config.web.port = 8080; // This is the port the web runs on
config.web.workers = 1; // Creates x web worker(s)
config.web.path = '/webhook'; // Webhook path for the events in JSON.

module.exports = config; // DO NOT EDIT
