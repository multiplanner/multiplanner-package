const {
    formatteerTreinen,
    stationAankomsten,
    stationVertrekken
} = require('../index');

(async () => {
    const aankomsten = await stationAankomsten(process.argv[2]);
    const vertrekken = await stationVertrekken(process.argv[2]);
    console.log(formatteerTreinen(aankomsten));
    console.log(formatteerTreinen(vertrekken));
})();