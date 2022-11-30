class Vector {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    dotProduct(other: Vector): number {
        return this.length() * other.length() * Math.cos(this.toAngle() - other.toAngle());
    }

    normalized(): Vector {
        return this.multiplyNumber(1 / this.length());
    }

    withLength(length: number): Vector {
        return this.normalized().multiplyNumber(length);
    }

    toAngle(): number {
        return Math.tan(this.y / this.x);
    }

    plusLength(extra: number): Vector {
        return this.withLength(this.length() + extra);
    }
    
    length(): number {
        return Math.sqrt(
            this.x ** 2 +
            this.y ** 2
        );
    } 

    multiply(other: Vector): Vector {
        return new Vector(
            this.x * other.x,
            this.y * other.y
        );
    }

    multiplyNumber(factor: number): Vector {
        return new Vector(
            this.x * factor,
            this.y * factor
        );
    }

    rounded(): Vector {
        return new Vector(
            Math.round(this.x),
            Math.round(this.y)
        );
    }

    sum(other: Vector, multiplier: number = 1) {
        return new Vector(
            this.x + other.x * multiplier,
            this.y + other.y * multiplier
        );
    } 

    distanceTo(other: Vector): number {
        return Math.sqrt(
            (other.x - this.x) ** 2 +
            (other.y - this.y) ** 2
        );
    }

    rotate(angle: number): Vector {
        let l = this.length();
        let currentAngle = this.toAngle();
        let newAngle = currentAngle + angle;
        return this.withAngle(newAngle);
    }

    withAngle(angle: number): Vector {
        let l = this.length();
        let t = Math.tan(angle); // y / x
        let x = Math.sqrt(l ** 2 / (1 + t ** 2));
        let y = t * x;
        return new Vector(-x, -y);
    }
}