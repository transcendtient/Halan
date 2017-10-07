let bot = require("../bot.js");

//mysql table



//form is... csv
function splitWithTail(str,delim,count){
	var parts = str.split(delim);
	var tail = parts.slice(count).join(delim).trim();
	var result = parts.slice(0,count);
	result.push(tail);
	return result;
}

let sendMessage = function(message) {
	
	let content = message.content;

    //if (!content.includes("gifme")) return false;

	//
	//
	//SAVE
	//////////////////////////////
	//hal, confused, save, quote
	if (message.content.includes("save")){

		console.log(content); 
		var i = 0;
		var valArray = splitWithTail(content, ',', 3).map(function(item) {
			console.log(i++ + ":" + item.trim()+"\n");
			return item.trim();
		});
		if(valArray.length != 4) return false;

		
		var table = valArray[1];
		var quote = valArray[3];

		if (table === "confused"){
			
			var post  = {quote: quote};
		
			var query = bot.connection.query('INSERT INTO confused SET ?', post, function(err, result) {
				if(err){
				message.channel.send(err);
				    message.delete();
					return false;

				} else {
					message.channel.send("New quote saved.\n" + quote);
				    message.delete();
					return true;
				}

			});
		}
		return true;
	
	} else {
		//
		//
		//DELETE
		//////////////////////////////
		//hal, confused, delete, id
		if (message.content.includes("delete")){

			console.log(content); 
			var i = 0;
			var valArray = content.split(",").map(function(item) {
			console.log(i++);
				console.log(":"+item.trim()+"\n");
				return item.trim();
			});

			if(valArray.length != 4) return false;
		
			var table = valArray[1];
			var id = valArray[3];

			if (table === "confused"){

				var query = bot.connection.query('SELECT quote FROM confused WHERE id = ' + id, function(err, result) {
					if(err){
						message.channel.send(err);
						message.delete();
						return false;
					} else {
						if(result.length){
							console.log("DELETE SELECT RESULT:" + result);
							result.forEach(function(item){
								message.channel.send(item.quote);
							});
							message.channel.send("I'm somehow less confused...");
							message.delete();
							return true;
						} else {
							message.channel.send("That id doesn't exist.");
						} 
					}
				});
			
		
				var query = bot.connection.query('DELETE FROM confused WHERE id = ' + id, function(err, result) {
					if(err){
						message.channel.send(err);
						message.delete();
						return false;
					}
				});
			}
			return true;
		} else {

			console.log(content); 

			var query = bot.connection.query('SELECT id, quote FROM confused', function(err, result) {
				if(err){
					message.channel.send(err);
					message.delete();
					return false;
				} else {
					console.log(result);
					var randIndex = Math.floor(Math.random()*result.length);
					message.channel.send("[" + result[randIndex].id + "]" + result[randIndex].quote);
					return true;
				}
			});
			return true;
		}
	}
}

module.exports = {
    sendMessage: function(message){
        sendMessage(message);
    },
}