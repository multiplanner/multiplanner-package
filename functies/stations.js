import NSData from "./NSData.js"
import readJSON from "./readJSON.js";
import writeJSON from "./writeJSON.js";

let stations = await readJSON("stations");

if (!stations) {
    const nsstations = await NSData('/reisinformatie-api/api/v2/stations');
    
    stations = nsstations.payload.filter((station) => station.land == "NL").map((station) => ({
        code: station.code.toLowerCase(),
        namen: [station.namen.kort, station.namen.middel, station.namen.lang, station.code.toLowerCase(), ...station.synoniemen],
        coordinaat: [station.lng, station.lat]
    }));

    writeJSON(stations, "stations");
}

export default stations;