const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        let match = argstring.match(/<[:a-zA-Z:0-9]+>/);
        if (match) {
            const emote = match[0];
            const id = emote.split(":")[2].slice(0, -1);
            return `https://cdn.discordapp.com/emojis/${id}.png`;
        } else {
            return errors.syntax;
        }
    },
    help: `
    Usage: \`emote [discord server custom emote]\`.
    
    This will not work with unicode or default discord emotes.
    `
}