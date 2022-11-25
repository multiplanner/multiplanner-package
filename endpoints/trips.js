const {
    planReis,
    multiReis,
    voegNsAntwoordenSamen
} = require("multiplanner");

module.exports = {
    service: async (reisscript) => JSON.stringify(voegNsAntwoordenSamen(await planReis(multiReis(reisscript)))),
    responsetype: "application/json"
};