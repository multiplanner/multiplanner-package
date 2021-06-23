const chrono = require('chrono-node');

const vroegsteVolledigeReis = require('./vroegsteVolledigeReis.js');
const polylineAfstand = require('./polylineAfstand.js');
const stationsLijstPolyline = require('./stationsLijstPolyline.js');
const coordinaatAfstand = require('./coordinaatAfstand.js');
const zoekStation = require('./zoekStation.js');
const writeJSON = require('./writeJSON.js');
const {
    aankomstTijd,
    extractLeg
} = require('./interpreters.js');

const sleutelwoorden = {
    ontmoet: 'ontmoet',
    stel: 'stel',
    vertrek: 'vertrek',
    aankomst: 'aankomst',
    wacht: 'wacht'
};

const filterSleutelwoorden = (regel, sleutelwoord) => {
    const woorden = regel.split(' ');
    if (woorden.shift() == sleutelwoord) {
        return woorden.join(' ');
    }
};

const berekenReis = async (route) => {
    let volgRitNummer;
    let volgendeDatum = new Date();
    // geeft de tijd aan waar de rit begint.
    // geeft ook aan of dit het eerste deel van de rit is, dus of er overstaptijd gerekend moet worden.
    let begintijd;

    let resultaat = [];
    let totalePrijsCent = 0;
    let urls = [];

    let treintijd = 0;
    let stationstijd = 0;

    for (let i = 0; i < route.length; i++) {
        if (!isNaN(route[i]) || route[i] instanceof Date) continue;
        // huidige index wijst naar een stationscode
        const huidigStation = route[i];

        let vorigStation;
        if (route[i - 1] instanceof Date) {
            volgendeDatum = route[i - 1];
            vorigStation = route[i - 2];
            volgRitNummer = null;
        } else if (isNaN(route[i - 1])) {
            vorigStation = route[i - 1];
            if (begintijd) volgendeDatum = new Date(volgendeDatum.getTime() + 1000 * 60 * 2);
        } else {
            vorigStation = route[i - 2];
            volgendeDatum = new Date(volgendeDatum.getTime() + 1000 * 60 * route[i - 1]);
            volgRitNummer = null;
        }

        if (!vorigStation) continue;

        begintijd = begintijd || volgendeDatum;

        const trip = await vroegsteVolledigeReis(vorigStation, huidigStation, volgendeDatum, volgRitNummer);
        urls.push(trip.shareUrl.uri);

        const rit = trip.legs.map(extractLeg);
        totalePrijsCent += trip.productFare.priceInCentsExcludingSupplement; //priceInCents;

        volgendeDatum = aankomstTijd(trip);
        volgRitNummer = rit[rit.length - 1].ritnummer;
        resultaat.push(...rit);
    }

    let beginDatum = begintijd;
    for (const [index, rit] of resultaat.entries()) {
        rit.overstaptijd = Math.floor((rit.vertrektijd - beginDatum) / 60 / 1000);
        if (index > 0) stationstijd += rit.overstaptijd;
        treintijd += rit.ritduur;
        beginDatum = rit.aankomsttijd;
    }

    const reistijd = (resultaat[resultaat.length - 1].aankomsttijd - resultaat[0].vertrektijd) / 1000 / 60;
    let gepaseerdeStations = [];
    resultaat.forEach((reisdeel, reisdeelIndex) => reisdeel.stations.filter((_, stationIndex) => reisdeelIndex == 0 || stationIndex > 0).forEach((station) => gepaseerdeStations.push(station)));
    const polyline = stationsLijstPolyline(gepaseerdeStations);

    return {
        prijs: totalePrijsCent,
        reistijd: reistijd,
        urls: urls,
        reis: resultaat,
        gepasseerdestations: gepaseerdeStations,
        afstand: polylineAfstand(polyline),
        hemelsbredeafstand: coordinaatAfstand(polyline[0], polyline[polyline.length - 1]),
        polyline: polyline,
        treintijd: treintijd,
        stationstijd: stationstijd
    };
}

const alleSleutelwoorden = Object.values(sleutelwoorden);

module.exports = async (tijdstationlijst) => {
    const reizen = tijdstationlijst
        .split(/^reis /m)
        .filter((regel) => !!regel)
        .map((reis) => reis
            .split("\n")
            .filter((regel) => !!regel)
        )
        .map((reis) => ({
            naam: reis.shift(),
            reis: reis
                .join("\n")
                .split(new RegExp(`^(?=${alleSleutelwoorden.join('|')})`, 'gm'))
                .map((reisdeel) => reisdeel
                    .split("\n")
                    .filter((regel) => !!regel)
                )
                .map((reisdeel) => {
                    const gesplit = reisdeel.split(' ');
                    return {
                        commando: alleSleutelwoorden.includes(gesplit[0]),
                        stations: reisdeel
                    }
                }
                )
                .map((reisdeel) => ({
                    stations: reisdeel.stations,
                    sleutelwoord: reisdeel.commando.shift(),
                    argument: reisdeel.commando.join(" ")
                }))
        }));



    await writeJSON(reizen, 'reizen');
    process.exit();

    const route = tijdstationlijst
        .split("\n")
        .filter((regel) => !!regel)
        .map((regel) => isNaN(regel) ? chrono.parseDate(regel) || zoekStation(regel.toLowerCase()).code : (regel));


};