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

const endpoint = (port) => {
  https
    .createServer(options, async (req, res) => {
      const uri = url.parse(req.url).pathname;
      const parts = uri.slice(1).split("/");
      const secret = parts.shift();
      const type = parts.shift();

      console.log(
        [
          req.headers["x-forwarded-for"] || req.socket.remoteAddress || "",
          new Date().toISOString(),
          req.headers["user-agent"] || "",
          uri,
        ]
          .map((e) => e.replace(",", "\,"))
          .join(",")
      );

      if (secret !== config.secret) {
        res.writeHead(401);
        res.end();
        return;
      }

      if (type == "static") {
        const filepath = path.join(
          projectroot,
          "static",
          ...parts.filter((p) => !p.includes(".."))
        );
        const content = await fs
          .readFile(filepath)
          .then((e) => e)
          .catch(() => false);
        if (content) {
          res.writeHead(200);
          res.write(content);
        } else {
          res.writeHead(404);
        }
      } else if (type == "endpoint") {
        const filename = parts.shift();
        const filepath = path.join(projectroot, "endpoints", `${filename}.js`);
        if (
          await fs
            .access(filepath)
            .then(() => true)
            .catch(() => false)
        ) {
          const app = await import(filepath);
          if (app && app.default) {
            await app
              .default(...parts)
              .then((r) => {
                res.writeHead(200);
                res.write(r);
              })
              .catch((e) => {
                res.writeHead(500);
                res.write(e.toString());
              });
          } else {
            res.writeHead(500);
          }
        } else {
          res.writeHead(404);
        }
      } else {
        res.writeHead(400);
      }

      res.end();
    })
    .listen(port);
};

export default endpoint;
