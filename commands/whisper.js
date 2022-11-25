const smallLetters = ["ᵃ", "ᵇ", "ᶜ", "ᵈ", "ᵉ", "ᶠ", "ᵍ", "ʰ", "ⁱ", "ʲ", "ᵏ", "ˡ", "ᵐ", "ⁿ", "ᵒ", "ᵖ", "ᵠ", "ʳ", "ˢ", "ᵗ", "ᵘ", "ᵛ", "ʷ", "ˣ", "ʸ", "ᶻ"];
const smallNumbers = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];

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
                    return smallLetters[
                        char.toLowerCase().charCodeAt(0) - 97
                    ];
                } else if (/([0-9])/.test(char)) {
                    return smallNumbers[char];
                } else return char;
            })
            .join("");
    },
    help: `
    Usage: \`whisper [text]\`.
    
    Returns the given text but stylized ˡⁱᵏᵉ ᵗʰⁱˢ.
    `
}
