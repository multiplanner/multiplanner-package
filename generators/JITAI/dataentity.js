module.exports = (item, Item, ITEM, items, Items, ITEMS, api, bami) => `

public class ${Item}${bami(api.supertype, s => ` extends ${s[1]}`)} {
    protected final int id;
    ${bami(api.attributen, a => `protected final ${a.type[0]} ${a.naam[0]};`, `\n    `)}

    public ${Item}(int id, ${bami(api.attributen, a => `${a.type[0]} ${a.naam[0]}`, ", ")}${bami(api.superattributen, a => `${a.type[0]} ${a.naam[0]}`, ", ", a => `, ${a}`)}) {
        ${bami(api.superattributen, a => a.naam[0], ", ", a => `super(${a});`)}
        this.id = id;
        ${bami(api.attributen, a => `this.${a.naam[0]} = ${a.naam[0]}`, "\n        ")}
    }

    public int getId() {
        return id;
    }

${bami(api.attributen, a => `    public ${a.type[0]} get${a.naam[1]}() {
        return ${a.naam[0]};
    }`, "\n\n")}

}

`;
