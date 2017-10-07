let bot = require("../bot.js");

const yt = require('ytdl-core');

const search = require('youtube-search');


let sendMessage = function(message) {


	let content = message.content;

    if (!content.includes("pause") 
	 && !content.includes("resume")
	 && !content.includes("play")
	 && !content.includes("stop")) return false;

	console.log(content); 
	var i = 0;
	var valArray = content.split(",").map(function(item) {
	console.log(i++);
		console.log(":"+item.trim()+"\n");
		return item.trim();
	});

	//
	//
	//hal, [play, pause, resume]
	/////////////////////////////////////////////////
	//This can pause or resume for the keywords in brackets.
	var command = valArray[1];

	if(bot.dispatcher != null
	&& bot.dispatcher.paused == false 
	&& (command === "pause" || command == "stop")
	&& valArray.length == 2){
		bot.dispatcher.pause();
		console.log(bot.dispatcher);
		message.channel.sendMessage("Playback paused.");
		return false;
	}

	if(bot.dispatcher != null
	&& bot.dispatcher.paused == true 
	&& (command === "resume" || command === "pause" || command == "play")
	&& valArray.length == 2){
		bot.dispatcher.resume();
		message.channel.sendMessage("Playback resume.");
		return true;
	}
	/////////////////////////////////////////////
	//END [play, pause, resume]

	//
	//
	//hal, play, searchString
	/////////////////////////////////////////////////
	//This can search for a track and play it immediately or place it in the queue.
	if(valArray.length != 3 || !content.includes("play")) return false;

	searchForSong(valArray, message, bot);
}

let searchForSong = function(valArray, message) {
	var searchString = valArray[2];
	//find searched track and play or add to queue
	search(searchString, bot.config.youtubeOpts, function(err, results) {
		if(err) return console.log(err);
 
		console.log(results);

		//play it immediately
		if(bot.dispatcher == null || bot.dispatcher.paused == true){
			let stream = yt(results[0].link, {audioonly: true});
			message.channel.sendMessage('`Now playing:' + results[0].title + '`');
			bot.dispatcher = bot.voiceConnection.playStream(stream);
			//when this song is finished...
			bot.dispatcher.on('end', () => {
				if(bot.playQueue.length){
					var nextSong = bot.playQueue.shift();
					let stream = yt(nextSong.link, {audioonly: true});
					message.channel.sendMessage('`Now playing:' + nextSong.title + '`');
					bot.dispatcher = bot.voiceConnection.playStream(stream);

				} else {
					console.log("HEre");
					randomSongByArtist("Nine Inch Nails", valArray, message, bot);
				}
			});

		//add it to the playQueue
		} else {
			var index = bot.playQueue.length;
			bot.playQueue[index] = new Array();
			bot.playQueue[index].link = results[0].link;
			bot.playQueue[index].title = results[0].title;
			message.channel.sendMessage(bot.playQueue[index].title + "\nQueued in position [" + index + "]");
			console.log(bot.playQueue);
		}

		
	});
}

let randomSongByArtist = function(artist, valArray, message) {

	var getJSON = require('get-json');

	var artistURI = encodeURIComponent(artist);
 
	var url = 'http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&api_key=' + bot.config.lastfmKey + '&artist=' + artistURI + '&format=json';
	console.log(url);

	getJSON(url, function(error, response){
		if(error){
			message.channel.send(error);
			return false;
		}
		if(response){
			//console.log(JSON.stringify(response));
			var randIndex = Math.floor(Math.random()*response.topalbums.album.length);
			//message.channel.send("Random album:" + response.topalbums.album[randIndex].name);
			var album = response.topalbums.album[randIndex].name.trim();
			var albumURI = encodeURIComponent(album);				
			var url = 'http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=' + bot.config.lastfmKey + '&artist=' + artistURI + '&album=' + albumURI + '&format=json';
			console.log(url);

			var retVal = getJSON(url, function(error, response){
				if(error){
					message.channel.send(error);
					return false;
				}
				if(response && response.album.tracks.track.length){
					//console.log(JSON.stringify(response));
					var randIndex = Math.floor(Math.random()*response.album.tracks.track.length);
					var searchString = artist + " " + album + " " + response.album.tracks.track[randIndex].name;

					//find searched track and play or add to queue
					search(searchString, bot.config.youtubeOpts, function(err, results) {
						if(err) return console.log(err);
 
						console.log(results);

						let stream = yt(results[0].link, {audioonly: true});
						message.channel.sendMessage('`Now playing:' + results[0].title + '`');
						bot.dispatcher = bot.voiceConnection.playStream(stream);
						//when this song is finished...
						bot.dispatcher.on('end', () => {
							console.log("playQueue length:" + bot.playQueue.length);
							if(bot.playQueue.length){
								var nextSong = bot.playQueue.shift();
								let stream = yt(nextSong.link, {audioonly: true});
								message.channel.sendMessage('`Now playing:' + nextSong.title + '`');

								bot.dispatcher = bot.voiceConnection.playStream(stream);

								bot.dispatcher.on('end', () => {
									console.log("playQueue length:" + bot.playQueue.length);
									if(bot.playQueue.length){
										var nextSong = bot.playQueue.shift();
										let stream = yt(nextSong.link, {audioonly: true});
										message.channel.sendMessage('`Now playing:' + nextSong.title + '`');
										bot.dispatcher = bot.voiceConnection.playStream(stream);
									} else {
										randomSongByArtist("Nine Inch Nails", valArray, message, bot);
									}
								});

							} else {
								randomSongByArtist("Nine Inch Nails", valArray, message, bot);
							}
						});
					});
				} else {
					randomSongByArtist(artist, valArray, message);
				}
			});
		}
	});
}

module.exports = {
    sendMessage: function(message) {
        return sendMessage(message);
    }
}