const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => "***" + argstring.toUpperCase().split("").join(" ") + "***",
    help: `
    Usage: \`scream [text]\`.
    
    Returns the given text but stylized ***L I K E   T H I S***.
    `
}
