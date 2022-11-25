const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));

const {
    multiReis,
    formatteerReis
} = await import('multiplanner');

export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => "```" + formatteerReis(await multiReis(argstring)) + "```",
    help: `
    Usage: planreis (routebeschrijving)
    `
}