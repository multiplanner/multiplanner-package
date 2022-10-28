import fs from "fs";
import opslagPad from "./opslagPad.js";

export default async (input, locatie) => await fs.promises.writeFile(opslagPad(locatie), JSON.stringify(input));