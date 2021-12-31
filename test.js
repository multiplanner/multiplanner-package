#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const formatteerReis = require('./functies/formatteerReis.js');
const readJSON = require('./functies/readJSON.js');

const {
    multiReis,
    updateMultiplanner
} = require("./index.js");

const
    { planReis } = require('./functies/planReis.js');


(async () => {
    // await updateMultiplanner(process.argv[2]);
})();

(async () => {
    const reisplan = await readJSON("reis");
    console.log(formatteerReis(await planReis(reisplan)));
})();

return;
(async () => {
    const file = process.argv[2];
    if (!file) return console.log("Geef een bestand op met de reis");
    const rawRoute = await fs.promises.readFile(path.join(process.cwd(), process.argv[2]));
    if (!rawRoute) return console.log("Bestand niet gevonden.");
    const reis = await multiReis(rawRoute.toString());
    const reisScriptNederlands = formatteerReis(reis);
    console.log(reisScriptNederlands);
})();