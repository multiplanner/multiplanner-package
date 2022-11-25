import fs from "fs/promises";
import YAML from "yaml";
import opslagPad from "./opslagPad.js";

export default async (locatie) => {
    const pad = opslagPad(`${locatie}.yaml`);
    const bestaat = await fs.stat(pad).then(() => true, () => false);
    return bestaat ? YAML.parse(`${await fs.readFile(pad)}`) : undefined;
};