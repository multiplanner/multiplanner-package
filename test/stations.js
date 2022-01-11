const {
    formatteerTreinen,
    stationAankomsten,
    stationVertrekken
} = require('../index');

(async () => {
    const aankomsten = await stationAankomsten("Zwolle");
    const vertrekken = await stationVertrekken("Zwolle");
    console.log(formatteerTreinen(aankomsten));
    console.log(formatteerTreinen(vertrekken));
})();