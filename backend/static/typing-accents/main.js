let input, sarcasm, i, length;
let ff = true;
let textbox = document.getElementById("input");
let slider = document.getElementById("randomslider");
let maxemojibox = document.getElementById("maxemojis");

let maxemojis = 1;

const styles = [
    {
        letters: ["ᵃ", "ᵇ", "ᶜ", "ᵈ", "ᵉ", "ᶠ", "ᵍ", "ʰ", "ⁱ", "ʲ", "ᵏ", "ˡ", "ᵐ", "ⁿ", "ᵒ", "ᵖ", "ᵠ", "ʳ", "ˢ", "ᵗ", "ᵘ", "ᵛ", "ʷ", "ˣ", "ʸ", "ᶻ"],
        numbers: ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"]
    }, {
        letters: ["𝔸", "𝔹", "ℂ", "𝔻", "𝔼", "𝔽", "𝔾", "ℍ", "𝕀", "𝕁", "𝕂", "𝕃", "𝕄", "ℕ", "𝕆", "ℙ", "ℚ", "ℝ", "𝕊", "𝕋", "𝕌", "𝕍", "𝕎", "𝕏", "𝕐", "ℤ"],
        numbers: ["𝟘", "𝟙", "𝟚", "𝟛", "𝟜", "𝟝", "𝟞", "𝟟", "𝟠", "𝟡"]

    }, {
        letters: ["Ā̵͕̩̓̒̊̕̚͝", "̸̧̛̥̙̖̭͆̽͗̀̑̿̒̀̕Ḇ̸̞̅̾", "̷̘͕̫̜̘̊̍͘̕C̷̡̬̣̀̀̆̃̈́͊̕͝", "̷̧̣̮̼͍̺̻̯̝̍́D̴̨̛̥͎̗͍̫̣͍͕̔̓̈́͋̌̀̔̕͠", "̴̦̣̃̌͋̓̅E̴̩͎̜͈̳̺̤̣̾̔̋̑͊͜", "̵̢̺̈́̄̂F̶̗̝̗̫͒͂ͅ", "̷̤̺̄͗̃͌͒̈́̈͌̓̿ͅG̶̞͉̦̣͉̟͇̣̣̜̒̿̃͛̚̕", "̷̧̙͎̗́͐̚H̷͖͇̋̈́̾̃͆͌̇̓̀", "̷̛͔̅̾͐̆͊̈́I̸̩̥̻̱̩͖̤͕͗͝ͅ", "̷̗̝͕̈́̀̍̈́͑̍͘͝J̸̧̣̙̭̤̬̙̗̅̓͑̈͛̋̽̄͝", "̸̨͖̖̹͕̂͂́̄̀̐̿̃͂͘ͅK̵̠̖̯͇̖̠̻̓̓̌̈́͑̓̅̇ͅ", "̷̗̰͙̭̘͗͑̏̿̂̈́͘L̷̡̜͇̞̣̳̓͐̂̆́̚͜͜", "̸͕͉͈̙̥̦͍̰̰̀͋̅̇̎̓M̶̡̪̤̲̯̗̓̈́̑̒̄̀͜", "̶̡̛̹̫̙̞̊̏́͆̽̕N̸̬̤̖͉̗̗̯͔̄", "̸͍͖͎̦͈̂̄̆̈́̔̇̐̚͘̚Ȯ̴̠̪̫̙͓͈̟̞̋̅̽̆͐͗̕͜", "̷̥͕̻͇̐̉̅͂̈́͛͝P̶̠͚͖͙̹̝̥͑̊̀͐̚͜͝", "̴̡͙̩̯̖̰̹̎̽̔Q̵̪̣̊͊͋̇͝", "̸̣̝͎̆̋͒̋R̴̨̨̛̲̩͉͉͓͆̉͐̒͊̌ͅ", "̷͔̓Ś̷̢͚̬̞̮͈̮̱̭͐́͘ͅ", "̴̨̝̖̆̋͆̓͆͒͠͠͠͠T̶̨̛̪̗̾͘", "̷̤͚͕̯̮̤̯̱̩̭̐̇̃̔̋͑Ṳ̵̡̺̮̩͊͝", "̵̨̧̙̫̱́͂̔̌̄̈͌͂̋̿V̵̮̹̽̓͆̐", "̴̖̿̈́̇͆̒̕͘W̷̨̡̱̺̪̤̏̾̀̈͘", "̶̢̟̭̜͇̜̐̅́͐X̴̯̟̠͇̗̗̳̳͔̉̉͋͆͠", "̴̧̬͈̻̣̖͊́Ý̴̡̨̡̭̯͖̖̞̒͒̀͋̀̈́̕̚͜ͅ", "̴͇̝͕͙͎̰͔̖̀̀̔Z̸̨̩̰͍̖̥̈̍"],
        numbers: ["̶̖̞̽͋͛̕0̸͇̜̥̲̥̗̫̫̀͆̓́̅̃̒", "̷̡̛͍̯͔̟͕̼̀͐̊͊̀̉͠1̷͇͕̆̉͒͜͝", "̶̰̥͙͕̗̋̂2̷̦͈̬̻͑̌̿͑̀̂̚͠", "̶̛̥̯̺̈́͐̎͛̀̈́̈́͝3̷̦̻͔͑͝ͅ", "̶̛̻̤̺̋̓͒͂̐̚4̴͔̗̀̈̇̀̉̿̐͝", "̴̛̞̜̫̲̲̲̗̍̄̌̄̾̂̒̚5̶̨̬̮̣̘͔̞̫̇̚", "̵̛̹̙̻̪̺̫̓̉̾̀̂6̴̧̡͎̞͖̝̫͉̙̒̊͑̄͠", "̷̧̣̻̠̪̹͈͓̙̀̀̈͊́̈7̶̧͍͔̔̂͗̊̾̋̆ͅ", "̴̧̖̪͇̜̔̎̋̃̽̑̈̚͘͜͝ͅ8̶̤̞̗̘͖̘̗̦̄͆͑̓̿̑̔͛", "̴̜͋̀9̸̲̓̀"]
    }
]

function getEmoji(keyword) {
    let candidates = emoji.filter(
        (entry) => entry[1].join(" ").indexOf(keyword.toLowerCase()) >= 0
    );
    if (candidates.length > 0) {
        let a = "";
        for (let i = 0; i < maxemojis && i < candidates.length; i++)
            a += candidates[i][0];
        return a;
    } else return " ";
}

function update() {
    sarcasm = "";
    small = "";

    let sarcasmAmount = slider.value / 100;
    let input = textbox.value;
    length = input.length;
    maxemojis = maxemojibox.value;

    let withEmoji = input.split(" ");
    withEmoji = withEmoji.map((word) => word + getEmoji(word));

    let styled = "";
    styles.forEach(style => {
        styled += input
            .split("")
            .map((char) => {
                if (/([a-zA-Z])/.test(char)) {
                    return style.letters[
                        char.toLowerCase().charCodeAt(0) - 97
                    ];
                } else if (/([0-9])/.test(char)) {
                    return style.numbers[char];
                } else return char;
            })
            .join("") + "<br>";
    });

    document.getElementById("sarcasm").innerHTML = input.split("").map((char, index) => index % 2 == 0 ? char.toLowerCase() : char.toUpperCase()).join("");
    document.getElementById("styles").innerHTML = styled;
    document.getElementById("monospace").innerHTML = input.toUpperCase().split("").join(" ");
    document.getElementById("emoji").innerHTML = withEmoji.join(" ");
    document.getElementById("uwu").innerHTML = input.replace(/[prl]/g, "w");
}
