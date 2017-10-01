let gifs = []
gifs.noice = "gifs/noice.gif";
gifs.stare = "gifs/stare.gif";
gifs.mrbeanbrow = "gifs/mrbeanbrow.gif";
gifs.rainbow = "gifs/rainbow.gif";

let sendMessage = function(message) {
    if (!message.content.includes("gifme")) return false;
    let content = message.content;
    let gifRequested = content.slice(content.indexOf("gifme") + 6).toLowerCase();

    let gif = gifs[gifRequested];

    if (!gif) return false;

    message.channel.send("", {file: gif});
    message.delete();

    return true;
}

module.exports = {
    sendMessage: function(message) {
        return sendMessage(message);
    }
}