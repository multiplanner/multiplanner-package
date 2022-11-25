const input = [1, 8, 3, 7, 0, 1, 2, 6];

const evens = input.filter(n => n % 2 == 0).sort();
const odds = input.filter(n => n % 2 == 1).sort((a, b) => b - a);

const evenindices = input.map((number, index) => number % 2 == 0 ? index : null).filter(v => v != null);
const oddindices = input.map((number, index) => number % 2 == 1 ? index : null).filter(v => v != null);

let evenindex = 0;
let oddindex = 0;

const output = [];

for (let i = 0; i < input.length; i++) {
    if (evenindices[evenindex] == i) {
        output.push(evens[evenindex]);
        evenindex++;
    } else {
        output.push(odds[oddindex]);
        oddindex++;
    }
}

console.log(output);



// evenindices.sort((a, b) => input[a] - input[b]);
// oddindices.sort((a, b) => input[b] - input[a]);