import haalDataOp from "./haalDataOp.js"

export default async (beginStation, eindStation, aankomstTijd) => await haalDataOp(`/reisinformatie-api/api/v3/trips?fromStation=${beginStation}&toStation=${eindStation}&dateTime=${aankomstTijd}&yearCard=true`);