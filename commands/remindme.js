const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));

export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => {

        let firstspace = argstring.indexOf(" ");
        firstspace = firstspace < 0 ? argstring.length : firstspace;
        const time = argstring.substr(0, firstspace);
        const note = argstring.substr(firstspace + 1);

        if (isNaN(time) || time == "") return errors.syntax;

        const milliseconds = time * 1000 * 60;

        setTimeout(() => msg.reply(note), milliseconds);

        msg.react("👍");
        
    },
    help: `
    Usage: \`remindme [time] (note)\`.
    
    Pings you with an optional note you give after the specified amount of *minutes*.
    `
}
