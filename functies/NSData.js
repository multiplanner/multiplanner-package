import doeRequest from "./doeRequest.js"
import readJSON from "./readJSON.js";
import config from "./config.js";

export default async (pad) => JSON.parse(await doeRequest({
    host: 'gateway.apiportal.ns.nl',
    path: pad,
    headers: {
        "Ocp-Apim-Subscription-Key": config.ns_app_key_primary
    }
}));