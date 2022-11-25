const digits = 5;

const speedfactor = 0.001;
let collisions = 0;

class Block {
    constructor(x, mass, velocity) {
        this.x = x;
        this.mass = mass;
        this.velocity = velocity;
        this.width = 1000;
    }

    move = () => this.x += this.velocity * speedfactor;

    dist = (other) => Math.abs(this.x - other.x);

    done = (other) => this.velocity > 0 && other.velocity > 0 && (this.x - other.x) * (this.velocity - other.velocity) > 0;

    respond = (u1, u2, m2) => this.velocity = (this.mass - m2) / (this.mass + m2) * u1 + 2 * m2 / (this.mass + m2) * u2;

    collide = (other) => {
        if ((this.x - other.x) * (this.velocity - other.velocity) < 0 && this.dist(other) < this.width) {
            const u1 = this.velocity;
            const u2 = other.velocity;

            this.respond(u1, u2, other.mass);
            other.respond(u2, u1, this.mass);

            collisions++;
        }
    }

    collidewall = () => {
        if (this.x < 0) {
            this.velocity *= -1;
            this.x = 0;
            collisions++;
        }
    }
}

let block1 = new Block(5, 1, 0);
let block2 = new Block(1200, 10 ** (digits * 2), -1);

while (!block1.done(block2)) {
    block1.move();
    block2.move();

    block1.collide(block2);
    block2.collide(block1);

    block1.collidewall();
}

console.log(collisions / 10 ** digits);
