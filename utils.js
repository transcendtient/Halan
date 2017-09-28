let getUserFromName = function(userName) {
    return;
    var user = bot.client.users.find(user => user.userName === userName);
}

module.exports = {
    getUserFromName: function(userName) {
        return getUserFromName(userName);
    }
}