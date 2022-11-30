const {
    planReis,
    multiReis,
    formatteerReis,
    reisStats
} = require("multiplanner");

module.exports = {
    service: async (reisscript) => formatteerReis(reisStats(await planReis(multiReis(reisscript)))),
    responsetype: "text/plain"
};