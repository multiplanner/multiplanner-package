const letters = ["𝔸", "𝔹", "ℂ", "𝔻", "𝔼", "𝔽", "𝔾", "ℍ", "𝕀", "𝕁", "𝕂", "𝕃", "𝕄", "ℕ", "𝕆", "ℙ", "ℚ", "ℝ", "𝕊", "𝕋", "𝕌", "𝕍", "𝕎", "𝕏", "𝕐", "ℤ"];
const numbers = ["𝟘", "𝟙", "𝟚", "𝟛", "𝟜", "𝟝", "𝟞", "𝟟", "𝟠", "𝟡"];

const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => {
        return argstring
            .split("")
            .map((char) => {
                if (/([a-zA-Z])/.test(char)) {
                    return letters[
                        char.toLowerCase().charCodeAt(0) - 97
                    ];
                } else if (/([0-9])/.test(char)) {
                    return numbers[char];
                } else return char;
            })
            .join("");
    },
    help: `
    Usage: \`fancy [text to stylize]\`.
    
    Returns the text but stylized 𝕃𝕀𝕂𝔼 𝕋ℍ𝕀𝕊.
    `
}