const fs = require("fs");
const path = require("path");

module.exports = async (locatie) => JSON.parse(
    await fs.promises.readFile(path.join(__dirname, "..", "opslag", locatie + ".json"))
);