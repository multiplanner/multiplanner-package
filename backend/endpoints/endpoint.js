import http from "http";
import fs from "fs/promises";
import url from "url";
import path from "path";
import projectroot from "#f/projectroot.js";

const endpoint = (port) => {
    http.createServer(async (req, res) => {
        const uri = url.parse(req.url).pathname;
        const parts = uri.slice(1).split("/");
        const type = parts.shift();
    
        if (type == "static") {
            const filepath = path.join(projectroot, "static", ...parts.filter(p => !p.includes("..")));
            const content = await fs.readFile(filepath).then((e) => e).catch(() => false);
            if (content) {
                res.writeHead(200)
                res.write(content)
            } else {
                res.writeHead(404)
            }
        } else if (type == "endpoint") {
            const filename = parts.shift();
            const filepath = path.join(projectroot, "endpoints", `${filename}.js`);
            if (await fs.access(filepath).then(() => true).catch(() => false)) {
                const app = await import(filepath);
                if (app && app.default) {
                    res.writeHead(200)
                    res.write(await app.default(...parts))
                } else {
                    res.writeHead(500)
                }
            } else {
                res.writeHead(404)
            }
            
        } else {
            res.writeHead(400)
        }
    
        res.end()
    }).listen(port);
};
