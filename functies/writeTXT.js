const fs = require("fs");
const path = require("path");

module.exports = async (folder, filename, input) => {
    const map = path.join(__dirname, "..", folder);
    await fs.promises.mkdir(map, {recursive: true}).catch(() => {});
    await fs.promises.writeFile(path.join(map, filename + ".txt"), input.toString());
}