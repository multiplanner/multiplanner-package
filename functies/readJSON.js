import fs from "fs";
import opslagPad from "./opslagPad.js";

export default async (locatie) => JSON.parse(await fs.promises.readFile(opslagPad(locatie)));