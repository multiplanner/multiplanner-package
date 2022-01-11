const {
    formatteerTijd, maakTabel, maakStringLengte
} = require('./formatters');

const formatteerTreinen = (treinen, vertrekken = !treinen[0].oorsprong) => maakTabel([
    ["Tijd", "Spoor", "Type", vertrekken ? "Richting" : "Oorsprong", "Bijzonderheden"],
    ...treinen
        .filter(trein => !trein.cancelled)
        .map((trein) => [
            formatteerTijd(trein.tijd),
            maakStringLengte(trein.spoor, 5),
            trein.type,
            trein.richting || trein.oorsprong,
            trein.berichten.join(", ")
        ])
]);

module.exports = formatteerTreinen;