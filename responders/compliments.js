let bot = require("../bot.js");
let compliemnts = [
    "@, you suck. No compliemnts for you."
]

let getRandomCompliement = function(user) {
    return compliemnts[Math.floor(Math.random()*compliemnts.length)].replace("@", user);
}

let sendMessage = function(message) {
    if (!message.content.includes("compliment")) return false;
    let isDM = message.channel.type === 'dm';

    let mentionedUsers = message.mentions.users;

    if (mentionedUsers.size === 0) {
        let username = message.content.replace(/.*compliment/, "").trim();
        let user = bot.utils.getUser(username);

        if (user) mentionedUsers.set(user.id, user);
        else if (!isDM) mentionedUsers.set(0, username); //don't add strings if we're going to DM
    }

    if (isDM) {
        mentionedUsers.forEach( user => user.send(getRandomCompliement(user)) );
    } else {
        mentionedUsers.forEach( user => { message.channel.send(getRandomCompliement(user)); });
    }

    return true;
}

module.exports = {
    sendMessage: function(message) {
        return sendMessage(message);
    }
}