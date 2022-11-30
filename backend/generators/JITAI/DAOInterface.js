module.exports = (item, Item, ITEM, items, Items, ITEMS) => `
public interface ${Item}DAO {public interface ${Item}DAO {
    void create${Item}(); // TODO: add arguments
    List<${Item}> get${Items}();
    ${Item} get${Item}ById(int ${item}Id);
    List<${Item}> get${Items}BySearch(String query);
    void update${Item}(int ${item}Id, ); // TODO: add arguments
    void delete${Item}(int ${item}Id);
}
`