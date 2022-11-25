module.exports = (item, Item, ITEM, items, Items, ITEMS) => `
@Component
public class ${Item}DAOImpl implements ${Item}DAO {
    private static final Logger LOGGER = Logger.getLogger(${Item}DAOImpl.class.getName());

    private ${Item} get${Item}FromResultSet(ResultSet resultSet) {
        try {
            return new ${Item}(
                resultSet.getInt("${item}_id"),
                // TODO: add arguments
            );
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "get${Item}FromResultSet::A database error occurred!", e);
        }
        return null;
    }

    @Override
    public void create${Item}() { // TODO: add arguments
        try (
            Connection connection = DriverManager.getConnection(DatabaseProperties.connectionString());
            PreparedStatement statement = connection.prepareStatement("CALL create${Item}()") // TODO: add arguments
        ) {
            // TODO: set arguments
            
            statement.executeUpdate();
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "create${Item}::A database error occurred!", e);
        }
    }

    @Override
    public List<${Item}> get${Items}() {
        try (
            Connection connection = DriverManager.getConnection(DatabaseProperties.connectionString());
            PreparedStatement statement = connection.prepareStatement("CALL get${Items}()");
            ResultSet resultSet = statement.executeQuery()
        ) {
            List<${Item}> found${Items} = new ArrayList<>();

            while (resultSet.next()) {
                found${Items}.add(get${Item}FromResultSet(resultSet));
            }

            return found${Items};
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "get${Items}::A database error occurred!", e);
        }
        return new ArrayList<>();
    }

    @Override
    public ${Item} get${Item}ById(int ${item}Id) {
        try (
            Connection connection = DriverManager.getConnection(DatabaseProperties.connectionString());
            PreparedStatement statement = connection.prepareStatement("CALL get${Item}ById(?)")
        ) {
            statement.setInt(1, ${item}Id);

            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return get${Item}FromResultSet(resultSet);
                }
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "get${Item}ById::A database error occurred!", e);
        }
        return null;
    }

    @Override
    public void update${Item}(int ${item}Id, ) { // TODO: add arguments
        try (
            Connection connection = DriverManager.getConnection(DatabaseProperties.connectionString());
            PreparedStatement statement = connection.prepareStatement("CALL update${Item}(?, )") // TODO: add arguments
        ) {
            statement.setInt(1, ${item}Id);
            
            // TODO: set arguments

            statement.executeUpdate();
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "update${Item}::A database error occurred!", e);
        }
    }

    @Override
    public void delete${Item}(int ${item}Id) {
        try (
            Connection connection = DriverManager.getConnection(DatabaseProperties.connectionString());
            PreparedStatement statement = connection.prepareStatement("CALL delete${Item}(?)")
        ) {
            statement.setInt(1, ${item}Id);
            statement.executeUpdate();
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "delete${Item}::A database error occurred!", e);
        }
    }
}

`;
