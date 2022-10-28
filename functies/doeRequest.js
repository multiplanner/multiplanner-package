const https = require('https');

module.exports = opties => {
    let antwoord = '';
    return new Promise((resolve, error) => {
        const request = https.request(opties, (response) => {
            response.on('data', (deel) => antwoord += deel);
            response.on('end', () => resolve(antwoord));
            response.on('error', error);
        });
        request.end();
    });
};