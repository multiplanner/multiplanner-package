/*
 *	Made by arte921 and BennovanDorst
 *  https://github.com/Multiplanner/Multiplanner-package
 *  Multiplanner-package Version 1.0.0
 *
 *  License: MIT
 *
 *  Main index file
 */

const multiReis = require('./functies/multiReis.js');
const formatteerReis = require('./functies/formatteerReis.js');
const updateMultiplanner = require('./functies/updateMultiplanner.js');

//Export all of the modules
module.exports = {
    multiReis,
    formatteerReis,
    updateMultiplanner
};