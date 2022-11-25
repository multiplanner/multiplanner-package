for (let i = 1; i <= 7; i++) {
    let mod = 1;
    let out = "";
    for (let j = 1; j > 0; j += mod) {
        out += j + " ";
        if (j == i) mod *= -1;
    }
    console.log(out);
}