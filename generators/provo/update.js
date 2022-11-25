module.exports = (item, Item, ITEM, items, Items, ITEMS, api, bami, util) => {
const superattributen = api.supertype ? util.vindApi(api.supertype).attributen : [];
const alleAttributen = util.join([util.naarArray(api.attributen), util.naarArray(superattributen)]);
const attributen = bami(alleAttributen, a => a.key[0], ", ");
    return `
@startuml Sequence diagram Inzien ${item}
hide footbox
autoactivate on

actor Docent as actor
participant "${item}Facade: ${Item}Facade" as facade
participant "${item}View: ${Item}View" as view
participant "${item}: ${Item}" as ${item}

actor -> facade: update${Item}(${item}Nummer, ${attributen})
facade -> facade: get${Item}VanNummer(${item}Nummer)
deactivate facade
facade -> ${item} : update(${attributen})
${item} -> ${item} : notify()
deactivate ${item}
deactivate ${item}

facade -> view ** : Create(${item})
activate view
view -> ${item} : subscribe(this)
deactivate ${item}
deactivate view
return ${item}View

@enduml
`};
