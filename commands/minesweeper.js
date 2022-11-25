const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));
const isint = await import(path.join(cwd, "utils", "isint.js"));


const bomb = "✨";

const numbers = [ "0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣" ];

const restrict = (val, min, max) => {
    if (val < min) return min;
    if (val > max) return max;
    return val;
};

const map2d = (yarray, callback) => yarray.map((xarray, y) => xarray.map((value, x) => callback(value, x, y)));

const getbombs = (posx, posy, map) => {
    const minx = restrict(posx - 1, 0, map[0].length - 1);  // maybe custom restrictions, for performance
    const miny = restrict(posy - 1, 0, map.length - 1);
    const maxx = restrict(posx + 1, 0, map[0].length - 1);
    const maxy = restrict(posy + 1, 0, map.length - 1);


    let bombs = 0;
    for (let y = miny; y <= maxy; y++) {
        map.push([]);
        for (let x = minx; x <= maxx; x++) {
            // don't have to skip current pos, for it's bomb free from input.
            if (map[y][x]) bombs++;
        }
    }

    return bombs;

};
/*
const laymine = (x, y, map) => {
    if (x == 0 || x == map[0].length) return false;
    if (y == 0 || y == map.length) return false;
    if (map[y][x - 1] || map[y - 1][x]) return false;
};*/

export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        let map = [];

        let ratio = 1 / (isint(argstring) ? argstring : 8);

        for (let y = 0; y < 10; y++) {
            map.push([]);
            for (let x = 0; x < 10; x++) {
                map[y].push(Math.random() < ratio);
            }
        }

        map = map2d(map, (currentvalue, x, y) => {
            if (currentvalue) return bomb;
            else {
                const bombs = getbombs(x, y, map);
                return numbers[bombs];   // TODO: sparkle/space if clean?
            }
        });

        return "||" + map.map(line => line.join("||||")).join("||\n||") + "||";

        // return map.map(line => line.join("")).join("\n");

    },
    help: `
    Returns a map with minesweeper.
    `
}