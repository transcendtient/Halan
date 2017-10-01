let bot = require("../bot.js");

let messages = [
    "I agree. You need help. Lots of it.",
    "I don't think any amount of help in this world can be enough for you.",
    "Help? You want help?",
];

let sendMessage = function(message) {
    let content = message.content;
    let utils = bot.utils;
    utils.removeBotName(content).trim();

    if (content.match(/^help$/i)) {
        message.channel.send(utils.getRandom(messages));
        return true;
    } else {
        return false;
    }

}

module.exports = {
    sendMessage: function(message) {
        return sendMessage(message);
    }
}