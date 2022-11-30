const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


export default {
    permission: permissions.moderator,
    code: async (msg, argstring, config) => {
        const servers = await load("servers");  
        if (config.blocked_channels.includes(msg.channel.id)) return "Not allowed here already";
        servers[msg.guild.id].blocked_channels.push(msg.channel.id);
        await save("servers", servers);
        msg.react("👍");

        return servers;
    },
    help: `
    Disallows the bot in the channel the current chanel for "normal" members.
    `
}