import fs from "fs/promises";
import path from "path";

const stdin = await new Promise(async (resolve, reject) => {

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

export default stdin;