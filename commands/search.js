const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => "http://letmegooglethat.com/?q=" + argstring.replace(/ /g, "+"),
    help: `
    Usage: \`search [search query]\`.
    
    Sends a semi-sarcastic reminder to do research yourself before asking for help.
    `
}