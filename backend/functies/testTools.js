const comparer = (f) => (a, b, ...args) => f(a, ...args) === f(b, ...args);

const compareFunction = (f, ...args) => f(...args).toString();

const compareArray = (a, ...args) => a.toString();

const asserter = (comparatorExpected, comparatorActual) => (testName, expectedValue, actualValue, ...args) => {
    const expectedResult = comparatorExpected(expectedValue, ...args);
    const actualResult = comparatorActual(actualValue, ...args);

    if (expectedResult === actualResult) console.log(`PASSED ${testName}`);
    else console.log(
`FAILED ${testName}
        Expected: ${expectedResult}
        Actual: ${actualResult}
`);
}

export {
    compareFunction,
    compareArray,
    asserter
};