import haalDataOp from "./haalDataOp.js"

const haalAankomstenOp = async (station) => await haalDataOp(`/reisinformatie-api/api/v2/arrivals?station=${station}`);
const haalVertrekkenOp = async (station) => await haalDataOp(`/reisinformatie-api/api/v2/departures?station=${station}`);

export {
    haalAankomstenOp,
    haalVertrekkenOp
};