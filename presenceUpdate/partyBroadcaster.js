//TODO: These values should unique for each guild
let partyCountRequirement = 3; //how many players must be in a game to be considered a party
let broadcastRepetitionDeferral = 2.5 * 3600000; //don't repeat same game for a given interval
let lastGameBroadcast = []; //when was game last broadcasted

let meetsPartySizeRequirements = function(count) {
    return count >= partyCountRequirement;
}

let meetsBroadcastDeferralRequirement = function(game) {
    if (lastGameBroadcast[game] === undefined) return true; //not broadcasted yet
    let timeSinceLastBroadcast = (new Date).getTime() - lastGameBroadcast[game];
    return  timeSinceLastBroadcast >= broadcastRepetitionDeferral;
}

let broadcastGame = function(channel, game) {
    lastGameBroadcast[game] = (new Date).getTime();
    channel.send("Everyone, get in here. Looks like there's a party going on " + game);
}

let sendResponse = function(client, oldGuildMember, newGuildMember) {
    
    let guild = newGuildMember.guild;
    let startedGame = newGuildMember.presence.game;

    if (!startedGame) {
        return;
    }

    let guildMembers = guild.members;
    let gamesBeingPlayed = [];

    guildMembers.forEach( guildMember => {
        if (!guildMember.presence.game) return;
        let gameName = guildMember.presence.game.name;
        gamesBeingPlayed[gameName] = (gamesBeingPlayed[gameName]+1) || 1;
    });

    for (var game in gamesBeingPlayed) {
        let count = gamesBeingPlayed[game];
        if (!meetsPartySizeRequirements(count) || !meetsBroadcastDeferralRequirement(game)) return;

        let channel = guild.channels.find(channel => channel.name === "broadcasts");
        if (channel) {
            broadcastGame(channel, game);
        }
    }

}

module.exports = {
    sendMessage: function(client, oldGuildMember, newGuildMember){
        sendResponse(client, oldGuildMember, newGuildMember);
    },
}