const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        if (config.selfroles.length == 0) return "No selfroles configured. See addrole and delrole commands."
        return config.selfroles.join("\n");
    },
    help: `
    Lists all available self assignable roles.
    `
}