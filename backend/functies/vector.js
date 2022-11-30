"use strict";
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector.prototype.dotProduct = function (other) {
        return this.length() * other.length() * Math.cos(this.toAngle() - other.toAngle());
    };
    Vector.prototype.normalized = function () {
        return this.multiplyNumber(1 / this.length());
    };
    Vector.prototype.withLength = function (length) {
        return this.normalized().multiplyNumber(length);
    };
    Vector.prototype.toAngle = function () {
        return Math.tan(this.y / this.x);
    };
    Vector.prototype.plusLength = function (extra) {
        return this.withLength(this.length() + extra);
    };
    Vector.prototype.length = function () {
        return Math.sqrt(Math.pow(this.x, 2) +
            Math.pow(this.y, 2));
    };
    Vector.prototype.multiply = function (other) {
        return new Vector(this.x * other.x, this.y * other.y);
    };
    Vector.prototype.multiplyNumber = function (factor) {
        return new Vector(this.x * factor, this.y * factor);
    };
    Vector.prototype.rounded = function () {
        return new Vector(Math.round(this.x), Math.round(this.y));
    };
    Vector.prototype.sum = function (other, multiplier) {
        if (multiplier === void 0) { multiplier = 1; }
        return new Vector(this.x + other.x * multiplier, this.y + other.y * multiplier);
    };
    Vector.prototype.distanceTo = function (other) {
        return Math.sqrt(Math.pow((other.x - this.x), 2) +
            Math.pow((other.y - this.y), 2));
    };
    Vector.prototype.rotate = function (angle) {
        var l = this.length();
        var currentAngle = this.toAngle();
        var newAngle = currentAngle + angle;
        return this.withAngle(newAngle);
    };
    Vector.prototype.withAngle = function (angle) {
        var l = this.length();
        var t = Math.tan(angle); // y / x
        var x = Math.sqrt(Math.pow(l, 2) / (1 + Math.pow(t, 2)));
        var y = t * x;
        return new Vector(-x, -y);
    };
    return Vector;
}());
