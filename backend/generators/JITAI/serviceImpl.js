module.exports = (item, Item, ITEM, items, Items, ITEMS) => `

@Component
public class ${Item}ServiceImpl implements ${Item}Service {

    private final ${Item}DAO ${item}DAO;

    @Autowired
    public ${Item}ServiceImpl(${Item}DAO ${item}DAO) {
        this.${item}DAO = ${item}DAO;
    }

    @Override
    public void create${Item}(Create${Item}RequestDTO create${Item}RequestDTO) {
        create${Item}RequestDTO.validate();

        ${item}DAO.create${Item}(
            // TODO: add arguments
        );
    }

    @Override
    public List<${Item}ResponseDTO> get${Items}() {
        return ${item}DAO
            .get${Items}()
            .stream()
            .map(${Item}ResponseDTO::fromData)
            .collect(Collectors.toList());
    }

    @Override
    public List<${Item}ResponseDTO> get${Items}BySearch(String query) {
        return ${item}DAO
            .get${Items}BySearch(query)
            .stream()
            .map(${Item}ResponseDTO::fromData)
            .collect(Collectors.toList());
    }

    @Override
    public ${Item}ResponseDTO get${Item}ById(int id) {
        final ${Item} ${item} = ${item}DAO.get${Item}ById(id);

        if (${item} == null) {
            throw new NotFoundException();
        }

        return ${Item}ResponseDTO.fromData(${item});
    }

    @Override
    public void update${Item}(Update${Item}RequestDTO update${Item}RequestDTO) {
        update${Item}RequestDTO.validate();

        if (${item}DAO.get${Item}ById(update${Item}RequestDTO.getId()) == null) {
            throw new NotFoundException();
        }
        
        ${item}DAO.update${Item}(
            update${Item}RequestDTO.getId(),
            // TODO: add arguments            
        );
    }

    @Override
    public void delete${Item}(int id) {
        if (${item}DAO.get${Item}ById(id) == null) {
            throw new NotFoundException();
        }

        ${item}DAO.delete${Item}(id);
    }
}
`