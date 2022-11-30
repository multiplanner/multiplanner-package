import fs from "fs/promises";
import YAML from "yaml";
import projectroot from "./projectroot.js";

export default async (locatie) => {
    const pad = `${projectroot}/opslag/${locatie}.yaml`;
    const bestaat = await fs.stat(pad).then(() => true, () => false);
    return bestaat ? YAML.parse(`${await fs.readFile(pad)}`) : undefined;
};