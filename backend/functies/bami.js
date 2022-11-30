const { isString, isArray, isObject } = require("./typechecks");
const { stringMetCasing } = require("./vulCasingIn");
const naarArray = require('./naarArray');

const bami = (item, callback = a => a, delimiter = "", template = a => a, arrayOverride = false) => item ? template((isObject(item) ? naarArray(item) : ((isArray(item) && !isString(item[0])) || arrayOverride ? item : [item])).map(callback).join(delimiter)) : ``;

module.exports = bami;