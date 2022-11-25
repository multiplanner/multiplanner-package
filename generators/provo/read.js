module.exports = (item, Item, ITEM, items, Items, ITEMS, api, bami) => `
@startuml Sequence diagram Inzien ${item}
hide footbox
autoactivate on

actor Docent as actor
participant "${item}Facade: ${Item}Facade" as facade
participant "${item}View: ${Item}View" as view
participant "${item}: ${Item}" as ${item}

actor -> facade: get${Item}(${item}Nummer)
facade -> facade: get${Item}VanNummer(${item}Nummer)
deactivate facade

facade -> view ** : Create(${item})
activate view
view -> ${item} : subscribe(this)
deactivate ${item}
deactivate view

return ${item}View

@enduml
`;
