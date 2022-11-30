module.exports = (item, Item, ITEM, items, Items, ITEMS) => 
`
@RestController
@RequestMapping("/${items}")
@CrossOrigin
public class ${Item}Controller {
    private final ${Item}Service ${item}Service;

    @Autowired
    public ${Item}Controller(${Item}Service ${item}Service) {
        this.${item}Service = ${item}Service;
    }

    @PostMapping()
    @Permission(permission = Permissions.CREATE_${ITEMS})
    public void create${Item}(@RequestBody Create${Item}RequestDTO create${Item}RequestDTO) {
        ${item}Service.create${Item}(create${Item}RequestDTO);
    }

    @GetMapping("")
    @Permission(permission = Permissions.GET_${ITEMS})
    public ResponseEntity<List<${Item}ResponseDTO>> get${Items}(@RequestParam("search") Optional<String> query) {
        return new ResponseEntity<>(
            query.isPresent() ? ${item}Service.get${Items}BySearch(query.get()) : ${item}Service.get${Items}(),
            HttpStatus.OK
        );
    }

    @GetMapping("{id}")
    @Permission(permission = Permissions.GET_${ITEMS})
    public ResponseEntity<${Item}ResponseDTO> get${Item}(@PathVariable("id") int id) {
        return new ResponseEntity<>(
            ${item}Service.get${Item}(id),
            HttpStatus.OK
        );
    }

    @GetMapping("{count}")
    @Permission(permission = Permissions.GET_${ITEMS})
    public ResponseEntity<${Item}ResponseDTO> get${Item}(@PathVariable("count") int count) {
        return new ResponseEntity<>(
            ${item}Service.get${Items}ByCount(id),
            HttpStatus.OK
        );
    }

    @DeleteMapping("{id}")
    @Permission(permission = Permissions.DELETE_${ITEMS})
    public void delete${Item}(@PathVariable("id") int id) {
        ${item}Service.delete${Item}(id);
    }

    @PutMapping()
    @Permission(permission = Permissions.UPDATE_${ITEMS})
    public void update${Item}(@RequestBody Update${Item}RequestDTO update${Item}RequestDTO) {
        ${item}Service.update${Item}(update${Item}RequestDTO);
    }
}
`;