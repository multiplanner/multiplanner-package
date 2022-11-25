module.exports = (item, Item, ITEM, items, Items, ITEMS, api, bami, util) => {
    const private = api.abstract ? "#" : "-";
    const superattributen = api.supertype ? util.vindApi(api.supertype).attributen : [];
    const alleAttributen = util.join([util.naarArray(api.attributen), util.naarArray(superattributen)]);
    const attributen = bami(alleAttributen, a => a.key[0], ", ");
    return `

${bami(api.abstract, () => `abstract `)}class ${Item}${bami(api.supertype, s => ` extends ${s[1]}`)} {
    ${item}Nummer: int
    ${bami(api.attributen, a => a.key[0], `\n    `)}
}

`};
