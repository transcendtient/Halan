let bot = require("../bot.js");

let meetsCondition = function(message) {
    return message.content.includes("whisper");
};

let sendResponse = function(message) {
    let content = message.content;
    // SHAME ON JS FOR NOT SUUPORTING POSITIVE LOOKBEHINDS!
    let messageToWhisper = (content.match(/whisper:"[^"]+(?=")/));
    if (messageToWhisper) messageToWhisper = messageToWhisper[0].substring(9);

    let username = (content.match(/to:"[^"]+(?=")/));
    if (username) username = username[0].substring(4);
    let user = getUserFromName(username);

    let guildName = (content.match(/in:"[^"]+(?=")/));
    if (guildName) guildName = guildName[0].substring(4);

    if (user) {
        user.send(messageToWhisper);
        message.author.send(":thumbsup:");
    } else {
        message.author.send(":thumbsdown:");
    }

}

let getUserFromName = function(username) {
    return bot.client.users.find(user => user.username === username);
}

let getGuildFromName = function(guildName) {
    return bot.client.guilds.find(guild => guild.name === guildName);
}

module.exports = {
    meetsCondition: function(message) {
        return meetsCondition(message);
    },
    sendResponse: function(message){
        sendResponse(message);
    },
}