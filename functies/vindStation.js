import readJSON from "./readJSON.js"
import stations from "./stations.js"

export default (stationsNaam) => stations.find((kandidaatStation) => kandidaatStation.namen.includes(stationsNaam));