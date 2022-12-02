import planReis from "#f/planReis.js";

module.exports = {
    service: async (reisscript) => formatteerReis(reisStats(await planReis(multiReis(reisscript)))),
    responsetype: "text/plain"
};