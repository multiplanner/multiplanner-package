
const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const isint = await import(path.join(cwd, "utils", "isint.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


export default {
    permission: permissions.trialmod,
    code: async (msg, argstring, config) => {
        
        if (!isint(argstring) || argstring > 100) return errors.syntax;
        
        msg.channel.bulkDelete(argstring).catch(() => {
            return errors.botperms;
        });
    },
    help: `
    Usage: \`clear [amount]\`
    
    Deletes the given amount of messages in the current channel. Thanks to Discord api limitations, you can only clear up to 100 messages at once.`
}
