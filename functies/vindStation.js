import readJSON from "./readJSON.js"
const stations = await readJSON("stations");

export default (stationsNaam) => stations.find((kandidaatStation) => kandidaatStation.namen.includes(stationsNaam));