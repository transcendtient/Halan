let insults = [
    "@, you have your entire life to be a jerk. Why not take today off?",
    "@, your ass must be pretty jealous of all the shit that comes out of your mouth.",
    "@, remember when I asked for your opinion? Me neither.",
    "@, If you’re waiting for me to care, I hope you brought something to eat, ‘cause it’s gonna be a really long time.",
    "@, some day you’ll go far—and I really hope you stay there.",
    "@, I’m trying my absolute hardest to see things from your perspective, but I just can’t get my head that far up my ass.",
    "@, sometimes it’s better to keep your mouth shut and give the impression that you’re stupid than open it and remove all doubt.",
    "@, I’m not a proctologist, but I know an asshole when I see one.",
    "@, you only annoy me when you’re breathing, really.",
    "@, do yourself a favor and ignore anyone who tells you to be yourself. Bad idea in your case.",
    "@, I don’t know what your problem is, but I’m guessing it’s hard to pronounce.",
    "@, do your parents even realize they’re living proof that two wrongs don’t make a right?",
    "@, remember that time I said I thought you were cool? I lied.",
    "@, everyone’s entitled to act stupid once in awhile, but you really abuse the privilege.",
    "@, I can’t help imagining how much awesomer the world would be if your dad had just pulled out.",
    "@, do you ever wonder what life would be like if you’d gotten enough oxygen at birth?",
    "@, please, save your breath. You’ll probably need it to blow up your next date.",
    "@, can you die of constipation? I ask because I’m worried about how full of shit you are.",
    "@, good story, but in what chapter do you shut the fuck up?",
    "@, don’t hate me because I’m beautiful. Hate me because your boyfriend thinks so.",
    "@, Were you born on the highway? That is where most accidents happen.",
    "@, please, keep talking. I only yawn when I’m super fascinated.",
    "@, if I wanted to hear from an asshole, I’d fart.",
    "@, Jesus might love you, but everyone else definitely thinks you’re an idiot.",
    "@, sorry, I didn’t get that. I don’t speak bullshit.",
    "@, the only way you’ll ever get laid is if you crawl up a chicken’s ass and wait.",
    "@, if ignorance is bliss, you must be the happiest person on the planet.",
    "@, are you always such an idiot, or do you just show off when I’m around?",
    "@, there are some remarkably dumb people in this world. Thanks for helping me understand that.",
    "@, I could eat a bowl of alphabet soup and shit out a smarter statement than whatever you just said.",
    "@, I was pro life. Then I met you.",
    "@, you’re about as useful as a screen door on a submarine.",
    "@, whenever we hang out, I remember that God really does have a sense of humor.",
    "@, It’s kind of hilarious watching you try to fit your entire vocabulary into one sentence.",
    "@, please just tell me you don’t plan to home-school your kids.",
    "@, you always bring me so much joy—as soon as you leave the room.",
    "@, I was hoping for a battle of wits but it would be wrong to attack someone who’s totally unarmed.",
    "@, I’d tell you how I really feel, but I wasn’t born with enough middle fingers to express myself in this case.",
    "@, stupidity’s not a crime, so feel free to go.",
    "@, I’d tell you to go fuck yourself, but that would be cruel and unusual punishment.",
    "@, the village called. They’d like their idiot back. You better get going.",
    "@, you have the right to remain silent because whatever you say will probably be stupid anyway.",
    "@, your family tree must be a cactus ‘cause you’re all a bunch of pricks.",
    "@, I was going to give you a nasty look but I see that you’ve already got one.",
    "@, you’re about as useful as an ashtray on a motorcycle.",
    "@, people like you are the reason I’m on medication.",
    "@, I believed in evolution until I met you.",
    "@, If I threw a stick, you’d leave, right?",
    "@, you’ll never be the man your mom is.",
    "@, Earth is full. Go home.",
    "@, Away, you starvelling, you elf-skin, you dried neat’s-tongue, bull’s-pizzle, you stock-fish!",
    "@, a most notable coward, an infinite and endless liar, an hourly promise breaker, the owner of no one good quality.",
    "@, away, you starvelling, you elf-skin, you dried neat’s-tongue, bull’s-pizzle, you stock-fish!",
    "@, away, you three-inch fool! ",
    "@, Come, come, you froward and unable worms!",
    "@, go, prick thy face, and over-red thy fear, Thou lily-liver’d boy.",
    "@'s wit’s as thick as a Tewkesbury mustard.",
    "@, I am pigeon-liver’d and lack gall.",
    "I am sick when I do look on @ ",
    "@, I must tell you friendly in your ear, sell when you can, you are not for all markets.",
    "I’ll beat @, but I would infect my hands.",
    "I scorn you, @, scurvy companion. ",
    "Me think’st @ art a general offence and every man should beat thee.",
    "@, more of your conversation would infect my brain.",
    "@'s wife’s a hobby horse!",
    "Peace, @, ye fat guts!",
    "@. Poisonous bunch-backed toad!",
    "@. The rankest compound of villainous smell that ever offended nostril",
    "The tartness of @'s face sours ripe grapes.",
    "There’s no more faith in @ than in a stewed prune.",
    "@, thine face is not worth sunburning.",
    "@. This woman’s an easy glove, my lord, she goes off and on at pleasure.",
    "@, thou art a boil, a plague sore",
    "@, thou art as fat as butter.",
    "@. Like the toad; ugly and venomous.",
    "@, thou art unfit for any place but hell.",
    "@, thou cream faced loon",
    "@, thou clay-brained guts, thou knotty-pated fool, thou whoreson obscene greasy tallow-catch!",
    "@, thou damned and luxurious mountain goat.",
    "@, thou elvish-mark’d, abortive, rooting hog!",
    "@, thou leathern-jerkin, crystal-button, knot-pated, agatering, puke-stocking, caddis-garter, smooth-tongue, Spanish pouch!",
    "@, thou lump of foul deformity",
    "@, that poisonous bunch-back’d toad!",
    "@, thou sodden-witted lord! Thou hast no more brain than I have in mine elbows ",
    "@, thou subtle, perjur’d, false, disloyal man!",
    "@, thou whoreson zed , thou unnecessary letter!",
    "@ sin’s not accidental, but a trade.",
    "@ tongue outvenoms all the worms of Nile.",
    "Would @ wert clean enough to spit upon",
    "Would @ wouldst burst!",
    "@, you poor, base, rascally, cheating lack-linen mate! ",
    "@, you are as a candle, the better burnt out.",
    "@, you scullion! You rampallian! You fustilarian! I’ll tickle your catastrophe!",
    "@, you starvelling, you eel-skin, you dried neat’s-tongue, you bull’s-pizzle, you stock-fish–O for breath to utter what is like thee!-you tailor’s-yard, you sheath, you bow-case, you vile standing tuck!",
    "@, your brain is as dry as the remainder biscuit after voyage.",
    "@, villain, I have done thy mother",
];

let getRandomInsult = function() {
    return insults[Math.floor(Math.random()*insults.length)].replace("@", insultee);
}

let meetsCondition = function(message) {
    return message.content.includes("insult");
};

let sendResponse = function(message) {

    let insultees = message.mentions.users;

    if (message.content.includes("me")) {
        insultees.set(message.author.id, message.author);
    }

    if (message.everyoneMentioned || message.content.includes("everyone")) {
        insultees = message.guild.members.filter(member => member.user.bot == false);
    }

    if (insultees.size === 0) {
        message.channel.send("Yeah, just tell me who's too happy right now. \nI can insult them no problem");
    }

    insultees.forEach( insultee => {
        message.channel.send(getRandomInsult());
    })

}

module.exports = {
    meetsCondition: function(message) {
        return meetsCondition(message);
    },
    sendResponse: function(message){
        sendResponse(message);
    },
}