/*

const l1 = [1, 3, -4];
const l2 = [0, 1, -19, 2, -1];

const obtain = list => list.filter(n => n >= 0).map(n => n + 1);

const sarcasm = string => string.split("").map((l, i) => i % 2 == 0 ? l.toUpperCase() : l.toLowerCase()).join("");

// const recursive = (f => (x => f (x(x))) (x => f (x(x)))) (f => n => n == 0 ? 1 : f(n-1))


let incirkle = 0;
const total = 10 ** 6;

for (let i = 0; i < total; i++) if (Math.sqrt(Math.random() ** 2 + Math.random() ** 2) < 1) incirkle ++;

const pi = incirkle / total * 4;
*/
const f = n => String(n).length;

console.log(f(f(f(4444 ** 4444))));