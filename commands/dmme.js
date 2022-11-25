const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        const message = argstring != "" ? argstring : "Hello :D";
        msg.author.send(message).catch((e) => {});
    },
    help: `
    Usage: \`dmme (text to send\`)
    
    Will send a dm (private message) to the user who issued the command.
    The message will contain the given text, or alternatively a placeholder text.
    `
}
