const vroegsteVolledigeReis = require('./vroegsteVolledigeReis.js');
const laatsteVolledigeReis = require('./laatsteVolledigeReis.js');
const polylineAfstand = require('./polylineAfstand.js');
const stationsLijstPolyline = require('./stationsLijstPolyline.js');
const coordinaatAfstand = require('./coordinaatAfstand.js');
const zoekStation = require('./zoekStation.js');
const vindStation = require('./vindStation.js');
const {
    aankomstTijd,
    vertrekTijd,
    extractLeg
} = require('./interpreters.js');
const writeJSON = require('./writeJSON.js');
const reisStats = require('./reisStats.js');

const berekenWachttijden = (station) => {
    if (station.vertrek && station.wacht && !station.aankomst) station.aankomst = new Date(station.vertrek - - station.wacht);
    if (station.aankomst && station.wacht && !station.vertrek) station.vertrek = new Date(station.aankomst - station.wacht);
    return station;
};

const isCompleet = (station) => {
    return station.vertrek && station.aankomst;
};

const berekenTijdenVoorStation = async (reis, index, nsAntwoorden) => {
    reis = reis.map(berekenWachttijden);
    const station = reis[index];

    // De vertrektijd van de vorige is bekend, dus de aankomsttijd van huidige kan worden berekend
    if (!station.aankomst && index > 0 && reis[index - 1].vertrek) {
        const vorige = reis[index - 1];
        const trip = await vroegsteVolledigeReis(vorige.code, station.code, vorige.vertrek, vorige.ritnummer);
        station.aankomst = aankomstTijd(trip);
        nsAntwoorden.push({
            index: index * 2,
            trip: trip
        });
    }

    // De aankomsttijd in de volgende is bekend, dus de vertrektijd van huidige kan worden berekend
    if (!station.vertrek && index < reis.length - 1 && reis[index + 1].aankomst) {
        const volgende = reis[index + 1];
        const trip = await laatsteVolledigeReis(station.code, volgende.code, volgende.aankomst, station.ritnummer)
        station.vertrek = vertrekTijd(trip);
        nsAntwoorden.push({
            index: index * 2 + 1,
            trip: trip
        });
    }
};

const planReis = async (reisplan) => {
    // verwerk ruwe invoer
    const reis = reisplan.reis;
    const nsAntwoorden = [];

    for (const station of reis) {
        if (station.vertrek) station.vertrek = new Date(station.vertrek);
        if (station.aankomst) station.aankomst = new Date(station.aankomst);
        station.code = zoekStation(station.station).code;
    }

    if (!reis.some(station => station.vertrek || station.aankomst)) reisplan[0].vertrek = new Date();

    let i = 0;
    while (!reis.every(isCompleet) && i++ < reis.length * 2 + 2) {
        await Promise.all(reis
            .filter((station) => !isCompleet(station))
            .map((_station, index) => berekenTijdenVoorStation(reis, index, nsAntwoorden)));
    }

    const trips = nsAntwoorden
        .sort((a, b) => a.index - b.index)
        .map(trip => trip.trip);

    return reisStats(trips);
};

module.exports = {
    planReis
};