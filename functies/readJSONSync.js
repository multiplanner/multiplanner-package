const fs = require("fs");
const path = require("path");

module.exports = (locatie) => JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", "opslag", locatie + ".json"))
);