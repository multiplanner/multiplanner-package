import NSData from "./NSData.js"
import readJSON from "./readJSON.js";
import writeJSON from "./writeJSON.js";

let spoorkaart = await readJSON("spoorkaart");

if (!spoorkaart) {
    spoorkaart = await NSData('/Spoorkaart-API/api/v1/spoorkaart/');
    writeJSON(spoorkaart, "spoorkaart");
}

export default spoorkaart;