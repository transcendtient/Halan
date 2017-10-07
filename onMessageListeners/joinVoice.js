let bot = require("../bot.js");


let sendMessage = function(message) {

	//
	//
	//JOIN VOICE
	//////////////////////////////
	//hal, summon

	let content = message.content;

    if (!content.includes("summon")
	 && !content.includes("unsummon")) return false;

	console.log(content); 
	var i = 0;
	var valArray = content.split(",").map(function(item) {
	console.log(i++);
		console.log(":"+item.trim()+"\n");
		return item.trim();
	});

	var command = valArray[1];

	if(valArray.length != 2) return false;

	if(command === 'summon'){

		bot.voiceChannel = message.member.voiceChannel;
		if (!bot.voiceChannel){
			return message.channel.sendMessage(":x: You are not in a voice channel!!");
		}

		bot.voiceChannel.join().then(connection => {
			 console.log("connection:" + connection);
			 bot.voiceConnection = connection;
			 message.channel.sendMessage(":white_check_mark: **Connected!**");
			 return true;
		});
		return true;
	}

	if(command === 'unsummon'){
		bot.voiceChannel.leave();
	}
}

module.exports = {
    sendMessage: function(message) {
        return sendMessage(message);
    }
}