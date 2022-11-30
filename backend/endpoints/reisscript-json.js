const {
    planReis,
    multiReis,
    reisStats
} = import("multiplanner");

export default async (reisscript) => JSON.stringify(reisStats(await planReis(multiReis(reisscript))));