const writeJSON = require('../functies/writeJSON');

(async () => {
    await writeJSON({}, "spoorkaart");
    await writeJSON([], "stations");
    await writeJSON({}, "config");
})();