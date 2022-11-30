import writeJSON from "./writeJSON.js"
import haalDataOp from "./haalDataOp.js"

export default async (nsapi) => {
    const spoorkaart = await haalDataOp('/Spoorkaart-API/api/v1/spoorkaart/', nsapi);
    const stations = await haalDataOp('/reisinformatie-api/api/v2/stations', nsapi);
    const config = {
        ns_app_key_primary: nsapi
    };

    const geformatterdestations = stations.payload.filter((station) => station.land == "NL").map((station) => ({
        code: station.code.toLowerCase(),
        namen: [station.namen.kort, station.namen.middel, station.namen.lang, station.code.toLowerCase(), ...station.synoniemen],
        coordinaat: [station.lng, station.lat]
    }));

    writeJSON(geformatterdestations, 'stations');
    writeJSON(spoorkaart, 'spoorkaart');
    writeJSON(config, 'config');
};