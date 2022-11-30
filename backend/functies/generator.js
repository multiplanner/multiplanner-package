const writeTXT = require('./functies/writeTXT.js');
const leesJSON = require('./functies/leesJSON.js');

const bami = require('./functies/bami.js');
const { vulCasingIn } = require('./functies/vulCasingIn.js');
const { leesMap } = require('./functies/leesMap.js');
const path = require("path");
const naarArray = require('./functies/naarArray.js');

(async () => {
    const projecten = (await leesMap("./generators")).paden;

    for (const project of projecten) {
        const itemsPad = project.paden.find((pad) => path.basename(pad) == "items.json");
        const generatorPaden = project.paden.filter((pad) => path.basename(pad).endsWith(".js")).map(pad => "./" + pad);

        const items = vulCasingIn(await leesJSON(itemsPad));
        const generators = generatorPaden.map(pad => ({
            generator: require(pad),
            naam: path.basename(pad).slice(0, -3)
        }));

        for (const generator of generators) {
            const alleItems = [];
            for (const item of items) {
                try {
                    const code = generator.generator(...(item.naam || [item]), item, bami, {
                        vindApi: naam => items.find(item => item.naam[0] == naam[0]),
                        join: items => items.filter(i => i).flat(),
                        naarArray: naarArray
                    });

                    if (item.naam) {
                        await writeTXT(path.join("./code", project.naam, generator.naam), item.naam[0], code);
                    }

                    alleItems.push(code);

                } catch (e) {
                    console.log(e);
                };
            }
            await writeTXT(path.join("./code", project.naam, generator.naam), "alles", alleItems.join("\n"));
        }
    }
})();