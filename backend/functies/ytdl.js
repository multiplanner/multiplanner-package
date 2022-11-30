const fs = require("fs");
const path =  require("path");
const ytdl = require("ytdl-core");
const cwd = process.cwd();

const video = process.argv[2];

if (video) {
    const file = path.join(cwd, video + ".mp3");
    ytdl(video, { filter: "audioonly" }).pipe(fs.createWriteStream(file));
} else console.log("Please provide a video url or id.");

