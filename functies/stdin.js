import fs from "fs/promises";
import path from "path";

const stdin = new Promise(async (resolve, reject) => {

    const file = process.argv[2];
    if (file) {
        const rawRoute = (await fs.readFile(path.join(process.cwd(), process.argv[2]))).toString();
        if (rawRoute) resolve(rawRoute);
        return;
    }


    const stdin = process.openStdin();

    let data = "";

    stdin.on('data', function (chunk) {
        data += chunk;
    });

    stdin.on('end', function () {
        resolve(data);
    });
});

console.log(await stdin);

export default stdin;