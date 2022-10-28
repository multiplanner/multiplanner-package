import fs from "fs/promises";
import opslagPad from "./opslagPad.js";

export default async (locatie) => {
    const pad = opslagPad(locatie);
    const bestaat = await fs.stat(pad).then(() => true, () => false);
    return bestaat ? JSON.parse(await fs.readFile(pad)) : undefined;
};