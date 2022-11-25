const fs = await import("fs");
const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));

const getresponse = (messages, input, test) => {
    let responses = [];
    messages.forEach((message, index) => {
        if (test(message, input)) {
            responses.push(messages[index - 1]);
        }
    });

    return responses
}

const getrandom = (array) => array[Math.floor(Math.random() * array.length)];

// TODO prevent errors on incorrect input
export default {
    permission: permissions.sysadmin,
    code: async (msg, argstring, config) => {
        const input = argstring.toLowerCase();
        
        const messages = (await file(["temp", `${msg.channel.id}_chat.json`], true))
            .filter(message => message != "")
            .map(message => message
                .toLowerCase()
                .replace(/\*/g, "")
                .replace(/`/g, "")
            );
        
        const tests = [
            (message, input) => message == input,
            (message, input) => message.includes(input),
            (message, input) => input.includes(message)
        ];

        let responses;
        for (const test of tests) {
            const result = getresponse(messages, input, test);
            if (result.length > 0) {
                responses = result;
                break;
            }
        }

        if (responses) return getrandom(responses);
        else return "I don't understand :(";
    },
    help: `
    Usage: \`chat message\`.

    Allows you to talk with the bot. Needs a saved database of messages to work, which can be created using the dump command.
    `
}
