const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => {        
        const servers = await load("servers");
        const storage = servers[msg.guild.id].storage;
        
        if (!argstring || argstring == "") return errors.syntax;
        if (!storage[argstring]) return "That entry doesn't exist already";
        delete storage[argstring];
        await save("servers", servers);
        msg.react("👍");

        return servers;
    },
    help: `
    Usage: delete [key]
    
    Deletes the saved value at the given key (a single word)`
}