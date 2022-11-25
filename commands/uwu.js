const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => argstring.replace(/[prl]/g, "w"),
    help: `
    Usage: \`uwu [text]\`.
    
    Returns the given text but stylized wike this.
    `
}
