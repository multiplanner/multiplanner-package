const { isString, isObject, isArray } = require("./typechecks");

const eersteHoofdletter = string => string.charAt(0).toUpperCase() + string.slice(1);
const allesHoofdletter = string => string.toUpperCase();

const stringMetCasing = (string) => {
    const String = eersteHoofdletter(string);
    const STRING = allesHoofdletter(string);

    const strings = string + "s";
    const Strings = String + "s";
    const STRINGS = STRING + "S";

    return [
        string,
        String,
        STRING,
        strings,
        Strings,
        STRINGS
    ];
}

const vulCasingIn = (object) => {
    if (isString(object)) {
        return stringMetCasing(object);
    } else if (isObject(object)) {
        for (const [key, value] of Object.entries(object)) {
            object[key] = vulCasingIn(value);
        }
        return object;
    } else if (isArray(object)) {
        return object.map(vulCasingIn);
    }
}

module.exports = {
    vulCasingIn,
    stringMetCasing
};