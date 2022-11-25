const sharp = require("sharp");

sharp("emoji.svg", { density: 600 })
    .toFile('emoji.png', console.log);