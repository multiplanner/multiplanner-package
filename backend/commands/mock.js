const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        return argstring
            .split("")
            .map((char, index) => index % 2 == 0 ? char.toLowerCase() : char.toUpperCase())
            .join("")
            
    },
    help: `
    Usage: \`mock [text to mock]\`.
    
    Returns the given text stylized lIkE ThIs
    `
}
