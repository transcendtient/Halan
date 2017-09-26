let confusedMesssages = [
    "What?",
    "Huh?",
    "I'm sorry, I don't understand",
    "Write more clearly please",
    "The hell...",
    "Stop bothering me",
    "Work work...",
    "Boy, You need your ass whooped",
    "I'm afraid I can't do that",
    "Stop that. Or else I'm going to have to lick you",
];

let getRandomConfusedMessage = function () {
    return confusedMesssages[Math.floor(Math.random()*confusedMesssages.length)];
};

let sendResponse = function(message) {
    message.channel.send(getRandomConfusedMessage());
}

module.exports = {
    meetsCondition: function(message) {
        return true;
    },
    sendResponse: function(message){
        sendResponse(message);
    },
}