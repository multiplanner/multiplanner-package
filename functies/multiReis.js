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
const invertedSwitch = require('./invertedSwitch.js');


const bestaat = (element) => !!element;

const losseregels = (tekst) => tekst
    .split("\n")
    .filter(bestaat);

const reisScriptNaarRequest = (reisScript) => {
    const regels = losseregels(reisScript);

    const vertrekdatum = chrono.parseDate(regels[0]);
    const stationRegels = regels;
    if (vertrekdatum) {
        stationRegels = stationRegels.slice(1);
    }

    const stations = stationRegels.map(regel => {
        const station = {};

        const voorArgument = regel.match(/^([0-9]+:[0-9]+|[0-9]+)(?= [a-zA-Z ])/);
        const naArgument = regel.match(/(?<=[a-zA-Z ] )([0-9]+:[0-9]+|[0-9]+|\?)$/);
        const stationArgument = regel.match(/(?<= |^)([a-zA-Z ]+)(?= |$)/);

        const wachtSwitches = [
            [(wacht) => !isNaN(wacht), (wacht) => station.wacht = wacht],
            
            [(argument) => argument == "?", () => station.wacht = -1]
        ];

        invertedSwitch([
            [chrono.parseDate, (_, moment) => station.aankomst = moment],
            ...wachtSwitches
        ], voorArgument);

        invertedSwitch([
            [chrono.parseDate, (_, moment) => station.vertrek = moment],
            ...wachtSwitches
        ], naArgument);

        station.station = stationArgument;

        return station;
    });

    stations[0] = vertrekdatum;

    return {
        reis: stations
    };
};

module.exports = reisScriptNaarRequest;
