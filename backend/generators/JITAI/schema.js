module.exports = (item, Item, ITEM, items, Items, ITEMS, api, bami) => `
create table if not exists ${item} (
    ${item}_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    ${bami([
        bami(api.attributen, attribuut => `${attribuut.naam[0]} ${attribuut.sqltype[0]} ${attribuut.nullable[0]}`, ",\n    "),
        bami(api.enkelvoudig, associatie => `${associatie[0]}_id INT(6) UNSIGNED NOT NULL`, ",\n    "),
        bami(api.supertype, supertype => `FOREIGN KEY (${supertype[0]}_id) REFERENCES ${supertype[0]}(${supertype[0]}_id) ON DELETE CASCADE`, ",\n    "),
        bami(api.enkelvoudig, associatie => `FOREIGN KEY (${associatie[0]}_id) REFERENCES ${associatie[0]}(${associatie[0]}_id) ON DELETE CASCADE`, ",\n    "),
    ], undefined, "\n    ", undefined, true)}
);

`;