const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


export default {
    permission: permissions.moderator,
    code: async (msg, argstring, config) => {
        const servers = await load("servers");
        servers[msg.guild.id].prefix = argstring;
        await save("servers", servers);
        msg.react("👍");
        return servers;
    },
    help: `
    Usage: \`prefix [prefix]\`
    
    Sets the prefix for this server`
}