const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));

export default {
    permission: permissions.moderator,
    code: async (msg, argstring, config) => {  
        const servers = await load("servers");
        if (servers[msg.guild.id].blocked_channels.includes(msg.channel.id)) {
            const index = servers[msg.guild.id].blocked_channels.indexOf(msg.channel.id);
            servers[msg.guild.id].blocked_channels.splice(index, 1);
            await save("servers", servers);
            msg.react("👍");
            return servers;
        } else {
            return "I was allowed here already!";
        }
    },
    help: `
    Allows the bot for "normal" members in the current channel`
}