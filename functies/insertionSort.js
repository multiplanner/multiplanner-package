import swap from "./swap.js";

const insertionSort = (array) => {
    for (let i = 1; i < array.length; i++) {
        for (let j = i; j > 0; j--) {
            if (array[j - 1] < array[j]) continue;
            swap(array, j - 1, j);
        }
    }
    return array;
};

export default insertionSort;