const decimal = 17;

const definitions = [
    {
        value:1,
        letter:"I"
    },
    {
        value:5,
        letter:"V"
    },
    {
        value:10,
        letter:"X"
    },
    {
        value:50,
        letter:"L"
    },
    {
        value:100,
        letter:"C"
    },
    {
        value:500,
        letter:"D"
    },
    {
        value:1000,
        letter:"M"
    }
].reverse();

let leftover = decimal;
let result = "";

definitions.forEach(candidate => {
    while (candidate.value <= leftover) {
        result += candidate.letter;
        leftover -= candidate.value;
    }
});

console.log(result);