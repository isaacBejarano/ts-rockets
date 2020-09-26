"use strict";
var Rocket = /** @class */ (function () {
    function Rocket(id) {
        this.thrusters = [];
        this.id =
            !id || id.trim().length === 0
                ? "not specified"
                : id.trim().length !== 8
                    ? "wrong code format"
                    : id.trim().toUpperCase();
        // count + list instances
        Rocket.count++;
        Rocket.list.push(this);
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
    Object.defineProperty(Rocket.prototype, "getThrusters", {
        get: function () {
            return this.thrusters;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rocket, "getRocketList", {
        get: function () {
            return this.list;
        },
        enumerable: false,
        configurable: true
    });
    // methods
    Rocket.prototype.totalThrusters = function () {
        return this.thrusters.length;
    };
    Rocket.prototype.totalMaxThrust = function () {
        var listOfPower = "";
        if (this.totalThrusters() >= Rocket.minThrusters) {
            for (var _i = 0, _a = this.thrusters; _i < _a.length; _i++) {
                var thruster = _a[_i];
                listOfPower += thruster.getMaxThrust + ", ";
            }
            // remove last ", "
            listOfPower = listOfPower.substr(0, listOfPower.length - 2);
        }
        else if (this.totalThrusters() > 0) {
            listOfPower = "insuficient thrusters";
        }
        else
            listOfPower = "no thrusters specified";
        return listOfPower;
    };
    // toString
    Rocket.prototype.totalThrustersToString = function () {
        return this.totalThrusters().toString();
    };
    Rocket.countToString = function () {
        return this.count.toString();
    };
    Object.defineProperty(Rocket, "getminThrusters", {
        get: function () {
            return this.minThrusters;
        },
        enumerable: false,
        configurable: true
    });
    Rocket.list = [];
    Rocket.minThrusters = 2;
    Rocket.count = 0;
    return Rocket;
}());
