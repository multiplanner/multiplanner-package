const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        if (!config.selfroles.includes(argstring)) return "That's not a self assignable role!";
        const role = msg.guild.roles.cache.find(role => role.name == argstring);
        if (!role) return "That's not a role in this server!";
        msg.member.roles.remove(role).catch(e => {
            return permissions.botperms;
        });
        msg.react("👍");
    },
    help: `
    Usage: join [role name].

    Removes the given role from user. This only works if the role is whitelisted for self assigning.
    `
}
