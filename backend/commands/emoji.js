const fs = await import("fs");
const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


const emojis = JSON.parse(fs.readFileSync(path.join(cwd, "assets", "emoji.json")).toString());

const getEmoji = (keyword, maxemoji) => {
    let candidates = emojis.filter(
        (entry) => entry[1].join(" ").indexOf(keyword.toLowerCase()) >= 0
    );
    
    if (candidates.length > 0) {
        let a = "";
        for (let i = 0; i < maxemoji && i < candidates.length; i++)
            a += candidates[i][0];
        return a + " ";
    } else return " ";
}
// TODO prevent errors on incorrect input
export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        let args = argstring.split(" ");
            return args
                .slice(1)
                .map((word) => word + getEmoji(word, args[0]))
                .join("")
    },
    help: `
    Usage: \`emoji [maximum amount of emoji per word] [text to put emojis in]\`.
    
    Note that too long messages with too much emojis will not be returned, as per discord character limit.
    `
}
