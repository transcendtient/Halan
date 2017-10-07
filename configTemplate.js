const youtubeOpts = {
		maxResults: 1,
		type: 'video',
		key: 'YOUR_KEY'
};

var mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'ialan',
});

mysqlConnection.connect(function(err) {
  // connected! (unless `err` is set)
  console.log(err);
});

const discordToken = "YOUR_TOKEN";

const lastfmKey = "YOUR_KEY";

module.exports.lastfmKey = lastfmKey;
module.exports.youtubeOpts = youtubeOpts;
module.exports.discordToken = discordToken;
module.exports.mysqlConnection = mysqlConnection;