const https = require('https');

const readJSONSync = require('./readJSONSync.js');
const config = readJSONSync("config");

module.exports = (pad, apikey = config.ns_app_key_primary) => {
    const options = {
        host: 'gateway.apiportal.ns.nl',
        path: pad,
        headers: {
            "Ocp-Apim-Subscription-Key": apikey
        }
    };

    let antwoord = '';
    return new Promise ((resolve) => {
            const request = https.request(options, (response) => {
                response.on('data', (deel) => antwoord += deel);
                response.on('end', () => resolve(JSON.parse(antwoord)));
            });
            request.end();
        }
    );
};