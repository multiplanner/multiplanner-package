const fs = require("fs");
const path = require("path");

module.exports = async (pad) => JSON.parse(
    await fs.promises.readFile(pad)
);