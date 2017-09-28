let bot = require("../bot.js");

let meetsCondition = function(message) {
    return !message.guild;
};

let sendResponse = function(message) {
    let ursoc = bot.client.users.find(user => user.username === "Ursoc"); //Not effecient
    ursoc.send(message.content + '\nFrom: ' + message.author);
}

module.exports = {
    meetsCondition: function(message) {
        return meetsCondition(message);
    },
    sendResponse: function(message){
        sendResponse(message);
    },
}