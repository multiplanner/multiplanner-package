const fs = await import("fs");

const { exec } = await import("child_process");
const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


const globalconfig = load("config");

export default {
    permission: permissions.sysadmin,
    code: async (msg, argstring, config) => {
        exec("git pull", (error, stdout, stderr) => {
            console.log(error, stderr);
            msg.channel.send(stdout).catch(console.error);
        });
    },
    help: `    
    Updates the bot from github to the latest version. Clearing the command cache using the clearcache command might be neccesary.
    `
}
