const fs = await import("fs");
const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));

const starttext = "Available commands: \n\n";
const permissiontexts = [
    "Anyone can use",
    "Trialadmin or higher",
    "Moderator or higher",
    "Sysadmin only"
];

export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        if (argstring == "") {
            let commands = fs
                .readdirSync(path.join(cwd, "commands"))
                .filter(
                    (command) =>
                        !config.blocklist.some((blockedcommand) =>
                            command.includes(blockedcommand)
                        )
                )
                .join("`, `")
                .replace(/.js/g, "");                
            return `${starttext} \`${commands}\``;
        } else {
            const commandpath = path.join(cwd, "commands", argstring + ".js");
            if (!fs.existsSync(commandpath)) return `Command "${argstring}" doesn't exist.`;
            const command = await import(commandpath)
            const body = command.help;
            if (body == "") return `No help page found for "${argstring}".`;
            return `Permission level: ${permissiontexts[command.permission]}\n\n${command.help}`;
        }

    },
    help: `
    Usage: \`help (command)\`.
    
    Returns a list of available command if no arguments given, Returns the help page of a specific command if an argument is given, for an existing command which is enabled in the server it's requested from.
    `
}
