const request = await import("request");

const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        request(
            "https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint8",
            (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    let info = JSON.parse(body);
                    if (info.success) {
                        msg.channel.send(info.data[0] % 2 == 0);
                    } else msg.channel.send(errors.internal);
                } else msg.channel.send(errors.internal);
            }
        );
    },
    help: `
    "Flips a coin", but does it using the ANU Quantum Random Numbers Server api.
    
    This guarantees a fully random result, as per laws of physics. Result might be a bit slower than the normal flip command, but is more ~~overkill~~ random. 
    `
}
