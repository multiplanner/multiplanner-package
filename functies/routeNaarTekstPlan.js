import {
    formatteerReis,
    multiReis,
    planReis,
    reisStats
 } from '../exports.js';

const routeNaarTekstPlan = async (rawRoute) => {
    const reisplan = multiReis(rawRoute);
    const nsAntwoorden = await planReis(reisplan);
    const stats = reisStats(nsAntwoorden);
    const reisScriptNederlands = formatteerReis(stats);
    return reisScriptNederlands;
}
