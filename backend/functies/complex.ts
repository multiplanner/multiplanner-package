class Complex {
    r: number;
    i: number;

    constructor(r: number, i: number = 0) {
        this.r = r;
        this.i = i;
    }

    angle(): number {
        return Math.atan(this.i / this.r);
    }

    plus(other: Complex): Complex {
        return new Complex(
            this.r + other.r,
            this.i + other.i
        );
    }

    minus(other: Complex): Complex {
        return new Complex(
            this.r - other.r,
            this.i - other.i
        );
    }

    abs(): number {
        return Math.sqrt(
            this.r ** 2 +
            this.i ** 2
        );
    }

    times(other: Complex): Complex {
        return new Complex(
            this.r * other.r - this.i * other.i,
            this.r * other.i + other.r * this.i
        );
    }

    div(other: Complex): Complex {
        let a = this.r;
        let b = this.i;
        let x = other.r;
        let y = other.i;
        let r = (a * x + b * y) / (x ** 2 + y);
        let i = (b * x - a * y) / (x ** 2 + y);
        return new Complex(r, i);
    }

    pown(n: number): Complex {
        // BROKEN
        let o = this.angle();
        let a = this.abs();
        let r = a * Math.cos(n * o);
        let i = a * Math.sin(n * o);
        // console.log(n, o, a, r, i)
        return new Complex(r, i);
    }
}
