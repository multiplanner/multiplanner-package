let unsorted = [];
let sorted = [];

for (let i = 0; i < 100; i++) {
    unsorted.push(Math.random());
}

const max = Math.max(...unsorted);

setTimeout(() => {
    console.log(sorted);
}, max + 10);

unsorted.forEach((number) => {
    setTimeout(() => {
        sorted.push(number);
    }, number * 10);
});