let bot = require("../bot.js");

let meetsCondition = function(message) {
    console.log("Author:" + message.author.id);
    return !message.guild && message.author.id != '115308057994592259';
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