let bot = require("../bot.js");
var getJSON = require('get-json');
const yt = require('ytdl-core');

const search = require('youtube-search');


let artistURI = null;
let artist = null
let albumURI = null;
let albumImage = null;
let album = null;
let track = null;
let message = null;
let content = null;
let finished = true;
let sendMessage = function(msg) {

	message = msg;

	content = message.content;

    if (!content.includes("pause") 
	 && !content.includes("resume")
	 && !content.includes("play")
	 && !content.includes("stop")
	 && !content.includes("next")
	 && !content.includes("skip"))
	 return false;

	console.log(content); 
	var i = 0;
	var valArray = content.split(",").map(function(item) {
	console.log(i++);
		console.log(":"+item.trim()+"\n");
		return item.trim();
	});

	//
	//
	//hal, [play, pause, resume, next]
	/////////////////////////////////////////////////
	//This is how we traverse the playQueue, pause, and resume for the keywords in brackets.
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

	if(command == "next" || command === "skip"){
		nextSong(message);
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
	//var searchString = valArray[2];
	searchForSong(valArray[2]);
	return true;
}

let searchForSong = function(searchString) {

	//find searched track and play or add to queue
	message.channel.sendMessage('`Searching for:' + searchString + '`');
	search(searchString, bot.config.youtubeOpts, function(err, results) {
		if(err) return console.log(err);

		if(results != null && results.length > 0){
			console.log(results);

			//play it immediately if we're not playing
			if(bot.dispatcher == null || bot.dispatcher.paused == true){

				let stream = yt(results[0].link, {audioonly: true});
				message.channel.sendMessage('`Now playing:' + results[0].title + '`');
				bot.dispatcher = null;
				bot.dispatcher = bot.voiceConnection.playStream(stream);
				//when this song is finished...
				bot.dispatcher.on('end', () => {
					if(finished)
					autoPlay();
				});

				//when this song is starts...
				bot.dispatcher.on('start', () => {
					finished = true;
				});

			} else {

				//add it to the playQueue if we're playing
				if(bot.dispatcher != null && bot.dispatcher.paused == false){
					var index = bot.playQueue.length;
					bot.playQueue[index] = new Array();
					bot.playQueue[index].link = results[0].link;
					bot.playQueue[index].title = results[0].title;
					message.channel.sendMessage(bot.playQueue[index].title + "\nQueued in position [" + index + "]");
					console.log(bot.playQueue);
				}
			}
		} else {
			console.log("No YouTube results.");
		}
	});
}

let nextSong = function(){
	if(finished)
	autoPlay();
}

let autoPlay = function(){
	finished = false;
	console.log("playQueue length:" + bot.playQueue.length);
	if(bot.playQueue.length > 0){
		var nextSong = bot.playQueue.shift();
		let stream = yt(nextSong.link, {audioonly: true});
		message.channel.sendMessage('`Now playing:' + nextSong.title + '`');
		bot.dispatcher = null;
		bot.dispatcher = bot.voiceConnection.playStream(stream);
		bot.dispatcher.on('end', () => {
			if(finished)
			autoPlay();
		});

	} else {
		if(bot.autoPlay == true){
			console.log("here");
			artist = pickRandomArtist();
			artistURI = encodeURIComponent(artist);
			randomSongByArtist();
		}
	}

	//this is pretty fucking magical
	/*setTimeout(function() {
		finished = true;
	}, 4000);*/
}

let pickRandomArtist = function(){
	var randomArtists = [
		"Nine Inch Nails",
		"Deadmau5",
		"KMFDM",
		"Cake"
	];
	var randIndex = Math.floor(Math.random()*randomArtists.length);
	return randomArtists[randIndex];
}

let randomSongByArtist = function() {
	console.log("randomsongbyartist");
	
	var url = 'http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&api_key=' + bot.config.lastfmKey + '&artist=' + artistURI + '&format=json';
	console.log(url);

	getJSON(url, lastfmGetAlbum);
}

let lastfmGetAlbum = function(error, response){

	if(error){
		message.channel.send(error);
		return false;
	}
	if(response){
		var randIndex = Math.floor(Math.random()*response.topalbums.album.length);
		console.log(response.topalbums.album[randIndex].image[2]['#text']);

		//message.channel.send("Random album:" + response.topalbums.album[randIndex].name);
		album = response.topalbums.album[randIndex].name.trim();
		albumURI = encodeURIComponent(album);	
		albumImage = response.topalbums.album[randIndex].image[2]['#text'];
			
		var url = 'http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=' + bot.config.lastfmKey + '&artist=' + artistURI + '&album=' + albumURI + '&format=json';
		console.log(url);

		getJSON(url, lastfmGetTrack);
	} else {
		console.log("No albums for:" + artist);
		randomSongByArtist();
	}
}

let duration = 0;

let lastfmGetTrack = function(error, response){

	if(error){
		message.channel.send(error);
		return false;
	}
	if(response 
	&& response.hasOwnProperty("album") 
	&& response.album.hasOwnProperty("tracks")
	&& response.album.tracks.hasOwnProperty("track")
	&& response.album.tracks.track.length > 0){
		
		//console.log(JSON.stringify(response));
		var randIndex = Math.floor(Math.random()*response.album.tracks.track.length);
		track = response.album.tracks.track[randIndex].name;

		//checking duration so we dont play a whole album...
		duration = response.album.tracks.track[randIndex].duration;
		var minutes = Math.floor(duration / 60);
		var seconds = duration - minutes * 60;
		//less than 4 minutes
		if(minutes*100+seconds <= 400){
			bot.config.youtubeOpts.videoDuration = 'short';
		//less than 20 minutes
		} else {
			if(minutes*100+seconds < 2000){
				bot.config.youtubeOpts.videoDuration = 'medium';
			} else {
				bot.config.youtubeOpts.videoDuration = 'long';
			}
		}

		var searchString = artist + " " + album + " " + track;
		console.log("Youtube search string:" + searchString);
		//message.channel.sendMessage('`Searching for:' + searchString + '`');
		//find searched track and play or add to queue
		search(searchString, bot.config.youtubeOpts, function(err, results) {

			if(err) return console.log(err);
			if(results != null && results.length > 0){
				result = results[0];
				getVideoInfo(result);
				
			} else {
				console.log("No YouTube results.");
				randomSongByArtist();
			}
		});
	} else {
		console.log("No tracks in:" + artist + "," + album);
		randomSongByArtist();
	}
}

// sorted from worst to best
let YTDL_AUDIO_ENCODINGS = [
  'mp3',
  'aac',
  'wma',
  'vorbis',
  'wav',
  'flac',
];

let bestFormat = null;
let result = null;

let getVideoInfo = function(result){
	console.log(result.link);
	yt.getInfo(result.link, {downloadURL: true}, gotYouTubeInfo);
}

let gotYouTubeInfo = function gotYouTubeInfo(err, info) {
	console.log(result.link);
    if (err) return console.log(err);
   
    for (var i = 0; i < info.formats.length; i += 1) {
		var format = info.formats[i];
		//console.log(format);

		if (bestFormat == null 
		|| format.audioBitrate > bestFormat.audioBitrate 
		|| (format.audioBitrate === bestFormat.audioBitrate &&
		YTDL_AUDIO_ENCODINGS.indexOf(format.audioEncoding) >
		YTDL_AUDIO_ENCODINGS.indexOf(bestFormat.audioEncoding))){
			//console.log(format);
			bestFormat = format;
		}
    }

	let playOpts = {audioonly: true};
	let stream = null;

	if(bestFormat == null){
		console.log(result);
		console.log(result.length);
		stream = yt(result.link, playOpts);
	} else {
		console.log("bestFormat");
		console.log(bestFormat);
		stream = bestFormat.url;
	}
	message.channel.sendMessage({
        "embed": {
			fields: [
				{
					name: "Artist",
					value: artist
				},
				{
					name: "Album",
					value: album
				},
				{
					name: "Track",
					value: track
				}
			],
            image: {
				url: albumImage,
            }
        }
    });

	//probably too many passes
	bot.dispatcher = null;
	bot.dispatcher = bot.voiceConnection.playStream(stream, {passes:3, bitrate:  bestFormat.audioBitrate});

	//when this song is finished...
	bot.dispatcher.on('end', () => {
		if(finished)
		autoPlay();
	});

	//when this song is starts...
	bot.dispatcher.on('start', () => {
		finished = true;
	});

	result = null;
	bestFormat = null;
}

module.exports = {
    sendMessage: function(message) {
        return sendMessage(message);
    }
}