module.exports = (item, Item, ITEM, items, Items, ITEMS, api, bami) => `
@startuml Sequence diagram Inzien ${item}
hide footbox
autoactivate on

actor Docent as actor
participant "${item}Facade: ${Item}Facade" as facade
participant "${item}: ${Item}" as ${item}

actor -> facade: delete${Item}(${item}Nummer)
facade -> facade: get${Item}VanNummer(${item}Nummer)
deactivate facade
facade -> ${item} !! : delete()
deactivate facade

@enduml
`;
