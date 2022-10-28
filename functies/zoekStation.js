import readJSON from "./readJSON.js"
const stations = [].concat(...(await readJSON("stations")).map((station) => station.namen));
import stringSimilarity from "string-similarity";
import vindStation from "./vindStation.js"

export default (stationsNaam) => vindStation(stringSimilarity.findBestMatch(stationsNaam, stations).bestMatch.target);