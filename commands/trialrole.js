const fs = await import("fs");
const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


export default {
    permission: permissions.moderator,
    code: async (msg, argstring, config) => {
        const servers = await load("servers");  
        if (!argstring || argstring == "") return "`" + servers[msg.guild.id].trialmodrole + "`";
        servers[msg.guild.id].trialmodrole = argstring;
        await save("servers", servers);
        msg.react("👍");

        return servers;
    },
    help: `
    Usage: \`trialrole [role name]\`.

    Sets the name of the role which is the trial admin role. People with a role with given name have the extra ability to clear, mute and unmute.
    `
}