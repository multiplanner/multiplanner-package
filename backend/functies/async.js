function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

async function helo () {
    console.log("b")
    sleep(1000)
    console.log("c")
}

console.log("9")
helo()
console.log("d")