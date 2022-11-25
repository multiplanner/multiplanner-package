const fs = require("fs").promises;
const path = require("path");

const leesMap = async (pad) => {
    const stat = await fs.lstat(pad);
    return stat.isFile() ? pad : {
        naam: path.basename(pad),
        paden: await Promise.all((await fs.readdir(pad)).map(mapnaam => leesMap(path.join(pad, mapnaam))))
    };
}

module.exports = { leesMap };