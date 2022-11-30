const fs = await import("fs");
const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


export default {
    permission: permissions.moderator,
    code: async (msg, argstring, config) => {
        const servers = await load("servers");
        const allcommands = fs.readdirSync(path.join(cwd, "commands")).map(command => command.replace(".js", ""));
        if (!argstring || argstring == "") return errors.syntax;
        if (!allcommands.includes(argstring)) return "That command doesn't exist!";
        if (config.blocklist.includes(argstring)) return "Not installed already!";
        servers[msg.guild.id].blocklist.push(argstring);
        await save("servers", servers);
        msg.react("👍");

        return servers;
    },
    help: `
    Usage: \`uninstall [command]\`

    Disables a bot command for the current server.
    `
}