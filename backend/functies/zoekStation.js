import stations from "./stations.js"
import stringSimilarity from "string-similarity";
import vindStation from "./vindStation.js"
const stationsNamen = [].concat(...stations.map((station) => station.namen));

export default (stationsNaam) => vindStation(stringSimilarity.findBestMatch(stationsNaam, stationsNamen).bestMatch.target);