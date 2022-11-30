"use strict";
const sp = {
    env: {
        memoryBase: 0,
        tableBase: 0,
        memory: new WebAssembly.Memory({
            initial: 256
        }),
        table: new WebAssembly.Table({
            initial: 0,
            element: 'anyfunc'
        })
    },
    imports: {
        fib: (arg) => {
            console.log(arg);
        }
    }
};
const fs = require('fs'), wasm = WebAssembly.instantiate(new Uint8Array(fs.readFileSync('./fibonacci.wasm')), sp)
    .then(result => console.log(result));
