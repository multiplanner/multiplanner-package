import https from "https";
import fs from "fs/promises";
import url from "url";
import path from "path";
import projectroot from "./projectroot.js";
import YAML from "yaml";
const options = {
    key: await fs.readFile(`${projectroot}/https/key.pem`),
    cert: await fs.readFile(`${projectroot}/https/certificate.pem`),
};

const getEnd = (res) => (status = 500, message = "") => {
    res.writeHead(status);
    res.write(message);
    res.end();
};

const publish = (port, map = "endpoints") => {
    https
        .createServer(options, async (req, res) => {
            const end = getEnd(res);
            const [filename, ...parts] = url.parse(req.url).pathname.slice(1).split("/");
            const filepath = path.join(projectroot, map, `${filename}.js`);            
            if (!await fs.access(filepath).then(() => true).catch(() => false)) return end(404, "Endpoint bestaat niet");
            const app = await import(filepath);
            if (!app.default) return end(500, "Endpoint heeft geen default export");
            try {
                end(200, YAML.stringify(await app.default(...parts)));
            } catch(e) {
                end(500, e.toString())
            }
        })
        .listen(port);
};

export default publish;
