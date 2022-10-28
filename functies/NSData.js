const doeRequest = require("./doeRequest");

module.exports = config => {
    const apikey = config.apikey;

    return async (pad) => await doeRequest({
        host: 'gateway.apiportal.ns.nl',
        path: pad,
        headers: {
            "Ocp-Apim-Subscription-Key": apikey
        }
    });
};