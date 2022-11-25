
const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


export default {
    permission: permissions.trialmod,
    code: async (msg, argstring, config) => { 
        const user = msg.mentions.users.first();
        if (!user) return errors.syntax;
        const member = msg.guild.member(user);
        if (member) {
            const role = msg.guild.roles.cache.find(role => role.name == "muted");
            member.roles.remove(role).catch(e => {
                return permissions.botperms;
            });
        } 
    },
    help: `
    Usage: unmute [mention].
    
    Removes the \`muted\` role from the mentioned user.`
}
