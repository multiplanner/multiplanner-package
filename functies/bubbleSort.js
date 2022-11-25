import swap from "./swap.js";

const bubbleSort = (array) => {
    let sorted;

    do {
        sorted = true;
        for (let i = 1; i < array.length; i++) {
            if (array[i - 1] > array[i]) {
                sorted = false;
                swap(array, i - 1, i);
            }
        }
    } while (!sorted)
    
    return array;
};

export default bubbleSort;