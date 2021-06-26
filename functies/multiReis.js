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
const haalDataOp = require('./haalDataOp.js');
const laatsteVolledigeReis = require('./laatsteVolledigeReis.js');

const sleutelwoorden = {
    ontmoet: 'ontmoet',
    stel: 'stel',
    vertrek: 'vertrek',
    aankomst: 'aankomst',
    wacht: 'wacht',
    station: 'station',
    reis: 'reis'
};

const argumentwoorden = {
    onbekend: 'onbekend',
    nu: 'nu'
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

const bestaat = (element) => !!element;

const losseregels = (tekst) => tekst
    .split("\n")
    .filter(bestaat);

const argumentVan = (tekst, sleutelwoord) => [...tekst.matchAll(new RegExp(`(?<=^${sleutelwoord} ).+(?=$)`, 'gm'))].map((match) => match[0]);

const alleSleutelwoorden = Object.values(sleutelwoorden);

const commandoRegex = alleSleutelwoorden.join('|');

const regelCommando = (regel) => {
    const match = regel.match(new RegExp(`(${commandoRegex}) (.*)`))
    return match ? {
        commando: match[1],
        argumenten: match[2],
        context: {}
    } : {
        commando: isNaN(regel) ? (chrono.parseDate(regel) ? sleutelwoorden.vertrek : sleutelwoorden.station) : sleutelwoorden.wacht,
        argumenten: regel,
        context: {}
    };
};

const reisBekend = (commando) => commando.context.eindtijd && commando.context.begintijd && commando.context.station;

const geefTijdDoor = (huidigCommando) => {
    if (huidigCommando.context.begintijd && !huidigCommando.context.eindtijd) {
        huidigCommando.context.eindtijd = huidigCommando.context.begintijd;
    }

    if (huidigCommando.context.eindtijd && !huidigCommando.context.begintijd) {
        huidigCommando.context.begintijd = huidigCommando.context.eindtijd;
    }
};

const tijdVanBuren = (huidigCommando, vorigCommando, volgendCommando) => {
    if (!huidigCommando.context.eindtijd && volgendCommando && volgendCommando.context.begintijd && volgendCommando.context.station == huidigCommando.context.station) {
        huidigCommando.context.eindtijd = volgendCommando.context.begintijd;
    } else if (!huidigCommando.context.begintijd && vorigCommando && vorigCommando.context.eindtijd && vorigCommando.context.station == huidigCommando.context.station) {
        huidigCommando.context.begintijd = vorigCommando.context.eindtijd;
    }
};

const stationVanBuren = (huidigCommando, vorigCommando, volgendCommando) => {
    if (!huidigCommando.context.station && huidigCommando.commando != sleutelwoorden.station) {
        if (vorigCommando && vorigCommando.context.station) {
            huidigCommando.context.station = vorigCommando.context.station;
        } else if (volgendCommando && volgendCommando.context.station) {
            huidigCommando.context.station = volgendCommando.context.station;
        }
    }
};

const grensBeginEindtijden = (huidigCommando, vorigCommando, volgendCommando) => {
    if (!vorigCommando) {
        huidigCommando.context.begintijd = huidigCommando.context.eindtijd;
    }

    if (!volgendCommando) {
        huidigCommando.context.eindtijd = huidigCommando.context.begintijd;
    }
}

const berekenReizen = async (huidigCommando, vorigCommando, volgendCommando, nsAntwoorden, i) => {
    if (vorigCommando) {
        if (
            !huidigCommando.context.begintijd &&
            huidigCommando.context.station &&
            vorigCommando.context.station &&
            vorigCommando.context.station != huidigCommando.context.station &&
            vorigCommando.context.eindtijd
        ) {
            const beginstation = vorigCommando.context.station;
            const bestemming = huidigCommando.context.station;
            const vertrektijd = vorigCommando.context.eindtijd;
            const reis = await vroegsteVolledigeReis(beginstation, bestemming, vertrektijd, vorigCommando.context.ritnummer);
            nsAntwoorden.push({
                index: i,
                reis: reis
            });
            const aankomsttijd = new Date(reis.legs[reis.legs.length - 1].destination.actualDateTime || reis.legs[reis.legs.length - 1].destination.plannedDateTime);
            huidigCommando.context.begintijd = aankomsttijd;
            huidigCommando.context.eindtijd = aankomsttijd;
            huidigCommando.context.ritnummer = reis.legs[reis.legs.length - 1].product.number;
        }

    }

    if (volgendCommando) {
        if (
            !huidigCommando.context.eindtijd &&
            huidigCommando.context.station &&
            volgendCommando.context.station &&
            volgendCommando.context.station != huidigCommando.context.station &&
            volgendCommando.context.begintijd
        ) {
            const beginstation = huidigCommando.context.station;
            const bestemming = volgendCommando.context.station;
            const aankomsttijd = volgendCommando.context.begintijd;
            const reis = await laatsteVolledigeReis(beginstation, bestemming, aankomsttijd, volgendCommando.context.ritnummer);
            nsAntwoorden.push({
                index: i,
                reis: reis
            });
            const vertrektijd = new Date(reis.legs[0].origin.actualDateTime || reis.legs[0].origin.plannedDateTime);
            huidigCommando.context.begintijd = vertrektijd;
            huidigCommando.context.eindtijd = vertrektijd;
            huidigCommando.context.ritnummer = reis.legs[0].product.number;
        }
    }
};

const parseReis = async (reisscript) => {
    const nsAntwoorden = [];

    const reis = losseregels(reisscript)
        .map(regelCommando);
        
    let j = 0;
    while (!reis.every(reisBekend)) {
        if (j++ > reis.length) {
            throw "Ongeldig reisplan.";
        }
        
        for (let i = 0; i < reis.length; i++) {
            const huidigCommando = reis[i];
            const vorigCommando = reis[i - 1];
            const volgendCommando = reis[i + 1];

            if (reisBekend(huidigCommando)) continue;
            
            grensBeginEindtijden(huidigCommando, vorigCommando, volgendCommando);

            switch (huidigCommando.commando) {
                case sleutelwoorden.vertrek:
                    huidigCommando.context.eindtijd = chrono.parseDate(huidigCommando.argumenten);
                    geefTijdDoor(huidigCommando);

                    break;
                case sleutelwoorden.aankomst:
                    huidigCommando.context.begintijd = chrono.parseDate(huidigCommando.argumenten);
                    geefTijdDoor(huidigCommando);

                    break;
                case sleutelwoorden.wacht:
                    if (huidigCommando.argumenten == 'onbekend') {
                    } else {
                        if (huidigCommando.context.begintijd) {
                            huidigCommando.context.eindtijd = new Date(huidigCommando.context.begintijd.getTime() + (1000 * 60 * huidigCommando.argumenten));
                        } else if (huidigCommando.context.eindtijd) {
                            huidigCommando.context.begintijd = new Date(huidigCommando.context.eindtijd.getTime() - 1000 * 60 * huidigCommando.argumenten)
                        }
                    }

                    break;
                case sleutelwoorden.station:
                    if (!huidigCommando.context.station) {
                        huidigCommando.context.station = zoekStation(huidigCommando.argumenten).code.toUpperCase();
                    }
                    geefTijdDoor(huidigCommando);

                    break;
            }


            stationVanBuren(huidigCommando, vorigCommando, volgendCommando);
            tijdVanBuren(huidigCommando, vorigCommando, volgendCommando);


            await berekenReizen(huidigCommando, vorigCommando, volgendCommando, nsAntwoorden, i);
        }
    }

    const trips = nsAntwoorden
        .sort((a, b) => a.index - b.index)
        .map((trip) => trip.reis);

    const resultaat = [];
    const urls = [];
    let totalePrijsCent = 0;
    let stationstijd = 0;
    let treintijd = 0;

    for (const trip of trips) {
        urls.push(trip.shareUrl.uri);

        totalePrijsCent += trip.productFare.priceInCentsExcludingSupplement; //priceInCents;
        // 100

        const rit = trip.legs.map(extractLeg);

        resultaat.push(...rit);
    }


    let beginDatum = resultaat[0].vertrektijd;
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

module.exports = parseReis;
/*async (tijdstationlijst) => {
    await writeJSON(await parseReis(tijdstationlijst), 'reizen');
    process.exit();

    const reizen = tijdstationlijst
        .split(/^reis /m)
        .filter(bestaat)
        .map(losseregels)
        .map((reis) => ({
            naam: reis.shift(),
            afhankelijkheden: argumentVan(reis.join("\n"), sleutelwoorden.ontmoet),
            stellingen: argumentVan(reis.join("\n"), sleutelwoorden.stel),
            reis: reis
                .join("\n")
                .split(new RegExp(`^(?=${commandoRegex})`, 'gm'))
                .map((reisdeel) => {
                    const gesplit = losseregels(reisdeel)
                        .map((regel) => regel.split(' '));
                    if (gesplit.length == 0) return undefined;

                    let commando;
                    if (alleSleutelwoorden.includes(gesplit[0][0])) {
                        commando = gesplit.shift();
                    } else if (alleSleutelwoorden.includes(gesplit[gesplit.length - 1][0])) {
                        commando = gesplit.pop();
                    } else {
                        commando = false;
                    }

                    if (commando) {
                        return {
                            commando: commando.shift(),
                            argumenten: commando.join(' '),
                            stations: false
                        }
                    } else {
                        return {
                            commando: false,
                            argumenten: false,
                            stations: losseregels(reisdeel)
                        };
                    }
                })
                .filter(bestaat)
        }));

    const gesorteerdeReizen = [];

    while (gesorteerdeReizen.length < reizen.length) {
        reizen
            .filter((reis) => !gesorteerdeReizen.includes(reis))
            .filter((reis) => reis.afhankelijkheden.every((afhankelijkheid) => gesorteerdeReizen.some((bekendereis) => bekendereis.stellingen.includes(afhankelijkheid))))
            .forEach((reis) => gesorteerdeReizen.push(reis));

    }



    const route = tijdstationlijst
        .split("\n")
        .filter((regel) => !!regel)
        .map((regel) => isNaN(regel) ? chrono.parseDate(regel) || zoekStation(regel.toLowerCase()).code : (regel));


};*/