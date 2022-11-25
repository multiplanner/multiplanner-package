const path = await import("path");
const { writeFile, unlink } = await import("fs").promises;
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));

const patternlimit = 1;
const responselimit = 1;

const messagelimit = 100;

const restrict = (number, min, max) => {
    if (number < min) return min;
    if (number > max) return max;
    return number;
};

export default {
    permission: permissions.sysadmin,
    code: async (msg, argstring, config) => {
        const starttime = Date.now();
        msg.react("🛠");
        let lastid = msg.id;

        let allmessages = [];

        while (true) {
            const messages = (await msg.channel.messages.fetch({
                limit: messagelimit,
                before: lastid
            })).map(message => {
                return {
                    content: message.content
                        .toLowerCase()
                        .replace(/\*/g, "")
                        .replace(/`/g, ""),
                    id: message.id
                };
            });

            lastid = messages[messages.length - 1].id;

            allmessages.push(...messages.map(message => message.content));
            
            if (messages.length < messagelimit) break;
        }

        console.log(allmessages.length);

        allmessages = {
            intents: allmessages.map((message, index) => {
                return {
                    tag: Math.random(),
                    patterns: allmessages.slice(index, restrict(index + patternlimit, 0, allmessages.length)),
                    responses: allmessages.slice(restrict(index - responselimit, 0, allmessages.length), index),
                    context_set: ""
                };
            })
        };

        const file = path.join("temp", `${msg.channel.id}_chat.json`);
        await writeFile(file, JSON.stringify(allmessages));
        let failed = false;
        await msg.author.send({files: [file]}).catch(() => failed = true);
        if (failed) return "File too large for Discord!";
        msg.react("👍");
        await unlink(file);
    },
    help: ``
}
