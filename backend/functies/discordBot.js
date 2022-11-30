// load libs
const fs = require("fs");
const path = require("path");

const Discord = require("discord.js");

const cwd = process.cwd();

const { save, load, file } = require(path.join(cwd, "database", "index.js"));
const { permissions, errors } = require(path.join(cwd, "utils", "constants.js"));

let globalconfig, servers, commandcache;

const reload = async (clearcache = true, online = false) => {
    globalconfig = await load("config");
    servers = await load("servers");
    if (clearcache) commandcache = {};  // Create empty cache object, clear deleted commands from cache
    if (online) client.user.setActivity(globalconfig.gamestatus); // set game status in case it changed in config. only when online to prevent error.

    const commands = await fs.promises.readdir(path.join(cwd, "commands"));
    commands.forEach((command) => {
        commandcache[command.replace(".js", "")] = require(path.join(cwd, "commands", command));
    });
};

const newguild = async guild => {
    servers[guild.id] = {
        ...await file(["database", "default_config.json"], true),
        ...globalconfig.default_config,
        name: guild.name
    };
    await save("servers", servers);
};

const client = new Discord.Client();

// Runs at successful login to discord.
client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity(globalconfig.gamestatus);

    //  In case bot is added to a new guild while it was offline
    client.guilds.cache.filter(guild => !servers[guild.id]).forEach(newguild);
});

// Runs on new message.
client.on("message", async (msg) => {
    if (msg.author.bot || msg.channel.type == "dm") return;

    const config = servers[msg.guild.id.toString()];   // Load the config for the guild this message is from

    let permission_level = permissions.member;
    if (msg.member.roles.cache.find(r => r.name == config.trialmodrole)) permission_level = permissions.trialmod;
    if (msg.member.permissions.has("KICK_MEMBERS")) permission_level = permissions.moderator;
    if (globalconfig.sysadmins.includes(msg.author.id)) permission_level = permissions.sysadmin;

    if (
        !msg.content.toLowerCase().startsWith(config.prefix.toLowerCase()) || // Does it start with prefix? Prefix can be capitalized for mobile users with auto capitalisation.
        (permission_level < permissions.trialmod && config.blocked_channels.includes(msg.channel.id))  // If bot isn't allowed in channel. Moderators/sysadmins can use bot anywhere.
    ) return;   // Then stop

    const message = msg.content.substr(config.prefix.length);   // Only get the part after the prefix
    let firstspace = message.indexOf(" ");    // Get the index of the first space in the message (= where the arguments begin)
    firstspace = firstspace < 0 ? message.length : firstspace;  // Set it to end of message if there aren't any arguments
    const command = message.substr(0, firstspace);  // Get the command name, eg. the part between prefix and first space
    const argstring = message.substr(firstspace + 1);   // Get the string of arguments
    console.log(msg.author.tag, "   ", message);    // Log who runs what command
    
    if (!commandcache[command]) return msg.channel.send(config.storage[command] || "That's not a command!");
    if (config.blocklist.includes(command)) return msg.channel.send("That command is blocked on this server!");
    if (permission_level < commandcache[command].permission) return msg.channel.send("You aren't allowed to use this command!");
          
    const result = await commandcache[command]
        .code(msg, argstring, config)
        .catch(console.log);
        
    if (result == undefined);
    else if (typeof(result) == "object") servers = result
    else if (typeof(result) == "string" && result != "") {
        if (result.length > 2000) {
            const file = path.join(cwd, "temp", command + Date.now() + ".txt");
            await fs.promises.writeFile(file, result);
            msg.channel.send({files: [file]}).catch(() => msg.channel.send("Message too large for Discord!"));
        } else msg.channel.send(result);
    }
});

// Runs when added to new server.
client.on("guildCreate", newguild);

const backup = () => {
    const file = path.join(cwd, "database", "storage", "servers.json");
    globalconfig.sysadmins.forEach(adminid => client.users.cache.get(adminid).send({files: [file]}).catch(console.log));
};

// load the configs for first time
reload().then(async () => {
    await client.login(globalconfig.token);
    setInterval(backup, 1000 * 60 * 60);
});