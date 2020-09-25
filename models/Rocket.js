"use strict";
var Rocket = /** @class */ (function () {
    function Rocket(id) {
        this.thrusters = [];
        this.id = !id || id.length !== 8 ? "not specified" : id.toUpperCase();
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
    Object.defineProperty(Rocket.prototype, "getId", {
        // getters
        get: function () {
            return this.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rocket, "rocketList", {
        get: function () {
            return this.list;
        },
        enumerable: false,
        configurable: true
    });
    // methods
    Rocket.prototype.totalMaxThrust = function () {
        var listOfPower = "";
        for (var _i = 0, _a = this.thrusters; _i < _a.length; _i++) {
            var thruster = _a[_i];
            listOfPower += thruster.getMaxThrust + ", ";
        }
        // get rid of last ", "
        listOfPower = listOfPower.substr(0, listOfPower.length - 2);
        return listOfPower;
    };
    Rocket.prototype.totalThrusters = function () {
        return this.thrusters.length;
    };
    // toString
    Rocket.prototype.thrustersToString = function () {
        return this.totalThrusters().toString();
    };
    // static toString
    Rocket.CountToString = function () {
        return this.count.toString();
    };
    Rocket.list = [];
    Rocket.count = 0;
    return Rocket;
}());
