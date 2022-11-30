const decimal = 17;

const definitions = [
    {
        value:1,
        letter:"𝕀"
    },
    {
        value:5,
        letter:"𝕍"
    },
    {
        value:10,
        letter:"𝕏"
    },
    {
        value:50,
        letter:"𝕃"
    },
    {
        value:100,
        letter:"ℂ"
    },
    {
        value:500,
        letter:"𝔻"
    },
    {
        value:1000,
        letter:"𝕄"
    }
].reverse();


const path = await import("path");
const cwd = process.cwd();
const { save, load, file } = await import(path.join(cwd, "database", "index.js"));
const isint = await import(path.join(cwd, "utils", "isint.js"));
const { permissions, errors } = await import(path.join(cwd, "utils", "constants.js"));


export default {
    permission: permissions.member,
    code: async (msg, argstring, config) => {

        if (!isint(argstring)) return errors.syntax;
        if (argstring > 10 ** 6) return "Number too high!";

        let leftover = argstring;
        let result = "";
        definitions.forEach(candidate => {
            while (candidate.value <= leftover) {
                result += candidate.letter;
                leftover -= candidate.value;
            }
        });
        
        return result;
    },
    help: `
    Returns the number, but in roman notation. Not very advanced.`
}
