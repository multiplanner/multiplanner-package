const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => Math.random() < 0.5,
    help: `
    "Flips a coin".
    
    Has a 50% chance of returning \`true\`, returns \`false\` otherwise.
    `
}
