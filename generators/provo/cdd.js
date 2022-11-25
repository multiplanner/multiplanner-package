module.exports = (item, Item, ITEM, items, Items, ITEMS, api, bami, util) => {
    const private = api.abstract ? "#" : "-";
    const superattributen = api.supertype ? util.vindApi(api.supertype).attributen : [];
    const alleAttributen = util.join([util.naarArray(api.attributen), util.naarArray(superattributen)]);
    const attributen = bami(alleAttributen, a => a.key[0], ", ");
    return `
${bami(api.abstract, () => `abstract `)}class ${Item} extends ${bami(api.supertype, s => s[1])}${bami(!api.supertype, _ => `Notifier`)} {
    ${private} ${item}Nummer: int
    ${bami(api.attributen, a => `${private} ${a.key[0]}: ${a.value[0]}`, `\n    `)}
    
    + ${Item}(${bami(alleAttributen, a => `${a.key[0]}: ${a.value[0]}`, `, `)})
    ${bami(!api.supertype, _ => `${private} notify()`)}
    ${bami(api.private, m => `${private} ${m[0]}`, `\n    `)}
    + update(${bami(alleAttributen, a => `${a.key[0]}: ${a.value[0]}`, `,`)}): void
    ${bami(!api.supertype, _ => `+ subscribe(observer: Observer): void`)}
    ${bami(api.public, m => `+ ${m[0]}`, `\n    `)}
}
${bami(api.crud, () => `
class ${Item}Facade {
    - get${Item}VanNummer(${item}Nummer)

    + create${Item}(${attributen})
    + get${Item}(${item}Nummer)
    + update${Item}(${item}Nummer, ${attributen})
    + delete${Item}(${item}Nummer)
}

class ${Item}View implements Observer {
    + ${Item}View(${item}: ${Item})
    + notify(): void
}
`)}
`};
