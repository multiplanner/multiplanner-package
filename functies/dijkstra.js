import vds from "./vds.js";

const edges = [
    ["a", "b", 7],
    ["a", "c", 9],
    ["a", "f", 14],
    ["b", "c", 10],
    ["b", "d", 15],
    ["c", "d", 11],
    ["c", "f", 2],
    ["d", "e", 6],
    ["e", "f", 9]
];

const [start, end] = ["a", "e"];

const vertices = edges.reduce((vertices, edge) => [...vertices, ...edge.slice(0, 2).filter((point) => !vertices.includes(point))], []);

const bami = Object.fromEntries(vertices.map(v => [v, {
    a: v == start ? 0 : Infinity,
    e: Object.fromEntries(edges.filter((edge) => edge.slice(0, 2).includes(v)).map(([start, end, distance]) => [[start, end].find(vertex => vertex != v), distance])),
    d: false,
    r: undefined
}]));

console.log(bami);

const next = (bami) => Object.keys(bami).filter(k => !bami[k].d).reduce((a, b) => bami[a].a < bami[b].a ? a : b);

do {
    const s = next(bami);
    
    for (const [edge, distance] of Object.entries(bami[s].e)) {
        if (bami[s].a + distance < bami[edge]) {
            bami[edge].a = bami[s].a + distance;
            bami[edge].r = [...bami[s].r, edge]
        }
    }

    console.log(bami);


} while (bami[end].a == Infinity);
