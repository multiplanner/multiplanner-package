import formatteerTreinen from "#f/formatteerTreinen.js";
import { stationVertrekken } from "#f/stationTreinen.js";

export default async (station) => formatteerTreinen(await stationVertrekken(station));