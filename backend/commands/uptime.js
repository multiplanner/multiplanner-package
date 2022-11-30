const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const humandate = await import(path.join(cwd, "utils", "humandate.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => humandate(process.uptime() * 1000),
    help: `Returns the uptime of the bot.`
}
