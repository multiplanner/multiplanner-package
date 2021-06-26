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
    wacht: 'wacht',
    station: 'station',
    reis: 'reis'
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
        commando: sleutelwoorden.station,
        argumenten: regel,
        context: {}
    };
};

const reisBekend = (commando) => commando.context.aankomst && commando.context.vertrek && commando.context.station;

const parseReis = async (reisscript) => {
    const reis = losseregels(reisscript)
        .map(regelCommando);

    let j = 0;
    while (!reis.every(reisBekend) && j < 100) {
        // j++;

        console.log(reis);
        for (let i = 0; i < reis.length; i++) {
            const huidigCommando = reis[i];
            const vorigCommando = reis[i - 1];
            const volgendCommando = reis[i - 1];

            if (!vorigCommando) {
                huidigCommando.context.begintijd = huidigCommando.context.eindtijd;
            }

            if (!volgendCommando) {
                huidigCommando.context.eindtijd = huidigCommando.context.begintijd;
            }

            if (reisBekend(huidigCommando)) continue;

            switch (huidigCommando.commando) {
                case sleutelwoorden.ontmoet:

                    break;
                case sleutelwoorden.stel:

                    break;
                case sleutelwoorden.vertrek:
                    huidigCommando.context.eindtijd = chrono.parseDate(huidigCommando.argumenten);
                    break;
                case sleutelwoorden.aankomst:
                    huidigCommando.context.begintijd = chrono.parseDate(huidigCommando.argumenten);
                    break;
                case sleutelwoorden.wacht:
                    if (huidigCommando.argumenten == 'onbekend') break;

                    if (huidigCommando.context.begintijd) {
                        huidigCommando.context.eindtijd = new Date(huidigCommando.context.begintijd.getTime() + (huidigCommando.argumenten * 60 * 1000));
                    } else if (huidigCommando.context.eindtijd) {
                        huidigCommando.context.begintijd = new Date(huidigCommando.context.eindtijd.getTime() - huidigCommando.argumenten * 60 * 1000);
                    }

                    break;
                case sleutelwoorden.station:
                    huidigCommando.context.station = huidigCommando.argumenten;
                    if (volgendCommando && volgendCommando.context.begintijd) {
                        huidigCommando.context.eindtijd = volgendCommando.context.begintijd;
                    }
                    
                    if (vorigCommando && vorigCommando.context.eindtijd) {
                        huidigCommando.context.begintijd = vorigCommando.context.eindtijd;
                    }

                    if (huidigCommando.context.begintijd) {
                        huidigCommando.context.eindtijd = huidigCommando.context.begintijd;
                    }

                    if (huidigCommando.context.eindtijd) {
                        huidigCommando.context.begintijd = huidigCommando.context.eindtijd;
                    }

                    break;
                case sleutelwoorden.reis:
                    break;
            }

            if (vorigCommando) {

                if (!huidigCommando.context.station) {
                    huidigCommando.context.station = vorigCommando.context.station;
                }

                if (!huidigCommando.context.begintijd && vorigCommando.context.eindtijd) {
                    if (huidigCommando.context.station && vorigCommando.context.station) {
                        huidigCommando.context.begintijd = new Date(vorigCommando.context.eindtijd.getTime() + 600000);
                    }
                }
            }

            if (volgendCommando) {
                if (!huidigCommando.context.station) {
                    huidigCommando.context.station = volgendCommando.context.station;
                }

                if (!huidigCommando.context.eindtijd && volgendCommando.context.begintijd) {
                    if (huidigCommando.context.station && volgendCommando.context.station) {
                        huidigCommando.context.eindtijd = new Date(volgendCommando.context.begintijd.getTime() - 600000);
                    }
                }
            }
        }
    }

    return reis;
}

module.exports = async (tijdstationlijst) => {
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


};