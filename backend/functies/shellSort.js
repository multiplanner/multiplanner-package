import swap from "./swap.js";

const gaps = [10, 7, 3, 1];

const shellSort = (array) => {
    for (const gap of gaps) {
        for (let i = gap; i < array.length; i += gap) {
            if (array[i - gap] > array[i]) {
                swap(array, i - gap, i);
            }
        }
    }
};

export default insertionSort;