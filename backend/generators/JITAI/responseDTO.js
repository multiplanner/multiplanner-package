module.exports = (item, Item, ITEM, items, Items, ITEMS, api) => ""/*`
public class ${Item}ResponseDTO${extend(api, bami => `${bami}ResponseDTO`)} {
    protected final int id;
    ${klassenvariabeleDeclaraties(api)}

    public ${Item}ResponseDTO(int id, ${constructorArgumenten(api)}) {
        ${superCall(api)}
        this.id = id;
        ${klassenvariabeleInstantiaties(api)}
    }

    public int getId() {
        return id;
    }    
    ${getters(api)}

    public static ${Item}ResponseDTO fromData(${Item} ${item}) {
        return new ${Item}ResponseDTO(
            ${item}.getId(),
            ${allGetters(api)}
        );
    }
}


`;*/
