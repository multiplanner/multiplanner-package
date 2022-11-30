import readYAML from "./readYAML.js";
import { evaluate } from "mathjs";
import { exit } from "process";

const vds = f => (...args) => f(vds(f))(...args);

const sheet = await readYAML("domein");

const letterRegex = /[A-Z]/g;

// const formuleMetOffset

// const vervangDoorWaardes = (lijst, index) => { 
//     console.log(lijst, index)

//     return `${lijst[index]}`.replaceAll(/[A-Z]/ig, (match) => {
//         return `(${vervangDoorWaardes(lijst, `${match}`.charCodeAt(0) - 65)})`;
//     });
// };

// const berekenSimpel = (lijst, index) => {
//     return evaluate(vervangDoorWaardes(lijst, index));
// }


// const lijstNaarArray = (lijst) => {
//     const c = [...lijst];
//     const doortrekformule = c.pop();
//     const startformules = c;
    
// };

// const berekenCelOpIndex = (lijst, index) => {
//     return berekenSimpel(lijst[index]) || berekenCelOpIndex(lijst, lijst.length)
// }

// const berekenVerwijzingVanafIndex = (lijst, verwijzing, index) => {
//     if (lijst[verwijzing]) return berekenSimpel(lijst, verwijzing);
//     return berekenVerwijzingVanafIndex()
// };

// console.log(berekenCel(sheet.x, 2))


const offsets = (formule, index) => Object.fromEntries(formule
    .match(letterRegex)
    .map((match) => [match, index - (`${match}`.charCodeAt(0) - 65)]));

const berekenTotLengte = (lijst, formule, lengte) => {
    const context = offsets(formule, lijst.length);

    return vds(z => (lijst) => {
        if (lijst.length == lengte) return lijst;
        return z([...lijst, evaluate(formule.replaceAll(letterRegex, (match) => lijst[lijst.length - context[match]]))]);
    })(lijst);
}

// console.log(berekenTotLengte([0, 1], "A + B", 10))

// console.log(offsets("A + B", 2))


const macaroni = (sheet) => {
    sheet.dimensies.map(lijsten => lijsten
        .split("")
        .map((lijst) => berekenTotLengte(sheet[lijst].slice(0, -1), sheet[lijst][lijst.length - 1], sheet.waarde[lijst]))
    );
}

console.log(macaroni(sheet));


