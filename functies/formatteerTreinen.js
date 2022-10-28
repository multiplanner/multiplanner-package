import {
    formatteerTijd, maakTabel, maakStringLengte
} from "./formatters.js";

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

export default formatteerTreinen;