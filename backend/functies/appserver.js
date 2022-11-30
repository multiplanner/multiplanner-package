import https from "https";
import fs from "fs/promises";
import url from "url";
import path from "path";
import projectroot from "./projectroot.js";
import config from "./config.js";

const options = {
    key: await fs.readFile(`${projectroot}/https/key.pem`),
    cert: await fs.readFile(`${projectroot}/https/certificate.pem`),
};

const getEnd = (res) => (status = 500, message = "") => {
    res.writeHead(status);
    res.write(message);
    res.end();
};

const getBody = (req) => new Promise((resolve, reject) => {
    let body = [];
    req
        .on('end', () => resolve(Buffer.concat(body).toString()))
        .on('data', d => body.push(d))
        .on('error', reject)
});

const appserver = (port) => {
    https
        .createServer(options, async (req, res) => {
            const end = getEnd(res);

            console.log(await getBody(req))

            const {
                secret,
                type,
                method,
                args
            } = JSON.parse(await getBody(req));

            if (secret !== config.secret) return end(401, "secret klopt niet");

            if (type == "function") {
                const filename = method;
                const filepath = path.join(projectroot, "functies", `${filename}.js`);
                if (
                    await fs.access(filepath).then(() => true).catch(() => false)
                ) {
                    const app = await import(filepath);
                    if (!app) return end(404, "Functie bestaat niet");
                    if (!app.default) return end(400, "Functie heeft geen default export");

                    await app
                        .default(...args)
                        .then((r) => end(200, `${r}`))
                        .catch((e) => end(500, e.toString()));
                }
            }
        })
        .listen(port);
};

export default appserver;
