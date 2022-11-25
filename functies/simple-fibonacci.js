export function fib() {
    let f = 0;
    let v = 0;
    let t = 1;
    let answers = [];
    for (let i = 0; i < 20; i++) {
        f = v + t;
        t = v;
        v = f;
        answers.push(f);
    }
    return answers;
}
