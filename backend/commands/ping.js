const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        msg.channel.send("Hello " + msg.author.username);   // no return, for reliability
    },
    help: `
    Returns a text plus the name of who issued the command.
    `
}
