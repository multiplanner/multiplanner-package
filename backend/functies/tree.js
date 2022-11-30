let treeheight = 20
let trunkwidth = 2
let trunkheight = 3

let hwidth = treeheight / 2

for (let i = 1; i <= treeheight; i++) {
    let line = " ".repeat(Math.ceil((hwidth - i / 2) * 2))
    line += "*".repeat(i * 2)
    console.log(line)
}

for (let i=0; i < trunkheight; i++) {
    console.log(" ".repeat((Math.floor(hwidth) - trunkwidth / 2) * 2) + "█".repeat(trunkwidth))
}