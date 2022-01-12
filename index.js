/*
 *	Made by arte921 and BennovanDorst
 *  https://github.com/Multiplanner/Multiplanner-package
 *  Multiplanner-package Version 1.0.0
 *
 *  License: MIT
 *
 *  Main index file
 */

const planReis = require('./functies/planReis.js');
const multiReis = require('./functies/multiReis.js');
const formatteerReis = require('./functies/formatteerReis.js');
const updateMultiplanner = require('./functies/updateMultiplanner.js');
const formatteerTreinen = require('./functies/formatteerTreinen.js');
const reisStats = require('./functies/reisStats');
const voegNsAntwoordenSamen = require('./functies/voegNsAntwoordenSamen');
const { stationAankomsten, stationVertrekken } = require('./functies/stationTreinen');

//Export all of the modules
module.exports = {
    planReis,
    multiReis,
    formatteerReis,
    updateMultiplanner,
    formatteerTreinen,
    stationAankomsten,
    stationVertrekken,
    reisStats,
    voegNsAntwoordenSamen
};