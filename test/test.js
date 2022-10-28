#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readJSON from '../functies/readJSON.js';
import writeJSON from '../functies/writeJSON.js';

import {
    formatteerReis,
    multiReis,
    planReis,
    reisStats
 } from '../index.js';

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