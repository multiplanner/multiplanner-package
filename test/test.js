#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readJSON = require('../functies/readJSON');
const reisStats = require('../functies/reisStats');
const writeJSON = require('../functies/writeJSON');

const {
    formatteerReis,
    multiReis,
    planReis
 } = require('../index.js');

(async () => {
    const file = process.argv[2];
    if (!file) return console.log("Geef een bestand op met de reis");
    const rawRoute = (await fs.promises.readFile(path.join(process.cwd(), process.argv[2]))).toString();
    if (!rawRoute) return console.log("Bestand niet gevonden.");
    const reisplan = multiReis(rawRoute);
    const nsAntwoorden = await planReis(reisplan);
    const stats = reisStats(nsAntwoorden);
    await writeJSON(reis, "resultaat");
    const reisScriptNederlands = formatteerReis(stats);
    console.log(reisScriptNederlands);
})();