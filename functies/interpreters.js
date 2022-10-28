const vertrekTijd = (trip) => new Date(trip.legs[0].origin.plannedDateTime);
const aankomstTijd = (trip) => new Date(trip.legs[trip.legs.length - 1].destination.plannedDateTime);

const vertrekTrein = (trip) => trip.legs[0].product.number;

const aankomstTrein = (trip) => trip.legs[trip.legs.length - 1].product.number;

const extractLeg = (leg, index) => {
    const vertrektijd = new Date(leg.origin.actualDateTime || leg.origin.plannedDateTime);
    const aankomsttijd = new Date(leg.destination.actualDateTime || leg.destination.plannedDateTime);
    return {
        vertrekstationnaam: leg.origin.name,
        vertrekspoor: leg.origin.actualTrack || leg.origin.plannedTrack,
        aankomstspoor: leg.destination.actualTrack || leg.destination.plannedTrack,
        vertrektijd: vertrektijd,
        aankomsttijd: aankomsttijd,
        uitstapzijde: leg.destination.exitSide,
        aankomststationnaam: leg.destination.name,
        ritnummer: leg.product.number,
        richting: leg.direction,
        categorie: leg.product.longCategoryName,
        ritnummer: leg.product.number,
        index: index,
        stations: leg.stops.map((stop) => stop.name),
        ritduur: Math.round((aankomsttijd.getTime() - vertrektijd.getTime()) / 1000 / 60)
    };
};

const eerstAankomendeGeldigeRit = (trips, moment, volgritNummer) => {
    let besteTrip;
    for (const trip of trips) {
        if (trip.status != "NORMAL" || (trip.legs[0].product.number != volgritNummer && moment > vertrekTijd(trip))) continue;
        if (!besteTrip) besteTrip = trip;
        if (aankomstTijd(trip) < aankomstTijd(besteTrip)) besteTrip = trip;
    }
    return besteTrip;
};

const laatstAankomendeGeldigeRit = (trips, moment, volgritNummer) => {
    let besteTrip;
    for (const trip of trips) {
        if (trip.status != "NORMAL" || (trip.legs[trip.legs.length - 1].product.number != volgritNummer && aankomstTijd(trip) > moment)) continue;
        if (!besteTrip) besteTrip = trip;
        if (vertrekTijd(trip) > vertrekTijd(besteTrip)) besteTrip = trip;
    }
    return besteTrip;
};

export {
    eerstAankomendeGeldigeRit,
    laatstAankomendeGeldigeRit,
    vertrekTijd,
    aankomstTijd,
    extractLeg,
    vertrekTrein,
    aankomstTrein
};