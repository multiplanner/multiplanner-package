const {
    haalAankomstenOp,
    haalVertrekkenOp
} = require('./haalTreinenOp');
const zoekStation = require('./zoekStation');

const sortDatum = (a, b) => a.tijd - b.tijd;

const parseTrein = trein => ({
    tijd: new Date(trein.actualDateTime),
    spoor: trein.actualTrack || trein.plannedTrack,
    type: trein.product.longCategoryName,
    richting: trein.direction,
    ritnummer: trein.product.number,
    cancelled: trein.cancelled,
    oorsprong: trein.origin,
    berichten: trein.messages.map(message => message.message)
});

const stationAankomsten = async (station) => {
    const stationscode = zoekStation(station).code;
    const aankomsten = (await haalAankomstenOp(stationscode)).payload.arrivals.map(parseTrein);
    return aankomsten.sort(sortDatum);
};

const stationVertrekken = async (station) => {
    const stationscode = zoekStation(station).code;
    const vertrekken = (await haalVertrekkenOp(stationscode)).payload.departures.map(parseTrein);
    return vertrekken.sort(sortDatum);
}

module.exports = {
    stationAankomsten,
    stationVertrekken
};