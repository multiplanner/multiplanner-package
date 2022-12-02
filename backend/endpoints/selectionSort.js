import swap from "#f/swap.js";

const selectionSort = (...array) => {
    for (let i = 0; i < array.length; i++) {
        let lowest = i;
        for (let j = i; j < array.length; j++) {
            if (array[j] < array[lowest]) {
                lowest = j;
            }
        }
        swap(array, i, lowest);
    }
    return array;
};

export default selectionSort;