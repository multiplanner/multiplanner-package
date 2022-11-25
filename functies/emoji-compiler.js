const fs = require("fs");
const path = process.cwd();

let emojis = fs
    .readFileSync(path + "/emojis.txt")
    .toString()
    .split("\n");

let synonyms = fs
    .readFileSync(path + "/synonyms.json")
    .toString()
    .toLowerCase()
    .split("\n")
    .filter((entry) => entry.length > 0)
    .map((entry) => JSON.parse(entry));

function synonymsOf(word) {
    let candidate = synonyms.find((entry) => entry.word == word);
    if (candidate != null) {
        return candidate.synonyms;
    } else {
        return [];
    }
}

emojis = emojis
    .filter((line) => line[0] != "#" && line.length > 10) //maybe check for unqualified
    .map((line) => line
        .split("#")[1]
        .substr(1)
        .toLowerCase()
        .replace(":", "")
    );


let total = emojis.length;
let part = 0;

emojis = emojis.map((line) => {
    let parts = line.split(" ");
    let emoji = parts[0];
    parts.shift();
    parts.forEach((keyword) => {
        if (/ing$/.test(keyword)) {
            parts.push(keyword.replace(/ing$/, "e"));
        }
    });

    parts.forEach((keyword) => {
        parts = parts.concat(synonymsOf(keyword));
    });

    //console.log((part / total) * 100, emoji, parts);
    part++;

    return {
        "emoji":emoji,
        "keywords":parts
    };
});

fs.writeFileSync(path + "/emoji.json", JSON.stringify(emojis));