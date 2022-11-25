const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));

export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        const recievers = msg.mentions.users.map(user => user.id);

        if (recievers.length != 2) return "Please mention 2 people!";
        let total = 0;
        for (const id of recievers) total += id - 0;
        return `${(total % 50) + 50}% match 😳`;
    },
    help: `
    Usage: match [@mention1 @mention2]
    `
}