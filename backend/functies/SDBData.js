import { createHmac } from "./crypto.js";import { createHmac } from "./crypto.js"
import { DateTime } from "luxon";
import doeRequest from "./doeRequest.js"



export default (config) => {
    const sdbkey = config.SDB.key;
    const sdbklantnummer = config.SDB.klantnummer;
    const sdbapiuser = config.SDB.user;

    return async (pad, method = "GET") => {
        const datum = DateTime.now();
        const datumZonderPipe = datum.toFormat("dd-MM-yyyy HH:mm:ss.SSS");
        const datumMetPipe = datum.toFormat("dd-MM-yyyy|HH:mm:ss.SSS");

        const auth = `${sdbapiuser}:${createHmac('sha256', sdbkey).update(`${datumMetPipe}|${sdbklantnummer}`).digest('base64')}`;

        return JSON.parse(await doeRequest({
            host: 'api.sdbstart.nl',
            path: pad,
            method: method,
            headers: {
                Timestamp: datumZonderPipe,
                Klantnummer: sdbklantnummer,
                Authentication: auth,
                "Api-Version": "2.0"
            }
        }));
    };
};