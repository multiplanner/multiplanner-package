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
    const stationRegels = vertrekdatum ? regels.slice(1) : regels;

    const stations = stationRegels.map(regel => {
        const station = {};
        
        const voorArgument = (regel.match(/^([0-9]+:[0-9]+|[0-9]+)/) || [undefined])[0];
        const naArgument = (regel.match(/([0-9]+:[0-9]+|[0-9]+) *$/) || [undefined])[0];
        const stationArgument = regel.match(/(?<= |^)([^0-9:\n]+)(?= |$)/)[0];

        const wachtSwitches = [
            [argument => !argument, () => {}],
            [argument => !isNaN(argument), (wacht) => station.wacht = wacht],
            [argument => argument == "?", () => station.wacht = -1]
        ];

        const parseDate = (argument) => chrono.parseDate(argument, vertrekdatum);

        invertedSwitch([
            ...wachtSwitches,
            [parseDate, (_, moment) => station.aankomst = moment]
        ], voorArgument);

        invertedSwitch([
            ...wachtSwitches,
            [parseDate, (_, moment) => station.vertrek = moment]
        ], naArgument);

        station.station = stationArgument;

        return station;
    });

    stations[0].vertrek = vertrekdatum;

    return {
        reis: stations
    };
};

module.exports = reisScriptNaarRequest;
