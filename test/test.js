#!/usr/bin/env node

const fs = import ('fs');
const path = import('path');
const readJSON = import('../functies/readJSON');
import writeJSON from '../functies/writeJSON';

const {
    formatteerReis,
    multiReis,
    planReis,
    reisStats
 } = import('../index.js');

(async () => {
    const file = process.argv[2];
    if (!file) return console.log("Geef een bestand op met de reis");
    const rawRoute = (await fs.promises.readFile(path.join(process.cwd(), process.argv[2]))).toString();
    if (!rawRoute) return console.log("Bestand niet gevonden.");
    const reisplan = multiReis(rawRoute);
    const nsAntwoorden = await planReis(reisplan);
    const stats = reisStats(nsAntwoorden);
    await writeJSON(stats, "resultaat");
    const reisScriptNederlands = formatteerReis(stats);
    console.log(reisScriptNederlands);
})();