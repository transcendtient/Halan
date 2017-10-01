class Utils {
    constructor(bot, client) {
        this.bot = bot;
        this.client = client;
    }

    getUser(username) {
        return this.client.users.find(user => user.username === username && !user.bot);
    }

    removeBotName(content) {
        content.replace(this.bot.halanRegexp, "");
    }

    getTargetChannelAndClean(message) {
        
    }

    getTargetUserAndClean(message) {
        let content = message.content;
    }

    resolveToMentions(message) {
        let possibleMentions = message.content.match(/@[A-Za-z]*\b/);
        if (!possibleMentions) return;

        let mentionedUsers = possibleMentions.map( pMention => 
            this.getUser(pMention.replace("@", "")));

        mentionedUsers.forEach(user => {
            console.log(user);
            message.mentions.users.set(user.id, user)
        });
    }

    getRandom(array) {
        return array[Math.floor(Math.random()*array.length)];
    }
}

module.exports = Utils;