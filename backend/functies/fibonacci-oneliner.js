[...Array(10).keys()].reduce((totaal, _a, _b, _c, waarde = (totaal ? [totaal[0] + totaal[1], totaal[0]] : [0, 1]), _d = console.log(waarde[0])) => waarde);
