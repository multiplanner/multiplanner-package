const from = "abcdefghijklmnopqrstuvwxyz ";
const to =   "ABCDEFGHIJKLMNOPQRSTUVWXYZ_";

const value = "hallo werel";

// const from = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
// const to = "abcdefghijklmnopqrstuvwxyz234567";

// const value = "8NnZpi1qhr2A4VxpanJKLZVFf/8";

const chars = value.split("").reverse();

let total = chars.map((c, i) => from.indexOf(c) * from.length ** i).reduce((a, b) => a + b);

let out = "";
for (let i = Math.floor(Math.log(total) / Math.log(to.length)); i >= 0; i--) {
    const bami = to.length ** i;

    const nasi = Math.floor(total / bami);

    total = total % bami;

    out += to[nasi];
}

if (out == "") out = to[0];

console.log(out);