const fs = require("fs")
const path = process.cwd()
const config = JSON.parse(fs.readFileSync(path + "/config.json").toString())
const prefix = config.prefix

let message = msg.content.substr(prefix.length)
let argstring = message.substr(message.indexOf(" ") + 1)







    // if (msg.author.bot && !spam) return
    /*
    if (react) {
        let reactions = msg.guild.emojis.cache.filter(emoji => /(communism|stalin|lenin|helpmeplz|nightmare|linus_touch_tips|trollee|haha|gentoo|kirottu_muoto|bororororororooororoororrrroooo|AhHiii|obamaprism)/.test(emoji.name))
        reactions.forEach(emoji => msg.react(emoji))
    }
    
    if (commie) {
        let match = /(^| )(my|his|her|your|mine)($| )/.exec(msg.content.toLowerCase())
        if(match) {
            let noun = msg.content.slice(match.index + match.length - 1)
            msg.channel.send(`our ${noun}* ${getCustomEmote(msg.guild.emojis.cache, "stalin")}`)
        }
    }
    
    storage.interjections.forEach(interjectionobject => {
        if (!interjectionobject.enabled) return
        let match = new RegExp(interjectionobject.regex).exec(msg.content.toLowerCase())
        if (match) msg.channel.send(interjectionobject.copypasta + "bruh")
    })*/