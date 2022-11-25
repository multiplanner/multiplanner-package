const Discord = await import("discord.js");

const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        const servers = await load("servers");
        const storage = servers[msg.guild.id].storage;
        
        let table = new Discord.MessageEmbed();
        for (key in storage) {
            table.addField(key, storage[key]);
        }
        
        msg.channel.send(table);
    },
    help: `
    Returns all saved key/value pairs
    `
}