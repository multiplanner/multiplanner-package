const Discord = require("discord.js");

const {
    multiReis,
    planReis,
    formatteerReis
} = require("multiplanner");

const {
    tekst
} = require('bijbel-package');

const readJSONSync = require('./functies/readJSONSync.js');

const config = readJSONSync("config");

const client = new Discord.Client();

const updateGamestatus = async () => {
    const tekstregel = await tekst("statenvertaling", config.tekstenfilter);
    const tekstinhoud = tekstregel.match(/(?<=^[0-9A-Za-z ]+ )[^0-9]+$/)[0];
    await client.user.setActivity(tekstinhoud);
};

client.on("ready", async () => {
    console.log(`Ingelogd als ${client.user.tag}`);
    await updateGamestatus();
    setInterval(updateGamestatus, 60000);
});

client.on("message", async (msg) => {
    if (msg.author.bot || !msg.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
    const route = msg.content.slice(config.prefix.length);
    
    planReis(multiReis(route)).then((reis) => {
        msg.channel.send("```" + formatteerReis(reis) + "```");
    }).catch((_) => msg.react("😕"));
});

client.login(config.dicord_bot_token);