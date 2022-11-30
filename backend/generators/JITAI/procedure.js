module.exports = (item, Item, ITEM, items, Items, ITEMS, api, bami) => 
`

CREATE PROCEDURE get${Items}()
BEGIN
    SELECT *
    FROM ${item}View;
END //

CREATE PROCEDURE get${Item}ById (
    IN param_id INT
) BEGIN
    SELECT *
    FROM ${item}View;
    WHERE ${item}_id = param_id;
END //

CREATE PROCEDURE get${Items}BySearch(
    IN query VARCHAR(255)
) BEGIN
    SELECT *
    FROM ${item}View
    WHERE ${item}_name LIKE CONCAT("%", query, "%");
END //

CREATE PROCEDURE delete${Item}(
    IN param_id INT
) BEGIN
    DELETE FROM ${item} WHERE ${item}_id = param_id;
END //

CREATE PROCEDURE update${Item} (
    IN param_id INT,
${bami(api.attributen, attribuut => `        IN param_${attribuut.naam[0]} ${attribuut.sqltype[0]}`, ",\n", a => `${a},\n`)}\
${bami(api.enkelvoudig, associatie => `        ${associatie[0]}.${associatie[0]}_name AS ${associatie[0]}_name`, ",\n", a => `${a},\n`)}\

) BEGIN
    UPDATE users
    SET 
        username = param_username,
        password = param_password,
        email = param_email,
        role_id = param_role_id,
        goal_id = param_goal_id
    WHERE user_id = param_id;
END //
`;