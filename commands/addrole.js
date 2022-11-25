const fs = await import("fs");
const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));

export default {
    permission: permissions.moderator,
    code: async (msg, argstring, config) => {
        const servers = await load("servers");
        if (!msg.guild.roles.cache.find(role => role.name == argstring)) return "Not a role!";
        if (config.selfroles.includes(argstring)) return "Already a selfrole!";
        servers[msg.guild.id].selfroles.push(argstring);
        await save("servers", servers);
        msg.react("👍");

        return servers;
    },
    help: `
    Usage: \`addrole [role name]\`

    Makes a role self assignable
    `
}