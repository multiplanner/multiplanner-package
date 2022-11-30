import doeRequest from "./doeRequest.js";
import config from "./config.js";

const call = (host, port = 80) => (method) => async (...args) => await doeRequest({
    host: host,
    port: port
}, JSON.stringify({
    secret: config.secret,
    type: "function",
    method: method,
    args: args
}));

export default call;