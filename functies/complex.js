"use strict";
var Complex = /** @class */ (function () {
    function Complex(r, i) {
        if (i === void 0) { i = 0; }
        this.r = r;
        this.i = i;
    }
    Complex.prototype.angle = function () {
        return Math.atan(this.i / this.r);
    };
    Complex.prototype.plus = function (other) {
        return new Complex(this.r + other.r, this.i + other.i);
    };
    Complex.prototype.minus = function (other) {
        return new Complex(this.r - other.r, this.i - other.i);
    };
    Complex.prototype.abs = function () {
        return Math.sqrt(Math.pow(this.r, 2) +
            Math.pow(this.i, 2));
    };
    Complex.prototype.times = function (other) {
        return new Complex(this.r * other.r - this.i * other.i, this.r * other.i + other.r * this.i);
    };
    Complex.prototype.div = function (other) {
        var a = this.r;
        var b = this.i;
        var x = other.r;
        var y = other.i;
        var r = (a * x + b * y) / (Math.pow(x, 2) + y);
        var i = (b * x - a * y) / (Math.pow(x, 2) + y);
        return new Complex(r, i);
    };
    Complex.prototype.pown = function (n) {
        // BROKEN
        var o = this.angle();
        var a = this.abs();
        var r = a * Math.cos(n * o);
        var i = a * Math.sin(n * o);
        // console.log(n, o, a, r, i)
        return new Complex(r, i);
    };
    return Complex;
}());
