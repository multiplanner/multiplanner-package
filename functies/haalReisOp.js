import haalDataOp from "./haalDataOp.js"

export default async (beginStation, eindStation, vertrekTijd, omgekeerd = false) => await haalDataOp(`/reisinformatie-api/api/v3/trips?fromStation=${beginStation}&toStation=${eindStation}&dateTime=${vertrekTijd}&yearCard=true${omgekeerd ? '&searchForArrival=true' : ''}`);