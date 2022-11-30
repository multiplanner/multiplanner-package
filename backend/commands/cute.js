const fs = await import("fs");
const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


const cuteness = JSON.parse(fs.readFileSync(path.join(cwd, "assets", "cuteness.json")));

export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => cuteness[Math.floor(Math.random() * cuteness.length)],
    help: `Returns a random cute image.`
}