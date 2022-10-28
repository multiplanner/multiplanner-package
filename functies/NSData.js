import doeRequest from "./doeRequest.js"
import readJSON from "./readJSON.js";
const config = await readJSON("config");

export default async (pad) => JSON.parse(await doeRequest({
    host: 'gateway.apiportal.ns.nl',
    path: pad,
    headers: {
        "Ocp-Apim-Subscription-Key": config.ns_app_key_primary
    }
}));