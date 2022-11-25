const fs = require('fs')
const path = process.cwd()

const objects = fs.readFileSync(path + "/scratch.js").toString().split("833aa26ac2167301c1693f4ef75a3c69d8a2e7003f2a7fab4dd8bd15ca87b76c")

objects.forEach (object => {
    let parts = object.split("94efc0176b3c1bcd9ffac92f70a88eb9350c5f903c381842625518109ecb366d")
    let outputpath = path + "/commands/" + parts[0] + ".js"
    let preboilerplate = "module.exports = async (msg, argstring, config) => {"
    let postboilerplate = "}"
    let filecontents = preboilerplate + parts[1] + postboilerplate

    console.log(outputpath, filecontents)

    
    fs.writeFileSync(outputpath, filecontents)
})