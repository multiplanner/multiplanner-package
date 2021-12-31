const polylineAfstand = require('./polylineAfstand.js');
const stationsLijstPolyline = require('./stationsLijstPolyline.js');
const coordinaatAfstand = require('./coordinaatAfstand.js');
const {
    extractLeg
} = require('./interpreters.js');
const writeJSON = require('./writeJSON.js');

const reisStats = (trips) => {
    const legs = [];
    const urls = [];
    let totalePrijsCent = 0;
    let stationstijd = 0;
    let treintijd = 0;

    for (const trip of trips) {
        urls.push(trip.shareUrl.uri);

        totalePrijsCent += trip.productFare.priceInCentsExcludingSupplement;

        const rit = trip.legs.map(extractLeg);

        legs.push(...rit);
    }


    let beginDatum = legs[0].vertrektijd;
    for (const [index, rit] of legs.entries()) {
        rit.overstaptijd = Math.floor((rit.vertrektijd - beginDatum) / 60 / 1000);
        if (index > 0) stationstijd += rit.overstaptijd;
        treintijd += rit.ritduur;
        beginDatum = rit.aankomsttijd;
    }

    const reistijd = (legs[legs.length - 1].aankomsttijd - legs[0].vertrektijd) / 1000 / 60;
    let gepaseerdeStations = [];
    legs.forEach((reisdeel, reisdeelIndex) => reisdeel.stations.filter((_, stationIndex) => reisdeelIndex == 0 || stationIndex > 0).forEach((station) => gepaseerdeStations.push(station)));
    const polyline = stationsLijstPolyline(gepaseerdeStations);

    return {
        prijs: totalePrijsCent,
        reistijd: reistijd,
        urls: urls,
        reis: legs,
        gepasseerdestations: gepaseerdeStations,
        afstand: polylineAfstand(polyline),
        hemelsbredeafstand: coordinaatAfstand(polyline[0], polyline[polyline.length - 1]),
        polyline: polyline,
        treintijd: treintijd,
        stationstijd: stationstijd
    };
};

module.exports = reisStats;