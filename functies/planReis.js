const vroegsteVolledigeReis = require('./vroegsteVolledigeReis.js');
const laatsteVolledigeReis = require('./laatsteVolledigeReis.js');
const polylineAfstand = require('./polylineAfstand.js');
const stationsLijstPolyline = require('./stationsLijstPolyline.js');
const coordinaatAfstand = require('./coordinaatAfstand.js');
const zoekStation = require('./zoekStation.js');
const vindStation = require('./vindStation.js');

const berekenWachttijden = (station) => {
    if (station.vertrek && station.wacht && !station.aankomst) station.aankomst = new Date(station.vertrek - - station.wacht);
    if (station.aankomst && station.wacht && !station.vertrek) station.vertrek = new Date(station.aankomst - station.wacht);
    return station;
};

const isCompleet = (station) => {
    return station.vertrek && station.aankomst;
};

const berekenTijdenVoorStation = (reis, index) => {
    reis = reis.map(berekenWachttijden);
    const station = reis[index];

    // De vertrektijd van de vorige is bekend, dus de aankomsttijd van huidige kan worden berekend
    if (!station.aankomst && index > 0 && reis[index - 1].vertrek) {
        const vorige = reis[index - 1];
        const reis = 
    }

    // De aankomsttijd in de volgende is bekend, dus de vertrektijd van huidige kan worden berekend
    if (!station.vertrek && index < reis.length - 1 && reis[index + 1].aankomst) {
        const volgende = reis[index + 1];

    }
};

const planReis = (reisplan) => {
    // verwerk ruwe invoer
    const reis = reisplan.reis;

    for (const station of reis) {
        if (station.vertrek) station.vertrek = new Date(station.vertrek);
        if (station.aankomst) station.aankomst = new Date(station.aankomst);
        station.station = zoekStation(station);
    }

    if (!reisplan.any(station => station.vertrek || station.aankomst)) reisplan[0].vertrek = new Date();

    
};

module.exports = {
    planReis
};