let mod = 1;
for (let j = 1; j > 0; j += mod) {
    let out = "";
    for (let i = 1; i <= j; i++)
        out += i + " ";
    console.log(out);
    if (j == 6) mod *= -1;
}