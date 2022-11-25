const { stringMetCasing } = require("./vulCasingIn");

module.exports = item => item ? Object.entries(item).map(([k, v]) => ({ key: stringMetCasing(k), value: v })) : [];