const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));

const globalconfig = load("config");

export default {
    permission: permissions.sysadmin,
    code: async (msg, argstring, config) => {
        await msg.react("👋");
        process.exit();
    },
    help: `
    Turns off the bot, which will then automatically restart.`
}
