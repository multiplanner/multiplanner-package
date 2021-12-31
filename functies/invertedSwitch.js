const invertedSwitch = (switches, waarde) => {
    for (const [test, succes] of switches) {
        const testResultaat = test(waarde);
        if (testResultaat) {
            return succes(waarde, testResultaat);
        }
    }
};

module.exports = invertedSwitch;