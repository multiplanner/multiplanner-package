import https from "https";

export default (opties, body = "") => {

    console.log(body);
    let antwoord = '';
    return new Promise((resolve, error) => {
        const request = https.request(opties, (response) => {
            response.on('data', (deel) => antwoord += deel);
            response.on('end', () => resolve(antwoord));
            response.on('error', error);
        });
        request.write(body);
        request.end();
    });
};