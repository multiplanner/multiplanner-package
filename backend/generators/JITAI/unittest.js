module.exports = (item, Item, ITEM, items, Items, ITEMS) => `

public class ${Item}ServiceImplTest {
    private final int id = 1;

    private final String searchQuery = "search";

    private ${Item}DAO ${item}DAOFixture;
    
    private Create${Item}RequestDTO create${Item}RequestDTO;
    private Update${Item}RequestDTO update${Item}RequestDTO;

    private ${Item}ResponseDTO ${item}ResponseDTO;
    private List<${Item}ResponseDTO> ${item}ResponseDTOS;

    private ${Item} mock${Item};
    private List<${Item}> mock${Items};

    private ${Item}ServiceImpl sut;

    @BeforeEach
    public void setup() {
        create${Item}RequestDTO = Mockito.spy(
                new Create${Item}RequestDTO() // TODO: add arguments
        );

        update${Item}RequestDTO = Mockito.spy(
                new Update${Item}RequestDTO(id, ) // TODO: add arguments
        );

        ${item}DAOFixture = Mockito.mock(${Item}DAO.class);
        mock${Item} = new ${Item}(id, ); // TODO: add arguments

        ${item}ResponseDTO = new ${Item}ResponseDTO(id, ); // TODO: add arguments

        ${item}ResponseDTOS = new ArrayList<>();
        ${item}ResponseDTOS.add(${item}ResponseDTO);
        ${item}ResponseDTOS.add(${item}ResponseDTO);
        ${item}ResponseDTOS.add(${item}ResponseDTO);

        mock${Items} = new ArrayList<>();
        mock${Items}.add(mock${Item});
        mock${Items}.add(mock${Item});
        mock${Items}.add(mock${Item});

        // instantiate SUT
        sut = new ${Item}ServiceImpl(${item}DAOFixture);
    }

    @Test
    public void testCreate${Item}Verifies() {
        // Act
        sut.create${Item}(create${Item}RequestDTO);

        // Assert
        Mockito.verify(create${Item}RequestDTO).validate();
    }

    @Test
    public void testCreate${Item}CallsDB() {
        // Act
        sut.create${Item}(create${Item}RequestDTO);

        // Assert
        Mockito.verify(${item}DAOFixture).create${Item}(
            // TODO: add arguments
        );
    }

    @Test
    public void get${Item}NotExisting() {
        // Arrange
        Mockito.when(${item}DAOFixture.get${Item}ById(id)).thenReturn(null);

        // Act/Assert
        assertThrows(NotFoundException.class, () -> sut.get${Item}(id));
    }

    @Test
    public void get${Items}() {
        //Arrange
        Mockito.when(${item}DAOFixture.get${Items}()).thenReturn(mock${Items});

        //Act
        List<${Item}ResponseDTO> found${Item}DTOs = sut.get${Items}();

        //Assert
        ObjectAssertions.assertEquals(${item}ResponseDTOS, found${Item}DTOs);
    }

    @Test
    public void get${Item}ById() {
        // Arrange
        Mockito.when(${item}DAOFixture.get${Item}ById(id)).thenReturn(mock${Item});

        // Act
        ${Item}ResponseDTO actual = sut.get${Item}(id);

        // Assert
        ObjectAssertions.assertEquals(${item}ResponseDTO, actual);
    }

    @Test
    public void testGet${Items}BySearch() {
        //Arrange
        Mockito.when(${item}DAOFixture.get${Items}BySearch(searchQuery)).thenReturn(mock${Items});

        //Act
        List<${Item}ResponseDTO> found${Item}DTOs = sut.get${Items}BySearch(searchQuery);

        //Assert
        ObjectAssertions.assertEquals(${item}ResponseDTOS, found${Item}DTOs);
    }

    @Test
    public void testUpdate${Item}Verifies() {
        // Arrange
        Mockito.when(${item}DAOFixture.get${Item}ById(id)).thenReturn(mock${Item});

        // Act
        sut.update${Item}(update${Item}RequestDTO);

        // Assert
        Mockito.verify(update${Item}RequestDTO).validate();
    }

    @Test
    public void testUpdate${Item}NotExisting() {
        // Arrange
        Mockito.when(${item}DAOFixture.get${Item}ById(id)).thenReturn(null);

        // Act
        Executable act = () -> sut.update${Item}(update${Item}RequestDTO);

        // Assert
        assertThrows(NotFoundException.class, act);
    }

    @Test
    public void testUpdate${Item}CallsDB() {
        // Arrange
        Mockito.when(${item}DAOFixture.get${Item}ById(id)).thenReturn(mock${Item});

        // Act
        sut.update${Item}(update${Item}RequestDTO);

        // Assert
        Mockito.verify(${item}DAOFixture).update${Item}(
            id,
            // TODO: add parameters
        )
    }

    @Test
    public void testDelete${Item}NotExisting() {
        // Arrange
        Mockito.when(${item}DAOFixture.get${Item}ById(id)).thenReturn(null);

        // Act
        Executable act = () -> sut.delete${Item}(id);

        // Assert
        assertThrows(NotFoundException.class, act);
    }

    @Test
    public void testDelete${Item}() {
        // Arrange
        Mockito.when(${item}DAOFixture.get${Item}ById(Mockito.anyInt())).thenReturn(mock${Item});
        Mockito.doNothing().when(this.${item}DAOFixture).delete${Item}(Mockito.anyInt());

        // Act
        sut.delete${Item}(id);

        // Assert
        Mockito.verify(${item}DAOFixture).delete${Item}(id);
    }
}

`;
