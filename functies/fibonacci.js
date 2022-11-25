let f = 1
let l = 1
let s = 0

let fibonacciArray = []

console.log("generating Fibonacci sequence:")

for (let i=0; i < 200; i++) {
    //fibonacciArray.push(f)

    f = l + s
    s = l
    l = f

    console.log(f)
    console.log(l/s)
}

printarray(fibonacciArray)
console.log("shuffling:")

for (let i=0; i < fibonacciArray.length; i++){
    swapitems(i, Math.floor(Math.random() * fibonacciArray.length))
}

printarray (fibonacciArray)

console.log("sorting:")

let done = false
while (!done){
    done = true
    for (let i=1; i < fibonacciArray.length; i++){
        if (fibonacciArray[i] < fibonacciArray[i-1]){
            swapitems(i, i-1)
            done = false
        }
    }
}

printarray(fibonacciArray)

function swapitems (indexa, indexb) {
    let temp = fibonacciArray[indexa]
    fibonacciArray[indexa] = fibonacciArray[indexb]
    fibonacciArray[indexb] = temp
}

function printarray (array){
    array.forEach(item => console.log(item))
}
