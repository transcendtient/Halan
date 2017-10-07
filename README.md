## Setting Up ##

1) Get Node.js  
2) Open command line prompt in project directory  
3) Run `npm install --global --production windows-build-tools` (if on Windows)
4) Run `npm install --save discord.js node-opus erlpack uws libsodium-wrappers node-mysql ytdl-core youtube-search get-json`
5) Install FFMPEG
6) Rename `configTemplate.js` to `config.js` and fill in the appropriate keys/tokens.
7) Install mysql-server and create a database (and user if you like).
8) Run the bot with `node bot.js`  

## Important to Note ##
The token in config.js is supposed to be super secretive. It contains all the passwords and tokens that are unique to your bot.

## Running your own bot ##
1) Go to https://discordapp.com/developers/applications/me.  
2) Go through the steps of creating a new application  
   [Find in-depth guide here](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)  
3) Replace the token with your own token and run it.  