const config = require("./config.js");
const Discord = require("discord.js");
const client = new Discord.Client();
var mysql = require('mysql');

const playQueue = new Array();
const dispatcher = null;
const voiceChannel = null;
const voiceConnection = null;
const autoPlay = true;

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

//mysql
const pool = mysql.createPool(config.mysqlConfig);

const mysqlConnection = {
    query: function () {
        var queryArgs = Array.prototype.slice.call(arguments),
            events = [],
            eventNameIndex = {};

        pool.getConnection(function (err, conn) {
            if (err) {
                if (eventNameIndex.error) {
                    eventNameIndex.error();
                }
            }
            if (conn) { 
                var q = conn.query.apply(conn, queryArgs);
                q.on('end', function () {
                    conn.release();
                });

                events.forEach(function (args) {
                    q.on.apply(q, args);
                });
            }
        });

        return {
            on: function (eventName, callback) {
                events.push(Array.prototype.slice.call(arguments));
                eventNameIndex[eventName] = callback;
                return this;
            }
        };
    }
};

client.on("ready", () => { onReady(); });
client.on("message", (message) => { notifyOnMessageListeners(message); });
client.on("presenceUpdate", (oldGuildMember, newGuildMember) => { notifyOnPressenceUpdateLisenters });

client.login(config.discordToken);
client.on('disconnect', function(erMsg, code) {
    console.log('----- Bot disconnected from Discord with code', code, 'for reason:', erMsg, '-----');
    bot.connect();
});



module.exports.halanRegexp = halanRegexp;
module.exports.client = client;
module.exports.utils = utils;
module.exports.connection = mysqlConnection;
module.exports.playQueue = playQueue;
module.exports.dispatcher = dispatcher;
module.exports.voiceChannel = voiceChannel;
module.exports.config = config;
module.exports.autoPlay = autoPlay;
