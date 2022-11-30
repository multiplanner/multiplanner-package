const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));

const worter = path.resolve(cwd, "assets", "water.png");

export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        msg.channel.send("**I HAVE ARE HAS OBTAINED THE CRAVED *W A T E R***");
        msg.channel.send({files: [worter]});
    },
    help: `
    Obtains ***W A T E R***
    `
}
