let games = ["Overwatch", 
               "StarCraft II",
               "Hearthstone",
               "Rocket League", 
               "Divinity: Original Sins 2", 
               "Left 4 Dead 2"];

let getRandomGame = function () {
    return games[Math.floor(Math.random()*games.length)];
}

let meetsCondition = function(message) {
    
    let matches = ["what", "game", "should", "play"];
    let inputs = message.content.split(' ');

    for (let i = 0; i < inputs.length; i++) {
        let inputWord = inputs[i];

        for (let j = 0; j < matches.length; j++) {
            let matchWord = matches[j];

            if (inputWord === matchWord) {
                matches.splice(j, 1);
                continue;
            }
        }
    }

    return matches.length == 0;
};

let sendResponse = function(message) {
    message.channel.send("Try " + getRandomGame());
}

module.exports = {
    meetsCondition: function(message) {
        return meetsCondition(message);
    },
    sendResponse: function(message){
        sendResponse(message);
    },
}