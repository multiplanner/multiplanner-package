const sharp = require("sharp");

sharp("input.jpg")
    .rotate(90)
    .resize(1000, 1000)
    .toFile('output.jpg', console.log);