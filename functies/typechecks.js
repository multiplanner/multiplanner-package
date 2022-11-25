const isString = object => typeof object === 'string' || object instanceof String;
const isObject = object => Object.prototype.toString.call(object) == "[object Object]";
const isArray = Array.isArray;

module.exports = {
    isString,
    isObject,
    isArray
};