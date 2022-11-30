const zichtafstand = 50;
const dimensies = 2;

const aantal = 30;

const ruimte = [800, 800];
const beginsnelheid = 10;

const streefafstand = 20;
const grensafstand = 30;

const cohesiekracht = 10;
const parralelkracht = 40;
const vermijdingskracht = 100;
const grenskracht = 10;
const eigenkracht = 100;

const eigensnelheidskracht = 10;
const gemiddeldesnelheidskracht = 10;

const vds = callback => (...argument) => callback(vds(callback))(...argument);
const it = (aantal, waarde) => Array.from(Array(aantal)).map((_, i) => waarde || i);
const totaal = array => array.reduce((a, b) => a + b);

const dimensielijst = it(dimensies);

const niets = dimensielijst.map(() => 0);

const posities = boids => boids.map(b => b.pos);
const snelheden = boids => boids.map(b => b.snelheid);

const verschil = (a, b) => dimensielijst.map(d => a[d] - b[d]);
const som = vectoren => dimensielijst.map(d => totaal(vectoren.map(v => v[d])));

const lengte = vector => Math.sqrt(totaal(vector.map(c => c ** 2)));

const afstand = (a, b) => Math.sqrt(totaal(dimensielijst.map(d => (a[d] - b[d]) ** 2)));

const metLengte = (vector, nieuweLengte = 1, huidigeLengte = lengte(vector)) => vector.map(c => c * nieuweLengte / huidigeLengte);

const gemiddelde = vectoren => vectoren
    .reduce((a, b) => a.map((a, d) => a + b[d]))
    .map(coordinaat => coordinaat / boids.length);

const zichtbareBoids = (boid, boids, radius = zichtafstand) => boids.filter(mate => afstand(mate.pos, boid.pos) <= radius && mate != boid);

const step = boids => boids.map(boid => {
    const {
        pos,
        snelheid
    } = boid;

    const mates = zichtbareBoids(boid, boids);

    const eigen = metLengte(snelheid, eigenkracht);
    const grenzen = metLengte(dimensielijst.map(d => -1 * (pos[d] - ruimte[d] / 2) ** 3), grenskracht);

    if (mates.length == 0) return {
        pos: som([pos, snelheid]),
        snelheid: metLengte(gemiddelde([grenzen, eigen]), beginsnelheid)
    };

    const matesGoedeAfstand = mates.filter(mate => afstand(mate.pos, pos) >= streefafstand);
    const matesTeDichtbij = mates.filter(mate => afstand(mate.pos, pos) < streefafstand);

    const vermijden = matesTeDichtbij.length > 0 ? metLengte(gemiddelde(posities(matesTeDichtbij).map(mate => verschil(pos, mate))), vermijdingskracht) : niets;
    const cohesie = matesGoedeAfstand.length > 0 ? metLengte(verschil(gemiddelde(posities(matesGoedeAfstand)), pos), cohesiekracht) : niets;
    const parralel = metLengte(metLengte(gemiddelde(snelheden(mates))), parralelkracht);

    // const snelheid = (lengte(gemiddelde(snelheden(mates))) * gemiddeldesnelheidskracht + lengte(snelheid) * eigensnelheidskracht) / (gemiddeldesnelheidskracht + eigensnelheidskracht);

    const resultaatsnelheid = metLengte(gemiddelde([cohesie, parralel, grenzen, vermijden, eigen]), beginsnelheid);
    const resultaatpositie = som([pos, resultaatsnelheid]);

    return {
        pos: resultaatpositie,
        snelheid: resultaatsnelheid
    };
});

const boids = it(aantal).map(() => ({
    pos: dimensielijst.map(d => Math.random() * ruimte[d]),
    snelheid: metLengte(dimensielijst.map(Math.random), beginsnelheid)
}));

const boidsTekenaar = (id, ruimte, dimensielijst) => {
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext("2d");
    
    const windowsize = [window.innerWidth, window.innerHeight];
    [canvas.width, canvas.height] = windowsize;

    const offsets = dimensielijst.map(d => (windowsize[d] - ruimte[d]) / 2);

    return boids => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        boids.forEach(boid => {
            const [x, y] = dimensielijst.map(d => offsets[d] + boid.pos[d]);

            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fill();
        });
    };
};

const tekenBoids = boidsTekenaar("canvas", ruimte, dimensielijst);

vds(zelf => vorigeBoids => () => {
    const boids = step(vorigeBoids);

    tekenBoids(boids);

    window.requestAnimationFrame(zelf(boids));
})(boids)();