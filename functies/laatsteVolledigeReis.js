const haalTripOp = require('./haalTripOp.js');
const haalReisOp = require('./haalReisOp.js');
const {
    laatstAankomendeGeldigeRit
} = require('./interpreters.js');

module.exports = async (van, naar, moment, volgRit) => {
    if (volgRit) moment = new Date(moment - 2 * 60 * 1000);
    const reis = await haalReisOp(van.toUpperCase(), naar.toUpperCase(), moment.toISOString(), true);
    if (!reis || !reis.trips) stop(van, naar);
    const eersVolgendeRit = laatstAankomendeGeldigeRit(reis.trips, moment, volgRit);
    if (!eersVolgendeRit) stop(van, naar);
    const trip = await haalTripOp(eersVolgendeRit.ctxRecon);
    if (!trip.legs) stop(van, naar);
    return trip;    
};

const stop = (van, naar) => {
    throw(`Geen reis gevonden van ${van} naar ${naar}.`);
};
