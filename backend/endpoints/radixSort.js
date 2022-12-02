import vds from "#f/vds.js";

const radix = 2;

const digitAtIndex = (value, index, radix) => Math.floor(value / radix ** index) % radix;

const fillZeros = (desiredLength, value) => {
    const currentLength = value.length;
    const zeros = desiredLength - currentLength;
    return [...Array.apply(null, {length: zeros}).map(_ => 0), ...value];
}

const toBase = (radix, value) => {
    let result = [];
    for (let i = 0; radix ** i <= value; i++) {
        result.unshift(digitAtIndex(value, i, radix));
    }
    return result;
}

const radixSort = (...array) => {
    const result = [];

    const maxLength = Math.ceil(Math.log(array.reduce((max, current) => current > max ? current : max)) / Math.log(radix)) + 1;

    vds(z => array => {
        if (array.length == 0) return;
        if (array[0].b.length == 0) {
            result.push(...array.map(e => e.v));
            return;
        }

        for (let i = 0; i < radix; i++) {
            z(array
                .filter(n => n.b[0] == i)
                .map(({b, ...r}) => ({
                    b: b.slice(1),
                    ...r
                })));
        }

    })(array.map(v => ({
        b: fillZeros(maxLength, toBase(radix, v)),
        v: v
    })));

    return result;
};

export default radixSort;