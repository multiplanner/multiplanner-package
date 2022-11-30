// import stdin from "./functies/stdin.js";
import routeNaarTekstPlan from "./functies/routeNaarTekstPlan.js";
import endpoint from "./functies/endpoint.js";
import call from "./functies/call.js";
import appserver from "./functies/appserver.js";

// console.log(await routeNaarTekstPlan(stdin));

appserver(30001);

console.log(await call("localhost", 30001)("aankomsten")("susteren"));