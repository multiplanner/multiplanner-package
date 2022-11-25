module.exports = (item, Item, ITEM, items, Items, ITEMS, api, bami) => `

CREATE VIEW ${item}View
AS (
    SELECT 
        ${item}_id, 
${bami(api.attributen, attribuut => `        ${item}.${attribuut.naam[0]}`, ",\n", a => `${a},\n`)}\
${bami(api.superattributen, attribuut => `        ${api.supertype[0]}.${attribuut.naam[0]}`, ",\n", a => `${a},\n`)}\
${bami(api.enkelvoudig, associatie => `        ${associatie[0]}.${associatie[0]} AS ${associatie[0]}`, ",\n", a => `${a},\n`)}\
    FROM ${item}
${bami(api.supertype, s => `    LEFT OUTER JOIN ${s[0]} ON ${item}.${s[0]}_id = ${s[0]}.${s[0]}_id`)}
${bami(api.enkelvoudig, attribuut => `    LEFT OUTER JOIN ${attribuut[0]} ON ${item}.${attribuut[0]}_id = ${attribuut[0]}.${attribuut[0]}_id`, ",\n", a => `${a},\n`)}\
);

`;