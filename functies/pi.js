const total = 10000000

let incirkle = 0
for (let i=0; i<total; i++) {
    if(Math.sqrt(Math.sqrt(Math.pow(Math.random(), 2) + Math.pow(Math.random(), 2))) < 1) incirkle++
}

let pi = incirkle * 4 / total
console.log(pi)
