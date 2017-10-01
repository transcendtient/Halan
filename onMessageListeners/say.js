let bot = require("../bot.js")
let sendMessage = function(message) {
    if (!message.content.includes("say")) return false;
    let content = message.content;
    let messageToSay = content.slice(content.indexOf("say") + 3);
    message.channel.send(messageToSay);
    message.delete();
    return true;
}

module.exports = {
    sendMessage: function(message) {
        return sendMessage(message);
    }
}