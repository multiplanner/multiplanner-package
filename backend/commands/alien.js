const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        msg.delete().catch((e) => {});    
        const addition = argstring == "" ? "" : "**: " + argstring + "**";
        return "✨👄👀" + addition;
    },
    help: `
    Usage: alien (message)
    
    Summons a cute alien, which can optionally say a message.
    `
}