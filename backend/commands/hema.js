
const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        msg.channel.send("Hiema roekwurst");   
    },
    help: `
    Hiema Roekwurst yep. That's it
    `
}
