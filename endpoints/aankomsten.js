import formatteerTreinen from "#f/formatteerTreinen.js";
import { stationAankomsten } from "#f/stationTreinen.js";

export default async (station) => formatteerTreinen(await stationAankomsten(station));