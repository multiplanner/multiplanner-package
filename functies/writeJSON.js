const fs = require("fs");
const path = require("path");

module.exports = async (input, locatie) => await fs.promises.writeFile(path.join(__dirname, "..", "opslag", locatie + ".json"), JSON.stringify(input));