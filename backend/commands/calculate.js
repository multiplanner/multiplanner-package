const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));
const math = await import("mathjs");


export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        try{
            return math.evaluate(argstring).toString();
        } catch (e) {
            return "no";
        }
    },
    help: ``
}