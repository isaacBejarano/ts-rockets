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
    // toString
    Rocket.prototype.toString = function () {
        return "\t\tRocket \"" + this.id + "\"\n\t\tThrusters: " + this.thrusters.length + "\n\t\tMax.Power per Thruster: " + this.totalMaxThrust();
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
