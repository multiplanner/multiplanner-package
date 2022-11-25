module.exports = (item, Item, ITEM, items, Items, ITEMS) => 
`
public interface ${Item}Service {
    void create${Item}(Create${Item}RequestDTO create${Item}RequestDTO);
    List<${Item}ResponseDTO> get${Item}s();
    ${Item}ResponseDTO get${Item}ById(int id);
    ${Item}ResponseDTO get${Item}ByCount(int count);
    List<${Item}ResponseDTO> get${Item}sBySearch(String query);
    void update${Item}(Update${Item}RequestDTO update${Item}RequestDTO);
    void delete${Item}(int id);
}
`;