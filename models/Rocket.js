"use strict";
var Rocket = /** @class */ (function () {
    function Rocket(id) {
        this.thrusters = [];
        this.id = !id || id.length < 8 ? "not specified" : id.toUpperCase();
        Rocket.count++; //count instances
        Rocket.list.push(this); //list instances
    }
    Object.defineProperty(Rocket.prototype, "setThrusters", {
        // setter
        set: function (thrusters) {
            this.thrusters = thrusters;
        },
        enumerable: false,
        configurable: true
    });
    // toString
    Rocket.prototype.toString = function () {
        return "Rocket " + this.id + " has " + this.thrusters.length + " thrusters.";
    };
    // static toString
    Rocket.CountToString = function () {
        return this.count;
    };
    Rocket.ListToString = function () {
        return this.list;
    };
    Rocket.count = 0;
    Rocket.list = [];
    return Rocket;
}());
