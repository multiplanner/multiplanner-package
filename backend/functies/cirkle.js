class Cirkle {
    constructor (r) {
        this.r = r;
    }

    getArea = () => Math.PI * this.r ** 2;

    getPerimeter = () => 2 * Math.PI * this.r;
}

const c1 = new Cirkle(10);
console.log(c1.getArea(), c1.getPerimeter());