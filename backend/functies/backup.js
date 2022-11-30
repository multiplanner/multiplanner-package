const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

const request = require("request");

const cwd = process.cwd();
const username = process.argv[2];

const callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
        const raw = JSON.parse(body);
        const folder = username + "-" + Date.now();
        fs.mkdirSync(path.join(cwd, folder));
        raw.forEach(repo => {
          const location = path.join(cwd, folder, repo.name);
          exec(`git clone ${repo.html_url} ${location}`, console.log);
        });
    } else console.log(response.statusCode, error, response, body)
}

const options = {
  url: `https://api.github.com/users/${username}/repos?per_page=1000`,
  headers: {
    "User-Agent": "bulk cloner"
  }
};

request(options, callback);