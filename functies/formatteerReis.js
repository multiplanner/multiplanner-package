const {
    maakTabel,
    formateerTijdsduurMinuten,
    formatteerTijd,
    vertaalZijde,
    formatteerDatum
} = require("./formatters.js");

module.exports = (reis) => {
    const infoTabel = maakTabel([
        ["Prijs", `€${(reis.prijs / 100).toFixed(2)}`],
        ["Vertrekdatum", formatteerDatum(reis.reis[0].vertrektijd)],
        ["Wachttijd", formateerTijdsduurMinuten(reis.stationstijd)],
        ["Rijtijd", formateerTijdsduurMinuten(reis.treintijd)],
        ["Totale reistijd", formateerTijdsduurMinuten(reis.reistijd)],
        ["Hemelsbrede afstand", `${Math.round(reis.hemelsbredeafstand)} kilometer`],
        ["Afgelegde afstand", `${Math.round(reis.afstand)} kilometer`]
    ]);

    const resultaatString = maakTabel([[["Tijd", "Na", "Actie"]].concat(...reis.reis.map((rit) => {
        const zijdeDeel = rit.uitstapzijde ? ` ${vertaalZijde(rit.uitstapzijde).toLowerCase()}` : '';
        return [[formatteerTijd(rit.vertrektijd), rit.overstaptijd, `Neem de ${rit.categorie} richting ${rit.richting} op spoor ${rit.vertrekspoor}.`],
            [formatteerTijd(rit.aankomsttijd), rit.ritduur, `Stap${zijdeDeel} uit in ${rit.aankomststationnaam}.`]];
    }))][0]);

    return `${infoTabel}\n${resultaatString}`;
};
