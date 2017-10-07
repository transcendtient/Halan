let bot = require("../bot.js");

//mysql table



//form is... csv
let sendMessage = function(message) {
	
	let content = message.content;

    if (!content.includes("gifme")) return false;
	//
	//
	//SAVE
	//////////////////////////////
	//hal, gifme, save, name, url
	if (message.content.includes("save")){

		console.log(content); 
		var i = 0;
		var valArray = content.split(",").map(function(item) {
		console.log(i++);
			console.log(":"+item.trim()+"\n");
			return item.trim();
		});
		if(valArray.length != 5) return false;

		
		var table = valArray[1];
		var name = valArray[3];
		var url = valArray[4];

		if (table === "gifme"){
			
			var post  = {name: name, url: url};
		
			var query = bot.connection.query('INSERT INTO gifme SET ?', post, function(err, result) {
				if(err){
				message.channel.send(err);
				    message.delete();
					return false;

				} else {
					message.channel.send("New gifme " + name + " saved.\n" + url);
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
		//hal, gifme, delete, id
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

			if (table === "gifme"){

				var query = bot.connection.query('SELECT name, url FROM gifme WHERE id = ' + id, function(err, result) {
					if(err){
						message.channel.send(err);
						message.delete();
						return false;
					} else {
						if(result.length){
							console.log("DELETE SELECT RESULT:" + result);
							result.forEach(function(item){
								message.channel.send(item.name + " " + item.url);
							});
							message.channel.send("Dead gif here...");
							message.delete();
							return true;
						} else {
							message.channel.send("That id doesn't exist.");
						} 
					}
				});
			
		
				var query = bot.connection.query('DELETE FROM gifme WHERE id = ' + id, function(err, result) {
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

			//
			//
			//GET
			//////////////////////////////
			//hal, gifme, name
			var i = 0;
			var valArray = content.split(",").map(function(item) {
				console.log(i++);
				console.log(":"+item.trim()+"\n");
				return item.trim();
			});

			if(valArray.length != 3) return false;
			console.log("LENGTH!" + valArray.length);
		
			var name = valArray[2];

			var query = bot.connection.query('SELECT id, url FROM gifme WHERE name = "' + name + '"', function(err, result) {
				if(err){
					message.channel.send(err);
					message.delete();
					return false;
				} else {
					console.log(result);
					var randIndex = Math.floor(Math.random()*result.length);
					message.channel.send("[" + result[randIndex].id + "]" + result[randIndex].url);
					message.delete();
					return true;
				}
			});
			return true;
		}
	}
}

module.exports = {
    sendMessage: function(message) {
        return sendMessage(message);
    }
}