import writeJSON from '../functies/writeJSON.js';

(async () => {
    await writeJSON({}, "spoorkaart");
    await writeJSON([], "stations");
    await writeJSON({}, "config");
})();