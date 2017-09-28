const Discord = require("discord.js");
const config  = require("./config.json");
const client  = new Discord.Client();

client.on("ready", () => {
  console.log("Halan Online!");
});

let defaultResponder = require("./responders/confused.js");
let responders = [
    require("./responders/games.js"),
    require("./responders/insults.js"),
    require("./responders/whisperer.js"),
    require("./responders/forwarder.js"),
];

client.on("message", (message) => {

  var halanRegexp = new RegExp(config.prefix)
  if (!message.content.match(halanRegexp) || message.author.bot) return;

  let responded = false;

  responders.forEach( responder => {

      if (responder.meetsCondition(message)) {
          responder.sendResponse(message);
          responded = true;
      }

  })

  if (!responded) {
        defaultResponder.sendResponse(message);
  }

});

let onPresenceUpdateListeners = [
    require("./presenceUpdate/partyBroadcaster.js"),
]

client.on("presenceUpdate", (oldGuildMember, newGuildMember) => {

  onPresenceUpdateListeners.forEach( listener => {
    listener.sendMessage(client, oldGuildMember, newGuildMember);
  })

});


client.login(config.token);

module.exports.client = client;