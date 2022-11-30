const { tekst } = require('bijbel-package');

module.exports = {
    service: (body, params) => tekst(params.vertaling, params.filter),
    responsetype: "text/plain"
};