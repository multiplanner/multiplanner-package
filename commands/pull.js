const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        if (!argstring || argstring == "") return errors.syntax;
        const servers = await load("servers");
        if (!servers[argstring]) return "This bot doesn't seem to be in the given server!"
        const current = servers[msg.guild.id].storage;
        const other = servers[argstring].storage;

        servers[msg.guild.id].storage = {
            ...other,
            ...current
        };

        await save("servers", servers);
        msg.react("👍");

        return servers;
    },
    help: `
    Usage: pull [server id]
    
    Pulls all custom commands from the discord server with given id. Keeps current entries.`
}


