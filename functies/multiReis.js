const chrono = require('chrono-node');

const invertedSwitch = require('./invertedSwitch.js');
const {
    bestaat,
    parseDatumRelatief,
    losseregels
} = require('./parsers.js');

const reisScriptNaarRequest = (reisScript) => {
    const regels = losseregels(reisScript);

    const referentiedatum = chrono.parseDate(regels[0]);

    const parseDate = parseDatumRelatief(referentiedatum);

    const stations = regels
        .slice(referentiedatum && !regels[0].match(/[0-2][0-9]:[0-5][0-9]/))
        .map(regel => {
            const station = {};

            const voorArgument = (regel.match(/^([0-9]+:[0-9]+|[0-9]+|\?)/) || [undefined])[0];
            const naArgument = (regel.match(/([0-9]+:[0-9]+|[0-9]+|\?) *$/) || [undefined])[0];
            const stationArgument = regel.match(/(?<= |^)([^0-9:?]+)(?= |$)/)[0];

            const wachtSwitches = [
                [argument => !argument, () => { }],
                [argument => !isNaN(argument), (wacht) => station.wacht = wacht],
                [argument => argument == "?", () => station.wacht = -1000]
            ];

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

    return {
        reis: stations
    };
};

module.exports = reisScriptNaarRequest;
