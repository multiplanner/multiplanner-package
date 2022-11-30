const voegNsAntwoordenSamen = (trips) => {
    trips
        .slice(1)
        .forEach((trip) => {
            trips[0].plannedDurationInMinutes += trip.plannedDurationInMinutes;
            trips[0].plannedDurationInMinutes += trip.actualDurationInMinutes;
            trips[0].messages.push(...trip.messages);
            trips[0].legs.push(...trip.legs);
            trips[0].fares = trips[0].fares.map((fare, index) => fare.priceInCents += trip.fares[index].priceInCents);
            trips[0].fareLegs.push(...trip.fareLegs);
            trips[0].productFare.priceInCents += trip.productFare.priceInCents;
            trips[0].productFare.priceInCentsExcludingSupplement += trip.productFare.priceInCentsExcludingSupplement;
            trips[0].productFare.buyableTicketPriceInCents += trip.productFare.buyableTicketPriceInCents;
            trips[0].productFare.buyableTicketPriceInCentsExcludingSupplement += trip.productFare.buyableTicketPriceInCentsExcludingSupplement;
            trips[0].transfers += trip.transfers;
            trips[0].transfers += trip.transfers;
            trips[0].transfers += trip.transfers;
        });
    
    trips[0].legs.forEach((leg, i) => leg.idx = i);

    return {
        "source": "HARP",
        "trips": [trips[0]],
        "scrollRequestBackwardContext": "2|OB|MTµ11µ154502µ154502µ154585µ154585µ0µ0µ324µ154599µ-3µ10µ154540µ1µ1|PDHµ3b69f1ba16c3bae936573575d10f33f0|RDµ12012022|RTµ74000|USµ0",
        "scrollRequestForwardContext": "2|OF|MTµ11µ154532µ154532µ154615µ154615µ0µ0µ4µ154791µ-1µ10µ154540µ1µ1|PDHµ3b69f1ba16c3bae936573575d10f33f0|RDµ12012022|RTµ74000|USµ0"
    };
};

export default voegNsAntwoordenSamen;