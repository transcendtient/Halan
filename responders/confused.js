let confusedMesssages = [
    "What?",
    "I'm sorry, I don't understand",
    "The hell...",
    "Stop bothering me",
    "Boy, you need your ass whooped",
    "I'm afraid I can't do that",
    "Stop that. Or else I'm going to have to lick you",
    "Did somebody call for me?",
    ":middle_finger:",
    "42!",
];

let getRandomConfusedMessage = function () {
    return confusedMesssages[Math.floor(Math.random()*confusedMesssages.length)];
};

let sendMessage = function(message) {
    message.channel.send(getRandomConfusedMessage());
}

module.exports = {
    sendMessage: function(message){
        sendMessage(message);
    },
}