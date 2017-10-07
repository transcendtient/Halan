const config = require("./config.js");
const Discord = require("discord.js");
const client = new Discord.Client();
const playQueue = new Array();
const dispatcher = null;
const voiceChannel = null;
const voiceConnection = null;

const Utils = require("./utils.js");
const utils = new Utils(this, client);

let halanRegexp = /^ial(:?an)?\b/i; //Hal or Halan
let admin = null;

let defaultResponder = require("./onMessageListeners/confused.js");

let onMesageListeners = [
    require("./onMessageListeners/say.js"),
	require("./onMessageListeners/play.js"),
	require("./onMessageListeners/joinVoice.js"),
    require("./onMessageListeners/help.js"),
    require("./onMessageListeners/games.js"),
    require("./onMessageListeners/gifme.js"),
    require("./onMessageListeners/insults.js"),
    require("./onMessageListeners/compliments.js"),
];

let onPresenceUpdateListeners = [
    require("./presenceUpdate/partyBroadcaster.js"),
];

let onReady = function () {
    console.log("Halan Online!");
    admin = client.users.get("115308057994592259"); //Ursoc's Id
}

let notifyOnMessageListeners = function(message) {
    if (!message.content.match(halanRegexp) || message.author.bot) return;

    utils.removeBotName(message.content);
    utils.resolveToMentions(message);

    let responded = false;
    onMesageListeners.forEach(listener => { 
        if (listener.sendMessage(message)) {
            responded = true; 
        }
    });

    if (!responded){
		console.log("not responded");
        defaultResponder.sendMessage(message);
	}    
}

let notifyOnPressenceUpdateLisenters = function(oldGuildMember, newGuildMember) {
    onPresenceUpdateListeners.forEach(listener => { listener.sendMessage(oldGuildMember, newGuildMember); });
}

client.on("ready", () => { onReady(); });
client.on("message", (message) => { notifyOnMessageListeners(message); });
client.on("presenceUpdate", (oldGuildMember, newGuildMember) => { notifyOnPressenceUpdateLisenters });

client.login(config.discordToken);



module.exports.halanRegexp = halanRegexp;
module.exports.client = client;
module.exports.utils = utils;
module.exports.connection = config.mysqlConnection;
module.exports.playQueue = playQueue;
module.exports.dispatcher = dispatcher;
module.exports.voiceChannel = voiceChannel;
module.exports.config = config;