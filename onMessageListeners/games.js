let games = [
    "Overwatch", 
    "StarCraft II",
    "Hearthstone",
    "Rocket League", 
    "Divinity: Original Sins 2", 
    "Left 4 Dead 2"
];

let responses = [
    "Try @",
    "Hmm.. how about @?",
    "Do @!",
    "Playing @ will bring you lots of happiness. Trust me."
]

let getRandomGame = function () {
    return games[Math.floor(Math.random()*games.length)];
}

let getRandomResponse = function () {
    return responses[Math.floor(Math.random()*responses.length)];
}

let sendMessage = function(message) {
    if (!message.content.match(/(?=.*game)(?=.*should)(?=.*play)/)) return false;
    message.channel.send(getRandomResponse().replace("@", getRandomGame()));
    return true;
}

module.exports = {
    sendMessage: function(message){
        sendMessage(message);
    }
}