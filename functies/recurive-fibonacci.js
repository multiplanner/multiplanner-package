function fibonacci (f) {
    if (f <= 0) {
        return 1;
    } else {
        return fibonacci(f - 1) + fibonacci(f - 2);
    }
}

console.log(fibonacci(6));